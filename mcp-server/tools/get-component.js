/**
 * Get Component Documentation Tool
 *
 * Retrieves documentation for a GDS component from Figma-extracted docs.
 * Supports per-state styling queries for detailed component specs.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIGMA_DIR = path.join(__dirname, '../../docs/figma-extract');
const COMPONENTS_DIR = path.join(FIGMA_DIR, 'components');

/**
 * Get component documentation
 * @param {string} componentName - Component name (e.g., "button", "input field")
 * @param {string} state - Optional state filter (e.g., "default", "hover", "error")
 * @returns {object} MCP tool response
 */
export async function getComponentDocs(componentName, state = null) {
  const normalizedName = normalizeComponentName(componentName);

  // Try to find the component file (prioritize new detailed extracts)
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
    // If we have detailed JSON, use that for rich styling info
    if (result.jsonPath && result.isDetailedExtract) {
      const jsonContent = await fs.readFile(result.jsonPath, 'utf-8');
      const componentData = JSON.parse(jsonContent);

      // Format response based on state filter
      const output = formatDetailedComponent(componentData, state);
      return {
        content: [{
          type: 'text',
          text: output
        }]
      };
    }

    // Fall back to markdown
    const mdContent = await fs.readFile(result.mdPath, 'utf-8');
    return {
      content: [{
        type: 'text',
        text: mdContent
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
 * Format detailed component data as readable output
 */
function formatDetailedComponent(component, stateFilter = null) {
  let output = `# ${component.name}\n\n`;
  output += `**Component ID:** \`${component.id}\`\n`;
  if (component.description) {
    output += `**Description:** ${component.description}\n`;
  }
  output += `\n`;

  // Filter variants by state if specified
  let variants = component.variants || [];
  if (stateFilter) {
    const normalizedFilter = stateFilter.toLowerCase();
    variants = variants.filter(v =>
      v.state.toLowerCase() === normalizedFilter ||
      v.state.toLowerCase().includes(normalizedFilter)
    );

    if (variants.length === 0) {
      output += `No variants found matching state "${stateFilter}".\n\n`;
      output += `Available states: ${component.variants.map(v => v.state).join(', ')}\n`;
      return output;
    }
  }

  // States overview table
  output += `## States\n\n`;
  output += `| State | Border | Background |\n`;
  output += `|-------|--------|------------|\n`;

  for (const v of variants) {
    const borderColor = v.border?.color?.hex || '-';
    const borderToken = v.border?.color?.token ? ` (${v.border?.color?.token})` : '';
    const bgColor = v.background?.hex || '-';
    const bgToken = v.background?.token ? ` (${v.background?.token})` : '';
    output += `| **${v.state}** | \`${borderColor}\`${borderToken} | \`${bgColor}\`${bgToken} |\n`;
  }
  output += `\n`;

  // Detailed styles per state
  for (const v of variants) {
    output += `### ${v.state}\n\n`;

    // Border
    if (v.border) {
      output += `**Border:**\n`;
      output += `- Color: \`${v.border.color.hex}\``;
      if (v.border.color.token) output += ` → **${v.border.color.token}**`;
      output += `\n`;
      output += `- Weight: ${v.border.weight}px\n`;
      if (v.border.align) output += `- Align: ${v.border.align}\n`;
      output += `\n`;
    }

    // Background
    if (v.background) {
      output += `**Background:**\n`;
      output += `- Color: \`${v.background.hex}\``;
      if (v.background.token) output += ` → **${v.background.token}**`;
      output += `\n\n`;
    }

    // Text styles
    if (v.text) {
      const hasText = v.text.label || v.text.input || v.text.placeholder || v.text.validation;
      if (hasText) {
        output += `**Text:**\n`;
        if (v.text.label?.color) {
          output += `- Label: \`${v.text.label.color.hex}\``;
          if (v.text.label.color.token) output += ` → ${v.text.label.color.token}`;
          if (v.text.label.typography) {
            output += ` (${v.text.label.typography.fontFamily} ${v.text.label.typography.fontWeight} ${v.text.label.typography.fontSize}px)`;
          }
          output += `\n`;
        }
        if (v.text.input?.color) {
          output += `- Input: \`${v.text.input.color.hex}\``;
          if (v.text.input.color.token) output += ` → ${v.text.input.color.token}`;
          if (v.text.input.typography) {
            output += ` (${v.text.input.typography.fontFamily} ${v.text.input.typography.fontWeight} ${v.text.input.typography.fontSize}px)`;
          }
          output += `\n`;
        }
        if (v.text.placeholder?.color) {
          output += `- Placeholder: \`${v.text.placeholder.color.hex}\``;
          if (v.text.placeholder.color.token) output += ` → ${v.text.placeholder.color.token}`;
          output += `\n`;
        }
        if (v.text.validation?.color) {
          output += `- Validation: \`${v.text.validation.color.hex}\``;
          if (v.text.validation.color.token) output += ` → ${v.text.validation.color.token}`;
          output += `\n`;
        }
        output += `\n`;
      }
    }

    // Layout
    if (v.layout) {
      const hasLayout = v.layout.cornerRadius || v.layout.padding || v.layout.gap;
      if (hasLayout) {
        output += `**Layout:**\n`;
        if (v.layout.cornerRadius) output += `- Border Radius: ${v.layout.cornerRadius}px\n`;
        if (v.layout.padding) {
          output += `- Padding: ${v.layout.padding.top}px ${v.layout.padding.right}px ${v.layout.padding.bottom}px ${v.layout.padding.left}px\n`;
        }
        if (v.layout.gap) output += `- Gap: ${v.layout.gap}px\n`;
        if (v.layout.width) output += `- Width: ${v.layout.width}px\n`;
        if (v.layout.height) output += `- Height: ${v.layout.height}px\n`;
        output += `\n`;
      }
    }

    // Effects
    if (v.effects && v.effects.length > 0) {
      output += `**Effects:**\n`;
      for (const effect of v.effects) {
        if (effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW') {
          output += `- ${effect.type}: \`${effect.color?.hex || 'unknown'}\` offset(${effect.offset?.x}, ${effect.offset?.y}) blur(${effect.radius}px)\n`;
        }
      }
      output += `\n`;
    }

    // Icons
    if (v.icons && v.icons.length > 0) {
      output += `**Icons:**\n`;
      for (const icon of v.icons) {
        const color = icon.fill?.hex || icon.stroke?.hex || '-';
        const token = icon.fill?.token || icon.stroke?.token || '';
        output += `- ${icon.elementName}: \`${color}\`${token ? ` (${token})` : ''}\n`;
      }
      output += `\n`;
    }

    output += `---\n\n`;
  }

  return output;
}

/**
 * Find component file with priority for detailed extracts
 */
async function findComponentFile(normalizedName) {
  // First, check the components directory (detailed extracts)
  try {
    const componentFiles = await fs.readdir(COMPONENTS_DIR);
    const jsonFiles = componentFiles.filter(f => f.endsWith('.json'));

    for (const jsonFile of jsonFiles) {
      const baseName = jsonFile.replace('.json', '');
      if (baseName.includes(normalizedName) || normalizedName.includes(baseName)) {
        return {
          jsonPath: path.join(COMPONENTS_DIR, jsonFile),
          mdPath: path.join(COMPONENTS_DIR, `${baseName}.md`),
          isDetailedExtract: true
        };
      }
    }
  } catch {
    // Components directory may not exist
  }

  // Fall back to main figma-extract directory
  try {
    const files = await fs.readdir(FIGMA_DIR);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    const searchTerms = [
      normalizedName,
      normalizedName.replace(/-/g, ' '),
      normalizedName.replace(/-/g, ''),
    ];

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
          jsonPath: path.join(FIGMA_DIR, `${baseName}.json`),
          isDetailedExtract: false
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
  const components = new Set();

  // List from components directory first
  try {
    const componentFiles = await fs.readdir(COMPONENTS_DIR);
    componentFiles
      .filter(f => f.endsWith('.json'))
      .forEach(f => {
        const name = f.replace('.json', '').replace(/-/g, ' ');
        components.add(name);
      });
  } catch {
    // Components directory may not exist
  }

  // Also list from main directory
  try {
    const files = await fs.readdir(FIGMA_DIR);
    files
      .filter(f => f.endsWith('.md') && f.includes('---'))
      .forEach(f => {
        const name = f.replace('.md', '')
          .replace(/^---+/, '')
          .replace(/-+$/, '')
          .replace(/-/g, ' ')
          .trim();
        if (name.length > 0 && !name.startsWith('_')) {
          components.add(name);
        }
      });
  } catch {
    // Directory may not exist
  }

  const sorted = Array.from(components).sort().slice(0, 30);
  return sorted.map(c => `- ${c}`).join('\n');
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
 * Get styling for a specific state
 * Convenience function for quick queries
 */
export async function getComponentState(componentName, state) {
  return getComponentDocs(componentName, state);
}
