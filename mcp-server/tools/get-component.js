/**
 * Get Component Documentation Tool
 *
 * Retrieves unified documentation for a GDS component.
 * Can return full doc or filter by audience section.
 *
 * OPTIMIZED: Uses cache module for fast lookups instead of file I/O on every call.
 */

import { getComponent, getAllComponents } from '../cache.js';

/**
 * Get component documentation
 * @param {string} componentName - Component name (e.g., "button")
 * @param {string} audience - "all", "design", "engineer", or "vibe"
 * @returns {object} MCP tool response
 */
export async function getComponentDocs(componentName, audience = 'all') {
  // Use cache for fast lookup
  const doc = await getComponent(componentName);

  if (!doc) {
    // Provide helpful suggestions from cache
    const available = getAllComponents()
      .slice(0, 10)
      .map(c => c.name.toLowerCase())
      .join(', ');

    return {
      content: [{
        type: 'text',
        text: `Component "${componentName}" not found. Try: ${available || 'button, input-field, modal, checkbox, toast, badge, accordion, stepper, card, alert'}`
      }],
      isError: true
    };
  }

  try {
    // If specific audience requested, extract that section
    if (audience !== 'all') {
      const section = extractSection(doc.raw, audience);
      return {
        content: [{
          type: 'text',
          text: section || `No ${audience} documentation found for ${componentName}`
        }]
      };
    }

    // Return full unified doc (from cache)
    return {
      content: [{
        type: 'text',
        text: doc.raw
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error reading component docs: ${error.message}`
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
