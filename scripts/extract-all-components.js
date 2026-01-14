#!/usr/bin/env node

/**
 * Extract All Components - Batch Extraction
 *
 * Discovers all COMPONENT_SET nodes in the Figma file and extracts
 * detailed variant styling for each one.
 *
 * Usage:
 *   FIGMA_TOKEN=xxx node scripts/extract-all-components.js
 *   FIGMA_TOKEN=xxx node scripts/extract-all-components.js --dry-run
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '../docs/figma-extract/components');

const FILE_KEY = 'WU01oSRfSHpOxUn3ThcvC5';
const API_BASE = 'https://api.figma.com/v1';

// Token name mapping
const TOKEN_MAP = {
  '#024DDF': 'Neptune',
  '#0141B8': 'Neptune Dark',
  '#033399': 'Neptune Darker',
  '#121212': 'Cosmos',
  '#646464': 'Granite',
  '#949494': 'Slate',
  '#FFFFFF': 'Spotlight',
  '#BFBFBF': 'Moonrock',
  '#D6D6D6': 'Ammonite',
  '#EBEBEB': 'Diatomite',
  '#F6F6F6': 'Lunar',
  '#048851': 'Earth',
  '#EB0000': 'Mars',
  '#FF3838': 'Mars Bright',
  '#FFB939': 'Jupiter',
  '#A733FF': 'Callisto',
  '#3074FE': 'Neptune Bright',
  '#21FFF2': 'Ganymede',
  '#FBFF2C': 'Titan'
};

function getTokenName(hex) {
  if (!hex) return null;
  return TOKEN_MAP[hex.toUpperCase()] || null;
}

function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function extractColor(colorArray, boundVariables = null) {
  if (!colorArray || colorArray.length === 0) return null;
  const solid = colorArray.find(c => c.type === 'SOLID' && c.visible !== false);
  if (!solid || !solid.color) return null;

  const hex = rgbToHex(solid.color.r, solid.color.g, solid.color.b);
  const token = getTokenName(hex);

  let variableId = null;
  if (boundVariables?.fills?.[0]?.id) {
    variableId = boundVariables.fills[0].id;
  } else if (boundVariables?.strokes?.[0]?.id) {
    variableId = boundVariables.strokes[0].id;
  } else if (solid.boundVariables?.color?.id) {
    variableId = solid.boundVariables.color.id;
  }

  return {
    hex,
    token,
    variableId,
    opacity: solid.opacity ?? solid.color.a ?? 1,
    rgb: {
      r: Math.round(solid.color.r * 255),
      g: Math.round(solid.color.g * 255),
      b: Math.round(solid.color.b * 255)
    }
  };
}

function extractEffects(effects) {
  if (!effects || effects.length === 0) return null;
  return effects
    .filter(e => e.visible !== false)
    .map(effect => {
      const base = { type: effect.type, visible: effect.visible ?? true };
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
        return { ...base, radius: effect.radius };
      }
      return base;
    });
}

function extractTypography(node) {
  if (!node.style) return null;
  return {
    fontFamily: node.style.fontFamily,
    fontWeight: node.style.fontWeight,
    fontSize: node.style.fontSize,
    lineHeight: node.style.lineHeightPx,
    lineHeightUnit: node.style.lineHeightUnit,
    letterSpacing: node.style.letterSpacing
  };
}

function parseVariantProps(name) {
  const props = {};
  const parts = name.split(',').map(p => p.trim());
  for (const part of parts) {
    const [key, value] = part.split('=').map(s => s.trim());
    if (key && value) props[key] = value;
  }
  return props;
}

function extractAllStyles(node, depth = 0, results = {
  borders: [], fills: [], texts: [], effects: [], icons: []
}) {
  const nodeName = node.name?.toLowerCase() || '';

  if (node.strokes && node.strokes.length > 0) {
    const stroke = extractColor(node.strokes, node.boundVariables);
    if (stroke) {
      results.borders.push({
        elementName: node.name,
        elementType: node.type,
        depth,
        color: stroke,
        weight: node.strokeWeight,
        strokeAlign: node.strokeAlign
      });
    }
  }

  if (node.fills && node.fills.length > 0 && node.type !== 'TEXT') {
    const fill = extractColor(node.fills, node.boundVariables);
    if (fill) {
      results.fills.push({
        elementName: node.name,
        elementType: node.type,
        depth,
        color: fill
      });
    }
  }

  if (node.type === 'TEXT') {
    const textFill = extractColor(node.fills, node.boundVariables);
    results.texts.push({
      elementName: node.name,
      content: node.characters,
      depth,
      color: textFill,
      typography: extractTypography(node)
    });
  }

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

  if (node.type === 'VECTOR' || node.type === 'INSTANCE' ||
      nodeName.includes('icon') || nodeName.includes('svg')) {
    const iconFill = extractColor(node.fills);
    const iconStroke = extractColor(node.strokes);
    if (iconFill || iconStroke) {
      results.icons.push({
        elementName: node.name,
        elementType: node.type,
        componentId: node.componentId,
        depth,
        fill: iconFill,
        stroke: iconStroke
      });
    }
  }

  if (node.children) {
    for (const child of node.children) {
      extractAllStyles(child, depth + 1, results);
    }
  }

  return results;
}

function extractVariantStyles(variant) {
  const props = parseVariantProps(variant.name);
  const allStyles = extractAllStyles(variant);

  const primaryBorder = allStyles.borders[0];

  let primaryFill = null;
  if (allStyles.fills.length > 0) {
    const containerFill = allStyles.fills.find(f => {
      const name = f.elementName.toLowerCase();
      return name.includes('container') || name.includes('background') ||
             name.includes('input') || name.includes('field') || name.includes('base');
    });
    if (containerFill) {
      primaryFill = containerFill.color;
    } else {
      const shallowest = allStyles.fills.reduce((a, b) => a.depth < b.depth ? a : b);
      primaryFill = shallowest.color;
    }
  }

  const textElements = {};
  for (const text of allStyles.texts) {
    const name = text.elementName.toLowerCase();
    if (name.includes('label') && !textElements.label) {
      textElements.label = text;
    } else if ((name.includes('placeholder') || name.includes('hint')) && !textElements.placeholder) {
      textElements.placeholder = text;
    } else if ((name.includes('validation') || name.includes('error') || name.includes('helper') || name.includes('message')) && !textElements.validation) {
      textElements.validation = text;
    } else if ((name.includes('input') || name.includes('value')) && !textElements.input) {
      textElements.input = text;
    }
  }
  if (!textElements.input) {
    for (const text of allStyles.texts) {
      const name = text.elementName.toLowerCase();
      if (name === 'text' || name.includes('text')) {
        textElements.input = text;
        break;
      }
    }
  }

  const primaryEffect = allStyles.effects[0];

  return {
    name: variant.name,
    id: variant.id,
    state: props.State || props.state || 'Unknown',
    properties: props,
    border: primaryBorder ? {
      color: primaryBorder.color,
      weight: primaryBorder.weight,
      align: primaryBorder.strokeAlign
    } : null,
    background: primaryFill || null,
    allBorders: allStyles.borders,
    allFills: allStyles.fills,
    text: {
      label: textElements.label ? { color: textElements.label.color, typography: textElements.label.typography } : null,
      input: textElements.input ? { color: textElements.input.color, typography: textElements.input.typography } : null,
      placeholder: textElements.placeholder ? { color: textElements.placeholder.color, typography: textElements.placeholder.typography } : null,
      validation: textElements.validation ? { color: textElements.validation.color, typography: textElements.validation.typography } : null
    },
    allTexts: allStyles.texts,
    effects: primaryEffect?.effects || null,
    allEffects: allStyles.effects,
    icons: allStyles.icons,
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
      layoutMode: variant.layoutMode
    }
  };
}

function generateMarkdown(component) {
  let md = `# ${component.name}\n\n`;
  md += `**Component ID:** \`${component.id}\`\n\n`;

  const formatColor = (colorObj) => {
    if (!colorObj) return '-';
    const hex = colorObj.hex;
    const token = colorObj.token;
    return token ? `\`${hex}\` (${token})` : `\`${hex}\``;
  };

  md += `## States Overview\n\n`;
  md += `| State | Border | Token | Background | Token |\n`;
  md += `|-------|--------|-------|------------|-------|\n`;

  for (const v of component.variants) {
    const borderHex = v.border?.color?.hex || '-';
    const borderToken = v.border?.color?.token || '-';
    const bgHex = v.background?.hex || '-';
    const bgToken = v.background?.token || '-';
    md += `| **${v.state}** | \`${borderHex}\` | ${borderToken} | \`${bgHex}\` | ${bgToken} |\n`;
  }

  md += `\n## Detailed Styles\n\n`;

  for (const v of component.variants) {
    md += `### ${v.state}\n\n`;

    if (v.border) {
      md += `**Border:**\n`;
      md += `- Color: \`${v.border.color.hex}\``;
      if (v.border.color.token) md += ` → **${v.border.color.token}**`;
      md += `\n`;
      md += `- Weight: ${v.border.weight}px\n`;
      if (v.border.align) md += `- Align: ${v.border.align}\n`;
      md += `\n`;
    }

    if (v.background) {
      md += `**Background:**\n`;
      md += `- Color: \`${v.background.hex}\``;
      if (v.background.token) md += ` → **${v.background.token}**`;
      md += `\n\n`;
    }

    md += `**Typography:**\n`;
    if (v.text.label?.typography) {
      const t = v.text.label.typography;
      md += `- Label: ${t.fontFamily} ${t.fontWeight} ${t.fontSize}px`;
      if (v.text.label.color) {
        md += ` (color: \`${v.text.label.color.hex}\``;
        if (v.text.label.color.token) md += ` → ${v.text.label.color.token}`;
        md += `)`;
      }
      md += `\n`;
    }
    if (v.text.input?.typography) {
      const t = v.text.input.typography;
      md += `- Input: ${t.fontFamily} ${t.fontWeight} ${t.fontSize}px`;
      if (v.text.input.color) {
        md += ` (color: \`${v.text.input.color.hex}\``;
        if (v.text.input.color.token) md += ` → ${v.text.input.color.token}`;
        md += `)`;
      }
      md += `\n`;
    }
    md += `\n`;

    if (v.layout.cornerRadius || v.layout.padding || v.layout.gap) {
      md += `**Layout:**\n`;
      if (v.layout.cornerRadius) md += `- Corner Radius: ${v.layout.cornerRadius}px\n`;
      if (v.layout.padding) {
        md += `- Padding: ${v.layout.padding.top}px ${v.layout.padding.right}px ${v.layout.padding.bottom}px ${v.layout.padding.left}px\n`;
      }
      if (v.layout.gap) md += `- Gap: ${v.layout.gap}px\n`;
      md += `\n`;
    }

    if (v.effects && v.effects.length > 0) {
      md += `**Effects:**\n`;
      for (const effect of v.effects) {
        if (effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW') {
          md += `- ${effect.type}: ${effect.color?.hex || 'unknown'} offset(${effect.offset?.x}, ${effect.offset?.y}) blur(${effect.radius})\n`;
        }
      }
      md += `\n`;
    }

    if (v.icons && v.icons.length > 0) {
      md += `**Icons:**\n`;
      for (const icon of v.icons) {
        const color = icon.fill?.hex || icon.stroke?.hex || '-';
        const token = icon.fill?.token || icon.stroke?.token || '';
        md += `- ${icon.elementName}: \`${color}\`${token ? ` (${token})` : ''}\n`;
      }
      md += `\n`;
    }

    md += `---\n\n`;
  }

  return md;
}

/**
 * Find all COMPONENT_SET nodes in the document
 */
function findComponentSets(node, results = []) {
  if (node.type === 'COMPONENT_SET') {
    // Clean component name (remove emoji prefixes)
    const cleanName = node.name.replace(/^🟢\s*|^🟡\s*|^🔴\s*|^🔷\s*/g, '').trim();
    results.push({
      id: node.id,
      name: cleanName,
      rawName: node.name,
      childCount: node.children?.length || 0
    });
  }
  if (node.children) {
    for (const child of node.children) {
      findComponentSets(child, results);
    }
  }
  return results;
}

/**
 * Fetch entire file structure
 */
async function fetchFileStructure(token) {
  console.log('Fetching Figma file structure...');
  const response = await fetch(`${API_BASE}/files/${FILE_KEY}`, {
    headers: { 'X-Figma-Token': token }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch specific node with geometry
 */
async function fetchNode(token, nodeId) {
  const normalizedId = nodeId.replace('-', ':');
  const url = `${API_BASE}/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(normalizedId)}&geometry=paths`;

  const response = await fetch(url, {
    headers: { 'X-Figma-Token': token }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch node ${nodeId}: ${response.status}`);
  }

  return response.json();
}

/**
 * Process a single component set
 */
async function processComponent(token, componentInfo) {
  const data = await fetchNode(token, componentInfo.id);
  const normalizedId = componentInfo.id.replace('-', ':');
  const nodeData = data.nodes[normalizedId];

  if (!nodeData || !nodeData.document) {
    throw new Error(`Node ${componentInfo.id} not found`);
  }

  const componentSet = nodeData.document;

  const component = {
    name: componentInfo.name,
    id: componentSet.id,
    type: componentSet.type,
    description: componentSet.description,
    variants: []
  };

  if (componentSet.children) {
    for (const child of componentSet.children) {
      if (child.type === 'COMPONENT') {
        const styles = extractVariantStyles(child);
        component.variants.push(styles);
      }
    }
  }

  return component;
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

  const isDryRun = process.argv.includes('--dry-run');

  try {
    // Step 1: Fetch file and find all component sets
    const file = await fetchFileStructure(token);
    console.log(`Loaded file: ${file.name}`);

    const componentSets = findComponentSets(file.document);
    console.log(`Found ${componentSets.length} component sets\n`);

    if (isDryRun) {
      console.log('Component Sets (dry run):');
      console.log('-'.repeat(60));
      for (const cs of componentSets) {
        console.log(`  ${cs.name} (${cs.id}) - ${cs.childCount} variants`);
      }
      console.log('\nRun without --dry-run to extract all components');
      return;
    }

    // Ensure output directory
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Step 2: Process each component set
    const results = [];
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < componentSets.length; i++) {
      const cs = componentSets[i];
      process.stdout.write(`[${i + 1}/${componentSets.length}] Processing ${cs.name}...`);

      try {
        const component = await processComponent(token, cs);

        if (component.variants.length > 0) {
          const safeName = component.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

          // Save JSON
          const jsonPath = path.join(OUTPUT_DIR, `${safeName}.json`);
          fs.writeFileSync(jsonPath, JSON.stringify(component, null, 2));

          // Save Markdown
          const mdPath = path.join(OUTPUT_DIR, `${safeName}.md`);
          fs.writeFileSync(mdPath, generateMarkdown(component));

          results.push({
            name: component.name,
            file: safeName,
            variants: component.variants.length
          });

          console.log(` ✓ ${component.variants.length} variants`);
          successCount++;
        } else {
          console.log(' (no variants)');
        }

        // Rate limiting - small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        console.log(` ✗ ${error.message}`);
        errorCount++;
      }
    }

    // Step 3: Generate index
    let indexMd = `# Component Styles Index\n\n`;
    indexMd += `*Extracted ${new Date().toISOString().split('T')[0]}*\n\n`;
    indexMd += `| Component | Variants | File |\n`;
    indexMd += `|-----------|----------|------|\n`;

    for (const r of results.sort((a, b) => a.name.localeCompare(b.name))) {
      indexMd += `| ${r.name} | ${r.variants} | [${r.file}.md](./components/${r.file}.md) |\n`;
    }

    fs.writeFileSync(path.join(OUTPUT_DIR, 'component-styles-index.md'), indexMd);

    console.log(`\n${'='.repeat(60)}`);
    console.log(`Extraction complete!`);
    console.log(`  Success: ${successCount}`);
    console.log(`  Errors: ${errorCount}`);
    console.log(`  Output: ${OUTPUT_DIR}`);
    console.log(`${'='.repeat(60)}`);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
