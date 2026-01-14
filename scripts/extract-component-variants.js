#!/usr/bin/env node

/**
 * Extract Component Variants
 *
 * Fetches a specific Figma component and extracts styling from each variant.
 *
 * Usage:
 *   FIGMA_TOKEN=xxx node scripts/extract-component-variants.js --node=355:37218
 *   FIGMA_TOKEN=xxx node scripts/extract-component-variants.js --node=355-37218
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '../docs/figma-extract/components');

const FILE_KEY = 'WU01oSRfSHpOxUn3ThcvC5';
const API_BASE = 'https://api.figma.com/v1';

/**
 * Convert Figma RGB (0-1) to Hex
 */
function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Extract color from fills/strokes array
 */
function extractColor(colorArray) {
  if (!colorArray || colorArray.length === 0) return null;
  const solid = colorArray.find(c => c.type === 'SOLID' && c.visible !== false);
  if (!solid || !solid.color) return null;
  return {
    hex: rgbToHex(solid.color.r, solid.color.g, solid.color.b),
    opacity: solid.opacity ?? solid.color.a ?? 1,
    rgb: {
      r: Math.round(solid.color.r * 255),
      g: Math.round(solid.color.g * 255),
      b: Math.round(solid.color.b * 255)
    }
  };
}

/**
 * Parse variant name into state properties
 * e.g., "State=Default, Size=Medium" -> { State: "Default", Size: "Medium" }
 */
function parseVariantProps(name) {
  const props = {};
  const parts = name.split(',').map(p => p.trim());
  for (const part of parts) {
    const [key, value] = part.split('=').map(s => s.trim());
    if (key && value) {
      props[key] = value;
    }
  }
  return props;
}

/**
 * Recursively find the element with strokes (the actual input border)
 */
function findStyledElements(node, results = { strokes: null, fills: null, text: [] }) {
  // Check this node for strokes
  if (node.strokes && node.strokes.length > 0) {
    const stroke = extractColor(node.strokes);
    if (stroke && !results.strokes) {
      results.strokes = {
        color: stroke,
        weight: node.strokeWeight,
        elementName: node.name
      };
    }
  }

  // Check for fills (background)
  if (node.fills && node.fills.length > 0) {
    const fill = extractColor(node.fills);
    if (fill && !results.fills) {
      results.fills = {
        color: fill,
        elementName: node.name
      };
    }
  }

  // Check for text elements
  if (node.type === 'TEXT') {
    const textFill = extractColor(node.fills);
    results.text.push({
      name: node.name,
      color: textFill,
      content: node.characters
    });
  }

  // Recurse into children
  if (node.children) {
    for (const child of node.children) {
      findStyledElements(child, results);
    }
  }

  return results;
}

/**
 * Extract styling from a single component variant
 */
function extractVariantStyles(variant) {
  const props = parseVariantProps(variant.name);

  // Get direct styling on variant
  const directFill = extractColor(variant.fills);
  const directStroke = extractColor(variant.strokes);

  // Search children for styled elements
  const childStyles = findStyledElements(variant);

  return {
    name: variant.name,
    id: variant.id,
    state: props.State || props.state || 'Unknown',
    properties: props,
    styling: {
      border: directStroke || childStyles.strokes?.color || null,
      borderWeight: variant.strokeWeight || childStyles.strokes?.weight,
      borderElement: childStyles.strokes?.elementName,
      background: directFill || childStyles.fills?.color || null,
      backgroundElement: childStyles.fills?.elementName,
      text: childStyles.text
    },
    dimensions: {
      width: variant.absoluteBoundingBox?.width,
      height: variant.absoluteBoundingBox?.height
    },
    cornerRadius: variant.cornerRadius,
    padding: variant.paddingTop !== undefined ? {
      top: variant.paddingTop,
      right: variant.paddingRight,
      bottom: variant.paddingBottom,
      left: variant.paddingLeft
    } : null
  };
}

/**
 * Fetch node from Figma API
 */
async function fetchNode(token, nodeId) {
  // Normalize node ID (355-37218 -> 355:37218)
  const normalizedId = nodeId.replace('-', ':');

  const url = `${API_BASE}/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(normalizedId)}&geometry=paths`;
  console.log(`Fetching node ${normalizedId}...`);

  const response = await fetch(url, {
    headers: { 'X-Figma-Token': token }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch node: ${response.status} - ${text}`);
  }

  return response.json();
}

/**
 * Generate markdown for component
 */
function generateMarkdown(component) {
  let md = `# ${component.name}\n\n`;
  md += `*Component ID: \`${component.id}\`*\n\n`;
  md += `## States\n\n`;
  md += `| State | Border | Background | Border Weight |\n`;
  md += `|-------|--------|------------|---------------|\n`;

  for (const variant of component.variants) {
    const border = variant.styling.border?.hex || '-';
    const bg = variant.styling.background?.hex || '-';
    const weight = variant.styling.borderWeight ? `${variant.styling.borderWeight}px` : '-';
    md += `| **${variant.state}** | \`${border}\` | \`${bg}\` | ${weight} |\n`;
  }

  md += `\n## Detailed Variant Styles\n\n`;

  for (const variant of component.variants) {
    md += `### ${variant.state}\n\n`;
    md += `- **Variant Name:** ${variant.name}\n`;
    md += `- **ID:** \`${variant.id}\`\n`;

    if (variant.styling.border) {
      md += `- **Border:** \`${variant.styling.border.hex}\``;
      if (variant.styling.borderElement) {
        md += ` (from: ${variant.styling.borderElement})`;
      }
      md += `\n`;
    }

    if (variant.styling.borderWeight) {
      md += `- **Border Weight:** ${variant.styling.borderWeight}px\n`;
    }

    if (variant.styling.background) {
      md += `- **Background:** \`${variant.styling.background.hex}\`\n`;
    }

    if (variant.cornerRadius) {
      md += `- **Corner Radius:** ${variant.cornerRadius}px\n`;
    }

    if (variant.padding) {
      md += `- **Padding:** ${variant.padding.top}px ${variant.padding.right}px ${variant.padding.bottom}px ${variant.padding.left}px\n`;
    }

    if (variant.styling.text.length > 0) {
      md += `- **Text Elements:**\n`;
      for (const text of variant.styling.text) {
        if (text.color) {
          md += `  - ${text.name}: \`${text.color.hex}\`\n`;
        }
      }
    }

    md += `\n`;
  }

  return md;
}

/**
 * Main function
 */
async function main() {
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    console.error('Error: FIGMA_TOKEN environment variable required');
    process.exit(1);
  }

  // Parse node ID from args
  const nodeArg = process.argv.find(arg => arg.startsWith('--node='));
  if (!nodeArg) {
    console.error('Error: --node=<node-id> argument required');
    console.log('Usage: FIGMA_TOKEN=xxx node scripts/extract-component-variants.js --node=355:37218');
    process.exit(1);
  }
  const nodeId = nodeArg.split('=')[1];

  try {
    const data = await fetchNode(token, nodeId);

    // Get the node from response
    const normalizedId = nodeId.replace('-', ':');
    const nodeData = data.nodes[normalizedId];

    if (!nodeData || !nodeData.document) {
      throw new Error(`Node ${nodeId} not found in response`);
    }

    const componentSet = nodeData.document;
    console.log(`Found: ${componentSet.name} (${componentSet.type})`);

    if (componentSet.type !== 'COMPONENT_SET') {
      console.log('Note: This is not a COMPONENT_SET, extracting as single component');
    }

    // Extract component data
    const component = {
      name: componentSet.name.replace(/^🟢\s*|^🟡\s*|^🔴\s*|^🔷\s*/g, '').trim(),
      id: componentSet.id,
      type: componentSet.type,
      variants: []
    };

    // Process variants (children of COMPONENT_SET)
    if (componentSet.children) {
      console.log(`Processing ${componentSet.children.length} variants...`);

      for (const child of componentSet.children) {
        if (child.type === 'COMPONENT') {
          const variantStyles = extractVariantStyles(child);
          component.variants.push(variantStyles);
          console.log(`  - ${variantStyles.state}: border=${variantStyles.styling.border?.hex || 'none'}`);
        }
      }
    }

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Generate filename
    const safeName = component.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // Save JSON
    const jsonPath = path.join(OUTPUT_DIR, `${safeName}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(component, null, 2));
    console.log(`\nSaved: ${jsonPath}`);

    // Save Markdown
    const mdPath = path.join(OUTPUT_DIR, `${safeName}.md`);
    fs.writeFileSync(mdPath, generateMarkdown(component));
    console.log(`Saved: ${mdPath}`);

    // Print summary
    console.log(`\n${'='.repeat(50)}`);
    console.log(`Component: ${component.name}`);
    console.log(`Variants: ${component.variants.length}`);
    console.log(`${'='.repeat(50)}\n`);

    console.log('State Summary:');
    for (const v of component.variants) {
      console.log(`  ${v.state.padEnd(15)} -> Border: ${v.styling.border?.hex || 'none'}`);
    }

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
