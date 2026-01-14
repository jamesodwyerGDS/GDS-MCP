# GDS Slack Bot

A Slack bot that helps designers query the Global Design System using the GDS MCP server.

## Features

- 🔍 **Component Search** - Find and browse component documentation
- 🎨 **Design Token Lookup** - Query colors, spacing, typography values
- 📖 **Implementation Guidance** - Get usage guidelines and best practices
- 💬 **Natural Language** - Ask questions in plain English
- 📁 **Local File Access** - Works with local docs (no MCP server needed!)
- 🌐 **HTTP MCP Support** - Optional MCP server integration

## Quick Start

### Prerequisites

- Node.js 18+ installed
- Slack workspace admin access
- GDS documentation in `../docs` directory (automatically available if running from this repo)

### 1. Create Slack App

1. Go to https://api.slack.com/apps
2. Click **Create New App** → **From scratch**
3. Name it "GDS Bot" and select your workspace

### 2. Configure App

**Enable Socket Mode:**
1. Go to **Settings** → **Socket Mode**
2. Enable Socket Mode
3. Generate an **App-Level Token** with `connections:write` scope
4. Save the token (starts with `xapp-`)

**Add Bot Scopes:**
1. Go to **OAuth & Permissions**
2. Add these **Bot Token Scopes**:
   - `app_mentions:read` - Read mentions
   - `chat:write` - Send messages
   - `commands` - Use slash commands
   - `im:history` - Read DM history
   - `im:read` - Access DM info
   - `im:write` - Send DMs

**Enable Events:**
1. Go to **Event Subscriptions**
2. Enable Events
3. Subscribe to **bot events**:
   - `app_mention` - When bot is mentioned
   - `message.im` - Direct messages to bot

**Add Slash Command:**
1. Go to **Slash Commands**
2. Create `/gds-help` command
3. Description: "Get help using the GDS bot"

**Install to Workspace:**
1. Go to **Install App**
2. Click **Install to Workspace**
3. Authorize the app
4. Copy the **Bot User OAuth Token** (starts with `xoxb-`)

### 3. Configure Environment

```bash
cd slack-bot
cp .env.example .env
```

Edit `.env` with your tokens:
```env
SLACK_BOT_TOKEN=xoxb-your-token
SLACK_SIGNING_SECRET=your-signing-secret
SLACK_APP_TOKEN=xapp-your-app-token
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start the Bot

```bash
npm start
```

You should see:
```
Starting GDS MCP client...
✅ MCP client connected
Starting Slack bot...
⚡️ GDS Slack bot is running!
```

## Usage

### Direct Messages

Send a DM to the bot:
- "Show me the button component"
- "What is the neptune color?"
- "Find input field docs"
- "How do I use the dropdown?"

### Mentions

Mention the bot in any channel:
- "@gds-bot show me the input field component"
- "@gds-bot what spacing tokens are available?"

### Slash Commands

- `/gds-help` - Show help and usage examples

## Example Queries

### Component Documentation
- "Show me the button component"
- "Find the input field docs"
- "What components are available?"
- "Get docs for dropdown"

### Design Tokens
- "What is the neptune color?"
- "Show me the auditorium spacing"
- "What's the cosmos color value?"
- "Tell me about the granite color"

### Implementation Guidance
- "How do I use the button?"
- "What states does the input have?"
- "Show me button variants"
- "What are the input field tokens?"

## Architecture

The bot supports two modes:

### Mode 1: Local File Access (Default)

```
┌─────────────┐      ┌──────────────┐      ┌──────────┐
│  Slack User │ ───> │  Slack Bot   │ ───> │ GDS Docs │
└─────────────┘      │  (Node.js)   │      │ (Local)  │
                     │              │      └──────────┘
                     │ - Natural language processing
                     │ - Direct file reading
                     │ - Markdown parsing
                     │ - Response formatting
                     └──────────────┘
```

**No MCP server needed!** Bot reads docs directly from `../docs`.

### Mode 2: HTTP MCP Server (Optional)

```
┌─────────────┐      ┌──────────────┐      ┌────────────┐      ┌──────────┐
│  Slack User │ ───> │  Slack Bot   │ ───> │ MCP Server │ ───> │ GDS Docs │
└─────────────┘      │  (Node.js)   │      │   (HTTP)   │      │ (Local)  │
                     └──────────────┘      └────────────┘      └──────────┘
```

Use this mode if you're running the HTTP MCP server (`npm run mcp:start`) and want to share it across multiple services.

The bot:
1. Receives messages from Slack (via Socket Mode)
2. Analyzes intent using natural language patterns
3. Queries docs (local files or HTTP MCP server)
4. Formats responses for Slack markdown
5. Sends formatted responses back to users

## Natural Language Processing

The bot detects intent from keywords:

| Intent | Keywords | MCP Tool |
|--------|----------|----------|
| Component Docs | component, button, input, dropdown | `get_component_docs` |
| Design Token | color, spacing, typography, token | `get_design_token` |
| Search | General queries | `search_gds` |

## Response Formatting

- Markdown is converted to Slack formatting
- Long responses are truncated with a "...truncated" message
- Search results show component type, relevance, and path
- Token info displays full details from MCP server

## Deployment

### Development
```bash
npm run dev  # Auto-restarts on changes
```

### Production

**Option 1: Process Manager (PM2)**
```bash
npm install -g pm2
pm2 start index.js --name gds-bot
pm2 save
```

**Option 2: Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
CMD ["node", "index.js"]
```

```bash
docker build -t gds-bot .
docker run -d --env-file .env gds-bot
```

**Option 3: Cloud Platform**
- Deploy to Heroku, Railway, Render, or AWS
- Ensure environment variables are set
- Bot uses Socket Mode (no webhooks needed)

## Troubleshooting

**Bot doesn't respond:**
- Check the bot is invited to the channel (`/invite @gds-bot`)
- Verify Socket Mode is enabled
- Check bot has correct scopes in OAuth settings

**GitMCP connection fails:**
- Check internet connectivity
- Verify GitMCP URL is accessible: `https://gitmcp.io/jamesodwyerGDS/GDS-MCP`
- Check bot logs for connection errors
- Test GitMCP directly with curl:
  ```bash
  curl -X POST https://gitmcp.io/jamesodwyerGDS/GDS-MCP \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
  ```

**Token not found:**
- Check token name spelling (e.g., "neptune", not "Neptune")
- Use `/gds-help` to see available token names
- Search docs with "show me tokens"

## Extending the Bot

### Add New Intents

Edit `QueryProcessor.detectIntent()`:
```javascript
if (lowerText.match(/\b(pattern|accessibility|wcag)\b/)) {
  return { type: 'accessibility', query: text };
}
```

### Add MCP Tools

If you add new tools to the MCP server:
```javascript
const result = await mcpClient.callTool('your_new_tool', {
  param1: 'value'
});
```

### Custom Commands

Add new slash commands in Slack app settings, then handle in bot:
```javascript
app.command('/gds-tokens', async ({ command, ack, say }) => {
  await ack();
  // Your handler logic
});
```

## Related Documentation

- [GDS MCP Server](../mcp-server/README.md)
- [Slack Bolt SDK](https://slack.dev/bolt-js/)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## Support

For issues or questions:
1. Check logs: `npm start` output
2. Review Slack app configuration
3. Test MCP server: `npm run test:mcp` (from root)
4. Check documentation exists: `ls ../docs/components/`
