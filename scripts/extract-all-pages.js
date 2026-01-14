#!/usr/bin/env node

/**
 * Extract documentation from ALL pages in the GDS Figma file
 * Generates markdown files for each page + a combined index
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';

const FIGMA_API = 'https://api.figma.com/v1';
const FILE_KEY = 'WU01oSRfSHpOxUn3ThcvC5';
const OUTPUT_DIR = './docs/figma-extract';

// Convert RGB to hex
function rgbToHex(r, g, b) {
  const toHex = (n) => Math.round(n * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

async function fetchStyles(token) {
  const response = await axios.get(`${FIGMA_API}/files/${FILE_KEY}/styles`, {
    headers: { 'X-Figma-Token': token }
  });
  return response.data.meta?.styles || [];
}

async function fetchFile(token) {
  const response = await axios.get(`${FIGMA_API}/files/${FILE_KEY}`, {
    headers: { 'X-Figma-Token': token }
  });
  return response.data;
}

function extractPageDocs(page) {
  const docs = [];

  function walk(node, path = '') {
    const currentPath = path ? `${path} > ${node.name}` : node.name;

    // Check if node has documentation-worthy content
    const hasDoc = node.description ||
      node.documentationLinks?.length > 0 ||
      node.componentPropertyDefinitions ||
      node.boundVariables ||
      (node.fills && node.fills.some(f => f.boundVariables)) ||
      (node.strokes && node.strokes.some(s => s.boundVariables));

    if (hasDoc) {
      docs.push({
        id: node.id,
        name: node.name,
        type: node.type,
        path: currentPath,
        description: node.description || null,
        documentationLinks: node.documentationLinks || [],
        boundVariables: node.boundVariables || null,
        fills: node.fills || null,
        strokes: node.strokes || null,
        styles: node.styles || null,
        componentPropertyDefinitions: node.componentPropertyDefinitions || null,
      });
    }

    if (node.children) {
      for (const child of node.children) {
        walk(child, currentPath);
      }
    }
  }

  walk(page);
  return docs;
}

function stylesToMarkdown(styles) {
  let md = '# Design Tokens (Styles)\n\n';
  md += '*Extracted from Figma Styles*\n\n';

  // Group by type
  const byType = {};
  for (const style of styles) {
    byType[style.style_type] = byType[style.style_type] || [];
    byType[style.style_type].push(style);
  }

  for (const [type, typeStyles] of Object.entries(byType)) {
    md += `## ${type}\n\n`;

    if (type === 'FILL') {
      md += '| Token | Description |\n';
      md += '|-------|-------------|\n';
    } else if (type === 'TEXT') {
      md += '| Style | Description |\n';
      md += '|-------|-------------|\n';
    } else if (type === 'EFFECT') {
      md += '| Effect | Description |\n';
      md += '|--------|-------------|\n';
    } else {
      md += '| Name | Description |\n';
      md += '|------|-------------|\n';
    }

    for (const style of typeStyles) {
      const desc = style.description ? style.description.replace(/\n/g, ' ').substring(0, 100) : '-';
      md += `| **${style.name}** | ${desc} |\n`;
    }
    md += '\n';
  }

  return md;
}

function pageToMarkdown(pageName, docs) {
  let md = `# ${pageName}\n\n`;
  md += `*Extracted from Figma*\n\n`;

  if (docs.length === 0) {
    md += 'No documented elements found on this page.\n';
    return md;
  }

  // Group by type
  const byType = {};
  for (const doc of docs) {
    byType[doc.type] = byType[doc.type] || [];
    byType[doc.type].push(doc);
  }

  for (const [type, typeDocs] of Object.entries(byType)) {
    md += `## ${type} (${typeDocs.length})\n\n`;

    for (const doc of typeDocs) {
      md += `### ${doc.name}\n\n`;
      md += `- **ID:** \`${doc.id}\`\n`;

      if (doc.description) {
        md += `\n**Description:**\n${doc.description}\n`;
      }

      if (doc.documentationLinks?.length > 0) {
        md += `\n**Links:**\n`;
        for (const link of doc.documentationLinks) {
          md += `- ${link.uri}\n`;
        }
      }

      if (doc.componentPropertyDefinitions) {
        md += `\n**Properties:**\n`;
        for (const [name, def] of Object.entries(doc.componentPropertyDefinitions)) {
          md += `- \`${name}\`: ${def.type}`;
          if (def.defaultValue) md += ` (default: ${def.defaultValue})`;
          if (def.variantOptions) md += ` [${def.variantOptions.join(', ')}]`;
          md += '\n';
        }
      }

      md += '\n---\n\n';
    }
  }

  return md;
}

function generateIndex(pages, styles) {
  let md = '# GDS Figma Documentation\n\n';
  md += `*Extracted from Figma file: Marketplace Global Design System*\n\n`;
  md += `Generated: ${new Date().toISOString()}\n\n`;

  md += '## Pages\n\n';
  for (const page of pages) {
    const slug = page.name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    md += `- [${page.name}](./${slug}.md) (${page.docCount} documented elements)\n`;
  }

  md += '\n## Design Tokens\n\n';
  md += `- [Styles](./styles.md) (${styles.length} styles)\n`;

  md += '\n## Quick Reference\n\n';
  md += '### Color Tokens\n\n';

  const fillStyles = styles.filter(s => s.style_type === 'FILL');
  md += '| Token | Description |\n';
  md += '|-------|-------------|\n';
  for (const style of fillStyles.slice(0, 20)) {
    const desc = style.description ? style.description.split('\n')[0].substring(0, 60) : '-';
    md += `| **${style.name}** | ${desc} |\n`;
  }
  if (fillStyles.length > 20) {
    md += `| ... | *${fillStyles.length - 20} more* |\n`;
  }

  md += '\n### Typography\n\n';
  const textStyles = styles.filter(s => s.style_type === 'TEXT');
  md += '| Style | Description |\n';
  md += '|-------|-------------|\n';
  for (const style of textStyles.slice(0, 10)) {
    const desc = style.description ? style.description.split('\n')[0].substring(0, 60) : '-';
    md += `| **${style.name}** | ${desc} |\n`;
  }
  if (textStyles.length > 10) {
    md += `| ... | *${textStyles.length - 10} more* |\n`;
  }

  return md;
}

async function main() {
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    console.error('Set FIGMA_TOKEN environment variable');
    process.exit(1);
  }

  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║         GDS Figma Full Documentation Extraction            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Fetch styles
  console.log('📦 Fetching styles...');
  const styles = await fetchStyles(token);
  console.log(`   Found ${styles.length} styles\n`);

  // Save styles
  const stylesMd = stylesToMarkdown(styles);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'styles.md'), stylesMd);
  console.log(`   ✓ Saved styles.md`);

  // Fetch full file
  console.log('\n📄 Fetching file structure...');
  const file = await fetchFile(token);
  const pages = file.document.children || [];
  console.log(`   Found ${pages.length} pages\n`);

  // Process each page
  console.log('📝 Extracting documentation from pages:\n');

  const pageSummaries = [];

  for (const page of pages) {
    const pageName = page.name;
    const slug = pageName.replace(/[^a-z0-9]/gi, '-').toLowerCase();

    console.log(`   📄 ${pageName}...`);

    const docs = extractPageDocs(page);
    console.log(`      Found ${docs.length} documented elements`);

    // Save page markdown
    const pageMd = pageToMarkdown(pageName, docs);
    fs.writeFileSync(path.join(OUTPUT_DIR, `${slug}.md`), pageMd);

    // Save page JSON
    fs.writeFileSync(path.join(OUTPUT_DIR, `${slug}.json`), JSON.stringify({
      page: { id: page.id, name: pageName },
      extractedAt: new Date().toISOString(),
      documentation: docs,
    }, null, 2));

    pageSummaries.push({
      name: pageName,
      slug,
      docCount: docs.length,
    });
  }

  // Generate index
  console.log('\n📚 Generating index...');
  const indexMd = generateIndex(pageSummaries, styles);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.md'), indexMd);
  console.log('   ✓ Saved index.md');

  // Summary
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                        Summary                              ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`\n   Pages extracted: ${pages.length}`);
  console.log(`   Styles extracted: ${styles.length}`);
  console.log(`   Output directory: ${OUTPUT_DIR}`);
  console.log(`\n   Files generated:`);
  console.log(`   - index.md (main index)`);
  console.log(`   - styles.md (design tokens)`);
  for (const page of pageSummaries) {
    console.log(`   - ${page.slug}.md (${page.docCount} docs)`);
  }
  console.log('');
}

main().catch(console.error);
