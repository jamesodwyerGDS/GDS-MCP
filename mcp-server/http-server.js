#!/usr/bin/env node

/**
 * GDS MCP HTTP Server
 *
 * Run this centrally - designers connect via URL.
 *
 * Usage:
 *   node mcp-server/http-server.js
 *
 * Designers add to Claude Desktop config:
 *   { "mcpServers": { "gds": { "url": "http://your-server:3456/mcp" } } }
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import express from 'express';
import cors from 'cors';

import { getComponentDocs } from './tools/get-component.js';
import { getDesignToken } from './tools/get-token.js';
import { searchGds } from './tools/search.js';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3456;

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'GDS MCP Server',
    tools: ['search_gds', 'get_component_docs', 'get_design_token']
  });
});

// MCP endpoint
app.get('/mcp', async (req, res) => {
  const transport = new SSEServerTransport('/mcp', res);

  const server = new McpServer({
    name: 'gds-mcp-server',
    version: '1.0.0',
  });

  // Register tools
  server.tool('search_gds',
    'Search GDS documentation for components, tokens, and guidelines',
    {
      query: { type: 'string', description: 'Search query' },
      limit: { type: 'number', description: 'Max results (default: 5)' }
    },
    async ({ query, limit }) => {
      const result = await searchGds(query, 'all', limit || 5);
      return result;
    }
  );

  server.tool('get_component_docs',
    'Get documentation for a specific GDS component',
    {
      componentName: { type: 'string', description: 'Component name (e.g., button, modal, input-field)' }
    },
    async ({ componentName }) => {
      const result = await getComponentDocs(componentName);
      return result;
    }
  );

  server.tool('get_design_token',
    'Get design token value (color, typography, effect)',
    {
      tokenName: { type: 'string', description: 'Token name (e.g., neptune, cosmos, mauna)' },
      tokenType: { type: 'string', description: 'Token type: color, typography, effect, or all' }
    },
    async ({ tokenName, tokenType }) => {
      const result = await getDesignToken(tokenName, tokenType || 'all');
      return result;
    }
  );

  await server.connect(transport);
});

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║           GDS MCP Server Running                      ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║  URL: http://localhost:${PORT}/mcp                      ║
║                                                       ║
║  Share with designers:                                ║
║                                                       ║
║  Claude Desktop config:                               ║
║  {                                                    ║
║    "mcpServers": {                                    ║
║      "gds": { "url": "http://YOUR_IP:${PORT}/mcp" }     ║
║    }                                                  ║
║  }                                                    ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});
