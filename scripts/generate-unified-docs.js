#!/usr/bin/env node

/**
 * Generate Unified Documentation
 *
 * Combines design, storybook, and vibe documentation into unified files.
 *
 * Usage:
 *   npm run unified:generate
 *   node scripts/generate-unified-docs.js
 */

import { UnifiedDocGenerator } from '../core/unified-doc-generator.js';

async function main() {
  console.log('='.repeat(50));
  console.log('GDS Unified Documentation Generator');
  console.log('='.repeat(50));
  console.log('');

  const generator = new UnifiedDocGenerator({
    designDir: './docs',
    storybookDir: './docs-storybook',
    vibeDir: './docs-vibe',
    outputDir: './docs-unified'
  });

  try {
    const results = await generator.generateAll();

    // Summary
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log('');
    console.log('='.repeat(50));
    console.log('Summary');
    console.log('='.repeat(50));
    console.log(`Total components: ${results.length}`);
    console.log(`Successful: ${successful.length}`);
    console.log(`Failed: ${failed.length}`);

    if (failed.length > 0) {
      console.log('');
      console.log('Failed components:');
      failed.forEach(f => console.log(`  - ${f.name}: ${f.error}`));
    }

    // Coverage breakdown
    console.log('');
    console.log('Coverage by source:');
    const withDesign = successful.filter(r => r.sources?.includes('design')).length;
    const withStorybook = successful.filter(r => r.sources?.includes('storybook')).length;
    const withVibe = successful.filter(r => r.sources?.includes('vibe')).length;
    console.log(`  - Design docs: ${withDesign}`);
    console.log(`  - Storybook docs: ${withStorybook}`);
    console.log(`  - Vibe docs: ${withVibe}`);

    console.log('');
    console.log('Output: ./docs-unified/');
    console.log('');

    process.exit(failed.length > 0 ? 1 : 0);
  } catch (error) {
    console.error('Generation failed:', error);
    process.exit(1);
  }
}

main();
