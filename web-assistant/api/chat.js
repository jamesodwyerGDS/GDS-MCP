/**
 * Chat API Endpoint
 * Handles conversations with the OpenAI Assistant
 */

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  // Enable CORS
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

    // Add the user's message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: message
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID
    });

    if (run.status === 'completed') {
      // Get the assistant's response
      const messages = await openai.beta.threads.messages.list(thread.id);
      const lastMessage = messages.data[0];

      // Extract text and citations
      const textContent = lastMessage.content.find(c => c.type === 'text');
      const response = textContent?.text?.value || '';
      const annotations = textContent?.text?.annotations || [];

      // Extract source files from annotations
      const sources = annotations
        .filter(a => a.type === 'file_citation')
        .map(a => ({
          fileId: a.file_citation?.file_id,
          quote: a.file_citation?.quote,
          text: a.text
        }));

      // Get file details for sources
      const sourceFiles = await Promise.all(
        sources.map(async (source) => {
          try {
            const file = await openai.files.retrieve(source.fileId);
            return {
              filename: file.filename,
              quote: source.quote
            };
          } catch (e) {
            return null;
          }
        })
      );

      return res.status(200).json({
        response,
        threadId: thread.id,
        sources: sourceFiles.filter(Boolean),
        timestamp: new Date().toISOString()
      });
    } else {
      return res.status(500).json({
        error: 'Assistant run failed',
        status: run.status
      });
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({
      error: 'Failed to process message',
      details: error.message
    });
  }
}
