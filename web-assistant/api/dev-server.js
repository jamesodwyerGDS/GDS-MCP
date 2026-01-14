/**
 * Development Server
 * Runs the API locally for testing before Vercel deployment
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatHandler from './chat.js';
import componentsHandler from './components.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'GDS Web Assistant API',
    assistant: process.env.OPENAI_ASSISTANT_ID || 'not configured',
    vectorStore: process.env.OPENAI_VECTOR_STORE_ID || 'not configured'
  });
});

// Import handlers
import chatFastHandler from './chat-fast.js';

// API endpoints
app.post('/api/chat', async (req, res) => {
  await chatFastHandler(req, res); // Use fast version
});

app.get('/api/components', async (req, res) => {
  await componentsHandler(req, res);
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║           GDS Web Assistant API Running               ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║  URL: http://localhost:${PORT}                           ║
║                                                       ║
║  Endpoints:                                           ║
║  POST /api/chat       - Chat with assistant          ║
║  GET  /api/components - List all components          ║
║                                                       ║
║  OpenAI Assistant: ${process.env.OPENAI_ASSISTANT_ID ? '✅ Configured' : '❌ Not set'}             ║
║  Vector Store: ${process.env.OPENAI_VECTOR_STORE_ID ? '✅ Configured' : '❌ Not set'}                 ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});
