#!/usr/bin/env node

/**
 * GDS MCP Server
 *
 * Custom MCP server providing efficient tools for GDS documentation retrieval.
 *
 * Tools:
 * - get_component_docs: Get unified component documentation
 * - get_design_token: Get design token values
 * - search_gds: Smart search across all documentation
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { getComponentDocs } from './tools/get-component.js';
import { getDesignToken } from './tools/get-token.js';
import { searchGds } from './tools/search.js';

const server = new Server(
  {
    name: 'gds-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_component_docs',
        description: 'Get all documentation for a GDS component. Returns unified documentation combining design specs, engineer code, and vibe/Tailwind snippets.',
        inputSchema: {
          type: 'object',
          properties: {
            componentName: {
              type: 'string',
              description: 'Component name (e.g., "button", "input-field", "modal")'
            },
            audience: {
              type: 'string',
              enum: ['all', 'design', 'engineer', 'vibe'],
              description: 'Target audience section. "all" returns complete unified doc.'
            }
          },
          required: ['componentName']
        }
      },
      {
        name: 'get_design_token',
        description: 'Get GDS design token value (color, spacing, typography)',
        inputSchema: {
          type: 'object',
          properties: {
            tokenName: {
              type: 'string',
              description: 'Token name (e.g., "Neptune", "auditorium", "fiji")'
            },
            tokenType: {
              type: 'string',
              enum: ['color', 'spacing', 'typography', 'all'],
              description: 'Type of token to look up'
            }
          },
          required: ['tokenName']
        }
      },
      {
        name: 'search_gds',
        description: 'Smart search across GDS documentation. Searches component names, descriptions, and content.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query (e.g., "button variants", "form validation", "spacing scale")'
            },
            audience: {
              type: 'string',
              enum: ['all', 'design', 'engineer', 'vibe'],
              description: 'Filter results by audience'
            },
            limit: {
              type: 'number',
              description: 'Maximum number of results (default: 5)'
            }
          },
          required: ['query']
        }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'get_component_docs':
        return await getComponentDocs(args.componentName, args.audience || 'all');

      case 'get_design_token':
        return await getDesignToken(args.tokenName, args.tokenType || 'all');

      case 'search_gds':
        return await searchGds(args.query, args.audience || 'all', args.limit || 5);

      default:
        return {
          content: [{ type: 'text', text: `Unknown tool: ${name}` }],
          isError: true
        };
    }
  } catch (error) {
    return {
      content: [{ type: 'text', text: `Error: ${error.message}` }],
      isError: true
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('GDS MCP Server running on stdio');
}

main().catch(console.error);
