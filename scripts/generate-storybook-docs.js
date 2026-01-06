#!/usr/bin/env node
/**
 * Generate Storybook Documentation
 *
 * Parses GDS-storybook-originals and generates engineer-focused markdown docs.
 *
 * Usage:
 *   npm run storybook:generate
 *   node scripts/generate-storybook-docs.js
 */

import fs from 'fs/promises';
import path from 'path';
import { StorybookDocGenerator } from '../core/storybook-doc-generator.js';

async function main() {
  console.log('🔧 Generating Storybook Documentation...\n');

  // Load config
  let config = {};
  try {
    const configPath = path.resolve('./config/storybook-config.json');
    const configData = await fs.readFile(configPath, 'utf-8');
    config = JSON.parse(configData);
  } catch (error) {
    console.warn('No config file found, using defaults');
  }

  const generator = new StorybookDocGenerator(config);

  try {
    const results = await generator.generateAll();

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log('\n✅ Generation complete!');
    console.log(`   Components: ${successful} successful, ${failed} failed`);
    console.log(`   Output: ${config.outputDir || './docs-storybook'}`);

    if (failed > 0) {
      console.log('\n⚠️  Failed components:');
      results.filter(r => !r.success).forEach(r => {
        console.log(`   - ${r.name}: ${r.error}`);
      });
    }
  } catch (error) {
    console.error('❌ Generation failed:', error.message);
    process.exit(1);
  }
}

main();
