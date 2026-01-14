#!/usr/bin/env node

/**
 * Quick script to fetch Button component from GDS file
 * Searches the full document tree, not just the components map
 */

import axios from 'axios';

const FIGMA_API = 'https://api.figma.com/v1';
const FILE_KEY = 'WU01oSRfSHpOxUn3ThcvC5';

// Recursively search the document tree for nodes matching a name
function findNodes(node, searchTerm, path = '', results = []) {
  const currentPath = path ? `${path} > ${node.name}` : node.name;
  const searchLower = searchTerm.toLowerCase();

  // Check if this node matches
  if (node.name && node.name.toLowerCase().includes(searchLower)) {
    results.push({
      id: node.id,
      name: node.name,
      type: node.type,
      path: currentPath,
      description: node.description || null,
      documentationLinks: node.documentationLinks || [],
      // Include component-specific data
      componentPropertyDefinitions: node.componentPropertyDefinitions || null,
    });
  }

  // Recurse into children
  if (node.children) {
    for (const child of node.children) {
      findNodes(child, searchTerm, currentPath, results);
    }
  }

  return results;
}

async function main() {
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    console.error('Set FIGMA_TOKEN environment variable');
    process.exit(1);
  }

  console.log('Fetching GDS file (full depth)...\n');

  // Fetch with no depth limit to get full tree
  const response = await axios.get(`${FIGMA_API}/files/${FILE_KEY}`, {
    headers: { 'X-Figma-Token': token }
  });

  const file = response.data;
  console.log(`File: ${file.name}`);
  console.log(`Last modified: ${file.lastModified}\n`);

  // Search the document tree for "Button"
  console.log('=== Searching document tree for "Button" ===\n');
  const buttonNodes = findNodes(file.document, 'button');

  if (buttonNodes.length === 0) {
    console.log('No nodes found with "Button" in the name.\n');
  } else {
    // Group by type
    const byType = {};
    for (const node of buttonNodes) {
      byType[node.type] = byType[node.type] || [];
      byType[node.type].push(node);
    }

    for (const [type, nodes] of Object.entries(byType)) {
      console.log(`--- ${type} (${nodes.length}) ---\n`);
      for (const node of nodes) {
        console.log(`📦 ${node.name}`);
        console.log(`   ID: ${node.id}`);
        console.log(`   Path: ${node.path}`);
        if (node.description) {
          console.log(`   📝 Description: ${node.description}`);
        }
        if (node.documentationLinks?.length) {
          console.log(`   🔗 Links: ${node.documentationLinks.map(l => l.uri).join(', ')}`);
        }
        if (node.componentPropertyDefinitions) {
          const props = Object.keys(node.componentPropertyDefinitions);
          console.log(`   🎛️  Properties: ${props.join(', ')}`);
        }
        console.log('');
      }
    }
  }

  // Also check the components/componentSets maps
  console.log('=== Components Map ===\n');
  const compCount = Object.keys(file.components || {}).length;
  const setCount = Object.keys(file.componentSets || {}).length;
  console.log(`Total in components map: ${compCount}`);
  console.log(`Total in componentSets map: ${setCount}`);

  if (file.components) {
    const buttonComps = Object.entries(file.components).filter(([_, c]) =>
      c.name.toLowerCase().includes('button')
    );
    if (buttonComps.length > 0) {
      console.log(`\nButton components in map: ${buttonComps.length}`);
      for (const [id, comp] of buttonComps) {
        console.log(`  - ${comp.name} (${id})`);
      }
    }
  }

  if (file.componentSets) {
    const buttonSets = Object.entries(file.componentSets).filter(([_, s]) =>
      s.name.toLowerCase().includes('button')
    );
    if (buttonSets.length > 0) {
      console.log(`\nButton component sets in map: ${buttonSets.length}`);
      for (const [id, set] of buttonSets) {
        console.log(`  - ${set.name} (${id})`);
      }
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Total nodes with "Button" in document tree: ${buttonNodes.length}`);
}

main().catch(console.error);
