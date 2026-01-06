/**
 * MCP Server Cache Module
 *
 * Provides in-memory caching for:
 * - Pre-built search index (built on startup)
 * - Component documentation (LRU cache)
 * - File listing cache
 *
 * Performance improvements:
 * - Eliminates repeated file I/O for search queries
 * - Reduces search from O(n * files) to O(1) lookups
 * - Caches component docs to avoid re-reading files
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UNIFIED_DIR = path.join(__dirname, '../docs-unified/components');
const LLMS_FILE = path.join(__dirname, '../llms.txt');

// Cache configuration
const CONFIG = {
  componentCacheTTL: 5 * 60 * 1000, // 5 minutes
  maxCacheSize: 100, // Max cached components
  indexRebuildInterval: 10 * 60 * 1000 // 10 minutes
};

// In-memory stores
let searchIndex = null;
let componentCache = new Map();
let fileListCache = null;
let faqCache = null;
let lastIndexBuild = 0;

/**
 * Initialize the cache by building the search index
 * Call this on server startup
 */
export async function initializeCache() {
  console.error('[Cache] Initializing search index...');
  const startTime = Date.now();

  try {
    await buildSearchIndex();
    await cacheFileList();
    await cacheFaq();

    const elapsed = Date.now() - startTime;
    console.error(`[Cache] Index built in ${elapsed}ms with ${searchIndex.size} components`);
  } catch (error) {
    console.error('[Cache] Failed to initialize:', error.message);
  }
}

/**
 * Build the search index from all component files
 * Parses frontmatter and content once, stores for fast lookup
 */
async function buildSearchIndex() {
  searchIndex = new Map();

  try {
    const files = await fs.readdir(UNIFIED_DIR);

    // Read all files in parallel for speed
    const filePromises = files
      .filter(f => f.endsWith('.md'))
      .map(async (file) => {
        const filePath = path.join(UNIFIED_DIR, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const parsed = matter(content);

        return {
          file,
          filePath,
          name: parsed.data.name || file.replace('.md', ''),
          nameLower: (parsed.data.name || file.replace('.md', '')).toLowerCase(),
          description: parsed.data.description || '',
          descriptionLower: (parsed.data.description || '').toLowerCase(),
          category: parsed.data.category || 'atoms',
          status: parsed.data.status || 'stable',
          tags: parsed.data.tags || [],
          keywords: parsed.data.keywords || [],
          content: parsed.content,
          contentLower: parsed.content.toLowerCase(),
          frontmatter: parsed.data,
          raw: content
        };
      });

    const results = await Promise.all(filePromises);

    for (const doc of results) {
      // Index by normalized name
      const normalizedName = normalizeComponentName(doc.name);
      searchIndex.set(normalizedName, doc);

      // Also index by filename without extension
      const fileBaseName = doc.file.replace('.md', '').toLowerCase();
      if (fileBaseName !== normalizedName) {
        searchIndex.set(fileBaseName, doc);
      }
    }
  } catch (error) {
    console.error('[Cache] Error building index:', error.message);
  }

  lastIndexBuild = Date.now();
}

/**
 * Cache the file list for fast component lookups
 */
async function cacheFileList() {
  try {
    fileListCache = await fs.readdir(UNIFIED_DIR);
  } catch {
    fileListCache = [];
  }
}

/**
 * Cache FAQ from llms.txt
 */
async function cacheFaq() {
  faqCache = [];

  try {
    const content = await fs.readFile(LLMS_FILE, 'utf-8');

    // Find FAQ sections
    const faqMatch = content.match(/## FAQ[\s\S]*?(?=\n## |$)/g);
    if (faqMatch) {
      for (const section of faqMatch) {
        const qaMatches = section.matchAll(/### ([^\n]+)\n([\s\S]*?)(?=\n### |\n## |$)/g);

        for (const match of qaMatches) {
          const question = match[1];
          const answer = match[2].trim();
          faqCache.push({
            question,
            questionLower: question.toLowerCase(),
            answer,
            answerLower: answer.toLowerCase(),
            combined: `${question} ${answer}`.toLowerCase()
          });
        }
      }
    }
  } catch {
    // llms.txt may not exist
  }
}

/**
 * Get component from cache or load from file
 */
export async function getComponent(componentName) {
  const normalizedName = normalizeComponentName(componentName);

  // Check search index first (fastest)
  if (searchIndex && searchIndex.has(normalizedName)) {
    return searchIndex.get(normalizedName);
  }

  // Check component cache
  const cached = componentCache.get(normalizedName);
  if (cached && Date.now() - cached.timestamp < CONFIG.componentCacheTTL) {
    return cached.data;
  }

  // Load from file
  const doc = await loadComponentFromFile(componentName);
  if (doc) {
    componentCache.set(normalizedName, {
      data: doc,
      timestamp: Date.now()
    });

    // Enforce cache size limit
    if (componentCache.size > CONFIG.maxCacheSize) {
      const oldest = componentCache.keys().next().value;
      componentCache.delete(oldest);
    }
  }

  return doc;
}

/**
 * Load component from file (fallback when not in index)
 */
async function loadComponentFromFile(componentName) {
  const normalizedName = normalizeComponentName(componentName);
  const possibleNames = [
    normalizedName,
    normalizedName.replace(/-/g, ''),
    normalizedName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  ];

  try {
    const files = fileListCache || await fs.readdir(UNIFIED_DIR);

    for (const name of possibleNames) {
      const match = files.find(f =>
        f.replace('.md', '').toLowerCase() === name.toLowerCase()
      );
      if (match) {
        const filePath = path.join(UNIFIED_DIR, match);
        const content = await fs.readFile(filePath, 'utf-8');
        const parsed = matter(content);

        return {
          file: match,
          filePath,
          name: parsed.data.name || match.replace('.md', ''),
          nameLower: (parsed.data.name || match.replace('.md', '')).toLowerCase(),
          description: parsed.data.description || '',
          content: parsed.content,
          contentLower: parsed.content.toLowerCase(),
          frontmatter: parsed.data,
          raw: content
        };
      }
    }

    // Partial match fallback
    for (const name of possibleNames) {
      const match = files.find(f =>
        f.toLowerCase().includes(name.toLowerCase())
      );
      if (match) {
        const filePath = path.join(UNIFIED_DIR, match);
        const content = await fs.readFile(filePath, 'utf-8');
        const parsed = matter(content);

        return {
          file: match,
          filePath,
          name: parsed.data.name || match.replace('.md', ''),
          content: parsed.content,
          contentLower: parsed.content.toLowerCase(),
          frontmatter: parsed.data,
          raw: content
        };
      }
    }
  } catch {
    // Directory doesn't exist
  }

  return null;
}

/**
 * Search using pre-built index
 * Much faster than scanning all files
 */
export function searchIndex_query(searchTerms, audience = 'all') {
  const results = [];

  if (!searchIndex) {
    return results;
  }

  // Get unique documents (avoid duplicates from alias keys)
  const seenFiles = new Set();
  const docs = [];

  for (const doc of searchIndex.values()) {
    if (!seenFiles.has(doc.file)) {
      seenFiles.add(doc.file);
      docs.push(doc);
    }
  }

  for (const doc of docs) {
    const score = calculateScore(searchTerms, doc, audience);

    if (score > 0.1) {
      results.push({
        title: doc.name,
        type: 'component',
        path: `docs-unified/components/${doc.file}`,
        score,
        snippet: extractSnippet(doc.content, searchTerms, audience),
        doc // Include full doc for potential use
      });
    }
  }

  return results;
}

/**
 * Search FAQ using cached data
 */
export function searchFaq_cached(query) {
  const results = [];

  if (!faqCache) {
    return results;
  }

  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(' ');

  for (const faq of faqCache) {
    if (faq.combined.includes(queryLower) || queryWords.some(w => faq.combined.includes(w))) {
      const matchCount = queryWords.filter(w => faq.combined.includes(w)).length;
      results.push({
        title: faq.question,
        type: 'FAQ',
        score: matchCount / queryWords.length,
        snippet: faq.answer.substring(0, 300) + (faq.answer.length > 300 ? '...' : '')
      });
    }
  }

  return results;
}

/**
 * Calculate relevance score for a document
 */
function calculateScore(searchTerms, doc, audience) {
  let score = 0;
  const content = filterContentByAudience(doc.contentLower, audience);

  for (const term of searchTerms) {
    const t = term.toLowerCase();

    // Name matches (highest weight)
    if (doc.nameLower === t) score += 1.0;
    else if (doc.nameLower.includes(t)) score += 0.5;

    // Description matches
    if (doc.descriptionLower && doc.descriptionLower.includes(t)) score += 0.3;

    // Tag/keyword matches
    if (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(t))) score += 0.4;
    if (doc.keywords && doc.keywords.some(kw => kw.toLowerCase().includes(t))) score += 0.4;

    // Content matches (use pre-computed lowercase)
    const contentMatches = (content.match(new RegExp(escapeRegex(t), 'gi')) || []).length;
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
    design: '## design documentation',
    engineer: '## engineer documentation',
    vibe: '## vibe documentation'
  };

  const marker = sectionMap[audience];
  if (!marker) return content;

  const contentLower = content.toLowerCase();
  const startIndex = contentLower.indexOf(marker);
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

  if (bestParagraph.length > 300) {
    bestParagraph = bestParagraph.substring(0, 300) + '...';
  }

  return bestParagraph || 'No preview available';
}

/**
 * Normalize component name to kebab-case
 */
function normalizeComponentName(name) {
  return name
    .toLowerCase()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

/**
 * Escape special regex characters
 */
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Get all indexed components (for listing)
 */
export function getAllComponents() {
  if (!searchIndex) return [];

  const seenFiles = new Set();
  const components = [];

  for (const doc of searchIndex.values()) {
    if (!seenFiles.has(doc.file)) {
      seenFiles.add(doc.file);
      components.push({
        name: doc.name,
        category: doc.category,
        status: doc.status,
        file: doc.file
      });
    }
  }

  return components;
}

/**
 * Check if cache needs rebuild
 */
export function needsRebuild() {
  return !searchIndex || (Date.now() - lastIndexBuild > CONFIG.indexRebuildInterval);
}

/**
 * Force rebuild the index
 */
export async function rebuildIndex() {
  await buildSearchIndex();
  await cacheFileList();
  await cacheFaq();
}

/**
 * Clear all caches
 */
export function clearCache() {
  searchIndex = null;
  componentCache.clear();
  fileListCache = null;
  faqCache = null;
  lastIndexBuild = 0;
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return {
    indexSize: searchIndex ? searchIndex.size : 0,
    componentCacheSize: componentCache.size,
    faqCacheSize: faqCache ? faqCache.length : 0,
    lastIndexBuild: lastIndexBuild ? new Date(lastIndexBuild).toISOString() : null,
    needsRebuild: needsRebuild()
  };
}
