#!/usr/bin/env node

/**
 * Extract Component Styles
 *
 * Extracts detailed styling information for each component variant state,
 * including fills, strokes, typography, and spacing.
 *
 * Usage:
 *   FIGMA_TOKEN=xxx node scripts/extract-component-styles.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '../docs/figma-extract');

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
 * Extract color from fills array
 */
function extractFillColor(fills) {
  if (!fills || fills.length === 0) return null;
  const solidFill = fills.find(f => f.type === 'SOLID' && f.visible !== false);
  if (!solidFill || !solidFill.color) return null;
  return {
    hex: rgbToHex(solidFill.color.r, solidFill.color.g, solidFill.color.b),
    opacity: solidFill.opacity ?? solidFill.color.a ?? 1
  };
}

/**
 * Extract color from strokes array
 */
function extractStrokeColor(strokes) {
  if (!strokes || strokes.length === 0) return null;
  const solidStroke = strokes.find(s => s.type === 'SOLID' && s.visible !== false);
  if (!solidStroke || !solidStroke.color) return null;
  return {
    hex: rgbToHex(solidStroke.color.r, solidStroke.color.g, solidStroke.color.b),
    opacity: solidStroke.opacity ?? solidStroke.color.a ?? 1
  };
}

/**
 * Parse variant name into properties
 * e.g., "State=Default, Size=Medium" -> { State: "Default", Size: "Medium" }
 */
function parseVariantName(name) {
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
 * Find the main container/frame in a component that has the border
 */
function findBorderElement(node) {
  // Check if this node has strokes
  if (node.strokes && node.strokes.length > 0) {
    const strokeColor = extractStrokeColor(node.strokes);
    if (strokeColor) return { node, strokeColor, strokeWeight: node.strokeWeight };
  }

  // Check children recursively
  if (node.children) {
    for (const child of node.children) {
      // Look for common container names
      const name = child.name.toLowerCase();
      if (name.includes('container') || name.includes('frame') || name.includes('input') || name.includes('field') || name.includes('border')) {
        const result = findBorderElement(child);
        if (result) return result;
      }
    }
    // If no named container found, check all children
    for (const child of node.children) {
      if (child.strokes && child.strokes.length > 0) {
        const strokeColor = extractStrokeColor(child.strokes);
        if (strokeColor) return { node: child, strokeColor, strokeWeight: child.strokeWeight };
      }
    }
  }

  return null;
}

/**
 * Extract styling from a component variant
 */
function extractVariantStyles(variant) {
  const styles = {
    name: variant.name,
    properties: parseVariantName(variant.name),
    fills: {},
    strokes: {},
    typography: {},
    spacing: {}
  };

  // Extract background fill
  const bgFill = extractFillColor(variant.fills);
  if (bgFill) {
    styles.fills.background = bgFill;
  }

  // Extract border/stroke
  const borderElement = findBorderElement(variant);
  if (borderElement) {
    styles.strokes.border = borderElement.strokeColor;
    styles.strokes.borderWidth = borderElement.strokeWeight;
  } else if (variant.strokes && variant.strokes.length > 0) {
    styles.strokes.border = extractStrokeColor(variant.strokes);
    styles.strokes.borderWidth = variant.strokeWeight;
  }

  // Extract corner radius
  if (variant.cornerRadius !== undefined) {
    styles.spacing.borderRadius = variant.cornerRadius;
  } else if (variant.rectangleCornerRadii) {
    styles.spacing.borderRadius = variant.rectangleCornerRadii;
  }

  // Extract padding
  if (variant.paddingTop !== undefined) {
    styles.spacing.padding = {
      top: variant.paddingTop,
      right: variant.paddingRight,
      bottom: variant.paddingBottom,
      left: variant.paddingLeft
    };
  }

  // Extract gap
  if (variant.itemSpacing !== undefined) {
    styles.spacing.gap = variant.itemSpacing;
  }

  // Look for text elements to extract typography
  if (variant.children) {
    for (const child of variant.children) {
      if (child.type === 'TEXT') {
        const textFill = extractFillColor(child.fills);
        if (textFill) {
          const textName = child.name.toLowerCase();
          if (textName.includes('label')) {
            styles.fills.labelText = textFill;
          } else if (textName.includes('input') || textName.includes('value')) {
            styles.fills.inputText = textFill;
          } else if (textName.includes('validation') || textName.includes('error') || textName.includes('helper')) {
            styles.fills.validationText = textFill;
          } else {
            styles.fills.text = textFill;
          }
        }
        if (child.style) {
          styles.typography = {
            fontFamily: child.style.fontFamily,
            fontSize: child.style.fontSize,
            fontWeight: child.style.fontWeight,
            lineHeight: child.style.lineHeightPx
          };
        }
      }
      // Recursively check nested children for text
      if (child.children) {
        extractNestedText(child.children, styles);
      }
    }
  }

  return styles;
}

/**
 * Extract text styles from nested children
 */
function extractNestedText(children, styles) {
  for (const child of children) {
    if (child.type === 'TEXT') {
      const textFill = extractFillColor(child.fills);
      if (textFill) {
        const textName = child.name.toLowerCase();
        if (textName.includes('label') && !styles.fills.labelText) {
          styles.fills.labelText = textFill;
        } else if ((textName.includes('input') || textName.includes('value') || textName.includes('text')) && !styles.fills.inputText) {
          styles.fills.inputText = textFill;
        } else if ((textName.includes('validation') || textName.includes('error') || textName.includes('helper')) && !styles.fills.validationText) {
          styles.fills.validationText = textFill;
        }
      }
    }
    if (child.children) {
      extractNestedText(child.children, styles);
    }
  }
}

/**
 * Process a component set and extract all variant styles
 */
function processComponentSet(componentSet) {
  const result = {
    name: componentSet.name.replace(/^🟢\s*|^🟡\s*|^🔴\s*|^🔷\s*/g, '').trim(),
    id: componentSet.id,
    variants: []
  };

  if (!componentSet.children) return result;

  for (const variant of componentSet.children) {
    if (variant.type === 'COMPONENT') {
      const variantStyles = extractVariantStyles(variant);
      result.variants.push(variantStyles);
    }
  }

  return result;
}

/**
 * Find all component sets in the document
 */
function findComponentSets(node, results = []) {
  if (node.type === 'COMPONENT_SET') {
    results.push(node);
  }
  if (node.children) {
    for (const child of node.children) {
      findComponentSets(child, results);
    }
  }
  return results;
}

/**
 * Generate markdown documentation for a component
 */
function generateMarkdown(component) {
  let md = `# ${component.name}\n\n`;
  md += `*Component ID: ${component.id}*\n\n`;

  // Group variants by state
  const stateVariants = {};
  for (const variant of component.variants) {
    const state = variant.properties.State || variant.properties.state || 'Default';
    if (!stateVariants[state]) {
      stateVariants[state] = [];
    }
    stateVariants[state].push(variant);
  }

  // Document each state
  md += `## States\n\n`;
  md += `| State | Border | Background | Text |\n`;
  md += `|-------|--------|------------|------|\n`;

  for (const [state, variants] of Object.entries(stateVariants)) {
    const variant = variants[0]; // Take first variant for this state
    const border = variant.strokes.border?.hex || '-';
    const bg = variant.fills.background?.hex || '-';
    const text = variant.fills.inputText?.hex || variant.fills.text?.hex || '-';
    md += `| **${state}** | ${border} | ${bg} | ${text} |\n`;
  }

  md += `\n## Detailed Styles\n\n`;

  for (const [state, variants] of Object.entries(stateVariants)) {
    md += `### ${state}\n\n`;
    const variant = variants[0];

    if (Object.keys(variant.fills).length > 0) {
      md += `**Fills:**\n`;
      for (const [key, value] of Object.entries(variant.fills)) {
        if (value && value.hex) {
          md += `- ${key}: \`${value.hex}\`\n`;
        }
      }
      md += `\n`;
    }

    if (variant.strokes.border) {
      md += `**Strokes:**\n`;
      md += `- Border: \`${variant.strokes.border.hex}\``;
      if (variant.strokes.borderWidth) {
        md += ` (${variant.strokes.borderWidth}px)`;
      }
      md += `\n\n`;
    }

    if (Object.keys(variant.spacing).length > 0) {
      md += `**Spacing:**\n`;
      if (variant.spacing.borderRadius !== undefined) {
        md += `- Border Radius: ${typeof variant.spacing.borderRadius === 'object' ? JSON.stringify(variant.spacing.borderRadius) : variant.spacing.borderRadius}px\n`;
      }
      if (variant.spacing.padding) {
        md += `- Padding: ${variant.spacing.padding.top}px ${variant.spacing.padding.right}px ${variant.spacing.padding.bottom}px ${variant.spacing.padding.left}px\n`;
      }
      if (variant.spacing.gap !== undefined) {
        md += `- Gap: ${variant.spacing.gap}px\n`;
      }
      md += `\n`;
    }
  }

  return md;
}

/**
 * Fetch file from Figma API
 */
async function fetchFile(token) {
  const url = `${API_BASE}/files/${FILE_KEY}?geometry=paths`;
  console.log('Fetching Figma file...');

  const response = await fetch(url, {
    headers: { 'X-Figma-Token': token }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.status}`);
  }

  return response.json();
}

/**
 * Main function
 */
async function main() {
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    console.error('Error: FIGMA_TOKEN environment variable required');
    console.log('Usage: FIGMA_TOKEN=xxx node scripts/extract-component-styles.js');
    process.exit(1);
  }

  try {
    const file = await fetchFile(token);
    console.log(`Loaded file: ${file.name}`);

    // Find all component sets
    const componentSets = findComponentSets(file.document);
    console.log(`Found ${componentSets.length} component sets`);

    // Process each component set
    const components = [];
    for (const cs of componentSets) {
      const component = processComponentSet(cs);
      if (component.variants.length > 0) {
        components.push(component);
        console.log(`  - ${component.name}: ${component.variants.length} variants`);
      }
    }

    // Ensure output directory exists
    const stylesDir = path.join(OUTPUT_DIR, 'styles');
    if (!fs.existsSync(stylesDir)) {
      fs.mkdirSync(stylesDir, { recursive: true });
    }

    // Save each component
    for (const component of components) {
      const safeName = component.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

      // Save JSON
      const jsonPath = path.join(stylesDir, `${safeName}.json`);
      fs.writeFileSync(jsonPath, JSON.stringify(component, null, 2));

      // Save Markdown
      const mdPath = path.join(stylesDir, `${safeName}.md`);
      fs.writeFileSync(mdPath, generateMarkdown(component));
    }

    // Generate index
    let indexMd = `# Component Styles\n\n`;
    indexMd += `*Extracted from Figma with per-state styling*\n\n`;
    indexMd += `| Component | Variants | File |\n`;
    indexMd += `|-----------|----------|------|\n`;

    for (const component of components) {
      const safeName = component.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      indexMd += `| ${component.name} | ${component.variants.length} | [${safeName}.md](./styles/${safeName}.md) |\n`;
    }

    fs.writeFileSync(path.join(OUTPUT_DIR, 'component-styles-index.md'), indexMd);

    console.log(`\nExtracted ${components.length} components to ${stylesDir}`);
    console.log('Done!');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
