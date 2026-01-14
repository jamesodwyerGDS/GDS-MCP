/**
 * Fast Chat API - Direct GPT-4 with Structured Outputs
 * Uses OpenAI's JSON Schema for 100% reliable markdown formatting
 */

import OpenAI from 'openai';
import { readdirSync, statSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { DESIGN_DOC_SCHEMA } from './schemas/design-doc-schema.js';
import { jsonToMarkdown } from './utils/json-to-markdown.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_PATH = join(__dirname, '../../docs');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Improved search with better component matching
function searchDocs(query) {
  const results = [];
  const searchLower = query.toLowerCase();

  // Extract potential component names from query
  const componentKeywords = ['component', 'button', 'input', 'field', 'badge', 'modal', 'dropdown',
    'picker', 'date', 'alert', 'tooltip', 'toggle', 'checkbox', 'radio', 'stepper', 'accordion',
    'card', 'pill', 'filter', 'pagination', 'toast', 'spinner', 'loading'];

  const queryWords = searchLower.split(/\s+/);
  const hasComponentKeyword = componentKeywords.some(kw => searchLower.includes(kw));

  function scanDir(dir, depth = 0) {
    const items = readdirSync(dir);
    for (const item of items) {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory() && depth < 3) {
        scanDir(fullPath, depth + 1);
      } else if (item.endsWith('.md')) {
        try {
          const content = readFileSync(fullPath, 'utf-8');
          const { data: frontmatter, content: markdown } = matter(content);

          const name = (frontmatter.name || item.replace('.md', '')).toLowerCase();
          const desc = (frontmatter.description || '').toLowerCase();
          const filename = item.toLowerCase();

          // Calculate relevance score
          let relevance = 0;

          queryWords.forEach(word => {
            if (name.includes(word)) relevance += 20;
            if (filename.includes(word)) relevance += 15;
            if (desc.includes(word)) relevance += 10;
          });

          if (fullPath.includes('/components/')) relevance += 5;
          if (hasComponentKeyword && fullPath.includes('/components/atoms/')) relevance += 10;
          if (markdown.toLowerCase().includes(searchLower)) relevance += 3;

          if (relevance > 0) {
            results.push({
              name: frontmatter.name || item.replace('.md', ''),
              path: fullPath.replace(DOCS_PATH, '').replace(/^\//, ''),
              content: markdown.substring(0, 4000),
              relevance
            });
          }
        } catch (e) {
          // Skip files that can't be read
        }
      }
    }
  }

  scanDir(DOCS_PATH);
  return results.sort((a, b) => b.relevance - a.relevance).slice(0, 5);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Find relevant docs
    const relevantDocs = searchDocs(message);

    // Build context
    let context = `You are the GDS Design Assistant. Answer questions using ONLY the provided documentation.

# Documentation:

`;
    const sources = [];

    relevantDocs.forEach(doc => {
      context += `## ${doc.name}\n${doc.content}\n\n---\n\n`;
      sources.push({ filename: doc.path, name: doc.name });
    });

    // Build messages with simplified JSON-focused prompt
    const messages = [
      {
        role: 'system',
        content: context + `

# Response Format

Return your answer as JSON with this exact structure:

{
  "componentName": "Name of component/token/concept",
  "description": "One or two sentence description",
  "sections": [
    {
      "heading": "Section title (e.g., 'When to Use', 'Variants')",
      "type": "list" | "table" | "paragraph",
      "content": <depends on type>
    }
  ]
}

## Content Types:

**list**: Array of strings for bullet points
Example: ["For single-line text entry", "For collecting user input"]

**table**: Object with "headers" array and "rows" array
Example: {
  "headers": ["Variant", "Description"],
  "rows": [
    ["Primary", "High emphasis action"],
    ["Secondary", "Medium emphasis action"]
  ]
}

**paragraph**: Plain text string

## Required Sections for Components:
1. When to Use (type: list)
2. When Not to Use (type: list)
3. Variants (type: table, headers: ["Variant", "Description"])
4. Anatomy (type: table, headers: ["Part", "Description"])
5. Design Tokens (type: table, headers: ["Token", "Value", "Preview", "Usage"])
6. Accessibility (type: list)

## Required Sections for Tokens:
1. Available Tokens (type: table, headers: ["Token", "Value", "Usage"])

Answer based ONLY on the documentation provided above.`
      },
      ...history.map(h => ({ role: h.role, content: h.content })),
      { role: 'user', content: message }
    ];

    // Call OpenAI with Structured Outputs (100% reliable)
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-2024-08-06', // Required for structured outputs
      messages,
      temperature: 0,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "design_documentation",
          strict: true,
          schema: DESIGN_DOC_SCHEMA
        }
      }
    });

    // Parse JSON response (guaranteed valid by OpenAI)
    const structuredData = JSON.parse(completion.choices[0].message.content);

    // Convert JSON to markdown (100% deterministic)
    const markdown = jsonToMarkdown(structuredData);

    return res.status(200).json({
      response: markdown,
      sources,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({
      error: 'Failed to process message',
      details: error.message
    });
  }
}
