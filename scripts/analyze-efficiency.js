#!/usr/bin/env node

/**
 * Analyze Documentation Efficiency
 *
 * Identifies opportunities to improve documentation retrieval:
 * - Coverage gaps between doc sets
 * - Components missing from unified docs
 * - Stale documentation
 * - Search term opportunities
 *
 * Usage: npm run analyze
 */

import fs from 'fs/promises';
import path from 'path';

async function analyze() {
  console.log('='.repeat(60));
  console.log('GDS Documentation Efficiency Analysis');
  console.log('='.repeat(60));
  console.log('');

  const report = {
    coverage: await analyzeCoverage(),
    gaps: await analyzeGaps(),
    staleness: await analyzeStaleness(),
    suggestions: []
  };

  // Generate suggestions
  if (report.gaps.missingDesign.length > 5) {
    report.suggestions.push(`${report.gaps.missingDesign.length} Storybook components lack design docs - consider generating from Figma`);
  }

  if (report.staleness.staleUnified) {
    report.suggestions.push('Unified docs are stale - run unified:generate');
  }

  // Print report
  console.log('## Coverage');
  console.log(`- Design docs: ${report.coverage.design}`);
  console.log(`- Storybook docs: ${report.coverage.storybook}`);
  console.log(`- Unified docs: ${report.coverage.unified}`);
  console.log('');

  console.log('## Gaps');
  if (report.gaps.missingDesign.length > 0) {
    console.log(`Missing design docs (${report.gaps.missingDesign.length}):`);
    report.gaps.missingDesign.slice(0, 10).forEach(c => console.log(`  - ${c}`));
    if (report.gaps.missingDesign.length > 10) {
      console.log(`  ... and ${report.gaps.missingDesign.length - 10} more`);
    }
  }
  console.log('');

  console.log('## Suggestions');
  if (report.suggestions.length === 0) {
    console.log('No efficiency improvements needed!');
  } else {
    report.suggestions.forEach((s, i) => console.log(`${i + 1}. ${s}`));
  }
  console.log('');

  // Write JSON report
  const reportPath = './efficiency-report.json';
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
  console.log(`Full report saved to: ${reportPath}`);

  return report;
}

async function analyzeCoverage() {
  const count = async (dir, ext) => {
    try {
      const files = await fs.readdir(dir);
      return files.filter(f => f.endsWith(ext)).length;
    } catch {
      return 0;
    }
  };

  return {
    design: await count('./docs/components/atoms', '.md'),
    storybook: await count('./docs-storybook/components', '.md'),
    unified: await count('./docs-unified/components', '.md')
  };
}

async function analyzeGaps() {
  const getNames = async (dir, ext) => {
    try {
      const files = await fs.readdir(dir);
      return files.filter(f => f.endsWith(ext)).map(f => f.replace(ext, '').toLowerCase());
    } catch {
      return [];
    }
  };

  const designNames = await getNames('./docs/components/atoms', '.md');
  const storybookNames = await getNames('./docs-storybook/components', '.md');

  return {
    missingDesign: storybookNames.filter(n => !designNames.some(d => d.includes(n) || n.includes(d))),
    missingStorybook: designNames.filter(n => !storybookNames.some(s => s.includes(n) || n.includes(s)))
  };
}

async function analyzeStaleness() {
  const getMtime = async (file) => {
    try {
      const stat = await fs.stat(file);
      return stat.mtime.getTime();
    } catch {
      return 0;
    }
  };

  const unifiedTime = await getMtime('./docs-unified/index.md');
  const designTime = await getMtime('./docs/llms.txt');
  const storybookTime = await getMtime('./docs-storybook/llms.txt');

  return {
    staleUnified: unifiedTime < Math.max(designTime, storybookTime),
    lastUnifiedUpdate: new Date(unifiedTime).toISOString(),
    lastDesignUpdate: new Date(designTime).toISOString(),
    lastStorybookUpdate: new Date(storybookTime).toISOString()
  };
}

analyze().catch(console.error);
