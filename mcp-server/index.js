#!/usr/bin/env node

/**
 * GDS MCP Server
 *
 * Custom MCP server providing efficient tools for GDS documentation retrieval.
 *
 * OPTIMIZED for speed:
 * - Pre-builds search index on startup (~50-100ms)
 * - Caches component docs in memory
 * - Search queries run against in-memory index (sub-millisecond)
 *
 * Tools:
 * - get_component_docs: Get unified component documentation
 * - get_design_token: Get design token values
 * - search_gds: Smart search across all documentation
 * - get_cache_stats: View cache statistics (for debugging)
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
import { initializeCache, getCacheStats, getAllComponents } from './cache.js';

const server = new Server(
  {
    name: 'gds-mcp-server',
    version: '2.0.0',
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
        description: 'Smart search across GDS documentation. Searches component names, descriptions, and content. FAST: uses pre-built index.',
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
      },
      {
        name: 'list_components',
        description: 'List all available GDS components. Returns component names, categories, and status.',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              enum: ['all', 'atoms', 'molecules', 'organisms'],
              description: 'Filter by component category'
            }
          }
        }
      },
      {
        name: 'get_cache_stats',
        description: 'Get cache statistics for debugging performance. Shows index size, cache hits, etc.',
        inputSchema: {
          type: 'object',
          properties: {}
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

      case 'list_components': {
        const components = getAllComponents();
        const category = args?.category || 'all';

        const filtered = category === 'all'
          ? components
          : components.filter(c => c.category === category);

        const grouped = {};
        for (const c of filtered) {
          const cat = c.category || 'atoms';
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push(`- ${c.name} (${c.status || 'stable'})`);
        }

        let output = `## GDS Components (${filtered.length} total)\n\n`;
        for (const [cat, items] of Object.entries(grouped).sort()) {
          output += `### ${cat.charAt(0).toUpperCase() + cat.slice(1)}\n${items.join('\n')}\n\n`;
        }

        return {
          content: [{ type: 'text', text: output }]
        };
      }

      case 'get_cache_stats': {
        const stats = getCacheStats();
        return {
          content: [{
            type: 'text',
            text: `## Cache Statistics\n\n` +
              `- **Indexed components:** ${stats.indexSize}\n` +
              `- **Cached docs:** ${stats.componentCacheSize}\n` +
              `- **Cached FAQs:** ${stats.faqCacheSize}\n` +
              `- **Last index build:** ${stats.lastIndexBuild || 'Never'}\n` +
              `- **Needs rebuild:** ${stats.needsRebuild ? 'Yes' : 'No'}`
          }]
        };
      }

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
  // Initialize cache BEFORE accepting connections for fast first queries
  await initializeCache();

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('GDS MCP Server v2.0 running on stdio (cache ready)');
}

main().catch(console.error);
