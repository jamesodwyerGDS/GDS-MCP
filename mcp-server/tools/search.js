/**
 * Search GDS Documentation Tool
 *
 * Smart search across all GDS documentation with relevance ranking.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIGMA_DIR = path.join(__dirname, '../../docs/figma-extract');

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

  // Search Figma-extracted docs
  const results = await searchComponents(searchTerms, audience);

  // Rank and limit results
  const combined = results
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
 */
async function searchComponents(searchTerms, audience) {
  const results = [];

  // Search Figma-extracted docs only
  const searchDirs = [
    { dir: FIGMA_DIR, type: 'figma', pathPrefix: 'docs/figma-extract' }
  ];

  for (const { dir, type, pathPrefix } of searchDirs) {
    try {
      const files = await fs.readdir(dir);

      for (const file of files) {
        if (!file.endsWith('.md')) continue;

        const filePath = path.join(dir, file);
        const content = await fs.readFile(filePath, 'utf-8');

        // Handle files with or without frontmatter
        let parsed;
        try {
          parsed = matter(content);
        } catch {
          parsed = { data: {}, content };
        }

        // Extract name from file or frontmatter
        const name = parsed.data.name ||
          file.replace('.md', '')
            .replace(/^---+/, '')
            .replace(/-+$/, '')
            .replace(/-/g, ' ')
            .trim();

        // Calculate relevance score
        const score = calculateScore(searchTerms, {
          name: name,
          description: parsed.data.description || '',
          content: filterContentByAudience(parsed.content, audience)
        });

        if (score > 0.1) {
          results.push({
            title: name || file.replace('.md', ''),
            type: type,
            path: `${pathPrefix}/${file}`,
            score,
            snippet: extractSnippet(parsed.content, searchTerms, audience)
          });
        }
      }
    } catch (error) {
      // Directory may not exist, skip it
      continue;
    }
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
