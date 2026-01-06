/**
 * Get Component Documentation Tool
 *
 * Retrieves unified documentation for a GDS component.
 * Can return full doc or filter by audience section.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UNIFIED_DIR = path.join(__dirname, '../../docs-unified/components');

/**
 * Get component documentation
 * @param {string} componentName - Component name (e.g., "button")
 * @param {string} audience - "all", "design", "engineer", or "vibe"
 * @returns {object} MCP tool response
 */
export async function getComponentDocs(componentName, audience = 'all') {
  const normalizedName = normalizeComponentName(componentName);

  // Try to find the component file
  const filePath = await findComponentFile(normalizedName);

  if (!filePath) {
    return {
      content: [{
        type: 'text',
        text: `Component "${componentName}" not found. Try: button, input-field, modal, checkbox, toast, badge, accordion, stepper, card, alert`
      }],
      isError: true
    };
  }

  try {
    const content = await fs.readFile(filePath, 'utf-8');

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
        text: `Error reading component docs: ${error.message}`
      }],
      isError: true
    };
  }
}

/**
 * Find component file with fuzzy matching
 */
async function findComponentFile(normalizedName) {
  const possibleNames = [
    normalizedName,
    normalizedName.replace(/-/g, ''),
    normalizedName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  ];

  try {
    const files = await fs.readdir(UNIFIED_DIR);

    for (const name of possibleNames) {
      const match = files.find(f =>
        f.replace('.md', '').toLowerCase() === name.toLowerCase()
      );
      if (match) {
        return path.join(UNIFIED_DIR, match);
      }
    }

    // Partial match fallback
    for (const name of possibleNames) {
      const match = files.find(f =>
        f.toLowerCase().includes(name.toLowerCase())
      );
      if (match) {
        return path.join(UNIFIED_DIR, match);
      }
    }
  } catch {
    // Directory doesn't exist
  }

  return null;
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
