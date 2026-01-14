# GDS Slack Bot Setup Guide

Step-by-step guide to get your GDS Slack bot running.

## Prerequisites

- ✅ Node.js 18+ installed
- ✅ Slack workspace where you have admin access
- ✅ Internet connection (bot uses remote GitMCP)

## Step 1: Create Slack App (10 minutes)

### 1.1 Create the App

1. Go to https://api.slack.com/apps
2. Click **"Create New App"**
3. Select **"From scratch"**
4. Name: `GDS Bot`
5. Choose your workspace
6. Click **"Create App"**

### 1.2 Enable Socket Mode

Socket Mode allows the bot to connect without webhooks or public URLs.

1. In your app settings, go to **Settings → Socket Mode**
2. Toggle **"Enable Socket Mode"** to ON
3. Click **"Generate an app-level token"**
4. Token Name: `socket-token`
5. Add scope: `connections:write`
6. Click **"Generate"**
7. **Copy the token** (starts with `xapp-`)
8. Save this as `SLACK_APP_TOKEN`

### 1.3 Configure Bot Scopes

1. Go to **Features → OAuth & Permissions**
2. Scroll to **"Bot Token Scopes"**
3. Click **"Add an OAuth Scope"** for each:
   - `app_mentions:read` - Let the bot see when it's mentioned
   - `chat:write` - Let the bot send messages
   - `commands` - Let the bot use slash commands
   - `im:history` - Let the bot read DMs
   - `im:read` - Let the bot access DM info
   - `im:write` - Let the bot send DMs

### 1.4 Enable Events

1. Go to **Features → Event Subscriptions**
2. Toggle **"Enable Events"** to ON
3. Under **"Subscribe to bot events"**, add:
   - `app_mention` - When someone @mentions the bot
   - `message.im` - When someone DMs the bot

### 1.5 Add Slash Command

1. Go to **Features → Slash Commands**
2. Click **"Create New Command"**
3. Fill in:
   - Command: `/gds-help`
   - Short Description: `Get help using the GDS bot`
   - Usage Hint: `(no parameters)`
4. Click **"Save"**

### 1.6 Install to Workspace

1. Go to **Settings → Install App**
2. Click **"Install to Workspace"**
3. Review permissions
4. Click **"Allow"**
5. **Copy the "Bot User OAuth Token"** (starts with `xoxb-`)
6. Save this as `SLACK_BOT_TOKEN`

### 1.7 Get Signing Secret

1. Go to **Settings → Basic Information**
2. Scroll to **"App Credentials"**
3. Click **"Show"** next to "Signing Secret"
4. **Copy the secret**
5. Save this as `SLACK_SIGNING_SECRET`

## Step 2: Install Bot Dependencies (2 minutes)

```bash
# From project root
npm run bot:install
```

This installs `@slack/bolt` and dependencies.

## Step 3: Configure Environment (1 minute)

```bash
cd slack-bot
cp .env.example .env
```

Edit `.env` with your tokens:

```env
# From Step 1.6
SLACK_BOT_TOKEN=xoxb-your-bot-token-here

# From Step 1.7
SLACK_SIGNING_SECRET=your-signing-secret-here

# From Step 1.2
SLACK_APP_TOKEN=xapp-your-app-token-here
```

## Step 4: Start the Bot (1 minute)

```bash
# From project root
npm run bot:start
```

You should see:
```
Starting GDS MCP client...
✅ MCP client connected
Starting Slack bot...
⚡️ GDS Slack bot is running!
```

## Step 5: Test the Bot (2 minutes)

### Test 1: Direct Message

1. In Slack, find "GDS Bot" in Apps
2. Send a message: `Show me the button component`
3. The bot should respond with component documentation

### Test 2: Channel Mention

1. Invite the bot to a channel: `/invite @GDS Bot`
2. Mention it: `@GDS Bot what is the neptune color?`
3. The bot should respond with token information

### Test 3: Slash Command

1. Type `/gds-help` anywhere
2. The bot should show a help message

## Troubleshooting

### Bot doesn't respond

**Check:** Is the bot invited to the channel?
```
/invite @GDS Bot
```

**Check:** Are the tokens correct in `.env`?
- `SLACK_BOT_TOKEN` starts with `xoxb-`
- `SLACK_APP_TOKEN` starts with `xapp-`
- No extra spaces or quotes

**Check:** Is Socket Mode enabled?
- Go to Settings → Socket Mode in your Slack app
- Should be toggled ON

### GitMCP connection fails

**Check:** Can you reach GitMCP?
```bash
curl -X POST https://gitmcp.io/jamesodwyerGDS/GDS-MCP \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

Should return JSON with available tools.

**Check:** Is your internet connection working?
```bash
ping gitmcp.io
```

**Check:** Custom GitMCP URL (if using a different one):
```bash
# In .env file
GIT_MCP_URL=https://gitmcp.io/your-org/your-repo
```

### "Token not found" errors

The bot looks for specific token names. Available tokens:
- Colors: `neptune`, `cosmos`, `granite`, `slate`, `mars`, `earth`, `spotlight`, `diatomite`, `moonrock`
- Spacing: `auditorium`, `mauna`

Try: `What is the neptune color?` or `Show me auditorium spacing`

### Component not found

The bot searches component names from documentation. Try:
- `Show me the input field`
- `Find button docs`
- `Search for dropdown`

## Usage Examples

### Finding Components

✅ **Good queries:**
- "Show me the button component"
- "Find input field docs"
- "What's the dropdown component?"
- "Get docs for the date picker"

❌ **Less effective:**
- "component" (too vague)
- "button stuff" (ambiguous)

### Design Tokens

✅ **Good queries:**
- "What is the neptune color?"
- "Show me the auditorium spacing"
- "What's the cosmos color value?"
- "Tell me about granite"

❌ **Less effective:**
- "color" (no specific token name)
- "show me colors" (use search instead)

### Implementation Guidance

✅ **Good queries:**
- "How do I use the button?"
- "What states does the input have?"
- "Show me button variants"
- "What tokens does the input use?"

## Advanced Configuration

### Custom GitMCP URL

If you want to use a different GitMCP instance or fork, set the URL in `.env`:

```env
GIT_MCP_URL=https://gitmcp.io/your-org/your-repo
```

The bot defaults to: `https://gitmcp.io/jamesodwyerGDS/GDS-MCP`

### Add More Intents

Edit the `QueryProcessor.detectIntent()` method to recognize new query patterns:

```javascript
// Add accessibility intent
if (lowerText.match(/\b(accessibility|wcag|aria|keyboard)\b/)) {
  return { type: 'accessibility', query: text };
}
```

### Custom Response Formatting

Edit `ResponseFormatter` class methods to change how responses are displayed.

### Production Deployment

**Option 1: PM2 (Process Manager)**
```bash
npm install -g pm2
cd slack-bot
pm2 start index.js --name gds-bot
pm2 save
pm2 startup  # Set to start on boot
```

**Option 2: Docker**
```bash
cd slack-bot
docker build -t gds-bot .
docker run -d --env-file .env --name gds-bot gds-bot
```

**Option 3: Cloud Hosting**
- Heroku: `git push heroku main`
- Railway: Connect GitHub repo
- Render: Connect GitHub repo
- AWS EC2: Upload and run with PM2

Set environment variables in your hosting platform's dashboard.

## Getting Help

- **Slack API Docs:** https://api.slack.com/docs
- **Slack Bolt SDK:** https://slack.dev/bolt-js/
- **MCP Protocol:** https://modelcontextprotocol.io/

## Next Steps

Once your bot is running:

1. **Add it to team channels** - Invite to #design, #engineering, etc.
2. **Share with designers** - Send them the usage examples
3. **Monitor usage** - Check logs to see what queries are common
4. **Extend functionality** - Add new intents for common requests
5. **Automate deployment** - Set up CI/CD for updates

---

🎉 **Congratulations!** Your GDS Slack bot is now ready to help designers access the design system documentation.
