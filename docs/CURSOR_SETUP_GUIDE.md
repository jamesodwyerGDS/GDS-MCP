# GDS-MCP Local Setup Guide for Cursor

This guide walks you through downloading and running the GDS-MCP server locally with Cursor IDE.

## Prerequisites

- **Node.js** v18 or higher ([download](https://nodejs.org/))
- **Cursor IDE** with MCP support ([download](https://cursor.sh/))
- **Figma account** (for accessing designs)
- **Figma Personal Access Token** (for API access)

---

## Quick Setup (5 minutes)

### Step 1: Clone the Repository

```bash
git clone https://github.com/jamesodwyerGDS/GDS-MCP.git
cd GDS-MCP
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Cursor MCP Settings

Open Cursor's MCP configuration file:

**macOS:**
```bash
# Open in your preferred editor
code ~/Library/Application\ Support/Cursor/User/globalStorage/cursor.mcp/settings.json

# Or create if it doesn't exist
mkdir -p ~/Library/Application\ Support/Cursor/User/globalStorage/cursor.mcp
touch ~/Library/Application\ Support/Cursor/User/globalStorage/cursor.mcp/settings.json
```

**Windows:**
```powershell
# Open in your preferred editor
code %APPDATA%\Cursor\User\globalStorage\cursor.mcp\settings.json
```

**Linux:**
```bash
code ~/.config/Cursor/User/globalStorage/cursor.mcp/settings.json
```

### Step 4: Add MCP Server Configuration

Add the following to your `settings.json` (replace `/path/to/GDS-MCP` with your actual path):

```json
{
  "mcpServers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp"
    },
    "gds": {
      "command": "node",
      "args": ["./mcp-server/index.js"],
      "cwd": "/path/to/GDS-MCP"
    }
  }
}
```

**Example paths:**
- macOS: `"/Users/yourname/projects/GDS-MCP"`
- Windows: `"C:\\Users\\yourname\\projects\\GDS-MCP"`
- Linux: `"/home/yourname/projects/GDS-MCP"`

### Step 5: Restart Cursor

Close and reopen Cursor for the MCP servers to load.

---

## Verify Installation

### Check MCP Status

In Cursor, open the command palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) and search for:
```
MCP: Show Servers
```

You should see:
- ✅ `figma` - Connected
- ✅ `gds` - Connected

### Test the GDS Server

Ask Cursor's AI assistant:
```
What components are available in the GDS documentation?
```

Or:
```
Search GDS docs for button variants
```

---

## Available MCP Tools

Once configured, you have access to these tools:

### From `gds` (Local Server)

| Tool | Description | Example Usage |
|------|-------------|---------------|
| `gds_get_component` | Get full documentation for a component | "Get the button component documentation" |
| `gds_search` | Search across all documentation | "Search for spacing tokens" |
| `gds_get_token` | Get design token values | "What are the Neptune colour values?" |

### From `figma` (Remote Server)

| Tool | Description | Example Usage |
|------|-------------|---------------|
| `figma_get_file` | Read a Figma file's structure | "Get the structure of Figma file ABC123" |
| `figma_get_node` | Get specific node details | "Get node 1:234 from file ABC123" |

---

## Setting Up Figma Access

### Get Your Figma Token

1. Go to [Figma Account Settings](https://www.figma.com/settings)
2. Scroll to **Personal Access Tokens**
3. Click **Generate new token**
4. Copy the token

### Configure the Token

**Option A: Environment Variable (Recommended)**

Add to your shell profile (`~/.zshrc`, `~/.bashrc`, etc.):
```bash
export FIGMA_TOKEN="figd_your_token_here"
```

Then reload:
```bash
source ~/.zshrc  # or ~/.bashrc
```

**Option B: Pass to Scripts Directly**
```bash
FIGMA_TOKEN="figd_your_token" npm run docs:generate -- --url="..."
```

---

## Usage Examples

### Generate Component Documentation

```bash
# From a Figma URL
npm run docs:generate -- --url="https://figma.com/design/WU01oSRfSHpOxUn3ThcvC5?node-id=123:456"

# From file key and node ID
npm run docs:generate -- --file=WU01oSRfSHpOxUn3ThcvC5 --node=123:456
```

### Generate All Documentation

```bash
# Generate from all configured components
npm run docs:generate-all

# Build all doc types (storybook + vibe + unified)
npm run build:all
```

### Validate Documentation

```bash
npm run docs:validate
```

---

## Project Structure

```
GDS-MCP/
├── mcp-server/           # Local MCP server
│   ├── index.js          # Server entry point
│   └── tools/            # MCP tool implementations
│       ├── get-component.js
│       ├── get-token.js
│       └── search.js
├── core/                 # Documentation generators
├── docs/                 # Generated documentation
│   ├── components/
│   ├── foundations/
│   └── patterns/
├── scripts/              # CLI scripts
└── templates/            # Documentation templates
```

---

## Troubleshooting

### "MCP server failed to start"

1. **Check Node.js version:**
   ```bash
   node --version  # Should be v18+
   ```

2. **Verify the path in settings.json:**
   ```bash
   # Test the command manually
   cd /path/to/GDS-MCP
   node ./mcp-server/index.js
   ```

3. **Check for missing dependencies:**
   ```bash
   cd /path/to/GDS-MCP
   npm install
   ```

### "Cannot find module" Errors

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Figma API Errors

1. **Token expired:** Generate a new token in Figma settings
2. **Rate limited:** Wait a few minutes and try again
3. **Access denied:** Ensure you have view access to the Figma file

### Cursor Not Recognizing MCP

1. Ensure settings.json is valid JSON (use a JSON validator)
2. Restart Cursor completely (quit and reopen)
3. Check Cursor's developer console for errors (`Help > Toggle Developer Tools`)

---

## Alternative: Remote-Only Setup

If you don't need local customization, you can use the hosted MCP servers without cloning:

```json
{
  "mcpServers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp"
    },
    "gds-docs": {
      "url": "https://gitmcp.io/jamesodwyerGDS/GDS-MCP"
    }
  }
}
```

This provides read-only access to GDS documentation without local setup.

---

## Next Steps

- **Explore components:** Ask "What components are documented in GDS?"
- **Generate docs:** Use the `/figma-doc` command with a Figma URL
- **Search tokens:** Ask "What spacing tokens are available?"
- **Read the CLAUDE.md:** Understand how to use the documentation workflow

---

## Support

- **Issues:** [GitHub Issues](https://github.com/jamesodwyerGDS/GDS-MCP/issues)
- **MCP Protocol:** [modelcontextprotocol.io](https://modelcontextprotocol.io/)
- **Figma MCP:** [Figma MCP Docs](https://developers.figma.com/docs/figma-mcp-server/)
