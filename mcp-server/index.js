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
 *
 * Security Features:
 * - Input validation and sanitization
 * - Rate limiting
 * - Audit logging
 * - Safe error handling
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
import {
  validateComponentName,
  validateSearchQuery,
  validateLimit,
  validateAudience,
  validateTokenType,
  checkRateLimit,
  createSafeErrorResponse,
  logToolInvocation,
  auditLog,
} from './security.js';

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

// List available tools with strict JSON Schema validation
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
              description: 'Component name (e.g., "button", "input-field", "modal")',
              minLength: 1,
              maxLength: 100,
              pattern: '^[a-zA-Z][a-zA-Z0-9\\-_\\s]*$'
            },
            audience: {
              type: 'string',
              enum: ['all', 'design', 'engineer', 'vibe'],
              default: 'all',
              description: 'Target audience section. "all" returns complete unified doc.'
            }
          },
          required: ['componentName'],
          additionalProperties: false
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
              description: 'Token name (e.g., "Neptune", "auditorium", "fiji")',
              minLength: 1,
              maxLength: 100,
              pattern: '^[a-zA-Z][a-zA-Z0-9\\-_]*$'
            },
            tokenType: {
              type: 'string',
              enum: ['color', 'spacing', 'typography', 'all'],
              default: 'all',
              description: 'Type of token to look up'
            }
          },
          required: ['tokenName'],
          additionalProperties: false
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
              description: 'Search query (e.g., "button variants", "form validation", "spacing scale")',
              minLength: 1,
              maxLength: 500
            },
            audience: {
              type: 'string',
              enum: ['all', 'design', 'engineer', 'vibe'],
              default: 'all',
              description: 'Filter results by audience'
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 50,
              default: 5,
              description: 'Maximum number of results (default: 5, max: 50)'
            }
          },
          required: ['query'],
          additionalProperties: false
        }
      }
    ]
  };
});

// Handle tool calls with security validation
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  // Rate limiting check
  const rateCheck = checkRateLimit(name);
  if (!rateCheck.allowed) {
    return {
      content: [{
        type: 'text',
        text: `Rate limit exceeded. Please try again in ${rateCheck.retryAfter} seconds.`
      }],
      isError: true
    };
  }

  // Log tool invocation for audit
  logToolInvocation(name, args);

  try {
    switch (name) {
      case 'get_component_docs': {
        // Validate component name
        const nameValidation = validateComponentName(args.componentName);
        if (!nameValidation.valid) {
          return {
            content: [{ type: 'text', text: nameValidation.error }],
            isError: true
          };
        }
        const audience = validateAudience(args.audience);
        return await getComponentDocs(nameValidation.sanitized, audience);
      }

      case 'get_design_token': {
        // Validate token name
        const tokenValidation = validateComponentName(args.tokenName);
        if (!tokenValidation.valid) {
          return {
            content: [{ type: 'text', text: tokenValidation.error }],
            isError: true
          };
        }
        const tokenType = validateTokenType(args.tokenType);
        return await getDesignToken(tokenValidation.sanitized, tokenType);
      }

      case 'search_gds': {
        // Validate search query
        const queryValidation = validateSearchQuery(args.query);
        if (!queryValidation.valid) {
          return {
            content: [{ type: 'text', text: queryValidation.error }],
            isError: true
          };
        }
        const audience = validateAudience(args.audience);
        const limit = validateLimit(args.limit, 5);
        return await searchGds(queryValidation.sanitized, audience, limit);
      }

      default:
        auditLog('UNKNOWN_TOOL', { toolName: name });
        return {
          content: [{ type: 'text', text: 'Unknown tool requested' }],
          isError: true
        };
    }
  } catch (error) {
    // Use safe error response to avoid leaking internal details
    return createSafeErrorResponse(error, `Error in ${name}`);
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // Log server startup
  auditLog('SERVER_START', {
    version: '1.0.0',
    transport: 'stdio',
    securityFeatures: ['input-validation', 'rate-limiting', 'audit-logging', 'safe-errors']
  });

  console.error('GDS MCP Server running on stdio (security hardened)');
}

main().catch((error) => {
  auditLog('SERVER_ERROR', { error: error.message });
  console.error('Failed to start server:', error.message);
  process.exit(1);
});
