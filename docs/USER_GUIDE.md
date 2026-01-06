# GDS-MCP User Guide

Complete guide to installing and using GDS-MCP on your own machine.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation Options](#installation-options)
  - [Option 1: Remote (Recommended)](#option-1-remote-recommended)
  - [Option 2: Local Installation](#option-2-local-installation)
- [Getting a Figma Token](#getting-a-figma-token)
- [Configuration by Tool](#configuration-by-tool)
  - [Claude Code](#claude-code)
  - [Cursor](#cursor)
  - [VS Code](#vs-code)
  - [Claude Desktop](#claude-desktop)
- [Usage](#usage)
  - [Generate Documentation](#generate-documentation)
  - [Batch Generation](#batch-generation)
  - [Validate Documentation](#validate-documentation)
- [Slack Notifications](#slack-notifications)
- [Troubleshooting](#troubleshooting)

---

## Overview

GDS-MCP is an MCP-powered documentation workflow for design systems. It extracts components from Figma and generates structured markdown documentation optimised for LLM retrieval.

**Key Features:**
- Extract design data directly from Figma via MCP
- Generate markdown documentation with design tokens
- Tailwind CSS utility mappings
- WCAG accessibility guidelines
- No framework-specific code output

---

## Prerequisites

### Required
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher
- **Figma account** with access to the designs you want to document
- **AI coding tool** with MCP support (Claude Code, Cursor, Windsurf, or VS Code)

### Optional
- **Git** (for cloning the repository)
- **Slack webhook URL** (for notifications)

### Check Your Node Version

```bash
node --version  # Should be v18.0.0+
npm --version   # Should be v9.0.0+
```

---

## Installation Options

### Option 1: Remote (Recommended)

The simplest setup - no local installation required. Just configure MCP servers in your AI tool.

**Pros:**
- No installation or dependencies
- Always up-to-date
- Works immediately

**Cons:**
- Requires internet connection
- Cannot customise generation scripts

Skip to [Configuration by Tool](#configuration-by-tool) for setup instructions.

---

### Option 2: Local Installation

For contributors or users who need to customise the workflow.

#### Step 1: Clone the Repository

```bash
git clone https://github.com/jamesodwyerGDS/GDS-MCP.git
cd GDS-MCP
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Set Environment Variables

Create a `.env` file or export variables in your shell:

```bash
# Required: Your Figma personal access token
export FIGMA_TOKEN=figd_xxxxxxxxxxxxxxxxxxxxxxxxx

# Optional: Slack notifications
export SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

**For persistent configuration**, add these to your shell profile (`~/.bashrc`, `~/.zshrc`, etc.):

```bash
echo 'export FIGMA_TOKEN=figd_your_token_here' >> ~/.zshrc
source ~/.zshrc
```

#### Step 4: Verify Installation

```bash
# Run validation to check everything works
npm run docs:validate
```

---

## Getting a Figma Token

You need a Figma Personal Access Token to fetch design data.

### Step 1: Open Figma Settings

1. Log in to [Figma](https://www.figma.com)
2. Click your profile icon (top-right)
3. Select **Settings**

### Step 2: Generate Token

1. Scroll to **Personal access tokens**
2. Click **Generate new token**
3. Give it a descriptive name (e.g., "GDS-MCP")
4. Set expiration (or "No expiration" for convenience)
5. Click **Generate token**

### Step 3: Copy and Store

1. **Copy the token immediately** - it won't be shown again
2. Store it securely (password manager recommended)
3. Set as `FIGMA_TOKEN` environment variable

**Token format:** `figd_` followed by alphanumeric characters

---

## Configuration by Tool

### Claude Code

#### Remote Setup (Recommended)

```bash
# Add Figma MCP server
claude mcp add --transport http figma https://mcp.figma.com/mcp

# Add GDS documentation server
claude mcp add --transport http gds-docs https://gitmcp.io/jamesodwyerGDS/GDS-MCP
```

#### Local Setup

```bash
# Add Figma MCP server
claude mcp add --transport http figma https://mcp.figma.com/mcp

# Add local GDS server (run from GDS-MCP directory)
claude mcp add gds node ./mcp-server/index.js
```

#### Verify Configuration

```bash
claude mcp list
```

---

### Cursor

#### Step 1: Open MCP Settings

1. Open Cursor
2. Go to **Settings** (Cmd/Ctrl + ,)
3. Search for "MCP" or navigate to **Features > MCP**

#### Step 2: Add Configuration

Add to your MCP settings JSON:

**Remote Setup:**
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

**Local Setup:**
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

#### Step 3: Restart Cursor

Restart Cursor for changes to take effect.

---

### VS Code

#### Step 1: Install MCP Extension

Install the MCP extension for VS Code (if available) or use the built-in MCP support.

#### Step 2: Configure MCP Servers

Add to your VS Code settings (`settings.json`):

```json
{
  "mcp.servers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp"
    },
    "gds-docs": {
      "url": "https://gitmcp.io/jamesodwyerGDS/GDS-MCP"
    }
  }
}
```

---

### Claude Desktop

#### Step 1: Locate Config File

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

#### Step 2: Add MCP Configuration

Edit the config file:

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

#### Step 3: Restart Claude Desktop

Fully quit and reopen Claude Desktop.

---

## Usage

### Generate Documentation

#### Using the /figma-doc Skill (Claude Code)

The easiest way to generate documentation:

```
/figma-doc https://figma.com/design/ABC123/File?node-id=1:234
```

This will:
1. Extract component data from Figma
2. Generate structured markdown documentation
3. Save to `docs/components/{category}/{component-name}.md`
4. Update `CHANGELOG.md`

#### Using CLI (Local Installation)

Generate docs for a single component:

```bash
# Using full Figma URL
npm run docs:generate -- --url="https://figma.com/file/ABC123/Design?node-id=1:234"

# Using file key and node ID
npm run docs:generate -- --file=ABC123 --node=1:234

# Custom output directory
npm run docs:generate -- --url="..." --output=./my-docs
```

---

### Batch Generation

Generate documentation for multiple components at once.

#### Step 1: Create Configuration File

Create `components.json` in the project root:

```json
{
  "components": [
    { "url": "https://figma.com/file/ABC123/Design?node-id=1:234" },
    { "url": "https://figma.com/file/ABC123/Design?node-id=5:678" },
    { "file": "DEF456", "node": "10:20" }
  ]
}
```

#### Step 2: Run Batch Generation

```bash
npm run docs:generate-all

# Or with custom config file
npm run docs:generate-all -- --config=my-components.json
```

---

### Validate Documentation

Check that generated documentation follows the correct schema:

```bash
# Validate all docs
npm run docs:validate

# Validate specific directory
npm run docs:validate -- --path=./docs/components/atoms
```

**Validation checks:**
- Required frontmatter fields (name, description, category, status, version, updated)
- Valid status values (draft, beta, stable, deprecated)
- Valid category values (atoms, molecules, organisms, foundations, patterns)
- Date format (YYYY-MM-DD)
- Version format (X.Y.Z)
- Token structure
- Accessibility configuration

---

## Slack Notifications

Get notified when documentation is generated.

### Setup

```bash
export SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### Notification Events

- Single component documentation generated
- Batch generation complete (with success/failure summary)
- Errors during generation

---

## Troubleshooting

### "FIGMA_TOKEN environment variable is required"

**Cause:** Token not set or not accessible.

**Solution:**
```bash
# Check if token is set
echo $FIGMA_TOKEN

# Set token
export FIGMA_TOKEN=figd_your_token_here

# For persistence, add to shell profile
echo 'export FIGMA_TOKEN=figd_your_token_here' >> ~/.zshrc
```

### "Error reading config file"

**Cause:** `components.json` not found for batch generation.

**Solution:** Create the config file or specify a custom path:
```bash
npm run docs:generate-all -- --config=./path/to/config.json
```

### MCP Server Not Connecting

**Cause:** Network issues or incorrect configuration.

**Solutions:**
1. Check internet connection
2. Verify MCP server URLs are correct
3. Restart your AI tool
4. For local server, ensure you're in the GDS-MCP directory

### "Invalid node-id" Error

**Cause:** Incorrect Figma URL or node ID format.

**Solution:**
1. Open the component in Figma
2. Right-click > **Copy link to selection**
3. Use the copied URL directly

### Permission Denied on Figma

**Cause:** Token doesn't have access to the file.

**Solutions:**
1. Ensure you have view access to the Figma file
2. Generate a new token with correct permissions
3. Check token hasn't expired

### Validation Errors

**Cause:** Generated documentation doesn't match schema.

**Solution:** Check the error messages and fix frontmatter:

| Error | Fix |
|-------|-----|
| Missing required field | Add the field to frontmatter |
| Invalid status | Use: draft, beta, stable, or deprecated |
| Invalid category | Use: atoms, molecules, organisms, foundations, or patterns |
| Invalid date format | Use: YYYY-MM-DD |
| Invalid version format | Use: X.Y.Z (e.g., 1.0.0) |

---

## Quick Reference

### Commands

| Command | Description |
|---------|-------------|
| `npm run docs:generate -- --url="..."` | Generate single component docs |
| `npm run docs:generate-all` | Generate docs for all components in config |
| `npm run docs:validate` | Validate documentation schema |
| `npm run analyze` | Analyze efficiency metrics |

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `FIGMA_TOKEN` | Yes | Figma personal access token |
| `SLACK_WEBHOOK_URL` | No | Slack webhook for notifications |

### MCP Servers

| Server | URL | Purpose |
|--------|-----|---------|
| figma | `https://mcp.figma.com/mcp` | Read Figma designs |
| gds-docs | `https://gitmcp.io/jamesodwyerGDS/GDS-MCP` | Access GDS documentation |

---

## Getting Help

- **Issues:** [GitHub Issues](https://github.com/jamesodwyerGDS/GDS-MCP/issues)
- **MCP Documentation:** [modelcontextprotocol.io](https://modelcontextprotocol.io/)
- **Figma MCP:** [Figma Developer Docs](https://developers.figma.com/docs/figma-mcp-server/)
