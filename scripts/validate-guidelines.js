#!/usr/bin/env node

/**
 * Validates Guidelines.md claims against source documentation in /docs
 *
 * Usage: npm run docs:validate-guidelines
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const GUIDELINES_PATH = path.join(ROOT_DIR, 'guidelines', 'Guidelines.md');

// Results tracking
const results = {
  verified: [],
  mismatches: [],
  notFound: []
};

/**
 * Search for a value in documentation files
 */
function searchInDocs(searchPattern, searchDirs = ['foundations', 'components']) {
  const matches = [];

  for (const dir of searchDirs) {
    const dirPath = path.join(DOCS_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = getAllMdFiles(dirPath);
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const lines = content.split('\n');

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(searchPattern)) {
          matches.push({
            file: path.relative(ROOT_DIR, file),
            line: i + 1,
            content: lines[i].trim()
          });
        }
      }
    }
  }

  return matches;
}

/**
 * Get all markdown files recursively
 */
function getAllMdFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMdFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Extract color claims from Guidelines.md
 */
function extractColorClaims(content) {
  const claims = [];
  const colorRegex = /\|\s*`([a-z-]+)`\s*\|\s*`(#[A-Fa-f0-9]{6})`\s*\|/g;
  let match;

  while ((match = colorRegex.exec(content)) !== null) {
    claims.push({
      type: 'color',
      token: match[1],
      value: match[2].toUpperCase()
    });
  }

  return claims;
}

/**
 * Extract typography claims from Guidelines.md
 */
function extractTypographyClaims(content) {
  const claims = [];

  // Display styles: | `token` | 54px | 44px |
  const displayRegex = /\|\s*`([a-z]+)`\s*\|\s*(\d+)px\s*\|\s*(\d+)px\s*\|/g;
  let match;

  while ((match = displayRegex.exec(content)) !== null) {
    claims.push({
      type: 'typography-display',
      token: match[1],
      desktopSize: match[2] + 'px',
      mobileSize: match[3] + 'px'
    });
  }

  // Body styles: | `token` | 16px | Regular 400 |
  const bodyRegex = /\|\s*`([a-z]+)`\s*\|\s*(\d+)px\s*\|\s*(Regular|Semibold|Bold)\s*(\d+)\s*\|/g;

  while ((match = bodyRegex.exec(content)) !== null) {
    claims.push({
      type: 'typography-body',
      token: match[1],
      size: match[2] + 'px',
      weight: match[3],
      weightValue: match[4]
    });
  }

  return claims;
}

/**
 * Extract spacing claims from Guidelines.md
 */
function extractSpacingClaims(content) {
  const claims = [];
  const spacingRegex = /\|\s*`([a-z]+)`\s*\|\s*(\d+)px\s*\|/g;
  let match;

  // Only extract from the Spacing section
  const spacingSection = content.match(/### Spacing[\s\S]*?(?=###|## )/);
  if (spacingSection) {
    while ((match = spacingRegex.exec(spacingSection[0])) !== null) {
      claims.push({
        type: 'spacing',
        token: match[1],
        value: match[2] + 'px'
      });
    }
  }

  return claims;
}

/**
 * Extract border-radius claims from Guidelines.md
 */
function extractBorderRadiusClaims(content) {
  const claims = [];

  // Look for component-specific border-radius table: | Buttons | `8px` |
  const tableRegex = /\|\s*([^|]+)\s*\|\s*`(\d+)px`\s*\|/g;
  const radiusSection = content.match(/### Border Radius[\s\S]*?(?=##|$)/);

  if (radiusSection) {
    let match;
    while ((match = tableRegex.exec(radiusSection[0])) !== null) {
      const context = match[1].trim().toLowerCase();
      const value = match[2] + 'px';
      claims.push({
        type: 'border-radius-specific',
        context: context,
        value: value
      });
    }
  }

  // Look for "Use Xpx border-radius consistently" (legacy format - should flag as problematic)
  const consistentMatch = content.match(/Use\s+(\d+)px\s+border-radius\s+consistent/i);
  if (consistentMatch) {
    claims.push({
      type: 'border-radius-consistency-claim',
      claim: `Use ${consistentMatch[1]}px border-radius consistently`,
      value: consistentMatch[1] + 'px'
    });
  }

  return claims;
}

/**
 * Verify a color claim against docs
 */
function verifyColor(claim) {
  const matches = searchInDocs(claim.value);

  if (matches.length === 0) {
    // Try searching by token name
    const tokenMatches = searchInDocs(claim.token);
    if (tokenMatches.length === 0) {
      results.notFound.push({
        ...claim,
        message: `Color ${claim.token} (${claim.value}) not found in docs`
      });
      return;
    }
  }

  // Check if hex value matches in color.md
  const colorDoc = path.join(DOCS_DIR, 'foundations', 'color.md');
  if (fs.existsSync(colorDoc)) {
    const content = fs.readFileSync(colorDoc, 'utf-8');
    if (content.includes(claim.value)) {
      results.verified.push({
        ...claim,
        source: 'docs/foundations/color.md',
        message: `Color ${claim.token} = ${claim.value} verified`
      });
    } else {
      results.mismatches.push({
        ...claim,
        message: `Color ${claim.token}: Guidelines says ${claim.value}, but not found in color.md`
      });
    }
  }
}

/**
 * Verify border-radius claims against component docs
 */
function verifyBorderRadiusClaims(claims) {
  const componentRadii = {};
  const componentsDir = path.join(DOCS_DIR, 'components', 'atoms');

  if (!fs.existsSync(componentsDir)) {
    results.notFound.push({
      type: 'border-radius-scan',
      message: 'Components directory not found'
    });
    return;
  }

  const files = getAllMdFiles(componentsDir);

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const componentName = path.basename(file, '.md');

    // Search for border-radius values (various patterns)
    const radiusMatches = content.matchAll(/border-radius[:\s]*(\d+)px|--[\w-]+-(?:border-)?radius[:\s]*(\d+)px|borderRadius[:\s]*(\d+)px/gi);

    for (const match of radiusMatches) {
      const value = match[1] || match[2] || match[3];
      if (value) {
        if (!componentRadii[componentName]) {
          componentRadii[componentName] = [];
        }
        componentRadii[componentName].push(value + 'px');
      }
    }
  }

  // Verify each specific border-radius claim
  for (const claim of claims) {
    if (claim.type === 'border-radius-consistency-claim') {
      // Check if there's still a "consistent" claim - this is problematic
      const uniqueRadii = new Set();
      for (const radii of Object.values(componentRadii)) {
        radii.forEach(r => uniqueRadii.add(r));
      }

      if (uniqueRadii.size > 1) {
        results.mismatches.push({
          type: 'border-radius-consistency',
          claim: claim.claim,
          actual: `Multiple values: ${[...uniqueRadii].join(', ')}`,
          message: `Claim "${claim.claim}" is false - components use different values`
        });
      }
    } else if (claim.type === 'border-radius-specific') {
      // Verify specific claims like "buttons: 8px"
      const context = claim.context;
      let matched = false;

      // Map context to component names
      const contextToComponents = {
        'buttons': ['button'],
        'badges, toasts, tooltips': ['badge', 'toast', 'tooltip'],
        'pill shapes (filterbar)': ['filterbar']
      };

      const componentsToCheck = contextToComponents[context] || [];

      for (const compName of componentsToCheck) {
        if (componentRadii[compName]) {
          const uniqueVals = [...new Set(componentRadii[compName])];
          if (uniqueVals.includes(claim.value)) {
            matched = true;
          } else {
            results.mismatches.push({
              ...claim,
              actual: uniqueVals.join(', '),
              message: `Border-radius for ${context}: Guidelines says ${claim.value}, docs say ${uniqueVals.join(', ')}`
            });
            return;
          }
        }
      }

      if (matched) {
        results.verified.push({
          ...claim,
          message: `Border-radius for ${context} = ${claim.value} verified`
        });
      } else if (componentsToCheck.length > 0) {
        results.notFound.push({
          ...claim,
          message: `No border-radius found in docs for ${context}`
        });
      }
    }
  }
}

/**
 * Verify spacing claims
 */
function verifySpacing(claim) {
  const spacingDoc = path.join(DOCS_DIR, 'foundations', 'spacing.md');

  if (!fs.existsSync(spacingDoc)) {
    results.notFound.push({
      ...claim,
      message: `spacing.md not found`
    });
    return;
  }

  const content = fs.readFileSync(spacingDoc, 'utf-8');
  const tokenPattern = new RegExp(`${claim.token}[^\\d]*(${claim.value.replace('px', '')}|\\d+)\\s*px`, 'i');

  if (content.toLowerCase().includes(claim.token.toLowerCase()) && content.includes(claim.value)) {
    results.verified.push({
      ...claim,
      source: 'docs/foundations/spacing.md',
      message: `Spacing ${claim.token} = ${claim.value} verified`
    });
  } else if (content.toLowerCase().includes(claim.token.toLowerCase())) {
    // Token exists but value might differ
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.toLowerCase().includes(claim.token.toLowerCase())) {
        const valueMatch = line.match(/(\d+)\s*px/);
        if (valueMatch && valueMatch[1] + 'px' !== claim.value) {
          results.mismatches.push({
            ...claim,
            actual: valueMatch[1] + 'px',
            message: `Spacing ${claim.token}: Guidelines says ${claim.value}, docs say ${valueMatch[1]}px`
          });
          return;
        }
      }
    }
    results.verified.push({
      ...claim,
      source: 'docs/foundations/spacing.md',
      message: `Spacing ${claim.token} = ${claim.value} verified`
    });
  } else {
    results.notFound.push({
      ...claim,
      message: `Spacing token ${claim.token} not found in docs`
    });
  }
}

/**
 * Main validation function
 */
function validate() {
  console.log('='.repeat(60));
  console.log('Guidelines.md Validation Report');
  console.log('='.repeat(60));
  console.log('');

  if (!fs.existsSync(GUIDELINES_PATH)) {
    console.error('Error: Guidelines.md not found at', GUIDELINES_PATH);
    process.exit(1);
  }

  const guidelinesContent = fs.readFileSync(GUIDELINES_PATH, 'utf-8');

  // Extract all claims
  const colorClaims = extractColorClaims(guidelinesContent);
  const typographyClaims = extractTypographyClaims(guidelinesContent);
  const spacingClaims = extractSpacingClaims(guidelinesContent);
  const borderRadiusClaims = extractBorderRadiusClaims(guidelinesContent);

  console.log(`Found claims to verify:`);
  console.log(`  - Colors: ${colorClaims.length}`);
  console.log(`  - Typography: ${typographyClaims.length}`);
  console.log(`  - Spacing: ${spacingClaims.length}`);
  console.log(`  - Border-radius: ${borderRadiusClaims.length}`);
  console.log('');

  // Verify each claim type
  console.log('Verifying colors...');
  colorClaims.forEach(verifyColor);

  console.log('Verifying spacing...');
  spacingClaims.forEach(verifySpacing);

  console.log('Verifying border-radius claims...');
  verifyBorderRadiusClaims(borderRadiusClaims);

  // Print results
  console.log('');
  console.log('='.repeat(60));
  console.log('RESULTS');
  console.log('='.repeat(60));

  console.log('');
  console.log(`Verified (${results.verified.length}):`);
  results.verified.forEach(r => {
    console.log(`  [OK] ${r.message}`);
  });

  if (results.mismatches.length > 0) {
    console.log('');
    console.log(`Mismatches (${results.mismatches.length}):`);
    results.mismatches.forEach(r => {
      console.log(`  [X] ${r.message}`);
      if (r.breakdown) {
        r.breakdown.forEach(b => console.log(`      - ${b}`));
      }
    });
  }

  if (results.notFound.length > 0) {
    console.log('');
    console.log(`Not Found (${results.notFound.length}):`);
    results.notFound.forEach(r => {
      console.log(`  [?] ${r.message}`);
    });
  }

  // Summary
  console.log('');
  console.log('='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`  Verified:   ${results.verified.length}`);
  console.log(`  Mismatches: ${results.mismatches.length}`);
  console.log(`  Not Found:  ${results.notFound.length}`);

  if (results.mismatches.length > 0) {
    console.log('');
    console.log('Guidelines.md contains inaccurate claims that need correction.');
    process.exit(1);
  } else {
    console.log('');
    console.log('All verifiable claims in Guidelines.md are accurate.');
    process.exit(0);
  }
}

// Run validation
validate();
