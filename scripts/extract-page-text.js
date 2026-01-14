#!/usr/bin/env node

/**
 * Extract ALL text content from a Figma page
 * Captures descriptive text, labels, and documentation
 *
 * Usage: node scripts/extract-page-text.js "Color Guidelines"
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';

const FIGMA_API = 'https://api.figma.com/v1';
const FILE_KEY = 'WU01oSRfSHpOxUn3ThcvC5';
const OUTPUT_DIR = './docs/figma-extract';

function extractAllText(node, texts = [], parentPath = '') {
  const currentPath = parentPath ? `${parentPath} > ${node.name}` : node.name;

  // Capture TEXT nodes with their content
  if (node.type === 'TEXT' && node.characters) {
    texts.push({
      id: node.id,
      name: node.name,
      path: currentPath,
      characters: node.characters,
      style: {
        fontSize: node.style?.fontSize,
        fontFamily: node.style?.fontFamily,
        fontWeight: node.style?.fontWeight,
        fontStyle: node.style?.fontPostScriptName,
        textAlignHorizontal: node.style?.textAlignHorizontal,
        textAlignVertical: node.style?.textAlignVertical,
        letterSpacing: node.style?.letterSpacing,
        lineHeightPx: node.style?.lineHeightPx,
        lineHeightPercent: node.style?.lineHeightPercent,
      },
      fills: node.fills?.map(f => ({
        type: f.type,
        color: f.color ? {
          r: Math.round(f.color.r * 255),
          g: Math.round(f.color.g * 255),
          b: Math.round(f.color.b * 255),
          hex: `#${Math.round(f.color.r * 255).toString(16).padStart(2, '0')}${Math.round(f.color.g * 255).toString(16).padStart(2, '0')}${Math.round(f.color.b * 255).toString(16).padStart(2, '0')}`.toUpperCase()
        } : null
      })),
      styleId: node.styles?.text,
      boundingBox: node.absoluteBoundingBox,
    });
  }

  // Also capture node descriptions (documentation)
  if (node.description) {
    texts.push({
      id: node.id,
      name: node.name,
      path: currentPath,
      type: 'DESCRIPTION',
      characters: node.description,
      nodeType: node.type,
    });
  }

  // Recurse into children
  if (node.children) {
    for (const child of node.children) {
      extractAllText(child, texts, currentPath);
    }
  }

  return texts;
}

function groupTextBySection(texts) {
  // Group texts by their parent section (first level after page)
  const sections = {};

  for (const text of texts) {
    const pathParts = text.path.split(' > ');
    const section = pathParts[1] || 'Root';

    if (!sections[section]) {
      sections[section] = [];
    }
    sections[section].push(text);
  }

  return sections;
}

function generateTextMarkdown(pageName, texts, sections) {
  let md = `# ${pageName} - Text Content\n\n`;
  md += `*All text extracted from Figma*\n\n`;
  md += `Generated: ${new Date().toISOString()}\n\n`;
  md += `Total text elements: ${texts.length}\n\n`;

  md += '## Table of Contents\n\n';
  for (const section of Object.keys(sections)) {
    const slug = section.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    md += `- [${section}](#${slug}) (${sections[section].length} items)\n`;
  }
  md += '\n---\n\n';

  // Output by section
  for (const [section, sectionTexts] of Object.entries(sections)) {
    const slug = section.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    md += `## ${section}\n\n`;

    // Group by type - descriptions first, then headings, then body text
    const descriptions = sectionTexts.filter(t => t.type === 'DESCRIPTION');
    const headings = sectionTexts.filter(t =>
      t.type !== 'DESCRIPTION' &&
      (t.style?.fontSize >= 20 || t.name.toLowerCase().includes('heading') || t.name.toLowerCase().includes('title'))
    );
    const bodyText = sectionTexts.filter(t =>
      t.type !== 'DESCRIPTION' &&
      !headings.includes(t)
    );

    // Node descriptions (documentation)
    if (descriptions.length > 0) {
      md += '### Documentation\n\n';
      for (const desc of descriptions) {
        md += `**${desc.name}** (${desc.nodeType}):\n`;
        md += `> ${desc.characters.replace(/\n/g, '\n> ')}\n\n`;
      }
    }

    // Headings
    if (headings.length > 0) {
      md += '### Headings\n\n';
      for (const text of headings) {
        const fontSize = text.style?.fontSize ? ` (${text.style.fontSize}px)` : '';
        md += `- **${text.characters}**${fontSize}\n`;
      }
      md += '\n';
    }

    // Body text - deduplicate and show unique content
    if (bodyText.length > 0) {
      md += '### Content\n\n';

      // Deduplicate by characters
      const uniqueTexts = new Map();
      for (const text of bodyText) {
        const key = text.characters.trim();
        if (key && !uniqueTexts.has(key)) {
          uniqueTexts.set(key, text);
        }
      }

      for (const [chars, text] of uniqueTexts) {
        // Skip very short text (likely labels)
        if (chars.length > 3) {
          const fontSize = text.style?.fontSize ? `[${text.style.fontSize}px]` : '';
          const fontWeight = text.style?.fontWeight ? `[${text.style.fontWeight}]` : '';
          md += `- ${chars} ${fontSize}${fontWeight}\n`;
        }
      }
      md += '\n';
    }

    md += '---\n\n';
  }

  return md;
}

async function main() {
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    console.error('Set FIGMA_TOKEN environment variable');
    process.exit(1);
  }

  const pageName = process.argv[2] || 'Color Guidelines';
  console.log(`╔════════════════════════════════════════════════════════════╗`);
  console.log(`║           Extracting Text from: ${pageName.padEnd(24)}║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Fetch full file
  console.log('📄 Fetching file...');
  const response = await axios.get(`${FIGMA_API}/files/${FILE_KEY}`, {
    headers: { 'X-Figma-Token': token }
  });

  const file = response.data;
  console.log(`   File: ${file.name}\n`);

  // Find the page
  const pages = file.document.children || [];
  const searchLower = pageName.toLowerCase();
  const page = pages.find(p => p.name.toLowerCase().includes(searchLower));

  if (!page) {
    console.log(`Page "${pageName}" not found.\n`);
    console.log('Available pages:');
    for (const p of pages) {
      console.log(`  - ${p.name}`);
    }
    process.exit(1);
  }

  console.log(`📄 Found page: ${page.name}`);

  // Extract all text
  console.log('📝 Extracting text content...\n');
  const texts = extractAllText(page);

  console.log(`   Found ${texts.length} text elements\n`);

  // Group by section
  const sections = groupTextBySection(texts);
  console.log(`   Sections found:`);
  for (const [section, items] of Object.entries(sections)) {
    console.log(`   - ${section}: ${items.length} items`);
  }
  console.log('');

  // Generate output
  const slug = pageName.replace(/[^a-z0-9]/gi, '-').toLowerCase();

  // Save JSON
  const jsonPath = path.join(OUTPUT_DIR, `${slug}-text.json`);
  fs.writeFileSync(jsonPath, JSON.stringify({
    page: { id: page.id, name: page.name },
    extractedAt: new Date().toISOString(),
    totalTexts: texts.length,
    sections: Object.keys(sections),
    texts,
  }, null, 2));
  console.log(`   ✓ Saved ${jsonPath}`);

  // Save Markdown
  const mdPath = path.join(OUTPUT_DIR, `${slug}-text.md`);
  const md = generateTextMarkdown(page.name, texts, sections);
  fs.writeFileSync(mdPath, md);
  console.log(`   ✓ Saved ${mdPath}`);

  // Print sample content
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                   Sample Content                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Show first few text items with meaningful content
  const meaningfulTexts = texts.filter(t =>
    t.characters &&
    t.characters.length > 20 &&
    t.type !== 'DESCRIPTION'
  );

  for (const text of meaningfulTexts.slice(0, 10)) {
    console.log(`📝 "${text.characters.substring(0, 80)}${text.characters.length > 80 ? '...' : ''}"`);
    if (text.style?.fontSize) {
      console.log(`   Font: ${text.style.fontFamily || 'Unknown'} ${text.style.fontSize}px`);
    }
    console.log('');
  }
}

main().catch(console.error);
