#!/usr/bin/env node

/**
 * Setup OpenAI Assistant for GDS
 *
 * This script:
 * 1. Creates an OpenAI Assistant
 * 2. Configures it with GDS-specific instructions
 * 3. Attaches the Vector Store for retrieval
 * 4. Saves the Assistant ID to .env
 */

import OpenAI from 'openai';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const ASSISTANT_INSTRUCTIONS = `You are the GDS (Global Design System) Assistant, an expert on design system documentation.

Your role is to help designers find and understand:
- Component documentation (buttons, inputs, dropdowns, etc.)
- Design tokens (colors, spacing, typography)
- Usage guidelines and best practices
- Accessibility requirements
- Implementation details

When answering questions:
1. Always cite the specific documentation files you used
2. Be concise but comprehensive
3. Format design tokens clearly (name, value, usage)
4. Include relevant examples when helpful
5. Mention related components when applicable

If asked about a component:
- Describe its purpose and when to use it
- List available variants and states
- Provide design token values (colors, spacing, etc.)
- Include accessibility information
- Link to related components

If asked about design tokens:
- Provide the token name, value (hex, px, etc.)
- Explain where and when to use it
- List components that use this token

Always be helpful, accurate, and reference the documentation as your source of truth.`;

async function setupAssistant() {
  try {
    if (!process.env.OPENAI_FILE_IDS) {
      console.error('❌ Error: OPENAI_FILE_IDS not set in .env');
      console.error('Please run: npm run upload-docs first');
      process.exit(1);
    }

    console.log('🤖 Creating OpenAI Assistant...\n');

    // Get file IDs
    const fileIds = process.env.OPENAI_FILE_IDS.split(',').slice(0, 20); // Max 20 files per assistant

    const assistant = await openai.beta.assistants.create({
      name: process.env.ASSISTANT_NAME || 'GDS Design Assistant',
      instructions: ASSISTANT_INSTRUCTIONS,
      model: 'gpt-4o',
      tools: [
        { type: 'file_search' }
      ],
      tool_resources: {
        file_search: {
          vector_stores: [{
            file_ids: fileIds
          }]
        }
      },
      temperature: 0.3,
      top_p: 0.9
    });

    console.log(`✅ Assistant created: ${assistant.id}\n`);

    // Update .env file
    const envPath = join(__dirname, '../.env');
    let envContent = readFileSync(envPath, 'utf-8');

    // Update or add ASSISTANT_ID
    if (envContent.includes('OPENAI_ASSISTANT_ID=')) {
      envContent = envContent.replace(
        /OPENAI_ASSISTANT_ID=.*/,
        `OPENAI_ASSISTANT_ID=${assistant.id}`
      );
    } else {
      envContent += `\nOPENAI_ASSISTANT_ID=${assistant.id}\n`;
    }

    writeFileSync(envPath, envContent);
    console.log('📝 Updated .env with Assistant ID\n');

    console.log('═══════════════════════════════════════');
    console.log('✅ Assistant setup complete!');
    console.log('═══════════════════════════════════════');
    console.log(`Assistant ID: ${assistant.id}`);
    console.log(`Model: ${assistant.model}`);
    console.log(`Files: ${fileIds.length}`);
    console.log(`\nNext step: Install frontend`);
    console.log('npm run frontend:install');
    console.log('═══════════════════════════════════════\n');

    return assistant;
  } catch (error) {
    console.error('❌ Error creating assistant:', error.message);
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

  setupAssistant();
}

export { setupAssistant };
