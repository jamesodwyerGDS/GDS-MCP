/**
 * Get Component Documentation Tool
 *
 * Retrieves documentation for a GDS component from Figma-extracted docs.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIGMA_DIR = path.join(__dirname, '../../docs/figma-extract');

/**
 * Get component documentation
 * @param {string} componentName - Component name (e.g., "button")
 * @param {string} audience - "all", "design", "engineer", or "vibe" (ignored for Figma docs)
 * @returns {object} MCP tool response
 */
export async function getComponentDocs(componentName, audience = 'all') {
  const normalizedName = normalizeComponentName(componentName);

  // Try to find the component file
  const result = await findComponentFile(normalizedName);

  if (!result) {
    const availableComponents = await listAvailableComponents();
    return {
      content: [{
        type: 'text',
        text: `Component "${componentName}" not found.\n\nAvailable components:\n${availableComponents}`
      }],
      isError: true
    };
  }

  try {
    const mdContent = await fs.readFile(result.mdPath, 'utf-8');

    // Also try to load JSON for richer data
    let jsonData = null;
    if (result.jsonPath) {
      try {
        const jsonContent = await fs.readFile(result.jsonPath, 'utf-8');
        jsonData = JSON.parse(jsonContent);
      } catch {
        // JSON not available, that's fine
      }
    }

    // Format output
    let output = mdContent;

    // Add quick reference from JSON if available
    if (jsonData && jsonData.documentation) {
      const componentSets = jsonData.documentation.filter(d => d.type === 'COMPONENT_SET');
      if (componentSets.length > 0) {
        output += '\n\n## Component Properties\n\n';
        for (const comp of componentSets) {
          if (comp.componentPropertyDefinitions) {
            output += `### ${comp.name}\n\n`;
            for (const [key, def] of Object.entries(comp.componentPropertyDefinitions)) {
              const propName = key.split('#')[0];
              output += `- **${propName}**: ${def.type}`;
              if (def.defaultValue !== undefined) {
                output += ` (default: ${def.defaultValue})`;
              }
              if (def.variantOptions) {
                output += ` [${def.variantOptions.join(', ')}]`;
              }
              output += '\n';
            }
          }
        }
      }
    }

    return {
      content: [{
        type: 'text',
        text: output
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
  try {
    const files = await fs.readdir(FIGMA_DIR);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    // Clean up search term
    const searchTerms = [
      normalizedName,
      normalizedName.replace(/-/g, ' '),
      normalizedName.replace(/-/g, ''),
    ];

    // Try exact match first (component name in filename)
    for (const term of searchTerms) {
      const match = mdFiles.find(f => {
        const cleanName = f.replace('.md', '')
          .replace(/^---+/, '')
          .replace(/-+$/, '')
          .toLowerCase();
        return cleanName.includes(term.toLowerCase());
      });

      if (match) {
        const baseName = match.replace('.md', '');
        return {
          mdPath: path.join(FIGMA_DIR, match),
          jsonPath: path.join(FIGMA_DIR, `${baseName}.json`)
        };
      }
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * List available components for help message
 */
async function listAvailableComponents() {
  try {
    const files = await fs.readdir(FIGMA_DIR);
    const components = files
      .filter(f => f.endsWith('.md') && f.includes('---'))
      .map(f => {
        const name = f.replace('.md', '')
          .replace(/^---+/, '')
          .replace(/-+$/, '')
          .replace(/-/g, ' ')
          .trim();
        return name;
      })
      .filter(n => n.length > 0 && !n.startsWith('_'))
      .slice(0, 20);

    return components.map(c => `- ${c}`).join('\n');
  } catch {
    return 'Unable to list components';
  }
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
