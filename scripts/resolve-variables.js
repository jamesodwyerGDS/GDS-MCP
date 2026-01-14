#!/usr/bin/env node

/**
 * Resolve Figma variable names from their IDs
 * Tries multiple methods to get variable definitions
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

  console.log('Resolving variable names from GDS file...\n');

  // Method 1: Try /variables/local endpoint
  console.log('=== Method 1: Local Variables ===\n');
  try {
    const localVars = await axios.get(`${FIGMA_API}/files/${FILE_KEY}/variables/local`, {
      headers: { 'X-Figma-Token': token }
    });

    const { variables, variableCollections } = localVars.data.meta || {};

    if (variables && Object.keys(variables).length > 0) {
      console.log(`Found ${Object.keys(variables).length} local variables`);
      for (const [id, v] of Object.entries(variables)) {
        console.log(`  ${v.name} (${v.resolvedType}) - ID: ${id}`);
      }
    } else {
      console.log('No local variables found');
    }
  } catch (e) {
    console.log(`Local variables error: ${e.response?.status || e.message}`);
  }

  // Method 2: Try /variables/published endpoint
  console.log('\n=== Method 2: Published Variables ===\n');
  try {
    const publishedVars = await axios.get(`${FIGMA_API}/files/${FILE_KEY}/variables/published`, {
      headers: { 'X-Figma-Token': token }
    });

    const { variables, variableCollections } = publishedVars.data.meta || {};

    if (variables && Object.keys(variables).length > 0) {
      console.log(`Found ${Object.keys(variables).length} published variables`);
      for (const [id, v] of Object.entries(variables)) {
        console.log(`  ${v.name} (${v.resolvedType}) - ID: ${id}`);
      }
    } else {
      console.log('No published variables found');
    }
  } catch (e) {
    console.log(`Published variables error: ${e.response?.status || e.message}`);
  }

  // Method 3: Get styles (older method, pre-variables)
  console.log('\n=== Method 3: Styles ===\n');
  try {
    const stylesResponse = await axios.get(`${FIGMA_API}/files/${FILE_KEY}/styles`, {
      headers: { 'X-Figma-Token': token }
    });

    const styles = stylesResponse.data.meta?.styles || [];

    if (styles.length > 0) {
      console.log(`Found ${styles.length} styles`);

      // Group by type
      const byType = {};
      for (const style of styles) {
        byType[style.style_type] = byType[style.style_type] || [];
        byType[style.style_type].push(style);
      }

      for (const [type, typeStyles] of Object.entries(byType)) {
        console.log(`\n  --- ${type} (${typeStyles.length}) ---`);
        for (const style of typeStyles.slice(0, 20)) {
          console.log(`  ${style.name} - Key: ${style.key}, Node: ${style.node_id}`);
          if (style.description) {
            console.log(`    📝 ${style.description}`);
          }
        }
        if (typeStyles.length > 20) {
          console.log(`  ... and ${typeStyles.length - 20} more`);
        }
      }
    } else {
      console.log('No styles found');
    }
  } catch (e) {
    console.log(`Styles error: ${e.response?.status || e.message}`);
  }

  // Method 4: Check file for linked libraries
  console.log('\n=== Method 4: File Info ===\n');
  try {
    const fileResponse = await axios.get(`${FIGMA_API}/files/${FILE_KEY}`, {
      headers: { 'X-Figma-Token': token },
      params: { depth: 1 }
    });

    const file = fileResponse.data;
    console.log(`File: ${file.name}`);
    console.log(`Editor Type: ${file.editorType}`);
    console.log(`Schema Version: ${file.schemaVersion}`);

    // Check for component library info
    if (file.mainFileKey) {
      console.log(`\nMain File Key: ${file.mainFileKey}`);
      console.log('This file may be branched from a library.');
    }
  } catch (e) {
    console.log(`File info error: ${e.response?.status || e.message}`);
  }

  // Method 5: Get team/project libraries
  console.log('\n=== Method 5: Team Components ===\n');
  try {
    // First get the project ID from the file
    const fileResponse = await axios.get(`${FIGMA_API}/files/${FILE_KEY}`, {
      headers: { 'X-Figma-Token': token },
      params: { depth: 1 }
    });

    // Try to get team components
    const componentsResponse = await axios.get(`${FIGMA_API}/files/${FILE_KEY}/components`, {
      headers: { 'X-Figma-Token': token }
    });

    const components = componentsResponse.data.meta?.components || [];
    if (components.length > 0) {
      console.log(`Found ${components.length} published components`);
      for (const comp of components.slice(0, 10)) {
        console.log(`  ${comp.name}`);
        if (comp.description) {
          console.log(`    📝 ${comp.description}`);
        }
      }
    } else {
      console.log('No published components found');
    }
  } catch (e) {
    console.log(`Team components error: ${e.response?.status || e.message}`);
  }

  console.log('\n=== Summary ===\n');
  console.log('If variables are empty, they may be:');
  console.log('1. In a linked library (different file)');
  console.log('2. Using styles instead of variables');
  console.log('3. Not yet migrated to the Variables feature');
  console.log('\nCheck the Styles section above for color definitions.');
}

main().catch(console.error);
