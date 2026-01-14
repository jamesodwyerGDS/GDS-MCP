#!/usr/bin/env node

/**
 * GDS Slack Bot
 * A Slack bot that helps designers query the Global Design System.
 *
 * Supports two modes:
 * 1. HTTP MCP Server (set MCP_SERVER_URL in .env)
 * 2. Local file-based access (no MCP server needed)
 */

import { App } from '@slack/bolt';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import http from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_PATH = join(__dirname, '../docs');

class MCPClient {
  constructor(serverUrl = null) {
    this.serverUrl = serverUrl;
    this.requestId = 0;
    this.useLocalFiles = !serverUrl;
  }

  async start() {
    if (this.useLocalFiles) {
      console.log('✅ Using local file-based access (no MCP server needed)');
      return;
    }

    // Test HTTP connection
    try {
      const response = await fetch(this.serverUrl);
      if (response.ok) {
        console.log('✅ MCP Server connection successful');
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.warn(`⚠️  MCP Server not available, falling back to local files: ${error.message}`);
      this.useLocalFiles = true;
    }
  }

  // Local file-based implementations
  async searchDocsLocal(query, limit = 5) {
    const results = [];
    const searchTerm = query.toLowerCase();

    const searchInDirectory = (dir) => {
      const items = readdirSync(dir);

      for (const item of items) {
        const fullPath = join(dir, item);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
          searchInDirectory(fullPath);
        } else if (item.endsWith('.md')) {
          try {
            const content = readFileSync(fullPath, 'utf-8');
            const { data: frontmatter, content: markdown } = matter(content);

            const nameMatch = (frontmatter.name || item).toLowerCase().includes(searchTerm);
            const contentMatch = markdown.toLowerCase().includes(searchTerm);

            if (nameMatch || contentMatch) {
              const relevance = nameMatch ? 80 : 40;
              results.push({
                name: frontmatter.name || item.replace('.md', ''),
                path: fullPath.replace(DOCS_PATH, 'docs'),
                relevance,
                type: frontmatter.category || 'document'
              });
            }
          } catch (e) {
            // Skip files that can't be read
          }
        }
      }
    };

    searchInDirectory(DOCS_PATH);

    // Sort by relevance and limit
    results.sort((a, b) => b.relevance - a.relevance);
    return results.slice(0, limit);
  }

  async getComponentDocsLocal(componentName) {
    const searchName = componentName.toLowerCase().replace(/\s+/g, '-');

    // Search in components directories
    const componentDirs = ['atoms', 'molecules', 'organisms'];

    for (const dir of componentDirs) {
      const filePath = join(DOCS_PATH, 'components', dir, `${searchName}.md`);

      try {
        const content = readFileSync(filePath, 'utf-8');
        const { data: frontmatter, content: markdown } = matter(content);

        return {
          name: frontmatter.name,
          category: frontmatter.category,
          content: markdown,
          tokens: frontmatter.tokens || {},
          path: filePath.replace(DOCS_PATH, 'docs')
        };
      } catch (e) {
        // File not found, try next directory
      }
    }

    throw new Error(`Component "${componentName}" not found`);
  }

  async getTokenLocal(tokenName) {
    const tokenFiles = [
      join(DOCS_PATH, 'figma-extract/master-tokens.md'),
      join(DOCS_PATH, 'foundations/colors.md'),
      join(DOCS_PATH, 'foundations/spacing.md'),
      join(DOCS_PATH, 'foundations/typography.md')
    ];

    for (const filePath of tokenFiles) {
      try {
        const content = readFileSync(filePath, 'utf-8');
        if (content.toLowerCase().includes(tokenName.toLowerCase())) {
          // Extract relevant section
          const lines = content.split('\n');
          const relevantLines = [];
          let found = false;

          for (let i = 0; i < lines.length; i++) {
            if (lines[i].toLowerCase().includes(tokenName.toLowerCase())) {
              found = true;
              // Get context (5 lines before and after)
              const start = Math.max(0, i - 5);
              const end = Math.min(lines.length, i + 10);
              return lines.slice(start, end).join('\n');
            }
          }
        }
      } catch (e) {
        // File not found, continue
      }
    }

    throw new Error(`Token "${tokenName}" not found`);
  }

  // Main API methods
  async callTool(toolName, args) {
    if (this.useLocalFiles) {
      switch (toolName) {
        case 'search_gds':
          const results = await this.searchDocsLocal(args.query, args.limit || 5);
          return {
            content: [{
              type: 'text',
              text: this.formatSearchResults(results)
            }]
          };

        case 'get_component_docs':
          const component = await this.getComponentDocsLocal(args.componentName);
          return {
            content: [{
              type: 'text',
              text: component.content
            }]
          };

        case 'get_design_token':
          const token = await this.getTokenLocal(args.tokenName);
          return {
            content: [{
              type: 'text',
              text: token
            }]
          };

        default:
          throw new Error(`Unknown tool: ${toolName}`);
      }
    }

    // HTTP MCP server mode
    const response = await fetch(this.serverUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: ++this.requestId,
        method: 'tools/call',
        params: { name: toolName, arguments: args }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    return data.result;
  }

  formatSearchResults(results) {
    if (results.length === 0) {
      return 'No results found.';
    }

    let text = `## Search Results\n\nFound ${results.length} result(s):\n\n`;

    for (const result of results) {
      text += `### ${result.name}\n`;
      text += `**Type:** ${result.type} | **Relevance:** ${result.relevance}%\n`;
      text += `**Path:** ${result.path}\n\n`;
      text += '---\n\n';
    }

    return text;
  }

  stop() {
    // No cleanup needed
  }
}

// Initialize Slack app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

// Initialize MCP client (HTTP server URL optional)
const MCP_SERVER_URL = process.env.MCP_SERVER_URL; // e.g., http://localhost:3456/mcp
const mcpClient = new MCPClient(MCP_SERVER_URL);

// Natural language query processor
class QueryProcessor {
  static detectIntent(text) {
    const lowerText = text.toLowerCase();

    // Design token queries
    if (lowerText.match(/\b(color|colour|spacing|typography|token|font|size|padding|margin)\b/)) {
      return { type: 'token', query: text };
    }

    // Component search
    if (lowerText.match(/\b(component|button|input|dropdown|field|card|modal)\b/)) {
      return { type: 'component', query: text };
    }

    // Specific component documentation
    if (lowerText.match(/\b(how to use|implement|docs for|documentation|states|variants)\b/)) {
      return { type: 'component_docs', query: text };
    }

    // General search
    return { type: 'search', query: text };
  }

  static extractComponentName(text) {
    // Try to extract component name from natural language
    const patterns = [
      /(?:docs for|about|show me|find|get)\s+(?:the\s+)?([a-z\s-]+?)(?:\s+component)?$/i,
      /([a-z\s-]+?)\s+(?:component|docs|documentation|states|variants)/i,
      /^([a-z\s-]+?)$/i
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    return text.trim();
  }
}

// Format MCP response for Slack
class ResponseFormatter {
  static formatComponentDocs(data) {
    if (!data || !data.content || !data.content[0]) {
      return "I couldn't find that component. Try searching for something else!";
    }

    const text = data.content[0].text;

    // Convert markdown to Slack formatting
    let slackText = text
      .replace(/^### (.*$)/gm, '*$1*')
      .replace(/^## (.*$)/gm, '*$1*\n')
      .replace(/^# (.*$)/gm, '*$1*\n')
      .replace(/\*\*(.*?)\*\*/g, '*$1*')
      .replace(/`([^`]+)`/g, '`$1`');

    // Limit length for Slack
    if (slackText.length > 3000) {
      slackText = slackText.substring(0, 2900) + '\n\n_...truncated. Ask for specific details!_';
    }

    return slackText;
  }

  static formatSearchResults(data) {
    if (!data || !data.content || !data.content[0]) {
      return "No results found. Try a different search term!";
    }

    const text = data.content[0].text;

    // Parse search results and format for Slack
    const lines = text.split('\n');
    let formatted = '*Search Results:*\n\n';

    for (const line of lines) {
      if (line.startsWith('###')) {
        formatted += '\n' + line.replace('###', '•') + '\n';
      } else if (line.startsWith('**Type:**')) {
        formatted += '  ' + line.replace(/\*\*/g, '') + '\n';
      } else if (line.startsWith('**Path:**')) {
        formatted += '  ' + line.replace(/\*\*/g, '') + '\n';
      }
    }

    return formatted;
  }

  static formatTokenInfo(data) {
    if (!data || !data.content || !data.content[0]) {
      return "Token not found. Try a specific token name like 'neptune', 'cosmos', or 'auditorium'.";
    }

    return data.content[0].text;
  }
}

// Message handler
app.message(async ({ message, say }) => {
  try {
    const text = message.text;
    const intent = QueryProcessor.detectIntent(text);

    let response;

    switch (intent.type) {
      case 'component_docs': {
        const componentName = QueryProcessor.extractComponentName(text);
        await say(`Looking up documentation for *${componentName}*...`);

        const result = await mcpClient.callTool('get_component_docs', {
          componentName
        });

        response = ResponseFormatter.formatComponentDocs(result);
        break;
      }

      case 'token': {
        // Extract token name
        const words = text.toLowerCase().split(/\s+/);
        const tokenNames = ['neptune', 'cosmos', 'granite', 'slate', 'mars', 'earth',
                           'spotlight', 'diatomite', 'moonrock', 'auditorium', 'mauna'];
        const foundToken = words.find(w => tokenNames.includes(w));

        if (foundToken) {
          const result = await mcpClient.callTool('get_design_token', {
            tokenName: foundToken
          });
          response = ResponseFormatter.formatTokenInfo(result);
        } else {
          response = "I can help you find design tokens! Try asking about tokens like: neptune, cosmos, granite, auditorium, or mauna.";
        }
        break;
      }

      case 'component':
      case 'search': {
        await say(`Searching for *${text}*...`);

        const result = await mcpClient.callTool('search_gds', {
          query: text
        });

        response = ResponseFormatter.formatSearchResults(result);
        break;
      }

      default:
        response = "I can help you with:\n• Finding components\n• Looking up design tokens\n• Getting implementation guidance\n\nTry asking: 'Show me the button component' or 'What is the neptune color?'";
    }

    await say(response);

  } catch (error) {
    console.error('Error handling message:', error);
    await say("Sorry, I encountered an error. Please try again!");
  }
});

// App mention handler
app.event('app_mention', async ({ event, say }) => {
  const text = event.text.replace(/<@[A-Z0-9]+>/g, '').trim();

  if (!text) {
    await say("Hi! I'm the GDS bot. Ask me about components, design tokens, or implementation guidance!");
    return;
  }

  // Reuse message handler logic
  await app.processEvent({
    type: 'message',
    message: { text }
  });
});

// Help command
app.command('/gds-help', async ({ command, ack, say }) => {
  await ack();

  const helpText = `
*GDS Design System Bot* 🎨

I can help you with:

*🔍 Finding Components*
• "Show me the button component"
• "Find input field docs"
• "What components are available?"

*🎨 Design Tokens*
• "What is the neptune color?"
• "Show me spacing tokens"
• "What's the auditorium spacing value?"

*📖 Implementation Guidance*
• "How do I use the dropdown?"
• "What states does the input have?"
• "Show me button variants"

Just ask me naturally, or mention me with @gds-bot!
  `;

  await say(helpText);
});

// Health check server (for Render keep-alive)
const HEALTH_PORT = process.env.PORT || 3000;
let botStatus = { running: false, startTime: null, requestCount: 0 };

const healthServer = http.createServer((req, res) => {
  // Health check endpoint
  if (req.url === '/health' || req.url === '/') {
    botStatus.requestCount++;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      bot: botStatus.running ? 'running' : 'starting',
      uptime: botStatus.startTime ? Math.floor((Date.now() - botStatus.startTime) / 1000) : 0,
      requests: botStatus.requestCount,
      mode: MCP_SERVER_URL ? 'http-mcp' : 'local-files',
      timestamp: new Date().toISOString()
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

healthServer.listen(HEALTH_PORT, () => {
  console.log(`Health check server listening on port ${HEALTH_PORT}`);
});

// Start the app
(async () => {
  try {
    console.log('Starting GDS Slack Bot...');
    botStatus.startTime = Date.now();

    if (MCP_SERVER_URL) {
      console.log(`MCP Server URL: ${MCP_SERVER_URL}`);
    } else {
      console.log('Mode: Local file-based access');
    }

    await mcpClient.start();

    console.log('Starting Slack bot...');
    await app.start();

    botStatus.running = true;
    console.log('⚡️ GDS Slack bot is running!');
    console.log(`Health check available at http://localhost:${HEALTH_PORT}/health`);
  } catch (error) {
    console.error('Failed to start bot:', error);
    process.exit(1);
  }
})();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down...');
  botStatus.running = false;
  mcpClient.stop();
  healthServer.close();
  process.exit(0);
});
