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
/docs                 # Figma design documentation
  /components
    /atoms            # Buttons, inputs, icons
    /molecules        # Search bars, cards, form groups
    /organisms        # Headers, footers, navigation
  /foundations        # Colours, typography, spacing tokens
  /patterns           # Common UI patterns

/docs-storybook       # Storybook implementation documentation
  /components         # All 52 components with:
                      #   - Props (types, defaults)
                      #   - Styling tokens (from styled-components)
                      #   - Code examples (from stories)
  /tokens             # spacing, typography, colors
  index.md            # Component index
```

### Two Documentation Perspectives

| Figma Docs (`/docs`) | Storybook Docs (`/docs-storybook`) |
|---------------------|-----------------------------------|
| Design specs | Implementation details |
| Visual variants | TypeScript props |
| Design tokens | Styled-components tokens |
| Usage guidelines | Code examples |

## Local Development (Optional)

For contributors or advanced usage:

```bash
# Clone the repo
git clone https://github.com/jamesodwyerGDS/GDS-MCP.git
cd GDS-MCP
npm install

# Set your Figma token
export FIGMA_TOKEN=your_token_here

# Generate Figma docs for a component
npm run docs:generate -- --url="https://figma.com/file/..."

# Generate Storybook docs (all 52 components)
npm run storybook:generate

# Validate documentation
npm run docs:validate
```

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
