/**
 * Search GDS Documentation Tool
 *
 * Smart search across all GDS documentation with relevance ranking.
 *
 * Security:
 * - Path traversal prevention
 * - Input sanitization (performed by security.js before reaching this module)
 * - Bounded result limits
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UNIFIED_DIR = path.resolve(__dirname, '../../docs-unified/components');
const LLMS_FILE = path.resolve(__dirname, '../../llms.txt');

// Maximum content length to process per file (prevent DoS via large files)
const MAX_CONTENT_LENGTH = 100000;

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
 * @returns {object} MCP tool response
 */
export async function searchGds(query, audience = 'all', limit = 5) {
  const normalizedQuery = query.toLowerCase().trim();

  // Expand query with aliases
  const searchTerms = expandQuery(normalizedQuery);

  // Search components
  const results = await searchComponents(searchTerms, audience);

  // Also check llms.txt for FAQ matches
  const faqResults = await searchFaq(normalizedQuery);

  // Combine and rank results
  const combined = [...results, ...faqResults]
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
    output += `\n${r.snippet}\n`;
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
 * Search component files
 * Includes path traversal protection and content length limits
 */
async function searchComponents(searchTerms, audience) {
  const results = [];

  try {
    const files = await fs.readdir(UNIFIED_DIR);

    for (const file of files) {
      // Only process .md files
      if (!file.endsWith('.md')) continue;

      // Validate filename doesn't contain path traversal attempts
      if (file.includes('..') || file.includes('/') || file.includes('\\')) continue;

      const filePath = path.join(UNIFIED_DIR, file);

      // Validate path is within allowed directory
      if (!isPathWithinBase(filePath, UNIFIED_DIR)) continue;

      let content = await fs.readFile(filePath, 'utf-8');

      // Limit content length to prevent DoS
      if (content.length > MAX_CONTENT_LENGTH) {
        content = content.substring(0, MAX_CONTENT_LENGTH);
      }

      const parsed = matter(content);

      // Calculate relevance score
      const score = calculateScore(searchTerms, {
        name: parsed.data.name || file.replace('.md', ''),
        description: parsed.data.description || '',
        content: filterContentByAudience(parsed.content, audience)
      });

      if (score > 0.1) {
        results.push({
          title: parsed.data.name || file.replace('.md', ''),
          type: 'component',
          path: `docs-unified/components/${file}`,
          score,
          snippet: extractSnippet(parsed.content, searchTerms, audience)
        });
      }
    }
  } catch (error) {
    // Log error but don't expose details
    console.error('Error searching components');
  }

  return results;
}

/**
 * Search FAQ in llms.txt
 * Includes path validation and content length limits
 */
async function searchFaq(query) {
  const results = [];

  try {
    // Validate LLMS_FILE path is within project
    const projectRoot = path.resolve(__dirname, '../..');
    if (!isPathWithinBase(LLMS_FILE, projectRoot)) {
      return results;
    }

    let content = await fs.readFile(LLMS_FILE, 'utf-8');

    // Limit content length
    if (content.length > MAX_CONTENT_LENGTH) {
      content = content.substring(0, MAX_CONTENT_LENGTH);
    }

    // Find FAQ sections
    const faqMatch = content.match(/## FAQ[\s\S]*?(?=\n## |$)/g);
    if (faqMatch) {
      for (const section of faqMatch) {
        // Find individual Q&A
        const qaMatches = section.matchAll(/### ([^\n]+)\n([\s\S]*?)(?=\n### |\n## |$)/g);

        for (const match of qaMatches) {
          const question = match[1];
          const answer = match[2].trim();

          // Check relevance
          const combined = `${question} ${answer}`.toLowerCase();
          if (combined.includes(query) || query.split(' ').some(w => combined.includes(w))) {
            results.push({
              title: question,
              type: 'FAQ',
              score: query.split(' ').filter(w => combined.includes(w)).length / query.split(' ').length,
              snippet: answer.substring(0, 300) + (answer.length > 300 ? '...' : '')
            });
          }
        }
      }
    }
  } catch (error) {
    // Log error but don't expose details
    console.error('Error searching FAQ');
  }

  return results;
}

/**
 * Calculate relevance score
 */
function calculateScore(searchTerms, doc) {
  let score = 0;
  const name = doc.name.toLowerCase();
  const description = doc.description.toLowerCase();
  const content = doc.content.toLowerCase();

  for (const term of searchTerms) {
    const t = term.toLowerCase();

    // Name matches (highest weight)
    if (name === t) score += 1.0;
    else if (name.includes(t)) score += 0.5;

    // Description matches
    if (description.includes(t)) score += 0.3;

    // Content matches
    const contentMatches = (content.match(new RegExp(t, 'gi')) || []).length;
    score += Math.min(contentMatches * 0.05, 0.3);
  }

  return Math.min(score / searchTerms.length, 1.0);
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
 */
function extractSnippet(content, searchTerms, audience) {
  const filteredContent = filterContentByAudience(content, audience);

  // Find most relevant paragraph
  const paragraphs = filteredContent.split('\n\n');

  let bestParagraph = '';
  let bestScore = 0;

  for (const p of paragraphs) {
    if (p.length < 20 || p.startsWith('---')) continue;

    const pLower = p.toLowerCase();
    const score = searchTerms.filter(t => pLower.includes(t.toLowerCase())).length;

    if (score > bestScore) {
      bestScore = score;
      bestParagraph = p;
    }
  }

  // Truncate if needed
  if (bestParagraph.length > 300) {
    bestParagraph = bestParagraph.substring(0, 300) + '...';
  }

  return bestParagraph || 'No preview available';
}
