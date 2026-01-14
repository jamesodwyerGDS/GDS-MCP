# GDS Slack Bot - Deployment Guide

Quick guide for deploying the GDS Slack bot to production.

## Deployment Options

### 1. Local Development Machine

**Best for:** Testing, small teams

```bash
cd slack-bot
npm start
```

**Pros:**
- Immediate setup
- Easy debugging
- No hosting costs

**Cons:**
- Must keep computer running
- Not accessible when offline
- Not suitable for production

---

### 2. PM2 (Process Manager)

**Best for:** Dedicated server, VPS, or always-on machine

**Setup:**
```bash
# Install PM2 globally
npm install -g pm2

# Start the bot
cd slack-bot
pm2 start index.js --name gds-bot

# Save PM2 configuration
pm2 save

# Set PM2 to start on system boot
pm2 startup
# Follow the command it outputs

# View logs
pm2 logs gds-bot

# Restart after changes
pm2 restart gds-bot
```

**Pros:**
- Auto-restart on failure
- Easy log management
- Starts on system reboot
- Process monitoring

**Cons:**
- Requires dedicated machine
- Manual setup on server

---

### 3. Docker

**Best for:** Containerized deployments, cloud platforms

**Create `Dockerfile`:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy docs directory
COPY ../docs ./docs

# Copy bot files
COPY package*.json ./
RUN npm ci --production

COPY . .

CMD ["node", "index.js"]
```

**Build and run:**
```bash
cd slack-bot
docker build -t gds-slack-bot .
docker run -d \
  --name gds-bot \
  --env-file .env \
  --restart unless-stopped \
  gds-slack-bot

# View logs
docker logs -f gds-bot

# Stop
docker stop gds-bot
```

**Pros:**
- Consistent environment
- Easy to deploy anywhere
- Portable and reproducible

**Cons:**
- Requires Docker knowledge
- Slightly more complex setup

---

### 4. Cloud Platforms

#### Heroku

```bash
# Install Heroku CLI
heroku login

# Create app
heroku create gds-slack-bot

# Set environment variables
heroku config:set SLACK_BOT_TOKEN=xoxb-...
heroku config:set SLACK_SIGNING_SECRET=...
heroku config:set SLACK_APP_TOKEN=xapp-...

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

**Pricing:** Free tier available, then $7/month

#### Railway

1. Go to https://railway.app
2. Connect GitHub repo
3. Select `slack-bot` directory
4. Add environment variables in dashboard
5. Deploy automatically

**Pricing:** $5/month + usage

#### Render

1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repo
4. Set:
   - Build Command: `cd slack-bot && npm install`
   - Start Command: `cd slack-bot && npm start`
5. Add environment variables
6. Deploy

**Pricing:** Free tier available

#### AWS EC2

```bash
# SSH to EC2 instance
ssh -i key.pem ubuntu@your-instance

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repo
git clone https://github.com/jamesodwyerGDS/GDS-MCP.git
cd GDS-MCP/slack-bot

# Install dependencies
npm install

# Set up environment
cp .env.example .env
nano .env  # Add your tokens

# Install PM2
sudo npm install -g pm2

# Start bot
pm2 start index.js --name gds-bot
pm2 startup
pm2 save
```

**Pricing:** Free tier available, then from $3.50/month

---

## Environment Variables

All platforms need these variables:

```env
SLACK_BOT_TOKEN=xoxb-your-token
SLACK_SIGNING_SECRET=your-secret
SLACK_APP_TOKEN=xapp-your-token
```

Optional:
```env
# Use HTTP MCP server instead of local files
MCP_SERVER_URL=http://your-server:3456/mcp
```

---

## Using HTTP MCP Server (Optional)

If you want multiple services to use the same MCP server:

### 1. Start HTTP MCP Server

```bash
# On a central server
cd /path/to/GDS-MCP
PORT=3456 npm run mcp:start
```

### 2. Configure Bot

In `.env`:
```env
MCP_SERVER_URL=http://your-server:3456/mcp
```

### 3. Security (Production)

Add authentication to `mcp-server/http-server.js`:

```javascript
// Add before MCP endpoint
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.MCP_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});
```

Then set `MCP_API_KEY` in environment variables.

---

## Monitoring & Maintenance

### Health Checks

Test bot is running:
```bash
# Check process
pm2 status gds-bot

# Or with Docker
docker ps | grep gds-bot

# Check Slack
Send DM to bot: "ping"
```

### Logs

**PM2:**
```bash
pm2 logs gds-bot --lines 100
```

**Docker:**
```bash
docker logs gds-bot --tail 100 -f
```

**Cloud platforms:**
- Heroku: `heroku logs --tail`
- Railway: View in dashboard
- Render: View in dashboard

### Updates

When you update the bot code:

**PM2:**
```bash
git pull
cd slack-bot
npm install
pm2 restart gds-bot
```

**Docker:**
```bash
git pull
docker build -t gds-slack-bot .
docker stop gds-bot
docker rm gds-bot
docker run -d --name gds-bot --env-file .env gds-slack-bot
```

**Cloud platforms:**
- Just `git push` - auto-deploys

---

## Troubleshooting Production Issues

### Bot not responding

1. Check process is running
2. Check logs for errors
3. Verify environment variables are set
4. Test Slack tokens haven't expired
5. Check docs directory is accessible

### High memory usage

The bot loads docs into memory. If memory is an issue:

1. Use HTTP MCP server mode (offloads processing)
2. Increase server RAM
3. Limit search result count in code

### Slow responses

1. Check server location (closer to users = faster)
2. Use HTTP MCP server with caching
3. Index docs for faster searching

---

## Recommended Setup

**For small teams (< 50 users):**
- Deploy with PM2 on a small VPS ($5/month)
- Use local file access mode
- Set up automatic restarts

**For medium teams (50-200 users):**
- Deploy on Railway or Render ($5-10/month)
- Use local file access mode
- Enable monitoring/alerting

**For large teams (200+ users):**
- Deploy on AWS EC2 with PM2
- Run separate HTTP MCP server
- Add load balancer for redundancy
- Set up CloudWatch monitoring

---

## Security Checklist

Before deploying to production:

- [ ] Environment variables stored securely (not in code)
- [ ] Slack tokens have correct scopes only
- [ ] MCP server (if used) has authentication
- [ ] Server firewall configured
- [ ] HTTPS enabled (for MCP server)
- [ ] Regular security updates enabled
- [ ] Logs don't contain sensitive data
- [ ] Error messages don't leak information

---

## Support

If deployment fails:

1. Check logs first
2. Verify all environment variables
3. Test locally with `npm start`
4. Check Slack app configuration
5. Review platform-specific docs

For platform-specific help:
- **Heroku:** https://devcenter.heroku.com
- **Railway:** https://docs.railway.app
- **Render:** https://render.com/docs
- **AWS:** https://docs.aws.amazon.com/ec2
