// src/api/chatService.js - API service for chat functionality

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Send a message to the AI chat service
 * @param {string} message - The message to send
 * @param {string} sessionId - Unique identifier for the chat session
 * @returns {Promise<Object>} - Response from the server
 */
export const sendChatMessage = async (message, sessionId = 'default') => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, sessionId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send message');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

/**
 * Clear the chat history for a session
 * @param {string} sessionId - Unique identifier for the chat session
 * @returns {Promise<Object>} - Response from the server
 */
export const clearChatHistory = async (sessionId = 'default') => {
  try {
    const response = await fetch(`${API_URL}/chat/clear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to clear chat history');
    }

    return await response.json();
  } catch (error) {
    console.error('Error clearing chat history:', error);
    throw error;
  }
};