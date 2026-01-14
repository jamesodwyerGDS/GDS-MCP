#!/usr/bin/env node

/**
 * Fetch contents of a specific Figma page
 * Usage: node scripts/fetch-page.js "🟢 Color Guidelines"
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

  const pageName = process.argv[2] || '🟢 Color Guidelines';
  console.log(`Fetching page: "${pageName}"...\n`);

  // Fetch full file to get page contents
  const response = await axios.get(`${FIGMA_API}/files/${FILE_KEY}`, {
    headers: { 'X-Figma-Token': token }
  });

  const file = response.data;
  console.log(`File: ${file.name}\n`);

  // Find the page (partial match, case-insensitive)
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

  console.log(`📄 Page: ${page.name}`);
  console.log(`   ID: ${page.id}`);
  console.log(`   Type: ${page.type}`);
  console.log(`   Children: ${page.children?.length || 0}\n`);

  // Show all children on this page
  console.log('=== Page Contents ===\n');

  if (page.children) {
    for (const node of page.children) {
      console.log(`📦 ${node.name}`);
      console.log(`   ID: ${node.id}`);
      console.log(`   Type: ${node.type}`);

      if (node.description) {
        console.log(`   📝 Description: ${node.description}`);
      }
      if (node.documentationLinks?.length) {
        console.log(`   🔗 Links: ${node.documentationLinks.map(l => l.uri).join(', ')}`);
      }

      // Show bound variables if any
      if (node.boundVariables) {
        console.log(`   🎨 Bound Variables: ${JSON.stringify(node.boundVariables)}`);
      }

      // Show fills with variable bindings
      if (node.fills) {
        const varFills = node.fills.filter(f => f.boundVariables);
        if (varFills.length > 0) {
          console.log(`   🎨 Fill Variables: ${JSON.stringify(varFills.map(f => f.boundVariables))}`);
        }
      }

      // If it has children, show count and first few
      if (node.children?.length > 0) {
        console.log(`   └─ Children (${node.children.length}):`);
        for (const child of node.children.slice(0, 5)) {
          console.log(`      - ${child.name} (${child.type})`);
        }
        if (node.children.length > 5) {
          console.log(`      ... and ${node.children.length - 5} more`);
        }
      }
      console.log('');
    }
  }

  // Also fetch variables to see what's defined
  console.log('=== Variables in File ===\n');
  try {
    const varsResponse = await axios.get(`${FIGMA_API}/files/${FILE_KEY}/variables/local`, {
      headers: { 'X-Figma-Token': token }
    });

    const { variables, variableCollections } = varsResponse.data.meta || {};

    if (variableCollections) {
      console.log(`Variable Collections: ${Object.keys(variableCollections).length}`);
      for (const [id, collection] of Object.entries(variableCollections)) {
        console.log(`\n📁 ${collection.name}`);
        console.log(`   ID: ${id}`);
        console.log(`   Modes: ${collection.modes?.map(m => m.name).join(', ')}`);
      }
    }

    if (variables) {
      console.log(`\nTotal Variables: ${Object.keys(variables).length}`);

      // Group by collection
      const byCollection = {};
      for (const [id, variable] of Object.entries(variables)) {
        const collId = variable.variableCollectionId;
        byCollection[collId] = byCollection[collId] || [];
        byCollection[collId].push({ id, ...variable });
      }

      for (const [collId, vars] of Object.entries(byCollection)) {
        const collName = variableCollections?.[collId]?.name || collId;
        console.log(`\n--- ${collName} (${vars.length} variables) ---`);
        for (const v of vars.slice(0, 10)) {
          console.log(`   ${v.name} (${v.resolvedType})`);
        }
        if (vars.length > 10) {
          console.log(`   ... and ${vars.length - 10} more`);
        }
      }
    }
  } catch (e) {
    console.log(`Could not fetch variables: ${e.message}`);
  }
}

main().catch(console.error);
