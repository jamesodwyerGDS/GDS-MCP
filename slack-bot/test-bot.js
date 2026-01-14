#!/usr/bin/env node

/**
 * Test Bot Locally
 * This script tests the MCP integration without requiring Slack.
 */

import { spawn } from 'child_process';
import { EventEmitter } from 'events';

class MCPClient extends EventEmitter {
  constructor(serverPath) {
    super();
    this.serverPath = serverPath;
    this.server = null;
    this.requestId = 0;
    this.pendingRequests = new Map();
  }

  start() {
    return new Promise((resolve, reject) => {
      this.server = spawn('node', [this.serverPath], {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      this.server.stdout.on('data', (data) => {
        try {
          const response = JSON.parse(data.toString());
          if (response.id && this.pendingRequests.has(response.id)) {
            const { resolve } = this.pendingRequests.get(response.id);
            this.pendingRequests.delete(response.id);
            resolve(response.result);
          }
        } catch (e) {
          // Ignore parse errors
        }
      });

      this.server.stderr.on('data', (data) => {
        const message = data.toString();
        if (message.includes('GDS MCP Server running')) {
          resolve();
        }
      });

      this.server.on('error', reject);
    });
  }

  async callTool(toolName, args) {
    const id = ++this.requestId;
    const request = {
      jsonrpc: '2.0',
      id,
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: args
      }
    };

    return new Promise((resolve, reject) => {
      this.pendingRequests.set(id, { resolve, reject });
      this.server.stdin.write(JSON.stringify(request) + '\n');

      setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id);
          reject(new Error('Request timeout'));
        }
      }, 10000);
    });
  }

  stop() {
    if (this.server) {
      this.server.kill();
    }
  }
}

// Test queries
const testQueries = [
  {
    name: 'Component Documentation',
    tool: 'get_component_docs',
    args: { componentName: 'button' }
  },
  {
    name: 'Design Token',
    tool: 'get_design_token',
    args: { tokenName: 'neptune' }
  },
  {
    name: 'Search',
    tool: 'search_gds',
    args: { query: 'input field' }
  }
];

(async () => {
  console.log('🧪 Testing GDS Slack Bot MCP Integration\n');

  const mcpClient = new MCPClient('../mcp-server/index.js');

  try {
    console.log('Starting MCP server...');
    await mcpClient.start();
    console.log('✅ MCP server connected\n');

    for (const query of testQueries) {
      console.log(`📝 Testing: ${query.name}`);
      console.log(`   Tool: ${query.tool}`);
      console.log(`   Args: ${JSON.stringify(query.args)}\n`);

      try {
        const result = await mcpClient.callTool(query.tool, query.args);

        if (result.content && result.content[0]) {
          const text = result.content[0].text;
          const preview = text.length > 200
            ? text.substring(0, 200) + '...'
            : text;

          console.log(`✅ Success:`);
          console.log(`${preview}\n`);
        } else {
          console.log(`⚠️  Empty response\n`);
        }
      } catch (error) {
        console.log(`❌ Error: ${error.message}\n`);
      }
    }

    console.log('✅ All tests completed!');
  } catch (error) {
    console.error('❌ Failed:', error);
  } finally {
    mcpClient.stop();
    process.exit(0);
  }
})();
