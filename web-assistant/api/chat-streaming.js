/**
 * Streaming Chat API - Much faster responses
 */

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, threadId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Create or use existing thread
    let thread;
    if (threadId) {
      thread = { id: threadId };
    } else {
      thread = await openai.beta.threads.create();
    }

    // Add message
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: message
    });

    // Stream the response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await openai.beta.threads.runs.stream(thread.id, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID
    });

    // Send thread ID first
    res.write(`data: ${JSON.stringify({ type: 'thread', threadId: thread.id })}\n\n`);

    // Stream tokens
    for await (const event of stream) {
      if (event.event === 'thread.message.delta') {
        const delta = event.data.delta.content?.[0];
        if (delta?.text?.value) {
          res.write(`data: ${JSON.stringify({ type: 'text', content: delta.text.value })}\n\n`);
        }
      }

      if (event.event === 'thread.run.completed') {
        res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
        res.end();
      }
    }

  } catch (error) {
    console.error('Streaming chat error:', error);
    res.write(`data: ${JSON.stringify({ type: 'error', error: error.message })}\n\n`);
    res.end();
  }
}
