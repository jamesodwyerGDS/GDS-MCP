#!/usr/bin/env node

/**
 * Generate documentation for a single Figma component
 *
 * Usage:
 *   npm run docs:generate -- --url="https://figma.com/file/..."
 *   npm run docs:generate -- --file=ABC123 --node=1:234
 */

import { DocumentationGenerator } from '../core/documentation-generator.js';

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const accessToken = process.env.FIGMA_TOKEN;
  if (!accessToken) {
    console.error('Error: FIGMA_TOKEN environment variable is required');
    console.log('Set it with: export FIGMA_TOKEN=your_token_here');
    process.exit(1);
  }

  let figmaUrl = args.url;

  // Build URL from file and node if provided
  if (!figmaUrl && args.file) {
    figmaUrl = `https://www.figma.com/file/${args.file}`;
    if (args.node) {
      figmaUrl += `?node-id=${encodeURIComponent(args.node)}`;
    }
  }

  if (!figmaUrl) {
    console.error('Error: Figma URL or file key required');
    console.log('Usage:');
    console.log('  npm run docs:generate -- --url="https://figma.com/file/..."');
    console.log('  npm run docs:generate -- --file=ABC123 --node=1:234');
    process.exit(1);
  }

  const generator = new DocumentationGenerator(accessToken, {
    outputDir: args.output || './docs/components'
  });

  try {
    console.log(`\nGenerating documentation for: ${figmaUrl}\n`);
    const result = await generator.generate(figmaUrl);
    console.log(`\n✓ Successfully generated: ${result.path}`);
    console.log(`  Component: ${result.name}`);
    console.log(`  Category: ${result.category}\n`);
  } catch (error) {
    console.error(`\n✗ Error: ${error.message}\n`);
    process.exit(1);
  }
}

function parseArgs(args) {
  const result = {};
  for (const arg of args) {
    const match = arg.match(/^--(\w+)=(.+)$/);
    if (match) {
      result[match[1]] = match[2];
    }
  }
  return result;
}

main();
