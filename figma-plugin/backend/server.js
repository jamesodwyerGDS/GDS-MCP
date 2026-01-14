import Anthropic from '@anthropic-ai/sdk';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// Load GDS documentation context
function loadGDSContext() {
  const docsPath = join(__dirname, '../../docs');
  let context = '';

  try {
    // Load foundations
    context += '\n## FOUNDATIONS\n\n';
    const foundationsPath = join(docsPath, 'foundations');
    const foundations = readdirSync(foundationsPath).filter(f => f.endsWith('.md'));
    for (const file of foundations) {
      const content = readFileSync(join(foundationsPath, file), 'utf-8');
      context += `### ${file.replace('.md', '').toUpperCase()}\n${content}\n\n`;
    }

    // Load components
    context += '\n## COMPONENTS\n\n';
    const componentsPath = join(docsPath, 'components');
    const categories = readdirSync(componentsPath).filter(f => {
      const stat = statSync(join(componentsPath, f));
      return stat.isDirectory();
    });

    for (const category of categories) {
      const categoryPath = join(componentsPath, category);
      const components = readdirSync(categoryPath).filter(f => f.endsWith('.md'));
      for (const file of components) {
        const content = readFileSync(join(categoryPath, file), 'utf-8');
        // Extract just the key sections to keep context manageable
        const name = file.replace('.md', '');
        const summaryContent = extractKeySections(content);
        context += `### ${name.toUpperCase()} (${category})\n${summaryContent}\n\n`;
      }
    }

    // Load patterns
    context += '\n## PATTERNS\n\n';
    const patternsPath = join(docsPath, 'patterns');
    if (statSync(patternsPath).isDirectory()) {
      const patterns = readdirSync(patternsPath).filter(f => f.endsWith('.md'));
      for (const file of patterns) {
        const content = readFileSync(join(patternsPath, file), 'utf-8');
        context += `### ${file.replace('.md', '').toUpperCase()}\n${content}\n\n`;
      }
    }
  } catch (error) {
    console.error('Error loading GDS context:', error);
    context = 'GDS documentation could not be loaded.';
  }

  return context;
}

// Extract key sections from component docs to keep context size reasonable
function extractKeySections(content) {
  const sections = [];

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    sections.push('**Metadata:**\n```yaml\n' + frontmatterMatch[1] + '\n```');
  }

  // Extract Overview
  const overviewMatch = content.match(/## Overview\n([\s\S]*?)(?=\n## |$)/);
  if (overviewMatch) {
    sections.push('**Overview:** ' + overviewMatch[1].trim().substring(0, 500));
  }

  // Extract Variants
  const variantsMatch = content.match(/## Variants\n([\s\S]*?)(?=\n## |$)/);
  if (variantsMatch) {
    sections.push('**Variants:** ' + variantsMatch[1].trim().substring(0, 400));
  }

  // Extract Accessibility
  const a11yMatch = content.match(/## Accessibility\n([\s\S]*?)(?=\n## |$)/);
  if (a11yMatch) {
    sections.push('**Accessibility:** ' + a11yMatch[1].trim().substring(0, 300));
  }

  // Extract Do's and Don'ts
  const dosMatch = content.match(/## Do's and Don'ts\n([\s\S]*?)(?=\n## |$)/);
  if (dosMatch) {
    sections.push('**Do\'s and Don\'ts:** ' + dosMatch[1].trim().substring(0, 400));
  }

  return sections.join('\n\n');
}

// Build system prompt with GDS context
function buildSystemPrompt(gdsContext) {
  return `You are the GDS Helper, an AI assistant embedded in Figma to help designers work with the Global Design System (GDS).

## Your Role
- Help designers understand and apply GDS components, tokens, and patterns correctly
- Provide guidance on spacing, typography, colors, and accessibility
- Answer questions about when to use specific components and their variants
- Give feedback on whether designs follow GDS guidelines
- Suggest improvements based on design system best practices

## Your Knowledge Base
You have access to the complete GDS documentation including:
- **Foundations**: Color, typography, spacing, and elevation tokens
- **Components**: Atoms, molecules, and organisms with their variants and usage guidelines
- **Patterns**: Reusable design patterns and guidelines

## Response Guidelines
- Be concise - designers are busy and want quick answers
- Reference specific token values when discussing spacing, colors, or typography
- When a designer asks "what is this?", analyze the Figma selection context provided
- If something doesn't follow GDS guidelines, explain why and suggest the correct approach
- Use bullet points for clarity
- Reference specific component documentation when relevant

## GDS Documentation Context

${gdsContext}

---

When designers ask about their current selection, you'll receive context about the selected Figma layers including their properties (size, colors, fonts, spacing, etc.). Use this to provide specific, actionable feedback.`;
}

// Load GDS context at startup
console.log('Loading GDS documentation...');
const gdsContext = loadGDSContext();
const systemPrompt = buildSystemPrompt(gdsContext);
console.log(`GDS context loaded (${Math.round(systemPrompt.length / 1000)}k characters)`);

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, selectionContext, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build messages array with conversation history
    const messages = [];

    // Add conversation history
    for (const msg of history.slice(-8)) { // Keep last 8 messages
      messages.push({
        role: msg.role,
        content: msg.content
      });
    }

    // Add current message with selection context
    let userMessage = message;
    if (selectionContext && !selectionContext.includes('No elements')) {
      userMessage = `${selectionContext}\n\n---\n\nUser question: ${message}`;
    }

    messages.push({
      role: 'user',
      content: userMessage
    });

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages
    });

    // Extract text response
    const textContent = response.content.find(block => block.type === 'text');
    const responseText = textContent ? textContent.text : 'I could not generate a response.';

    res.json({ response: responseText });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to process request'
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', gdsContextLoaded: gdsContext.length > 0 });
});

// Start server
app.listen(PORT, () => {
  console.log(`GDS Helper backend running on http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log(`  POST /api/chat - Send chat messages`);
  console.log(`  GET /health - Health check`);
});
