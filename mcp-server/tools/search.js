/**
 * Search GDS Documentation Tool
 *
 * Smart search across all GDS documentation with relevance ranking.
 *
 * Security:
 * - Path traversal prevention
 * - Input sanitization (performed by security.js before reaching this module)
 * - Bounded result limits
 *
 * Performance:
 * - Cached file reads and parsed content
 * - Parallel file processing
 * - Pre-compiled regex patterns
 * - Optimized string operations
 */

import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import {
  cachedReadDir,
  cachedParsedFile,
  cachedReadFile,
  getCachedRegex,
  escapeRegex,
} from '../cache.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// All documentation directories to search
const DOCS_ROOT = path.resolve(__dirname, '../../docs');
const UNIFIED_DIR = path.resolve(__dirname, '../../docs-unified/components');
const LLMS_FILE = path.resolve(__dirname, '../../llms.txt');

// Documentation directories with their types
const DOC_DIRECTORIES = [
  { path: UNIFIED_DIR, type: 'component', recursive: false },
  { path: path.join(DOCS_ROOT, 'foundations'), type: 'foundation', recursive: false },
  { path: path.join(DOCS_ROOT, 'components'), type: 'component', recursive: true },
  { path: path.join(DOCS_ROOT, 'patterns'), type: 'pattern', recursive: false },
];

// Maximum content length to process per file (prevent DoS via large files)
const MAX_CONTENT_LENGTH = 100000;

// Minimum score threshold for results
const MIN_SCORE_THRESHOLD = 0.1;

// Maximum snippet length
const MAX_SNIPPET_LENGTH = 300;

/**
 * Validate that a resolved path is within the allowed base directory
 * @param {string} resolvedPath - Fully resolved path
 * @param {string} baseDir - Allowed base directory
 * @returns {boolean}
 */
function isPathWithinBase(resolvedPath, baseDir) {
  const normalizedBase = path.resolve(baseDir) + path.sep;
  const normalizedPath = path.resolve(resolvedPath);
  return normalizedPath.startsWith(normalizedBase) || normalizedPath === path.resolve(baseDir);
}

// Search aliases for common queries
const SEARCH_ALIASES = {
  'button variants': ['button', 'colorVariant', 'primary', 'secondary', 'tertiary'],
  'button types': ['button', 'colorVariant', 'variant'],
  'spacing': ['spacing', 'padding', 'margin', 'gap', 'lounge', 'club', 'auditorium'],
  'colors': ['color', 'colour', 'neptune', 'cosmos', 'earth', 'mars'],
  'typography': ['font', 'text', 'mauna', 'everest', 'fiji'],
  'form': ['input', 'checkbox', 'radio', 'select', 'form', 'field'],
  'modal': ['modal', 'dialog', 'overlay', 'popup'],
  'loading': ['loading', 'spinner', 'skeleton', 'progress']
};

/**
 * Search GDS documentation
 * @param {string} query - Search query
 * @param {string} audience - "all", "design", "engineer", or "vibe"
 * @param {number} limit - Max results
 * @param {boolean} showFull - Show full content instead of truncated snippets
 * @returns {object} MCP tool response
 */
export async function searchGds(query, audience = 'all', limit = 5, showFull = false) {
  const normalizedQuery = query.toLowerCase().trim();

  // Expand query with aliases
  const searchTerms = expandQuery(normalizedQuery);

  // Pre-normalize search terms once (avoid repeated toLowerCase)
  const normalizedTerms = searchTerms.map(t => t.toLowerCase());

  // Search components and FAQ in parallel
  const [componentResults, faqResults] = await Promise.all([
    searchComponents(normalizedTerms, audience, showFull),
    searchFaq(normalizedQuery, showFull)
  ]);

  // Combine and rank results
  const combined = [...componentResults, ...faqResults]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (combined.length === 0) {
    return {
      content: [{
        type: 'text',
        text: `No results found for "${query}".\n\nTry:\n- Component names: button, modal, input-field\n- Design tokens: neptune, auditorium, fiji\n- Categories: form components, feedback, layout`
      }]
    };
  }

  // Format results
  const formatted = combined.map((r, i) => {
    let output = `### ${i + 1}. ${r.title}\n`;
    output += `**Type:** ${r.type} | **Relevance:** ${Math.round(r.score * 100)}%\n`;
    if (r.path) output += `**Path:** ${r.path}\n`;
    if (r.truncated) output += `*(truncated - use showFull: true to see complete content)*\n`;
    output += `\n${r.snippet}\n`;

    // Always include design tokens for components
    if (r.tokens && Object.keys(r.tokens).length > 0) {
      output += `\n**Design Tokens:**\n`;
      for (const [category, values] of Object.entries(r.tokens)) {
        if (values && (Array.isArray(values) ? values.length > 0 : Object.keys(values).length > 0)) {
          output += `- **${category}:** ${Array.isArray(values) ? values.join(', ') : JSON.stringify(values)}\n`;
        }
      }
    }

    return output;
  }).join('\n---\n\n');

  return {
    content: [{
      type: 'text',
      text: `## Search Results for "${query}"\n\nFound ${combined.length} result(s):\n\n${formatted}`
    }]
  };
}

/**
 * Expand query with aliases
 */
function expandQuery(query) {
  const terms = [query];

  // Check for alias matches
  for (const [alias, expansions] of Object.entries(SEARCH_ALIASES)) {
    if (query.includes(alias) || alias.includes(query)) {
      terms.push(...expansions);
    }
  }

  // Split into individual words
  const words = query.split(/\s+/);
  terms.push(...words);

  return [...new Set(terms)];
}

/**
 * Recursively get all markdown files from a directory
 */
async function getMarkdownFiles(dirPath, recursive = false) {
  const files = [];

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory() && recursive) {
        const subFiles = await getMarkdownFiles(fullPath, true);
        files.push(...subFiles);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        // Skip security docs
        if (!entry.name.includes('SECURITY')) {
          files.push(fullPath);
        }
      }
    }
  } catch {
    // Directory doesn't exist
  }

  return files;
}

/**
 * Search all documentation directories
 * Uses parallel processing and caching for performance
 */
async function searchComponents(normalizedTerms, audience, showFull = false) {
  const allResults = [];

  // Search all documentation directories in parallel
  const dirSearchPromises = DOC_DIRECTORIES.map(async (dir) => {
    try {
      const files = await getMarkdownFiles(dir.path, dir.recursive);

      // Process files in parallel
      const filePromises = files.map(async (filePath) => {
        // Validate path
        if (!isPathWithinBase(filePath, DOCS_ROOT) && !isPathWithinBase(filePath, UNIFIED_DIR)) {
          return null;
        }

        try {
          // Use cached parsed file
          const { data, content } = await cachedParsedFile(filePath);

          // Truncate content if too long
          const safeContent = content.length > MAX_CONTENT_LENGTH
            ? content.substring(0, MAX_CONTENT_LENGTH)
            : content;

          const fileName = path.basename(filePath, '.md');
          const name = data.name || fileName;
          const description = data.description || '';

          // Calculate relevance score - search full content for foundations
          const searchContent = dir.type === 'foundation'
            ? safeContent
            : filterContentByAudience(safeContent, audience);

          const score = calculateScore(normalizedTerms, {
            name,
            description,
            content: searchContent
          });

          if (score > MIN_SCORE_THRESHOLD) {
            const { snippet, truncated } = extractSnippet(safeContent, normalizedTerms, audience, showFull);
            // Extract design tokens from frontmatter
            const tokens = data.tokens || {};
            // Get relative path for display
            const relativePath = path.relative(path.resolve(__dirname, '../..'), filePath);

            return {
              title: name,
              type: dir.type,
              path: relativePath,
              score,
              snippet,
              truncated,
              tokens
            };
          }
        } catch {
          // Skip files that fail to parse
        }

        return null;
      });

      const results = await Promise.all(filePromises);
      return results.filter(Boolean);

    } catch {
      return [];
    }
  });

  const allDirResults = await Promise.all(dirSearchPromises);

  // Flatten and deduplicate by title (prefer unified docs)
  const seen = new Map();
  for (const results of allDirResults) {
    for (const result of results) {
      const key = result.title.toLowerCase();
      if (!seen.has(key) || result.path.includes('unified')) {
        seen.set(key, result);
      }
    }
  }

  return Array.from(seen.values());
}

/**
 * Search FAQ in llms.txt
 * Includes path validation and content length limits
 */
async function searchFaq(query, showFull = false) {
  const results = [];

  try {
    // Validate LLMS_FILE path is within project
    const projectRoot = path.resolve(__dirname, '../..');
    if (!isPathWithinBase(LLMS_FILE, projectRoot)) {
      return results;
    }

    // Use cached file read with length limit
    const content = await cachedReadFile(LLMS_FILE, MAX_CONTENT_LENGTH);

    // Find FAQ sections using cached regex
    const faqRegex = getCachedRegex('## FAQ[\\s\\S]*?(?=\\n## |$)', 'g');
    const faqMatch = content.match(faqRegex);

    if (faqMatch) {
      const queryWords = query.split(' ');

      for (const section of faqMatch) {
        // Find individual Q&A using cached regex
        const qaRegex = getCachedRegex('### ([^\\n]+)\\n([\\s\\S]*?)(?=\\n### |\\n## |$)', 'g');
        const qaMatches = section.matchAll(qaRegex);

        for (const match of qaMatches) {
          const question = match[1];
          const answer = match[2].trim();

          // Check relevance
          const combined = `${question} ${answer}`.toLowerCase();
          const matchingWords = queryWords.filter(w => combined.includes(w));

          if (combined.includes(query) || matchingWords.length > 0) {
            const needsTruncation = !showFull && answer.length > MAX_SNIPPET_LENGTH;
            results.push({
              title: question,
              type: 'FAQ',
              score: matchingWords.length / queryWords.length,
              snippet: needsTruncation
                ? answer.substring(0, MAX_SNIPPET_LENGTH) + '...'
                : answer,
              truncated: needsTruncation
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error searching FAQ');
  }

  return results;
}

/**
 * Calculate relevance score
 * Optimized to avoid repeated string operations
 */
function calculateScore(normalizedTerms, doc) {
  let score = 0;

  // Normalize document fields once
  const nameLower = doc.name.toLowerCase();
  const descLower = doc.description.toLowerCase();
  const contentLower = doc.content.toLowerCase();

  for (const term of normalizedTerms) {
    // Name matches (highest weight)
    if (nameLower === term) {
      score += 1.0;
    } else if (nameLower.includes(term)) {
      score += 0.5;
    }

    // Description matches
    if (descLower.includes(term)) {
      score += 0.3;
    }

    // Content matches - use cached regex
    const escapedTerm = escapeRegex(term);
    const termRegex = getCachedRegex(escapedTerm, 'gi');
    const contentMatches = (contentLower.match(termRegex) || []).length;
    score += Math.min(contentMatches * 0.05, 0.3);
  }

  return Math.min(score / normalizedTerms.length, 1.0);
}

/**
 * Filter content by audience section
 */
function filterContentByAudience(content, audience) {
  if (audience === 'all') return content;

  const sectionMap = {
    design: '## Design Documentation',
    engineer: '## Engineer Documentation',
    vibe: '## Vibe Documentation'
  };

  const marker = sectionMap[audience];
  if (!marker) return content;

  const startIndex = content.indexOf(marker);
  if (startIndex === -1) return '';

  const afterStart = content.substring(startIndex);
  const nextSection = afterStart.indexOf('\n---\n\n##');

  return nextSection > 0 ? afterStart.substring(0, nextSection) : afterStart;
}

/**
 * Extract relevant snippet from content
 * @returns {{ snippet: string, truncated: boolean }}
 */
function extractSnippet(content, normalizedTerms, audience, showFull = false) {
  const filteredContent = filterContentByAudience(content, audience);

  // Find most relevant paragraph
  const paragraphs = filteredContent.split('\n\n');

  let bestParagraph = '';
  let bestScore = 0;

  for (const p of paragraphs) {
    if (p.length < 20 || p.startsWith('---')) continue;

    const pLower = p.toLowerCase();
    const score = normalizedTerms.filter(t => pLower.includes(t)).length;

    if (score > bestScore) {
      bestScore = score;
      bestParagraph = p;
    }
  }

  if (!bestParagraph) {
    return { snippet: 'No preview available', truncated: false };
  }

  // Truncate if needed (unless showFull is true)
  const needsTruncation = !showFull && bestParagraph.length > MAX_SNIPPET_LENGTH;

  return {
    snippet: needsTruncation
      ? bestParagraph.substring(0, MAX_SNIPPET_LENGTH) + '...'
      : bestParagraph,
    truncated: needsTruncation
  };
}
