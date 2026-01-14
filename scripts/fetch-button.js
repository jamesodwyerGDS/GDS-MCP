#!/usr/bin/env node

/**
 * Quick script to fetch Button component from GDS file
 * Components are at page level (direct children of pages)
 */

import axios from 'axios';

const FIGMA_API = 'https://api.figma.com/v1';
const FILE_KEY = 'WU01oSRfSHpOxUn3ThcvC5';

async function main() {
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    console.error('Set FIGMA_TOKEN environment variable');
    process.exit(1);
  }

  console.log('Fetching GDS file...\n');

  // Fetch with depth=2 to get pages and their direct children
  const response = await axios.get(`${FIGMA_API}/files/${FILE_KEY}`, {
    headers: { 'X-Figma-Token': token },
    params: { depth: 2 }
  });

  const file = response.data;
  console.log(`File: ${file.name}`);
  console.log(`Last modified: ${file.lastModified}\n`);

  // Get pages (direct children of document)
  const pages = file.document.children || [];
  console.log(`Pages: ${pages.map(p => p.name).join(', ')}\n`);

  // Search page-level nodes for "Button"
  console.log('=== Page-level components containing "Button" ===\n');

  let buttonCount = 0;
  for (const page of pages) {
    const pageNodes = page.children || [];
    const buttonNodes = pageNodes.filter(node =>
      node.name.toLowerCase().includes('button')
    );

    if (buttonNodes.length > 0) {
      console.log(`📄 ${page.name}:`);
      for (const node of buttonNodes) {
        buttonCount++;
        console.log(`\n   📦 ${node.name}`);
        console.log(`      ID: ${node.id}`);
        console.log(`      Type: ${node.type}`);
        if (node.description) {
          console.log(`      📝 Description: ${node.description}`);
        }
        if (node.documentationLinks?.length) {
          console.log(`      🔗 Links: ${node.documentationLinks.map(l => l.uri).join(', ')}`);
        }
      }
      console.log('');
    }
  }

  if (buttonCount === 0) {
    console.log('No page-level components found with "Button" in the name.\n');
    console.log('Listing all page-level components:\n');
    for (const page of pages) {
      const pageNodes = page.children || [];
      if (pageNodes.length > 0) {
        console.log(`📄 ${page.name}:`);
        for (const node of pageNodes.slice(0, 10)) {
          console.log(`   - ${node.name} (${node.type})`);
        }
        if (pageNodes.length > 10) {
          console.log(`   ... and ${pageNodes.length - 10} more`);
        }
        console.log('');
      }
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Total pages: ${pages.length}`);
  console.log(`Button components found: ${buttonCount}`);
}

main().catch(console.error);
