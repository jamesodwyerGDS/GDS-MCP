#!/usr/bin/env node

/**
 * Generate documentation for multiple Figma components
 *
 * Usage:
 *   npm run docs:generate-all -- --config=components.json
 *
 * Config file format:
 *   {
 *     "components": [
 *       { "url": "https://figma.com/file/..." },
 *       { "file": "ABC123", "node": "1:234" }
 *     ]
 *   }
 */

import { DocumentationGenerator } from '../core/documentation-generator.js';
import fs from 'fs/promises';

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const accessToken = process.env.FIGMA_TOKEN;
  if (!accessToken) {
    console.error('Error: FIGMA_TOKEN environment variable is required');
    console.log('Set it with: export FIGMA_TOKEN=your_token_here');
    process.exit(1);
  }

  const configPath = args.config || './components.json';

  let config;
  try {
    const configContent = await fs.readFile(configPath, 'utf-8');
    config = JSON.parse(configContent);
  } catch (error) {
    console.error(`Error reading config file: ${configPath}`);
    console.log('Create a components.json file with the following format:');
    console.log(JSON.stringify({
      components: [
        { url: 'https://figma.com/file/...' },
        { file: 'ABC123', node: '1:234' }
      ]
    }, null, 2));
    process.exit(1);
  }

  const generator = new DocumentationGenerator(accessToken, {
    outputDir: args.output || './docs/components'
  });

  const urls = config.components.map(c => {
    if (c.url) return c.url;
    let url = `https://www.figma.com/file/${c.file}`;
    if (c.node) url += `?node-id=${encodeURIComponent(c.node)}`;
    return url;
  });

  console.log(`\nGenerating documentation for ${urls.length} components...\n`);

  const results = await generator.generateBatch(urls);

  // Summary
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log('\n--- Summary ---\n');
  console.log(`✓ Successful: ${successful.length}`);
  successful.forEach(r => console.log(`  - ${r.name} (${r.path})`));

  if (failed.length > 0) {
    console.log(`\n✗ Failed: ${failed.length}`);
    failed.forEach(r => console.log(`  - ${r.url}: ${r.error}`));
  }

  console.log('');
  process.exit(failed.length > 0 ? 1 : 0);
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
