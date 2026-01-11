# GDS Helper - Figma Plugin

An AI-powered chat assistant that runs inside Figma, helping designers work with the Global Design System.

## Features

- **Chat Interface**: Ask questions about GDS components, tokens, and guidelines
- **Selection-Aware**: Analyzes your current Figma selection to provide context-specific feedback
- **Quick Actions**: Common queries accessible with one click
- **Conversation History**: Maintains context across multiple messages

## Architecture

```
figma-plugin/
├── src/
│   ├── code.ts          # Figma plugin code (selection reading, messaging)
│   └── ui.html          # Chat interface
├── backend/
│   ├── server.js        # Express server with Claude API integration
│   └── .env.example     # Environment variables template
├── dist/                # Built plugin files (generated)
├── manifest.json        # Figma plugin configuration
└── esbuild.config.js    # Build configuration
```

## Setup

### 1. Install Dependencies

```bash
# Plugin dependencies
cd figma-plugin
npm install

# Backend dependencies
cd backend
npm install
```

### 2. Configure Backend

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

### 3. Build the Plugin

```bash
# From figma-plugin directory
npm run build
```

### 4. Start the Backend

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:3001`.

### 5. Load in Figma

1. Open Figma Desktop
2. Go to **Plugins** → **Development** → **Import plugin from manifest...**
3. Select the `figma-plugin/manifest.json` file
4. The plugin appears in **Plugins** → **Development** → **GDS Helper**

## Usage

1. Open the GDS Helper plugin in Figma
2. Select layers you want to ask about (optional)
3. Type your question or use quick actions
4. Get AI-powered answers based on GDS documentation

### Example Questions

- "What component is this?" (with selection)
- "What spacing token should I use between these buttons?"
- "Does this follow accessibility guidelines?"
- "Show me button variants"
- "What color tokens are available for backgrounds?"

## Development

### Watch Mode

Run both in separate terminals:

```bash
# Terminal 1: Plugin (auto-rebuilds on changes)
npm run watch

# Terminal 2: Backend
cd backend && npm run dev
```

After changing plugin code, reload it in Figma:
**Plugins** → **Development** → **GDS Helper** (right-click) → **Run last plugin**

Or use `Cmd/Ctrl + Alt + P` to re-run.

## Deployment Options

### Local Development
The default setup runs the backend locally on port 3001.

### Production Deployment

For team-wide use, deploy the backend to:

- **Vercel**: Add `vercel.json`, deploy as serverless function
- **Railway**: Connect repo, add `ANTHROPIC_API_KEY` env var
- **Cloudflare Workers**: Convert `server.js` to Worker format
- **AWS Lambda**: Wrap in Lambda handler

After deployment, update `BACKEND_URL` in `src/code.ts`:

```typescript
const BACKEND_URL = 'https://your-deployed-backend.com/api/chat';
```

Then rebuild and redistribute the plugin.

## Plugin Distribution

### Internal Team
1. Build the plugin
2. Share the `figma-plugin` folder
3. Team members import via manifest

### Figma Community (Public)
1. Build production version
2. Submit via [Figma Plugin Submission](https://www.figma.com/plugin-docs/publish/)
3. Requires backend deployed to public URL

## Troubleshooting

### "Failed to get response" error
- Check backend is running (`http://localhost:3001/health`)
- Verify `ANTHROPIC_API_KEY` is set correctly
- Check browser console for CORS errors

### Plugin not loading
- Ensure `dist/` folder exists with built files
- Check Figma console for errors (Plugins → Development → Open Console)

### Selection not detected
- Make sure layers are selected on canvas
- Complex nested selections may show parent info only
