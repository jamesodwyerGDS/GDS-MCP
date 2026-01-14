#!/usr/bin/env node

/**
 * Upload GDS Documentation to OpenAI Vector Store
 *
 * This script:
 * 1. Scans the ../docs directory
 * 2. Uploads all markdown files to OpenAI
 * 3. Creates a Vector Store for retrieval
 * 4. Saves the Vector Store ID to .env
 */

import OpenAI from 'openai';
import { readdirSync, statSync, readFileSync, writeFileSync, createReadStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_PATH = join(__dirname, '../../docs');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function getAllMarkdownFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      getAllMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

async function uploadDocsToVectorStore() {
  try {
    console.log('🔍 Scanning documentation files...\n');

    const markdownFiles = await getAllMarkdownFiles(DOCS_PATH);
    console.log(`Found ${markdownFiles.length} markdown files\n`);

    // Create a new vector store
    console.log('📦 Creating Vector Store...');
    const vectorStore = await openai.beta.vectorStores.create({
      name: 'GDS Documentation',
      expires_after: {
        anchor: 'last_active_at',
        days: 365
      }
    });
    console.log(`✅ Vector Store created: ${vectorStore.id}\n`);

    // Upload files in batches
    console.log('📤 Uploading files (this may take a few minutes)...\n');
    const uploadedFiles = [];

    // Upload in smaller batches to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < markdownFiles.length; i += batchSize) {
      const batch = markdownFiles.slice(i, i + batchSize);

      for (const filePath of batch) {
        const relativePath = filePath.replace(DOCS_PATH, '').replace(/^\//, '');
        console.log(`  [${i + uploadedFiles.length + 1}/${markdownFiles.length}] ${relativePath}`);

        try {
          const uploadedFile = await openai.files.create({
            file: createReadStream(filePath),
            purpose: 'assistants'
          });
          uploadedFiles.push(uploadedFile);
        } catch (error) {
          console.error(`  ⚠️  Failed: ${error.message}`);
        }
      }

      // Small delay between batches
      if (i + batchSize < markdownFiles.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log(`\n✅ Uploaded ${uploadedFiles.length} files\n`);

    // Add files to vector store
    console.log('🔗 Adding files to Vector Store...');
    await openai.beta.vectorStores.fileBatches.createAndPoll(
      vectorStore.id,
      {
        file_ids: uploadedFiles.map(f => f.id)
      }
    );
    console.log('✅ Files added to Vector Store\n');

    // Update .env file
    const envPath = join(__dirname, '../.env');
    let envContent = '';

    try {
      envContent = readFileSync(envPath, 'utf-8');
    } catch (e) {
      // .env doesn't exist, create from example
      envContent = readFileSync(join(__dirname, '../.env.example'), 'utf-8');
    }

    // Update or add VECTOR_STORE_ID
    if (envContent.includes('OPENAI_VECTOR_STORE_ID=')) {
      envContent = envContent.replace(
        /OPENAI_VECTOR_STORE_ID=.*/,
        `OPENAI_VECTOR_STORE_ID=${vectorStore.id}`
      );
    } else {
      envContent += `\nOPENAI_VECTOR_STORE_ID=${vectorStore.id}\n`;
    }

    writeFileSync(envPath, envContent);
    console.log('📝 Updated .env with Vector Store ID\n');

    console.log('═══════════════════════════════════════');
    console.log('✅ Documentation upload complete!');
    console.log('═══════════════════════════════════════');
    console.log(`Vector Store ID: ${vectorStore.id}`);
    console.log(`Files: ${uploadedFiles.length}`);
    console.log(`\nNext step: Run 'npm run setup-assistant'`);
    console.log('═══════════════════════════════════════\n');

    return vectorStore;
  } catch (error) {
    console.error('❌ Error uploading docs:', error.message);
    if (error.response) {
      console.error('API Error:', error.response.data);
    }
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY not set in .env file');
    process.exit(1);
  }

  uploadDocsToVectorStore();
}

export { uploadDocsToVectorStore };
