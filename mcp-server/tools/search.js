/**
 * Search GDS Documentation Tool
 *
 * Smart search across all GDS documentation with relevance ranking.
 *
 * OPTIMIZED: Uses pre-built search index from cache module.
 * Search complexity reduced from O(n * files) to O(n) where n = indexed docs.
 */

import { searchIndex_query, searchFaq_cached } from '../cache.js';

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

  // Search components using cached index (FAST!)
  const results = searchIndex_query(searchTerms, audience);

  // Also check cached FAQ
  const faqResults = searchFaq_cached(normalizedQuery);

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
