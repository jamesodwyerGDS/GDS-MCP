# Quick Start Guide - 5 Minutes to Live

Get the GDS Web Assistant running for your 80 designers in 5 minutes.

## Step 1: Get OpenAI API Key (2 minutes)

1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Name it "GDS Assistant"
4. Copy the key (starts with `sk-`)

## Step 2: Setup (2 minutes)

```bash
cd web-assistant

# Install dependencies
npm install

# Configure
cp .env.example .env
# Edit .env and paste your OpenAI API key

# Upload docs and create assistant
npm run upload-docs
npm run setup-assistant
```

You'll see:
```
✅ Vector Store created: vs_abc123...
✅ Assistant created: asst_xyz789...
```

## Step 3: Test Locally (1 minute)

```bash
# Terminal 1 - API
npm run dev

# Terminal 2 - Frontend
npm run frontend:install
npm run frontend:dev
```

Open http://localhost:5173

Ask: "What is the neptune color?"

## Step 4: Deploy to Vercel (FREE)

### Option A: CLI (Fastest)

```bash
npm install -g vercel
vercel
```

Follow prompts, add environment variables when asked.

### Option B: Dashboard

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repo
4. Root Directory: `web-assistant`
5. Add Environment Variables:
   ```
   OPENAI_API_KEY=sk-your-key
   OPENAI_ASSISTANT_ID=asst-xxx (from .env)
   OPENAI_VECTOR_STORE_ID=vs-xxx (from .env)
   ```
6. Deploy

## Step 5: Share with Team

Vercel gives you a URL: `https://gds-assistant.vercel.app`

Send to your 80 designers - done!

## Costs

- Hosting: **FREE** (Vercel)
- OpenAI API: **~$10-30/month** for all 80 users

## Troubleshooting

**"Module not found"**
```bash
npm run frontend:install
```

**"Assistant not configured"**
```bash
npm run setup-assistant
```

**"Docs not found"**
Make sure you're in the `web-assistant` directory and `../docs` exists.

## Next Steps

- ✅ Customize UI colors in `frontend/tailwind.config.js`
- ✅ Add authentication (see README.md)
- ✅ Monitor usage in OpenAI dashboard
- ✅ Update docs: `npm run upload-docs`

## Support

See [README.md](README.md) for full documentation.
