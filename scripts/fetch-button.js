#!/usr/bin/env node

/**
 * Quick script to fetch Button component from GDS file
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

  const response = await axios.get(`${FIGMA_API}/files/${FILE_KEY}`, {
    headers: { 'X-Figma-Token': token },
    params: { depth: 2 }
  });

  const file = response.data;
  console.log(`File: ${file.name}\n`);

  // Search for Button in components
  console.log('=== Components containing "Button" ===\n');
  
  if (file.components) {
    for (const [nodeId, comp] of Object.entries(file.components)) {
      if (comp.name.toLowerCase().includes('button')) {
        console.log(`📦 ${comp.name}`);
        console.log(`   Node ID: ${nodeId}`);
        if (comp.description) {
          console.log(`   📝 Description: ${comp.description}`);
        }
        if (comp.documentationLinks?.length) {
          console.log(`   🔗 Links: ${comp.documentationLinks.map(l => l.uri).join(', ')}`);
        }
        console.log('');
      }
    }
  }

  // Search for Button in component sets
  console.log('=== Component Sets containing "Button" ===\n');
  
  if (file.componentSets) {
    for (const [nodeId, set] of Object.entries(file.componentSets)) {
      if (set.name.toLowerCase().includes('button')) {
        console.log(`📦 ${set.name} (Component Set)`);
        console.log(`   Node ID: ${nodeId}`);
        if (set.description) {
          console.log(`   📝 Description: ${set.description}`);
        }
        if (set.documentationLinks?.length) {
          console.log(`   🔗 Links: ${set.documentationLinks.map(l => l.uri).join(', ')}`);
        }
        console.log('');
      }
    }
  }

  // Count totals
  const buttonComponents = Object.values(file.components || {}).filter(c => 
    c.name.toLowerCase().includes('button')
  );
  const buttonSets = Object.values(file.componentSets || {}).filter(s => 
    s.name.toLowerCase().includes('button')
  );

  console.log(`\n=== Summary ===`);
  console.log(`Total components with "Button": ${buttonComponents.length}`);
  console.log(`Total component sets with "Button": ${buttonSets.length}`);
}

main().catch(console.error);
