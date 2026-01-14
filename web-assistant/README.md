# GDS Web Assistant

A web interface powered by OpenAI Assistants API that gives designers access to GDS documentation through natural language chat and component browsing.

## Features

- 🤖 **AI-Powered Chat** - Ask questions about components, tokens, and guidelines
- 📚 **Component Browser** - Browse all GDS components by category
- 📝 **Source Citations** - See which docs were used for each answer
- 🔍 **Smart Search** - OpenAI embeddings for better search than keywords
- 💬 **Conversation History** - Keep context during your session
- 🎨 **Component Cards** - Display token details when components mentioned
- 🌐 **Public Access** - Share with 80+ designers via simple URL

## Architecture

```
Frontend (React + Vite)  →  API (Node.js)  →  OpenAI Assistant  →  Vector Store
                                                                      ↓
                                                                  GDS Docs
```

- **Frontend**: React app with chat UI and component browser
- **Backend**: Serverless functions (Vercel) for OpenAI API calls
- **OpenAI**: Assistant with file search across all docs
- **Hosting**: Vercel (FREE tier)

## Quick Start

### 1. Setup OpenAI

```bash
# Copy environment template
cp .env.example .env

# Add your OpenAI API key to .env
OPENAI_API_KEY=sk-your-key-here
```

### 2. Upload Documentation

This uploads all markdown files from `../docs` to OpenAI:

```bash
npm install
npm run upload-docs
```

Output:
```
✅ Vector Store created: vs_abc123...
📤 Uploading 45 files...
✅ Documentation upload complete!
```

### 3. Create Assistant

This creates the OpenAI Assistant and configures it:

```bash
npm run setup-assistant
```

Output:
```
✅ Assistant created: asst_xyz789...
📝 Updated .env with Assistant ID
```

### 4. Install Frontend

```bash
npm run frontend:install
```

### 5. Run Development Server

```bash
# Terminal 1 - API server
npm run dev

# Terminal 2 - Frontend
npm run frontend:dev
```

Open http://localhost:5173

## Project Structure

```
web-assistant/
├── api/
│   ├── chat.js              # Chat endpoint (POST /api/chat)
│   ├── components.js        # Components list (GET /api/components)
│   ├── upload-docs.js       # Upload docs to OpenAI
│   ├── setup-assistant.js   # Create OpenAI Assistant
│   └── dev-server.js        # Local development server
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx              # Main chat interface
│   │   │   ├── ComponentBrowser.jsx  # Component sidebar
│   │   │   ├── MessageList.jsx       # Chat messages
│   │   │   └── SourceCard.jsx        # Source citations
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── package.json
├── vercel.json             # Deployment config
├── .env.example
└── README.md
```

## Usage

### Chat Interface

Ask natural language questions:

- "Show me the button component"
- "What is the neptune color?"
- "How do I use input fields?"
- "What spacing tokens are available?"

The assistant will:
1. Search through all GDS documentation
2. Provide detailed answers
3. Show source files used
4. Maintain conversation context

### Component Browser

- Browse components by category (atoms, molecules, organisms)
- Search by name or description
- Click to auto-fill chat with component query
- See component status (stable, beta, draft, deprecated)

### Source Citations

Every response shows:
- Which documentation files were used
- Relevant quotes from those files
- Easy to verify accuracy

## Deployment to Vercel (FREE)

### 1. Push to GitHub

```bash
git add web-assistant/
git commit -m "Add web assistant"
git push
```

### 2. Deploy to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Root Directory**: `web-assistant`
   - **Framework Preset**: Other
   - **Build Command**: (leave empty - uses vercel.json)
   - **Output Directory**: (leave empty - uses vercel.json)

5. Add Environment Variables:
   ```
   OPENAI_API_KEY=sk-your-key-here
   OPENAI_ASSISTANT_ID=asst-xxx (from .env)
   OPENAI_VECTOR_STORE_ID=vs-xxx (from .env)
   ```

6. Click "Deploy"

### 3. Share URL

Vercel gives you a URL like: `https://gds-assistant.vercel.app`

Share this with all 80 designers - no login needed!

## Updating Documentation

When your GDS docs change:

```bash
# Re-upload docs to OpenAI
npm run upload-docs

# The Assistant will automatically use the updated docs
```

OpenAI will use the latest uploaded docs. No need to recreate the Assistant.

## Cost Estimation

For 80 designers:

- **Vector Store**: ~$0.10/GB/month (your docs are < 0.1GB)
- **Search**: ~$0.20 per 1M tokens
- **Assistant**: ~$0.01-0.05 per query

**Estimated Total**: $10-30/month for all 80 users

Much cheaper than per-user subscriptions!

## Local Development

### API Server

```bash
npm run dev
```

Runs on http://localhost:3001

Endpoints:
- `POST /api/chat` - Send messages
- `GET /api/components` - List components

### Frontend

```bash
npm run frontend:dev
```

Runs on http://localhost:5173

Hot-reloads on changes.

### Testing

Test the API directly:

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the neptune color?"}'
```

## Troubleshooting

### "Assistant not found"

Run setup again:
```bash
npm run setup-assistant
```

### "Vector store empty"

Re-upload docs:
```bash
npm run upload-docs
```

### Frontend not loading

Check API is running:
```bash
npm run dev
```

### OpenAI rate limits

Free tier: 3 requests/minute
Upgrade to Tier 1: 3,500 requests/minute ($5 spent)

### Deployment fails

Check environment variables are set in Vercel dashboard.

## Customization

### Assistant Instructions

Edit `api/setup-assistant.js` → `ASSISTANT_INSTRUCTIONS`

### UI Styling

Edit `frontend/tailwind.config.js` for colors/theme

### Component Categories

Edit `frontend/src/components/ComponentBrowser.jsx`

## Monitoring

### Vercel Dashboard

- View deployment logs
- See function invocations
- Monitor errors

### OpenAI Dashboard

- View API usage
- See token consumption
- Monitor costs

## Security

### Current: No Authentication (POC)

Public URL - anyone can access

### Add Authentication (Production)

Options:
1. **Simple Password**: Add middleware checking header
2. **Email Whitelist**: Verify @yourdomain.com emails
3. **SSO**: Integrate with company SSO

Example password middleware:

```javascript
// api/middleware/auth.js
export function requireAuth(req, res, next) {
  const password = req.headers['x-password'];
  if (password !== process.env.APP_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}
```

## Support

Common questions:

**Q: How do I update the docs?**
A: Run `npm run upload-docs` after updating files in `../docs`

**Q: Can I change the AI model?**
A: Edit `api/setup-assistant.js` → change `model: 'gpt-4o'`

**Q: How do I add authentication?**
A: Add middleware to API endpoints checking a password/token

**Q: Can I self-host instead of Vercel?**
A: Yes! Use any Node.js hosting. Update API URLs in frontend.

**Q: How much does OpenAI cost?**
A: Estimate $10-30/month for 80 users. See https://openai.com/pricing

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Share URL with designers
3. ✅ Monitor usage in OpenAI dashboard
4. ⏭️ Add authentication if needed
5. ⏭️ Customize UI with your branding
6. ⏭️ Add more features (favorites, share conversations, etc.)

## License

ISC
