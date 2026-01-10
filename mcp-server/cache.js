/**
 * MCP Performance Cache
 *
 * Provides in-memory caching for file content and parsed data
 * to avoid repeated disk I/O and parsing operations.
 *
 * Features:
 * - TTL-based expiration
 * - Automatic cleanup of expired entries
 * - Memory-bounded with max entries
 * - Pre-compiled regex cache
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

// =============================================================================
// Configuration
// =============================================================================

const CACHE_CONFIG = {
  // File content cache TTL (5 minutes)
  fileTtlMs: 5 * 60 * 1000,

  // Parsed frontmatter cache TTL (10 minutes - parsing is expensive)
  parsedTtlMs: 10 * 60 * 1000,

  // Maximum cache entries to prevent memory bloat
  maxEntries: 100,

  // Cleanup interval (1 minute)
  cleanupIntervalMs: 60 * 1000,
};

// =============================================================================
// Cache Storage
// =============================================================================

// File content cache: path -> { content, timestamp }
const fileCache = new Map();

// Parsed content cache: path -> { data, content, timestamp }
const parsedCache = new Map();

// Directory listing cache: dir -> { files, timestamp }
const dirCache = new Map();

// Pre-compiled regex cache: pattern -> RegExp
const regexCache = new Map();

// Component index for fast lookup
let componentIndex = null;
let componentIndexTimestamp = 0;

// =============================================================================
// Cache Cleanup
// =============================================================================

/**
 * Remove expired entries from all caches
 */
function cleanupExpiredEntries() {
  const now = Date.now();

  // Cleanup file cache
  for (const [key, value] of fileCache.entries()) {
    if (now - value.timestamp > CACHE_CONFIG.fileTtlMs) {
      fileCache.delete(key);
    }
  }

  // Cleanup parsed cache
  for (const [key, value] of parsedCache.entries()) {
    if (now - value.timestamp > CACHE_CONFIG.parsedTtlMs) {
      parsedCache.delete(key);
    }
  }

  // Cleanup directory cache
  for (const [key, value] of dirCache.entries()) {
    if (now - value.timestamp > CACHE_CONFIG.fileTtlMs) {
      dirCache.delete(key);
    }
  }

  // Enforce max entries (LRU-style eviction)
  if (fileCache.size > CACHE_CONFIG.maxEntries) {
    const entries = [...fileCache.entries()].sort((a, b) => a[1].timestamp - b[1].timestamp);
    const toRemove = entries.slice(0, entries.length - CACHE_CONFIG.maxEntries);
    toRemove.forEach(([key]) => fileCache.delete(key));
  }
}

// Start cleanup interval
setInterval(cleanupExpiredEntries, CACHE_CONFIG.cleanupIntervalMs).unref();

// =============================================================================
// File Caching
// =============================================================================

/**
 * Read file with caching
 * @param {string} filePath - Absolute file path
 * @param {number} maxLength - Optional max content length
 * @returns {Promise<string>}
 */
export async function cachedReadFile(filePath, maxLength = Infinity) {
  const cached = fileCache.get(filePath);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_CONFIG.fileTtlMs) {
    // Return cached content (truncated if needed)
    return maxLength < Infinity ? cached.content.substring(0, maxLength) : cached.content;
  }

  // Read from disk
  const content = await fs.readFile(filePath, 'utf-8');

  // Cache the full content
  fileCache.set(filePath, { content, timestamp: now });

  return maxLength < Infinity ? content.substring(0, maxLength) : content;
}

/**
 * Read and parse markdown file with caching
 * @param {string} filePath - Absolute file path
 * @returns {Promise<{data: object, content: string}>}
 */
export async function cachedParsedFile(filePath) {
  const cached = parsedCache.get(filePath);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_CONFIG.parsedTtlMs) {
    return { data: cached.data, content: cached.content };
  }

  // Read file (use file cache if available)
  const rawContent = await cachedReadFile(filePath);

  // Parse frontmatter
  const parsed = matter(rawContent);

  // Cache parsed result
  parsedCache.set(filePath, {
    data: parsed.data,
    content: parsed.content,
    timestamp: now,
  });

  return { data: parsed.data, content: parsed.content };
}

/**
 * Read directory with caching
 * @param {string} dirPath - Directory path
 * @returns {Promise<string[]>}
 */
export async function cachedReadDir(dirPath) {
  const cached = dirCache.get(dirPath);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_CONFIG.fileTtlMs) {
    return cached.files;
  }

  const files = await fs.readdir(dirPath);
  dirCache.set(dirPath, { files, timestamp: now });

  return files;
}

// =============================================================================
// Regex Caching
// =============================================================================

/**
 * Get a cached compiled regex
 * @param {string} pattern - Pattern string
 * @param {string} flags - Regex flags
 * @returns {RegExp}
 */
export function getCachedRegex(pattern, flags = 'gi') {
  const key = `${pattern}::${flags}`;

  if (!regexCache.has(key)) {
    regexCache.set(key, new RegExp(pattern, flags));
  }

  return regexCache.get(key);
}

/**
 * Escape special regex characters in a string
 * @param {string} str - String to escape
 * @returns {string}
 */
export function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// =============================================================================
// Component Index
// =============================================================================

/**
 * Build or retrieve component index for fast lookups
 * @param {string} unifiedDir - Path to unified components directory
 * @returns {Promise<Map<string, {file: string, path: string}>>}
 */
export async function getComponentIndex(unifiedDir) {
  const now = Date.now();

  // Return cached index if fresh
  if (componentIndex && now - componentIndexTimestamp < CACHE_CONFIG.parsedTtlMs) {
    return componentIndex;
  }

  // Build new index
  const files = await cachedReadDir(unifiedDir);
  componentIndex = new Map();

  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const name = file.replace('.md', '').toLowerCase();
    const nameNoHyphens = name.replace(/-/g, '');

    // Index by multiple variations for fuzzy matching
    componentIndex.set(name, { file, path: path.join(unifiedDir, file) });
    componentIndex.set(nameNoHyphens, { file, path: path.join(unifiedDir, file) });
  }

  componentIndexTimestamp = now;
  return componentIndex;
}

/**
 * Find component by name using index
 * @param {string} normalizedName - Normalized component name
 * @param {string} unifiedDir - Path to unified components directory
 * @returns {Promise<string|null>} - File path or null
 */
export async function findComponentByIndex(normalizedName, unifiedDir) {
  const index = await getComponentIndex(unifiedDir);

  // Try exact match first
  const exact = index.get(normalizedName.toLowerCase());
  if (exact) return exact.path;

  // Try without hyphens
  const noHyphens = index.get(normalizedName.replace(/-/g, '').toLowerCase());
  if (noHyphens) return noHyphens.path;

  // Partial match fallback
  for (const [key, value] of index.entries()) {
    if (key.includes(normalizedName.toLowerCase())) {
      return value.path;
    }
  }

  return null;
}

// =============================================================================
// Cache Statistics (for debugging)
// =============================================================================

/**
 * Get cache statistics
 * @returns {object}
 */
export function getCacheStats() {
  return {
    fileCache: fileCache.size,
    parsedCache: parsedCache.size,
    dirCache: dirCache.size,
    regexCache: regexCache.size,
    componentIndexSize: componentIndex ? componentIndex.size : 0,
  };
}

/**
 * Clear all caches (useful for testing or forced refresh)
 */
export function clearAllCaches() {
  fileCache.clear();
  parsedCache.clear();
  dirCache.clear();
  regexCache.clear();
  componentIndex = null;
  componentIndexTimestamp = 0;
}

// =============================================================================
// Exports
// =============================================================================

export const CacheConfig = CACHE_CONFIG;
