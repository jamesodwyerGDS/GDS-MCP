#!/usr/bin/env node

/**
 * Regenerate Alert component documentation using improved API
 * This demonstrates the new features:
 * - Image export
 * - Proper variable extraction with resolvedType
 * - Rate limiting and caching
 */

import { DocumentationGenerator } from '../core/documentation-generator.js';

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

if (!FIGMA_TOKEN) {
  console.error('❌ Error: FIGMA_TOKEN environment variable not set');
  console.error('Set it with: export FIGMA_TOKEN=your_token_here');
  process.exit(1);
}

// Alert component details
const ALERT_FIGMA_URL = 'https://figma.com/design/WU01oSRfSHpOxUn3ThcvC5/File?node-id=10410-52040';

async function regenerateAlert() {
  console.log('🚀 Regenerating Alert component documentation with improved API...\n');

  // Initialize generator with new features enabled
  const generator = new DocumentationGenerator(FIGMA_TOKEN, {
    outputDir: './docs/components',
    exportImages: true,        // Enable image export
    imageFormat: 'png',
    imageScale: 2,
    figmaClientOptions: {
      cache: true,             // Enable caching
      maxRetries: 3,           // Retry on failures
      retryDelay: 1000
    },
    notifySlack: false
  });

  try {
    console.log('📥 Fetching component data from Figma...');
    console.log(`   File: WU01oSRfSHpOxUn3ThcvC5`);
    console.log(`   Node: 10410:52040\n`);

    const result = await generator.generate(ALERT_FIGMA_URL);

    console.log('\n✅ Documentation generated successfully!\n');
    console.log('📄 Details:');
    console.log(`   Component: ${result.name}`);
    console.log(`   Category: ${result.category}`);
    console.log(`   Path: ${result.path}`);
    if (result.imageUrl) {
      console.log(`   Image: ${result.imageUrl.substring(0, 60)}...`);
    }

    // Show rate limit status
    const rateLimit = generator.figma.getRateLimitStatus();
    console.log('\n⚡ Rate limit status:');
    console.log(`   Remaining: ${rateLimit.remaining || 'Unknown'}`);
    if (rateLimit.resetAt) {
      console.log(`   Resets at: ${rateLimit.resetAt.toLocaleTimeString()}`);
    }

    console.log('\n📝 Next steps:');
    console.log('   1. Review the generated documentation');
    console.log('   2. Update CHANGELOG.md with this change');
    console.log('   3. Commit the updated documentation\n');

  } catch (error) {
    console.error('\n❌ Error generating documentation:', error.message);

    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Message:', error.response.data?.err || error.response.statusText);
    }

    process.exit(1);
  }
}

regenerateAlert();
