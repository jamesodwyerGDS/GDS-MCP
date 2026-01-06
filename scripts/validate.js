#!/usr/bin/env node

/**
 * Validate frontmatter schema in documentation files
 *
 * Usage:
 *   npm run docs:validate
 *   npm run docs:validate -- --path=./docs/components
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const REQUIRED_FIELDS = ['name', 'description', 'category', 'status', 'version', 'updated'];
const VALID_STATUSES = ['draft', 'beta', 'stable', 'deprecated'];
const VALID_CATEGORIES = ['atoms', 'molecules', 'organisms', 'foundations', 'patterns'];

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const docsPath = args.path || './docs';

  console.log(`\nValidating documentation in: ${docsPath}\n`);

  const files = await findMarkdownFiles(docsPath);
  const results = [];

  for (const file of files) {
    const result = await validateFile(file);
    results.push(result);
  }

  // Summary
  const valid = results.filter(r => r.valid);
  const invalid = results.filter(r => !r.valid);

  console.log('\n--- Validation Summary ---\n');
  console.log(`✓ Valid: ${valid.length}`);
  console.log(`✗ Invalid: ${invalid.length}`);

  if (invalid.length > 0) {
    console.log('\nIssues found:\n');
    for (const result of invalid) {
      console.log(`${result.file}:`);
      result.errors.forEach(err => console.log(`  - ${err}`));
      console.log('');
    }
  }

  process.exit(invalid.length > 0 ? 1 : 0);
}

async function findMarkdownFiles(dir) {
  const files = [];

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.name.endsWith('.md') && entry.name !== 'index.md') {
        files.push(fullPath);
      }
    }
  }

  try {
    await walk(dir);
  } catch (error) {
    console.error(`Error reading directory: ${error.message}`);
  }

  return files;
}

async function validateFile(filePath) {
  const errors = [];

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const { data: frontmatter } = matter(content);

    // Check required fields
    for (const field of REQUIRED_FIELDS) {
      if (!frontmatter[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    }

    // Validate status
    if (frontmatter.status && !VALID_STATUSES.includes(frontmatter.status)) {
      errors.push(`Invalid status: "${frontmatter.status}" (must be: ${VALID_STATUSES.join(', ')})`);
    }

    // Validate category
    if (frontmatter.category && !VALID_CATEGORIES.includes(frontmatter.category)) {
      errors.push(`Invalid category: "${frontmatter.category}" (must be: ${VALID_CATEGORIES.join(', ')})`);
    }

    // Validate date format
    if (frontmatter.updated && !/^\d{4}-\d{2}-\d{2}$/.test(frontmatter.updated)) {
      errors.push(`Invalid date format: "${frontmatter.updated}" (must be: YYYY-MM-DD)`);
    }

    // Validate version format
    if (frontmatter.version && !/^\d+\.\d+\.\d+$/.test(frontmatter.version)) {
      errors.push(`Invalid version format: "${frontmatter.version}" (must be: X.Y.Z)`);
    }

    // Validate tokens structure
    if (frontmatter.tokens) {
      if (!Array.isArray(frontmatter.tokens.colours) &&
          !Array.isArray(frontmatter.tokens.spacing) &&
          !Array.isArray(frontmatter.tokens.typography)) {
        errors.push('Tokens must contain arrays for colours, spacing, or typography');
      }
    }

    // Validate accessibility
    if (frontmatter.accessibility) {
      if (frontmatter.accessibility.wcagLevel &&
          !['A', 'AA', 'AAA'].includes(frontmatter.accessibility.wcagLevel)) {
        errors.push(`Invalid wcagLevel: "${frontmatter.accessibility.wcagLevel}" (must be: A, AA, or AAA)`);
      }
    }

    // Validate frameworks
    if (frontmatter.frameworks && Array.isArray(frontmatter.frameworks)) {
      for (const fw of frontmatter.frameworks) {
        if (!fw.framework || !fw.import) {
          errors.push('Each framework entry must have "framework" and "import" fields');
        }
      }
    }

  } catch (error) {
    errors.push(`Parse error: ${error.message}`);
  }

  return {
    file: filePath,
    valid: errors.length === 0,
    errors
  };
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
