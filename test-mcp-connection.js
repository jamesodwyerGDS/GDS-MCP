#!/usr/bin/env node

/**
 * Test MCP Server Connection
 * This script verifies the local GDS MCP server can start and list its tools.
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverPath = path.join(__dirname, 'mcp-server/index.js');

console.log('Testing MCP server connection...');
console.log('Server path:', serverPath);
console.log('');

// Start the MCP server
const server = spawn('node', [serverPath], {
  cwd: __dirname,
  stdio: ['pipe', 'pipe', 'pipe']
});

let responseReceived = false;

// Send a list_tools request
const request = {
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/list',
  params: {}
};

// Listen for responses
server.stdout.on('data', (data) => {
  try {
    const response = JSON.parse(data.toString());
    if (response.result && response.result.tools) {
      console.log('✅ MCP Server is working!');
      console.log('');
      console.log('Available tools:');
      response.result.tools.forEach((tool, i) => {
        console.log(`  ${i + 1}. ${tool.name}`);
        console.log(`     ${tool.description}`);
      });
      responseReceived = true;
      server.kill();
      process.exit(0);
    }
  } catch (e) {
    // Ignore parse errors for stderr output
  }
});

server.stderr.on('data', (data) => {
  const message = data.toString();
  if (message.includes('GDS MCP Server running')) {
    console.log('✅ Server started successfully');
    console.log('');
    // Server is ready, send the request
    server.stdin.write(JSON.stringify(request) + '\n');
  }
});

server.on('error', (error) => {
  console.error('❌ Failed to start server:', error.message);
  process.exit(1);
});

// Timeout after 5 seconds
setTimeout(() => {
  if (!responseReceived) {
    console.error('❌ Server did not respond within 5 seconds');
    server.kill();
    process.exit(1);
  }
}, 5000);
