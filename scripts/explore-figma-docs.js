#!/usr/bin/env node

/**
 * Explore Figma file documentation
 *
 * This script fetches a Figma file and displays all available documentation
 * fields including descriptions, documentation links, and annotations.
 *
 * Usage:
 *   FIGMA_TOKEN=your_token node scripts/explore-figma-docs.js
 *   FIGMA_TOKEN=your_token node scripts/explore-figma-docs.js --file=WU01oSRfSHpOxUn3ThcvC5
 */

import axios from 'axios';

const FIGMA_API = 'https://api.figma.com/v1';

async function fetchFile(fileKey, token) {
  const response = await axios.get(`${FIGMA_API}/files/${fileKey}`, {
    headers: { 'X-Figma-Token': token },
    params: {
      depth: 2,  // Get structure without full tree
    }
  });
  return response.data;
}

async function fetchFileComponents(fileKey, token) {
  const response = await axios.get(`${FIGMA_API}/files/${fileKey}/components`, {
    headers: { 'X-Figma-Token': token }
  });
  return response.data;
}

async function fetchComponentMetadata(fileKey, nodeId, token) {
  const response = await axios.get(`${FIGMA_API}/files/${fileKey}/nodes`, {
    headers: { 'X-Figma-Token': token },
    params: { ids: nodeId }
  });
  return response.data;
}

function extractDocumentation(node, path = '') {
  const docs = [];
  const currentPath = path ? `${path} > ${node.name}` : node.name;

  // Check if this node has documentation
  if (node.description || node.documentationLinks?.length > 0) {
    docs.push({
      name: node.name,
      type: node.type,
      path: currentPath,
      description: node.description || null,
      documentationLinks: node.documentationLinks || [],
      nodeId: node.id
    });
  }

  // Recurse into children
  if (node.children) {
    for (const child of node.children) {
      docs.push(...extractDocumentation(child, currentPath));
    }
  }

  return docs;
}

function printDocumentation(docs) {
  if (docs.length === 0) {
    console.log('\n  No documentation found in the file structure.\n');
    return;
  }

  console.log(`\n  Found ${docs.length} nodes with documentation:\n`);

  for (const doc of docs) {
    console.log(`  ─────────────────────────────────────────────`);
    console.log(`  📦 ${doc.name} (${doc.type})`);
    console.log(`     Node ID: ${doc.nodeId}`);
    console.log(`     Path: ${doc.path}`);

    if (doc.description) {
      console.log(`     📝 Description:`);
      const lines = doc.description.split('\n');
      for (const line of lines.slice(0, 5)) {
        console.log(`        ${line}`);
      }
      if (lines.length > 5) {
        console.log(`        ... (${lines.length - 5} more lines)`);
      }
    }

    if (doc.documentationLinks?.length > 0) {
      console.log(`     🔗 Documentation Links:`);
      for (const link of doc.documentationLinks) {
        console.log(`        - ${link.uri}`);
      }
    }
    console.log('');
  }
}

async function main() {
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    console.error('\n❌ Error: FIGMA_TOKEN environment variable is required');
    console.log('   Set it with: export FIGMA_TOKEN=your_token_here\n');
    process.exit(1);
  }

  // Parse args
  const args = process.argv.slice(2);
  let fileKey = 'WU01oSRfSHpOxUn3ThcvC5'; // Default: GDS Marketplace file

  for (const arg of args) {
    const match = arg.match(/^--file=(.+)$/);
    if (match) fileKey = match[1];
  }

  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║           Figma Documentation Explorer                      ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`\n  File Key: ${fileKey}`);

  try {
    // 1. Fetch basic file info
    console.log('\n  📁 Fetching file info...');
    const file = await fetchFile(fileKey, token);
    console.log(`     Name: ${file.name}`);
    console.log(`     Last Modified: ${file.lastModified}`);

    // 2. Check components map in the file response
    console.log('\n  🧩 Components in file response:');
    if (file.components && Object.keys(file.components).length > 0) {
      const components = Object.entries(file.components);
      console.log(`     Found ${components.length} components`);

      let withDocs = 0;
      for (const [nodeId, comp] of components.slice(0, 10)) {
        if (comp.description) withDocs++;
        console.log(`\n     • ${comp.name}`);
        console.log(`       Node ID: ${nodeId}`);
        if (comp.description) {
          console.log(`       📝 "${comp.description.substring(0, 100)}${comp.description.length > 100 ? '...' : ''}"`);
        }
        if (comp.documentationLinks?.length > 0) {
          console.log(`       🔗 ${comp.documentationLinks.length} documentation link(s)`);
        }
      }

      if (components.length > 10) {
        console.log(`\n     ... and ${components.length - 10} more components`);
      }
      console.log(`\n     📊 ${withDocs}/${Math.min(components.length, 10)} shown have descriptions`);
    } else {
      console.log('     No components map in response');
    }

    // 3. Check component sets
    console.log('\n  📦 Component Sets in file response:');
    if (file.componentSets && Object.keys(file.componentSets).length > 0) {
      const sets = Object.entries(file.componentSets);
      console.log(`     Found ${sets.length} component sets`);

      for (const [nodeId, set] of sets.slice(0, 5)) {
        console.log(`\n     • ${set.name}`);
        console.log(`       Node ID: ${nodeId}`);
        if (set.description) {
          console.log(`       📝 "${set.description.substring(0, 100)}${set.description.length > 100 ? '...' : ''}"`);
        }
        if (set.documentationLinks?.length > 0) {
          console.log(`       🔗 Links: ${set.documentationLinks.map(l => l.uri).join(', ')}`);
        }
      }

      if (sets.length > 5) {
        console.log(`\n     ... and ${sets.length - 5} more component sets`);
      }
    } else {
      console.log('     No component sets map in response');
    }

    // 4. Try the dedicated components endpoint
    console.log('\n  📚 Fetching from /files/{key}/components endpoint...');
    try {
      const componentsData = await fetchFileComponents(fileKey, token);
      if (componentsData.meta?.components?.length > 0) {
        console.log(`     Found ${componentsData.meta.components.length} published components`);
        for (const comp of componentsData.meta.components.slice(0, 5)) {
          console.log(`\n     • ${comp.name}`);
          if (comp.description) {
            console.log(`       📝 "${comp.description.substring(0, 80)}..."`);
          }
        }
      } else {
        console.log('     No published components (components may not be published to library)');
      }
    } catch (e) {
      console.log(`     Endpoint returned: ${e.response?.status || e.message}`);
    }

    // 5. Extract documentation from document tree
    console.log('\n  🌲 Scanning document tree for documentation...');
    const treeDocumentation = extractDocumentation(file.document);
    printDocumentation(treeDocumentation);

    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║                    Summary                                  ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log(`\n  Total nodes with documentation: ${treeDocumentation.length}`);
    console.log(`  Components with metadata: ${Object.keys(file.components || {}).length}`);
    console.log(`  Component sets with metadata: ${Object.keys(file.componentSets || {}).length}`);
    console.log('');

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Data: ${JSON.stringify(error.response.data)}`);
    }
    process.exit(1);
  }
}

main();
