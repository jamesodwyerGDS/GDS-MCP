/**
 * Get Component Documentation Tool
 *
 * Retrieves unified documentation for a GDS component.
 * Can return full doc or filter by audience section.
 *
 * Security:
 * - Path traversal prevention via base directory validation
 * - Input already sanitized by security.js before reaching this module
 *
 * Performance:
 * - Uses component index for O(1) lookups
 * - Caches file content to avoid repeated disk reads
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { findComponentByIndex, cachedReadFile } from '../cache.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UNIFIED_DIR = path.resolve(__dirname, '../../docs-unified/components');

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

/**
 * Get component documentation
 * @param {string} componentName - Component name (e.g., "button")
 * @param {string} audience - "all", "design", "engineer", or "vibe"
 * @returns {object} MCP tool response
 */
export async function getComponentDocs(componentName, audience = 'all') {
  const normalizedName = normalizeComponentName(componentName);

  // Additional safety: ensure name doesn't contain path separators
  if (normalizedName.includes('/') || normalizedName.includes('\\') || normalizedName.includes('..')) {
    return {
      content: [{ type: 'text', text: 'Invalid component name' }],
      isError: true
    };
  }

  // Use cached component index for fast lookup
  const filePath = await findComponentByIndex(normalizedName, UNIFIED_DIR);

  if (!filePath) {
    return {
      content: [{
        type: 'text',
        text: `Component "${componentName}" not found. Try: button, input-field, modal, checkbox, toast, badge, accordion, stepper, card, alert`
      }],
      isError: true
    };
  }

  // Validate path is within allowed directory
  if (!isPathWithinBase(filePath, UNIFIED_DIR)) {
    return {
      content: [{ type: 'text', text: 'Access denied' }],
      isError: true
    };
  }

  try {
    // Use cached file read
    const content = await cachedReadFile(filePath);

    // If specific audience requested, extract that section
    if (audience !== 'all') {
      const section = extractSection(content, audience);
      return {
        content: [{
          type: 'text',
          text: section || `No ${audience} documentation found for ${componentName}`
        }]
      };
    }

    // Return full unified doc
    return {
      content: [{
        type: 'text',
        text: content
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error reading component documentation`
      }],
      isError: true
    };
  }
}

/**
 * Extract a specific audience section from unified doc
 */
function extractSection(content, audience) {
  const sectionMap = {
    design: '## Design Documentation',
    engineer: '## Engineer Documentation',
    vibe: '## Vibe Documentation'
  };

  const startMarker = sectionMap[audience];
  if (!startMarker) return null;

  const startIndex = content.indexOf(startMarker);
  if (startIndex === -1) return null;

  // Find the next major section (---) or end of file
  const afterStart = content.substring(startIndex);
  const nextSectionMatch = afterStart.match(/\n---\n\n## (?!Comparison)/);

  if (nextSectionMatch) {
    return afterStart.substring(0, nextSectionMatch.index);
  }

  // If no next section, return to end (but before Comparison section)
  const comparisonIndex = afterStart.indexOf('## Comparison:');
  if (comparisonIndex > 0) {
    return afterStart.substring(0, comparisonIndex);
  }

  return afterStart;
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
