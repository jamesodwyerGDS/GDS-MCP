#!/usr/bin/env node
/**
 * Generate Vibe Documentation
 *
 * Transforms GDS docs into formats for AI coding tools.
 *
 * Usage:
 *   npm run vibe:generate              # All formats
 *   npm run vibe:shadcn                # ShadCN only
 *   npm run vibe:tailwind              # Tailwind only
 *   node scripts/generate-vibe-docs.js --format=shadcn
 */

import fs from 'fs/promises';
import path from 'path';
import { VibeDocGenerator } from '../core/vibe-doc-generator.js';

async function main() {
  console.log('🎨 Generating Vibe Documentation...\n');

  // Parse arguments
  const args = process.argv.slice(2);
  const formatArg = args.find(a => a.startsWith('--format='));
  const format = formatArg ? formatArg.split('=')[1] : 'all';

  // Load config
  let config = {};
  try {
    const configPath = path.resolve('./config/vibe-config.json');
    const configData = await fs.readFile(configPath, 'utf-8');
    config = JSON.parse(configData);
  } catch (error) {
    console.warn('No config file found, using defaults');
  }

  const generator = new VibeDocGenerator(config);

  try {
    const results = await generator.generateAll();

    console.log('\n✅ Generation complete!');
    console.log(`   Documents processed: ${results.total}`);
    console.log(`   Output: ${config.outputDir || './docs-vibe'}`);
    console.log('\n   Generated:');
    console.log('   - docs-vibe/shadcn/       (ShadCN component specs)');
    console.log('   - docs-vibe/tailwind/     (HTML snippets)');
    console.log('   - docs-vibe/design-system.md (Single-file summary)');
  } catch (error) {
    console.error('❌ Generation failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
