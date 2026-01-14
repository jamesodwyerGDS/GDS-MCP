#!/usr/bin/env node

/**
 * Simplified Upload - Just upload files for assistant
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

async function uploadDocs() {
  try {
    console.log('🔍 Scanning documentation files...\n');

    const markdownFiles = await getAllMarkdownFiles(DOCS_PATH);
    console.log(`Found ${markdownFiles.length} markdown files\n`);

    console.log('📤 Uploading files to OpenAI...\n');
    const uploadedFiles = [];

    // Upload files
    for (let i = 0; i < markdownFiles.length; i++) {
      const filePath = markdownFiles[i];
      const relativePath = filePath.replace(DOCS_PATH, '').replace(/^\//, '');
      console.log(`  [${i + 1}/${markdownFiles.length}] ${relativePath}`);

      try {
        const uploadedFile = await openai.files.create({
          file: createReadStream(filePath),
          purpose: 'assistants'
        });
        uploadedFiles.push(uploadedFile.id);

        // Small delay to avoid rate limits
        if (i % 10 === 0 && i > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`  ⚠️  Failed: ${error.message}`);
      }
    }

    console.log(`\n✅ Uploaded ${uploadedFiles.length} files\n`);

    // Save file IDs
    const envPath = join(__dirname, '../.env');
    let envContent = readFileSync(envPath, 'utf-8');

    // Save as comma-separated list
    const fileIdsStr = uploadedFiles.join(',');

    if (envContent.includes('OPENAI_FILE_IDS=')) {
      envContent = envContent.replace(
        /OPENAI_FILE_IDS=.*/,
        `OPENAI_FILE_IDS=${fileIdsStr}`
      );
    } else {
      envContent += `\nOPENAI_FILE_IDS=${fileIdsStr}\n`;
    }

    writeFileSync(envPath, envContent);
    console.log('📝 Saved file IDs to .env\n');

    console.log('═══════════════════════════════════════');
    console.log('✅ Documentation upload complete!');
    console.log('═══════════════════════════════════════');
    console.log(`Files: ${uploadedFiles.length}`);
    console.log(`\nNext step: npm run setup-assistant`);
    console.log('═══════════════════════════════════════\n');

    return uploadedFiles;
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY not set in .env file');
    process.exit(1);
  }

  uploadDocs();
}

export { uploadDocs };
