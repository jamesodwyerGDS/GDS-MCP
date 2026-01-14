# GDS-MCP

MCP-powered documentation workflow for the Global Design System. Generate structured markdown documentation from Figma designs, optimised for LLM retrieval.

## Quick Start (Remote - No Installation)

Add these MCP servers to your AI coding tool:

**Claude Code:**
```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
claude mcp add --transport http gds-docs https://gitmcp.io/jamesodwyerGDS/GDS-MCP
```

**Cursor / VS Code:** Add to your MCP settings:
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

That's it! You now have access to:
- **figma** - Read designs directly from Figma
- **gds-docs** - Access GDS documentation and patterns

## What You Can Do

### Generate Documentation from Figma

Use the `/figma-doc` skill in Claude Code:
```
/figma-doc https://figma.com/design/ABC123/File?node-id=1:234
```

This extracts component data from Figma and generates structured markdown documentation.

### Access Design System Docs

Ask your AI assistant about GDS components, patterns, and foundations. The MCP server provides context from the documentation.

## Documentation Structure

```
/docs
  /components
    /atoms          # Buttons, inputs, icons
    /molecules      # Search bars, cards, form groups
    /organisms      # Headers, footers, navigation
  /foundations      # Colours, typography, spacing tokens
  /patterns         # Common UI patterns
```

## Local Development (Optional)

For contributors or advanced usage:

```bash
# Clone the repo
git clone https://github.com/jamesodwyerGDS/GDS-MCP.git
cd GDS-MCP
npm install

# Set your Figma token
export FIGMA_TOKEN=your_token_here

# Generate docs for a component
npm run docs:generate -- --url="https://figma.com/file/..."

# Or use file key and node ID directly
npm run docs:generate -- --file=ABC123 --node=1:234

# Validate documentation
npm run docs:validate
```

### Recent Improvements (Jan 2025)

The Figma API integration has been significantly improved to align with the official REST API v1 spec:

**New Features:**
- ✅ **Rate limiting & retry logic** - Automatic retry with exponential backoff
- ✅ **Request caching** - 10x performance improvement on repeated queries
- ✅ **Image export** - Component screenshots automatically embedded in docs
- ✅ **Accurate token extraction** - Uses Figma's `resolvedType` (COLOR, FLOAT, STRING)
- ✅ **Published component endpoints** - Access team library metadata
- ✅ **Version tracking** - File version history for changelog maintenance

**Example: Regenerate Alert Component**
```bash
# Uses improved API with image export and proper token types
node scripts/regenerate-alert.js
```

See [`FIGMA_API_IMPROVEMENTS.md`](./FIGMA_API_IMPROVEMENTS.md) for complete details and [`ALERT_REGENERATION_EXAMPLE.md`](./ALERT_REGENERATION_EXAMPLE.md) for a demonstration.

### Local MCP Server

The repo includes a custom MCP server with optimised tools. To use it locally:

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

## Output Format

Generated documentation includes:
- Component overview and usage guidelines
- Variants and states
- Design tokens (colours, spacing, typography)
- Accessibility requirements
- Tailwind utility mappings
- CSS custom properties
- Figma variable references

**No framework-specific code** - documentation only, suitable for any implementation.

## For Designers

### Web Assistant (Recommended for Teams)

**Best for:** 80+ designers, public access, no installation

A web interface powered by OpenAI that provides chat + component browsing:

```bash
cd web-assistant
npm install
npm run upload-docs      # Upload docs to OpenAI
npm run setup-assistant  # Create AI assistant
npm run frontend:install # Install frontend
npm run dev             # Start development server
```

**Features:**
- 🤖 AI-powered chat with GPT-4
- 📚 Component browser sidebar
- 📝 Source citations from docs
- 🌐 Deploy to Vercel (FREE)
- 💰 ~$10-30/month for unlimited users

**Quick Deploy:**
1. Get OpenAI API key
2. Run setup scripts (5 min)
3. Deploy to Vercel (FREE)
4. Share URL with team

[📖 Full Documentation](web-assistant/README.md)

---

### Slack Bot

**Best for:** Slack-based teams, on-premise

A Slack bot that lets designers query GDS using natural language:

```bash
npm run bot:install
cp slack-bot/.env.example slack-bot/.env
npm run bot:start
```

**Features:**
- 💬 Natural language in Slack
- 📁 Local file access (no MCP needed)
- 🌐 Optional HTTP MCP support
- 🆓 Free to host (Render, Railway, etc.)

[📖 Full Documentation](slack-bot/README.md)

## Slack Notifications

Get notified when documentation is generated. Set your webhook URL:

```bash
export SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

Or pass it directly:
```javascript
const generator = new DocumentationGenerator(figmaToken, {
  slackWebhookUrl: 'https://hooks.slack.com/services/...'
});
```

Notifications are sent for:
- Single component documentation generated
- Batch generation complete (with success/failure summary)
- Errors during generation

## Requirements

- AI coding tool with MCP support (Claude Code, Cursor, Windsurf, VS Code)
- Figma account (for accessing designs)
- Slack webhook URL (optional, for notifications)

## Links

- [Figma MCP Documentation](https://developers.figma.com/docs/figma-mcp-server/)
- [MCP Protocol](https://modelcontextprotocol.io/)
- [GitMCP](https://gitmcp.io/)
