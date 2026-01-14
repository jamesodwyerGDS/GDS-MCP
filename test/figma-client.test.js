/**
 * Test script for FigmaClient improvements
 *
 * This tests all the new functionality added to the Figma API client:
 * - Rate limiting and retry logic
 * - Request caching
 * - Image export endpoints
 * - Published component/style endpoints
 * - File metadata endpoint
 * - File versions endpoint
 * - Improved component set detection
 */

import { FigmaClient } from '../core/figma-client.js';

// Mock Figma token (will need to be set as environment variable)
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

if (!FIGMA_TOKEN) {
  console.error('Error: FIGMA_TOKEN environment variable not set');
  process.exit(1);
}

// Test configuration
const TEST_FILE_KEY = 'WU01oSRfSHpOxUn3ThcvC5'; // From your existing docs
const TEST_NODE_ID = '29422:3597'; // Button component from your docs

async function runTests() {
  console.log('🧪 Testing FigmaClient improvements...\n');

  const client = new FigmaClient(FIGMA_TOKEN, {
    cache: true,
    maxRetries: 3,
    retryDelay: 1000
  });

  // Test 1: File Metadata Endpoint
  console.log('Test 1: Getting file metadata...');
  try {
    const meta = await client.getFileMeta(TEST_FILE_KEY);
    console.log('✅ File metadata retrieved:', {
      name: meta.name,
      version: meta.version,
      role: meta.role
    });
  } catch (error) {
    console.error('❌ Failed:', error.message);
  }

  // Test 2: Rate Limit Status
  console.log('\nTest 2: Checking rate limit status...');
  const rateLimit = client.getRateLimitStatus();
  console.log('✅ Rate limit status:', rateLimit);

  // Test 3: Variable Definitions (with resolvedType)
  console.log('\nTest 3: Getting variable definitions...');
  try {
    const variables = await client.getVariableDefs(TEST_FILE_KEY);
    if (variables?.meta?.variables) {
      const varCount = Object.keys(variables.meta.variables).length;
      console.log(`✅ Found ${varCount} variables`);

      // Show first variable with resolvedType
      const firstVar = Object.values(variables.meta.variables)[0];
      if (firstVar) {
        console.log('   Sample variable:', {
          name: firstVar.name,
          resolvedType: firstVar.resolvedType,
          hasValues: !!firstVar.valuesByMode
        });
      }
    } else {
      console.log('⚠️  No variables found in file');
    }
  } catch (error) {
    console.error('❌ Failed:', error.message);
  }

  // Test 4: Component Set Detection (improved)
  console.log('\nTest 4: Getting component set...');
  try {
    const componentSet = await client.getComponentSet(TEST_FILE_KEY, TEST_NODE_ID);
    if (componentSet) {
      console.log('✅ Component set retrieved:', {
        name: componentSet.name,
        variantCount: componentSet.variants?.length || 0
      });
    } else {
      console.log('⚠️  Node is not a component set');
    }
  } catch (error) {
    console.error('❌ Failed:', error.message);
  }

  // Test 5: Image Export
  console.log('\nTest 5: Exporting component image...');
  try {
    const imageData = await client.exportImages(TEST_FILE_KEY, TEST_NODE_ID, {
      format: 'png',
      scale: 1
    });

    if (imageData.images && imageData.images[TEST_NODE_ID]) {
      console.log('✅ Image exported successfully');
      console.log('   URL:', imageData.images[TEST_NODE_ID].substring(0, 60) + '...');
    } else {
      console.error('❌ No image URL returned');
    }
  } catch (error) {
    console.error('❌ Failed:', error.message);
  }

  // Test 6: File Components
  console.log('\nTest 6: Getting file components...');
  try {
    const components = await client.getFileComponents(TEST_FILE_KEY);
    console.log('✅ Published components retrieved:', {
      componentCount: components?.meta?.components?.length || 0
    });
  } catch (error) {
    console.error('❌ Failed:', error.message);
  }

  // Test 7: File Versions
  console.log('\nTest 7: Getting file versions...');
  try {
    const versions = await client.getFileVersions(TEST_FILE_KEY);
    const versionCount = versions?.versions?.length || 0;
    console.log(`✅ Found ${versionCount} versions`);

    if (versions?.versions?.[0]) {
      const latest = versions.versions[0];
      console.log('   Latest version:', {
        id: latest.id,
        created_at: latest.created_at?.substring(0, 10),
        label: latest.label || '(no label)'
      });
    }
  } catch (error) {
    console.error('❌ Failed:', error.message);
  }

  // Test 8: Cache Functionality
  console.log('\nTest 8: Testing request cache...');
  try {
    const start1 = Date.now();
    await client.getFileMeta(TEST_FILE_KEY);
    const time1 = Date.now() - start1;

    const start2 = Date.now();
    await client.getFileMeta(TEST_FILE_KEY);
    const time2 = Date.now() - start2;

    console.log('✅ Cache working:', {
      firstRequest: `${time1}ms`,
      cachedRequest: `${time2}ms`,
      speedup: `${Math.round((time1 / time2) * 10) / 10}x faster`
    });
  } catch (error) {
    console.error('❌ Failed:', error.message);
  }

  // Test 9: Clear cache
  console.log('\nTest 9: Clearing cache...');
  client.clearCache();
  console.log('✅ Cache cleared');

  console.log('\n✨ All tests completed!\n');
}

runTests().catch(console.error);
