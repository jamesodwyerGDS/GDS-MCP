# MCP Configuration

This directory contains Model Context Protocol (MCP) server configurations for integrating with Claude Desktop and other MCP-compatible clients.

## Configuration Files

### `mcp-config.json`

Primary MCP server configuration for this project. Defines two MCP servers:

1. **figma** - Official Figma MCP server
   - Provides access to Figma API via MCP protocol
   - URL: `https://mcp.figma.com/mcp`
   - Requires `FIGMA_TOKEN` environment variable

2. **gds-docs** - Local GDS documentation MCP server
   - Provides optimized access to generated documentation
   - Reads from `./docs` directory
   - Enables efficient LLM retrieval of design system docs

**Usage:**

Add this configuration to your Claude Desktop or Cursor settings:

```bash
# For Claude Desktop
# Add to: ~/Library/Application Support/Claude/claude_desktop_config.json

# For Cursor
# Add to: ~/.cursor/mcp.json (or via Cursor settings)
```

### `mcp.json`

Alternative MCP configuration format (Cursor-compatible). Contains the same server definitions as `mcp-config.json`.

## Setup Instructions

### Prerequisites

1. **Figma Personal Access Token**
   - Generate at: https://www.figma.com/developers/api#access-tokens
   - Permissions: Read-only access to your design files

2. **MCP-Compatible Client**
   - Claude Desktop (recommended)
   - Cursor IDE
   - Any MCP-compatible tool

### Installation

#### For Claude Desktop

1. Locate your Claude Desktop configuration:
   ```bash
   # macOS
   ~/Library/Application Support/Claude/claude_desktop_config.json

   # Windows
   %APPDATA%\Claude\claude_desktop_config.json

   # Linux
   ~/.config/Claude/claude_desktop_config.json
   ```

2. Add the MCP servers from `mcp-config.json` to your configuration

3. Set your Figma token:
   ```bash
   export FIGMA_TOKEN=figd_your_token_here
   ```

4. Restart Claude Desktop

#### For Cursor IDE

1. Open Cursor settings (Cmd/Ctrl + ,)

2. Search for "MCP" or "Model Context Protocol"

3. Add the servers from `mcp.json`

4. Set your Figma token in your environment

5. Restart Cursor

### Environment Variables

Set these in your shell profile (`~/.zshrc`, `~/.bashrc`, or `~/.bash_profile`):

```bash
# Figma API access
export FIGMA_TOKEN=figd_your_token_here
```

## Server Details

### Figma MCP Server

**Purpose:** Access Figma design data through MCP protocol

**Tools Provided:**
- `get_file` - Retrieve Figma file data
- `get_node` - Get specific node details
- `get_styles` - Fetch design tokens/styles
- `get_components` - List components in a file

**Authentication:** Requires `FIGMA_TOKEN` environment variable

**URL:** `https://mcp.figma.com/mcp`

### GDS Documentation MCP Server

**Purpose:** Optimized access to generated design system documentation

**Location:** `./mcp-server/index.js`

**Tools Provided:**
- Single-call documentation retrieval
- Search across all docs
- Component metadata access

**Working Directory:** Project root (`/Users/jamesodwyer/gds-mcp`)

## Troubleshooting

### "MCP server not found"

**Solution:**
- Verify the `mcp-server/index.js` file exists
- Check the `cwd` path in the configuration matches your project location
- Update the absolute path if you've moved the project

### "Figma authentication failed"

**Solution:**
- Verify `FIGMA_TOKEN` is set: `echo $FIGMA_TOKEN`
- Regenerate token if expired
- Check token has read access to your Figma files

### "Cannot connect to MCP server"

**Solution:**
- Restart your MCP client (Claude Desktop/Cursor)
- Check Node.js is installed: `node --version` (requires v18+)
- Review MCP server logs in client's console

### Configuration not loading

**Solution:**
- Validate JSON syntax (no trailing commas, proper quotes)
- Ensure paths use forward slashes, even on Windows
- Check file permissions (must be readable)

## Integration with Claude Code

When using Claude Code with the `/figma-doc` skill:

1. The skill uses `DocumentationGenerator` which calls Figma API directly
2. MCP servers provide alternative access paths for exploration
3. The `gds-docs` MCP server enables efficient doc retrieval

## Development

### Testing MCP Configuration

Test the Figma MCP connection:

```bash
# Set token
export FIGMA_TOKEN=figd_your_token_here

# Test with curl (if HTTP endpoint available)
curl https://mcp.figma.com/mcp
```

Test the local GDS docs MCP server:

```bash
# Run the server directly
node mcp-server/index.js

# Expected: Server starts and listens for MCP requests
```

### Updating Paths

If you move the project, update the `cwd` field in both config files:

```json
{
  "gds-docs": {
    "cwd": "/new/path/to/gds-mcp"
  }
}
```

## Related Documentation

- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [Figma API Documentation](https://www.figma.com/developers/api)
- [Claude Desktop MCP Guide](https://docs.anthropic.com/claude/docs/mcp)

---

*Last updated: 2026-01-14*
