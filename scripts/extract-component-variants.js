#!/usr/bin/env node

/**
 * Extract Component Variants - Complete Styles
 *
 * Fetches a Figma component and extracts ALL styling from each variant:
 * - Border: color, weight, style
 * - Fill: background colors
 * - Typography: font, size, weight, line-height, letter-spacing
 * - Spacing: padding, gap, corner radius
 * - Effects: shadows, elevation
 * - Text colors: label, input, placeholder, validation
 * - Dimensions: width, height
 *
 * Usage:
 *   FIGMA_TOKEN=xxx node scripts/extract-component-variants.js --node=355:37218
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
 * Extract effect styles (shadows, blurs)
 */
function extractEffects(effects) {
  if (!effects || effects.length === 0) return null;

  return effects
    .filter(e => e.visible !== false)
    .map(effect => {
      const base = {
        type: effect.type,
        visible: effect.visible ?? true
      };

      if (effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW') {
        return {
          ...base,
          color: effect.color ? {
            hex: rgbToHex(effect.color.r, effect.color.g, effect.color.b),
            opacity: effect.color.a
          } : null,
          offset: { x: effect.offset?.x, y: effect.offset?.y },
          radius: effect.radius,
          spread: effect.spread
        };
      }

      if (effect.type === 'LAYER_BLUR' || effect.type === 'BACKGROUND_BLUR') {
        return {
          ...base,
          radius: effect.radius
        };
      }

      return base;
    });
}

/**
 * Extract typography styles from a text node
 */
function extractTypography(node) {
  if (!node.style) return null;

  return {
    fontFamily: node.style.fontFamily,
    fontWeight: node.style.fontWeight,
    fontSize: node.style.fontSize,
    lineHeight: node.style.lineHeightPx,
    lineHeightUnit: node.style.lineHeightUnit,
    letterSpacing: node.style.letterSpacing,
    textCase: node.style.textCase,
    textDecoration: node.style.textDecoration,
    textAlignHorizontal: node.style.textAlignHorizontal,
    textAlignVertical: node.style.textAlignVertical
  };
}

/**
 * Parse variant name into state properties
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
 * Recursively extract all styled elements from a node
 */
function extractAllStyles(node, depth = 0, results = {
  borders: [],
  fills: [],
  texts: [],
  effects: [],
  icons: []
}) {
  const nodeName = node.name?.toLowerCase() || '';

  // Extract border/stroke
  if (node.strokes && node.strokes.length > 0) {
    const stroke = extractColor(node.strokes);
    if (stroke) {
      results.borders.push({
        elementName: node.name,
        elementType: node.type,
        depth,
        color: stroke,
        weight: node.strokeWeight,
        strokeAlign: node.strokeAlign,
        dashPattern: node.strokeDashes
      });
    }
  }

  // Extract fill/background
  if (node.fills && node.fills.length > 0 && node.type !== 'TEXT') {
    const fill = extractColor(node.fills);
    if (fill) {
      results.fills.push({
        elementName: node.name,
        elementType: node.type,
        depth,
        color: fill
      });
    }
  }

  // Extract text styles
  if (node.type === 'TEXT') {
    const textFill = extractColor(node.fills);
    results.texts.push({
      elementName: node.name,
      content: node.characters,
      depth,
      color: textFill,
      typography: extractTypography(node)
    });
  }

  // Extract effects
  if (node.effects && node.effects.length > 0) {
    const effects = extractEffects(node.effects);
    if (effects && effects.length > 0) {
      results.effects.push({
        elementName: node.name,
        elementType: node.type,
        depth,
        effects
      });
    }
  }

  // Check for icons (vectors or instances with icon-like names)
  if (node.type === 'VECTOR' || node.type === 'INSTANCE' ||
      nodeName.includes('icon') || nodeName.includes('svg')) {
    const iconFill = extractColor(node.fills);
    const iconStroke = extractColor(node.strokes);
    if (iconFill || iconStroke) {
      results.icons.push({
        elementName: node.name,
        elementType: node.type,
        depth,
        fill: iconFill,
        stroke: iconStroke
      });
    }
  }

  // Recurse into children
  if (node.children) {
    for (const child of node.children) {
      extractAllStyles(child, depth + 1, results);
    }
  }

  return results;
}

/**
 * Extract complete styling from a variant
 */
function extractVariantStyles(variant) {
  const props = parseVariantProps(variant.name);
  const allStyles = extractAllStyles(variant);

  // Get primary border (first one, usually the main container)
  const primaryBorder = allStyles.borders[0];

  // Get primary fill (deepest non-text fill, usually the input background)
  const primaryFill = allStyles.fills.length > 0
    ? allStyles.fills.reduce((a, b) => b.depth > a.depth ? b : a)
    : null;

  // Categorize text elements
  const textElements = {};
  for (const text of allStyles.texts) {
    const name = text.elementName.toLowerCase();
    if (name.includes('label')) {
      textElements.label = text;
    } else if (name.includes('placeholder') || name.includes('hint')) {
      textElements.placeholder = text;
    } else if (name.includes('validation') || name.includes('error') || name.includes('helper') || name.includes('message')) {
      textElements.validation = text;
    } else if (name.includes('input') || name.includes('value') || name.includes('text')) {
      textElements.input = text;
    } else if (!textElements.input) {
      textElements.input = text;
    }
  }

  // Get primary effect
  const primaryEffect = allStyles.effects[0];

  return {
    name: variant.name,
    id: variant.id,
    state: props.State || props.state || 'Unknown',
    properties: props,

    // Primary styles (quick reference)
    border: primaryBorder ? {
      color: primaryBorder.color,
      weight: primaryBorder.weight,
      align: primaryBorder.strokeAlign
    } : null,

    background: primaryFill?.color || null,

    // All borders found
    allBorders: allStyles.borders,

    // All fills found
    allFills: allStyles.fills,

    // Text styles
    text: {
      label: textElements.label ? {
        color: textElements.label.color,
        typography: textElements.label.typography
      } : null,
      input: textElements.input ? {
        color: textElements.input.color,
        typography: textElements.input.typography
      } : null,
      placeholder: textElements.placeholder ? {
        color: textElements.placeholder.color,
        typography: textElements.placeholder.typography
      } : null,
      validation: textElements.validation ? {
        color: textElements.validation.color,
        typography: textElements.validation.typography
      } : null
    },

    // All text elements
    allTexts: allStyles.texts,

    // Effects (shadows)
    effects: primaryEffect?.effects || null,
    allEffects: allStyles.effects,

    // Icons
    icons: allStyles.icons,

    // Layout
    layout: {
      width: variant.absoluteBoundingBox?.width,
      height: variant.absoluteBoundingBox?.height,
      cornerRadius: variant.cornerRadius,
      cornerRadii: variant.rectangleCornerRadii,
      padding: variant.paddingTop !== undefined ? {
        top: variant.paddingTop,
        right: variant.paddingRight,
        bottom: variant.paddingBottom,
        left: variant.paddingLeft
      } : null,
      gap: variant.itemSpacing,
      layoutMode: variant.layoutMode,
      primaryAxisAlign: variant.primaryAxisAlignItems,
      counterAxisAlign: variant.counterAxisAlignItems
    }
  };
}

/**
 * Fetch node from Figma API
 */
async function fetchNode(token, nodeId) {
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
 * Generate comprehensive markdown
 */
function generateMarkdown(component) {
  let md = `# ${component.name}\n\n`;
  md += `**Component ID:** \`${component.id}\`\n\n`;

  // Quick reference table
  md += `## States Overview\n\n`;
  md += `| State | Border | Background | Label | Input Text |\n`;
  md += `|-------|--------|------------|-------|------------|\n`;

  for (const v of component.variants) {
    const border = v.border?.color?.hex || '-';
    const bg = v.background?.hex || '-';
    const label = v.text.label?.color?.hex || '-';
    const input = v.text.input?.color?.hex || '-';
    md += `| **${v.state}** | \`${border}\` | \`${bg}\` | \`${label}\` | \`${input}\` |\n`;
  }

  // Detailed styles per state
  md += `\n## Detailed Styles\n\n`;

  for (const v of component.variants) {
    md += `### ${v.state}\n\n`;

    // Border
    if (v.border) {
      md += `**Border:**\n`;
      md += `- Color: \`${v.border.color.hex}\`\n`;
      md += `- Weight: ${v.border.weight}px\n`;
      if (v.border.align) md += `- Align: ${v.border.align}\n`;
      md += `\n`;
    }

    // Background
    if (v.background) {
      md += `**Background:**\n`;
      md += `- Color: \`${v.background.hex}\`\n`;
      if (v.background.opacity !== 1) md += `- Opacity: ${v.background.opacity}\n`;
      md += `\n`;
    }

    // Typography
    md += `**Typography:**\n`;
    if (v.text.label?.typography) {
      const t = v.text.label.typography;
      md += `- Label: ${t.fontFamily} ${t.fontWeight} ${t.fontSize}px`;
      if (v.text.label.color) md += ` (color: \`${v.text.label.color.hex}\`)`;
      md += `\n`;
    }
    if (v.text.input?.typography) {
      const t = v.text.input.typography;
      md += `- Input: ${t.fontFamily} ${t.fontWeight} ${t.fontSize}px`;
      if (v.text.input.color) md += ` (color: \`${v.text.input.color.hex}\`)`;
      md += `\n`;
    }
    if (v.text.placeholder?.typography) {
      const t = v.text.placeholder.typography;
      md += `- Placeholder: ${t.fontFamily} ${t.fontWeight} ${t.fontSize}px`;
      if (v.text.placeholder.color) md += ` (color: \`${v.text.placeholder.color.hex}\`)`;
      md += `\n`;
    }
    if (v.text.validation?.typography) {
      const t = v.text.validation.typography;
      md += `- Validation: ${t.fontFamily} ${t.fontWeight} ${t.fontSize}px`;
      if (v.text.validation.color) md += ` (color: \`${v.text.validation.color.hex}\`)`;
      md += `\n`;
    }
    md += `\n`;

    // Layout
    if (v.layout.cornerRadius || v.layout.padding || v.layout.gap) {
      md += `**Layout:**\n`;
      if (v.layout.cornerRadius) md += `- Corner Radius: ${v.layout.cornerRadius}px\n`;
      if (v.layout.padding) {
        md += `- Padding: ${v.layout.padding.top}px ${v.layout.padding.right}px ${v.layout.padding.bottom}px ${v.layout.padding.left}px\n`;
      }
      if (v.layout.gap) md += `- Gap: ${v.layout.gap}px\n`;
      if (v.layout.width) md += `- Width: ${v.layout.width}px\n`;
      if (v.layout.height) md += `- Height: ${v.layout.height}px\n`;
      md += `\n`;
    }

    // Effects
    if (v.effects && v.effects.length > 0) {
      md += `**Effects:**\n`;
      for (const effect of v.effects) {
        if (effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW') {
          md += `- ${effect.type}: ${effect.color?.hex || 'unknown'} offset(${effect.offset?.x}, ${effect.offset?.y}) blur(${effect.radius})\n`;
        }
      }
      md += `\n`;
    }

    // Icons
    if (v.icons && v.icons.length > 0) {
      md += `**Icons:**\n`;
      for (const icon of v.icons) {
        const color = icon.fill?.hex || icon.stroke?.hex || '-';
        md += `- ${icon.elementName}: \`${color}\`\n`;
      }
      md += `\n`;
    }

    md += `---\n\n`;
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

  const nodeArg = process.argv.find(arg => arg.startsWith('--node='));
  if (!nodeArg) {
    console.error('Error: --node=<node-id> argument required');
    console.log('Usage: FIGMA_TOKEN=xxx node scripts/extract-component-variants.js --node=355:37218');
    process.exit(1);
  }
  const nodeId = nodeArg.split('=')[1];

  try {
    const data = await fetchNode(token, nodeId);
    const normalizedId = nodeId.replace('-', ':');
    const nodeData = data.nodes[normalizedId];

    if (!nodeData || !nodeData.document) {
      throw new Error(`Node ${nodeId} not found`);
    }

    const componentSet = nodeData.document;
    console.log(`Found: ${componentSet.name} (${componentSet.type})`);

    const component = {
      name: componentSet.name.replace(/^🟢\s*|^🟡\s*|^🔴\s*|^🔷\s*/g, '').trim(),
      id: componentSet.id,
      type: componentSet.type,
      description: componentSet.description,
      variants: []
    };

    if (componentSet.children) {
      console.log(`Processing ${componentSet.children.length} variants...\n`);

      for (const child of componentSet.children) {
        if (child.type === 'COMPONENT') {
          const styles = extractVariantStyles(child);
          component.variants.push(styles);
        }
      }
    }

    // Ensure output directory
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const safeName = component.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // Save JSON
    const jsonPath = path.join(OUTPUT_DIR, `${safeName}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(component, null, 2));
    console.log(`Saved: ${jsonPath}`);

    // Save Markdown
    const mdPath = path.join(OUTPUT_DIR, `${safeName}.md`);
    fs.writeFileSync(mdPath, generateMarkdown(component));
    console.log(`Saved: ${mdPath}`);

    // Print summary
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Component: ${component.name}`);
    console.log(`Variants: ${component.variants.length}`);
    console.log(`${'='.repeat(60)}\n`);

    // State summary table
    console.log('State'.padEnd(15) + 'Border'.padEnd(12) + 'Background'.padEnd(12) + 'Label'.padEnd(12) + 'Input');
    console.log('-'.repeat(60));

    for (const v of component.variants) {
      const border = v.border?.color?.hex || '-';
      const bg = v.background?.hex || '-';
      const label = v.text.label?.color?.hex || '-';
      const input = v.text.input?.color?.hex || '-';
      console.log(
        v.state.padEnd(15) +
        border.padEnd(12) +
        bg.padEnd(12) +
        label.padEnd(12) +
        input
      );
    }

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
