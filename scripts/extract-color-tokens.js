#!/usr/bin/env node

/**
 * Extract comprehensive color token documentation from Figma
 * Includes styles with resolved values, color semantics, and usage context
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';

const FIGMA_API = 'https://api.figma.com/v1';
const FILE_KEY = 'WU01oSRfSHpOxUn3ThcvC5';
const OUTPUT_DIR = './docs/figma-extract';

// Convert RGB (0-1) to Hex
function rgbToHex(r, g, b) {
  const toHex = (n) => Math.round(n * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// Calculate relative luminance for WCAG contrast
function luminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two colors
function contrastRatio(rgb1, rgb2) {
  const l1 = luminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = luminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

async function fetchStyles(token) {
  const response = await axios.get(`${FIGMA_API}/files/${FILE_KEY}/styles`, {
    headers: { 'X-Figma-Token': token }
  });
  return response.data.meta?.styles || [];
}

async function fetchStyleNodes(token, nodeIds) {
  if (nodeIds.length === 0) return {};

  const response = await axios.get(`${FIGMA_API}/files/${FILE_KEY}/nodes`, {
    headers: { 'X-Figma-Token': token },
    params: { ids: nodeIds.join(',') }
  });
  return response.data.nodes || {};
}

async function fetchPage(token, pageName) {
  const response = await axios.get(`${FIGMA_API}/files/${FILE_KEY}`, {
    headers: { 'X-Figma-Token': token }
  });

  const pages = response.data.document.children || [];
  const searchLower = pageName.toLowerCase();
  return pages.find(p => p.name.toLowerCase().includes(searchLower));
}

function extractColorInfo(node, path = '') {
  const colors = [];
  const currentPath = path ? `${path} > ${node.name}` : node.name;

  // Extract fill colors
  if (node.fills && Array.isArray(node.fills)) {
    for (const fill of node.fills) {
      if (fill.type === 'SOLID' && fill.color) {
        colors.push({
          node: node.name,
          nodeId: node.id,
          path: currentPath,
          type: 'fill',
          color: fill.color,
          hex: rgbToHex(fill.color.r, fill.color.g, fill.color.b),
          opacity: fill.opacity ?? 1,
          boundVariable: fill.boundVariables?.color || null,
          visible: fill.visible !== false
        });
      }
    }
  }

  // Extract stroke colors
  if (node.strokes && Array.isArray(node.strokes)) {
    for (const stroke of node.strokes) {
      if (stroke.type === 'SOLID' && stroke.color) {
        colors.push({
          node: node.name,
          nodeId: node.id,
          path: currentPath,
          type: 'stroke',
          color: stroke.color,
          hex: rgbToHex(stroke.color.r, stroke.color.g, stroke.color.b),
          opacity: stroke.opacity ?? 1,
          boundVariable: stroke.boundVariables?.color || null,
          visible: stroke.visible !== false
        });
      }
    }
  }

  // Extract text content and styles
  if (node.type === 'TEXT') {
    colors.push({
      node: node.name,
      nodeId: node.id,
      path: currentPath,
      type: 'text',
      characters: node.characters,
      fontSize: node.style?.fontSize,
      fontFamily: node.style?.fontFamily,
      fontWeight: node.style?.fontWeight,
      textStyleId: node.styles?.text
    });
  }

  // Recurse into children
  if (node.children) {
    for (const child of node.children) {
      colors.push(...extractColorInfo(child, currentPath));
    }
  }

  return colors;
}

function generateColorTokensMarkdown(styles, colorInfo) {
  let md = '# Color Tokens Reference\n\n';
  md += '*Comprehensive color documentation extracted from Figma*\n\n';
  md += `Generated: ${new Date().toISOString()}\n\n`;

  // Color Styles Section
  const fillStyles = styles.filter(s => s.style_type === 'FILL');

  md += '## Color Palette\n\n';
  md += '### Primary Colors\n\n';
  md += '| Token Name | Description | Usage |\n';
  md += '|------------|-------------|-------|\n';

  // Group colors by semantic meaning based on name patterns
  const primaryColors = fillStyles.filter(s =>
    s.name.includes('Primary') || s.name.includes('Neptune')
  );
  const secondaryColors = fillStyles.filter(s =>
    s.name.includes('Secondary') || s.name.includes('Cosmos') || s.name.includes('Granite')
  );
  const semanticColors = fillStyles.filter(s =>
    s.name.includes('Success') || s.name.includes('Error') ||
    s.name.includes('Warning') || s.name.includes('Earth') ||
    s.name.includes('Mars') || s.name.includes('Jupiter')
  );
  const neutralColors = fillStyles.filter(s =>
    s.name.includes('Moonrock') || s.name.includes('Slate') ||
    s.name.includes('Ammonite') || s.name.includes('Lunar') ||
    s.name.includes('Spotlight') || s.name.includes('Diatomite')
  );

  for (const style of primaryColors) {
    const desc = style.description?.split('\n')[0] || '-';
    md += `| **${style.name}** | ${desc} | Primary actions, links |\n`;
  }
  md += '\n';

  md += '### Secondary Colors\n\n';
  md += '| Token Name | Description | Usage |\n';
  md += '|------------|-------------|-------|\n';
  for (const style of secondaryColors) {
    const desc = style.description?.split('\n')[0] || '-';
    md += `| **${style.name}** | ${desc} | Secondary UI elements |\n`;
  }
  md += '\n';

  md += '### Semantic Colors\n\n';
  md += '| Token Name | Description | Usage |\n';
  md += '|------------|-------------|-------|\n';
  for (const style of semanticColors) {
    const desc = style.description?.split('\n')[0] || '-';
    const usage = style.name.includes('Success') || style.name.includes('Earth') ? 'Success states' :
                  style.name.includes('Error') || style.name.includes('Mars') ? 'Error states' :
                  style.name.includes('Warning') || style.name.includes('Jupiter') ? 'Warning states' : '-';
    md += `| **${style.name}** | ${desc} | ${usage} |\n`;
  }
  md += '\n';

  md += '### Neutral Colors\n\n';
  md += '| Token Name | Description | Usage |\n';
  md += '|------------|-------------|-------|\n';
  for (const style of neutralColors) {
    const desc = style.description?.split('\n')[0] || '-';
    md += `| **${style.name}** | ${desc} | Backgrounds, borders |\n`;
  }
  md += '\n';

  // All Styles Table
  md += '## All Color Styles\n\n';
  md += '| Style Name | Key | Description |\n';
  md += '|------------|-----|-------------|\n';
  for (const style of fillStyles) {
    const desc = style.description?.replace(/\n/g, ' ').substring(0, 80) || '-';
    md += `| **${style.name}** | \`${style.key}\` | ${desc} |\n`;
  }
  md += '\n';

  // Color Usage in Components
  const uniqueColors = new Map();
  for (const item of colorInfo.filter(c => c.hex)) {
    if (!uniqueColors.has(item.hex)) {
      uniqueColors.set(item.hex, []);
    }
    uniqueColors.get(item.hex).push(item);
  }

  md += '## Color Usage in Components\n\n';
  md += '| Hex | RGB | Used In |\n';
  md += '|-----|-----|--------|\n';

  for (const [hex, usages] of uniqueColors) {
    const firstUsage = usages[0];
    const rgb = `rgb(${Math.round(firstUsage.color.r*255)}, ${Math.round(firstUsage.color.g*255)}, ${Math.round(firstUsage.color.b*255)})`;
    const nodes = [...new Set(usages.map(u => u.node))].slice(0, 3).join(', ');
    md += `| \`${hex}\` | ${rgb} | ${nodes} |\n`;
  }
  md += '\n';

  // Accessibility Section
  md += '## Accessibility\n\n';
  md += '### Contrast Ratios\n\n';
  md += 'Colors should meet WCAG 2.1 guidelines:\n';
  md += '- **AA Normal Text**: 4.5:1 minimum\n';
  md += '- **AA Large Text**: 3:1 minimum\n';
  md += '- **AAA Normal Text**: 7:1 minimum\n\n';

  // Calculate some common contrast ratios
  const white = { r: 1, g: 1, b: 1 };
  const black = { r: 0, g: 0, b: 0 };

  const colorsToCheck = [...uniqueColors.entries()].slice(0, 10);
  if (colorsToCheck.length > 0) {
    md += '| Color | vs White | vs Black | AA Large | AA Normal |\n';
    md += '|-------|----------|----------|----------|----------|\n';
    for (const [hex, usages] of colorsToCheck) {
      const color = usages[0].color;
      const vsWhite = contrastRatio(color, white).toFixed(2);
      const vsBlack = contrastRatio(color, black).toFixed(2);
      const passLarge = parseFloat(vsWhite) >= 3 || parseFloat(vsBlack) >= 3 ? '✅' : '❌';
      const passNormal = parseFloat(vsWhite) >= 4.5 || parseFloat(vsBlack) >= 4.5 ? '✅' : '❌';
      md += `| \`${hex}\` | ${vsWhite}:1 | ${vsBlack}:1 | ${passLarge} | ${passNormal} |\n`;
    }
  }
  md += '\n';

  return md;
}

async function main() {
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    console.error('Set FIGMA_TOKEN environment variable');
    process.exit(1);
  }

  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           Color Token Extraction                           ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Fetch styles
  console.log('📦 Fetching color styles...');
  const styles = await fetchStyles(token);
  const fillStyles = styles.filter(s => s.style_type === 'FILL');
  console.log(`   Found ${fillStyles.length} color styles\n`);

  // Fetch Color Guidelines page
  console.log('📄 Fetching Color Guidelines page...');
  const page = await fetchPage(token, 'Color Guidelines');

  if (!page) {
    console.log('   Color Guidelines page not found');
    process.exit(1);
  }

  console.log(`   Found: ${page.name}\n`);

  // Extract color information from the page
  console.log('🎨 Extracting color usage...');
  const colorInfo = extractColorInfo(page);
  console.log(`   Found ${colorInfo.length} color instances\n`);

  // Generate markdown
  console.log('📝 Generating documentation...');
  const md = generateColorTokensMarkdown(styles, colorInfo);

  const mdPath = path.join(OUTPUT_DIR, 'color-tokens.md');
  fs.writeFileSync(mdPath, md);
  console.log(`   ✓ Saved ${mdPath}`);

  // Save detailed JSON
  const jsonPath = path.join(OUTPUT_DIR, 'color-tokens.json');
  const jsonOutput = {
    extractedAt: new Date().toISOString(),
    styles: fillStyles,
    colorUsage: colorInfo,
    summary: {
      totalStyles: fillStyles.length,
      totalInstances: colorInfo.length,
      uniqueColors: [...new Set(colorInfo.filter(c => c.hex).map(c => c.hex))].length
    }
  };
  fs.writeFileSync(jsonPath, JSON.stringify(jsonOutput, null, 2));
  console.log(`   ✓ Saved ${jsonPath}`);

  // Print summary
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                        Summary                              ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`\n   Color styles: ${fillStyles.length}`);
  console.log(`   Color instances on page: ${colorInfo.length}`);
  console.log(`   Unique hex colors: ${jsonOutput.summary.uniqueColors}`);
  console.log('\n   Sample styles:');
  for (const style of fillStyles.slice(0, 10)) {
    console.log(`   - ${style.name}`);
  }
  console.log('');
}

main().catch(console.error);
