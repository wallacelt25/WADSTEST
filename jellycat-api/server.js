const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Chat history storage (in-memory for demo, use a database in production)
const chatSessions = {};

// Create or get a chat session
function getOrCreateChatSession(sessionId) {
  if (!chatSessions[sessionId]) {
    chatSessions[sessionId] = [
      {
        role: "system",
        content: "You are a helpful customer support agent for Jellycat, a company that makes plush toys. You help customers with inquiries about products, shipping, returns, and other support issues. Be friendly, helpful, and concise."
      }
    ];
  }
  return chatSessions[sessionId];
}

// AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId = 'default' } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get or create chat history
    const chatHistory = getOrCreateChatSession(sessionId);
    
    // Add user message to history
    chatHistory.push({ role: "user", content: message });

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chatHistory,
      max_tokens: 300,
      temperature: 0.7,
    });

    // Get assistant response
    const assistantResponse = response.choices[0].message.content;
    
    // Add assistant response to history
    chatHistory.push({ role: "assistant", content: assistantResponse });

    // Return response
    res.json({ 
      message: assistantResponse,
      sessionId 
    });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    res.status(500).json({ 
      error: 'Failed to process your request',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Endpoint to clear chat history
app.post('/api/chat/clear', (req, res) => {
  const { sessionId = 'default' } = req.body;
  
  if (chatSessions[sessionId]) {
    // Retain only the system message
    chatSessions[sessionId] = chatSessions[sessionId].filter(msg => msg.role === 'system');
  }
  
  res.json({ success: true, message: 'Chat history cleared' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});