import React, { useState } from "react";
import "./ChatWidget.css";

import PropTypes from "prop-types";

/**
 * ChatWidget component provides a floating chat interface for customer support
 * @component
 * @param {Object} props
 * @param {number} [props.maxMessageLength=500] - Maximum length of a message
 * @param {number} [props.maxMessages=50] - Maximum number of messages to keep in history
 * @param {function} [props.onSend] - Callback when a message is sent
 * @returns {React.ReactElement}
 */
export function ChatWidget({
  maxMessageLength = 500,
  maxMessages = 50,
  onSend,
}) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "👋 Hi! How can we help you today?",
      sender: "support",
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const maxMessageLength = 500;

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (isChatOpen) {
      setTimeout(() => {
        document.getElementById("chat-input")?.focus();
      }, 300);
    }
  };

  const validateMessage = (message) => {
    if (!message.trim()) {
      setError("Message cannot be empty");
      return false;
    }
    if (message.length > maxMessageLength) {
      setError(`Message cannot exceed ${maxMessageLength} characters`);
      return false;
    }
    return true;
  };

  const sendMessage = async () => {
    if (!validateMessage(currentMessage) || isLoading) return;
    if (currentMessage.length > maxMessageLength) {
      setError(`Message cannot exceed ${maxMessageLength} characters`);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newMessage = {
        text: currentMessage,
        sender: "user",
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, newMessage]);
      setCurrentMessage("");

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessages((prev) => [
        ...prev,
        {
          text: "Thanks for your message! Our team will respond shortly.",
          sender: "support",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-widget">
      <div className="chat-button-container">
        <button
          className="chat-toggle-button"
          aria-label="Toggle live chat"
          aria-expanded={isChatOpen}
          onClick={toggleChat}
        >
          💬
        </button>
        <div className="notification-badge">2</div>
      </div>

      <div className={`chat-window ${isChatOpen ? "open" : ""}`}>
        <div className="chat-header">
          <div className="chat-title">Live Chat</div>
          <button
            className="close-button"
            aria-label="Close chat"
            onClick={toggleChat}
          >
            ✕
          </button>
        </div>

        <div className="messages-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === "user" ? "user" : "support"}`}
            >
              <div className="message-content">{message.text}</div>
              <div className="message-time">{message.time}</div>
            </div>
          ))}
        </div>

        <div className="chat-input-container">
          {error && <div className="error-message">{error}</div>}
          <input
            id="chat-input"
            type="text"
            placeholder="Type your message..."
            aria-label="Chat message"
            value={currentMessage}
            maxLength={maxMessageLength}
            disabled={isLoading}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="chat-input"
          />
          <button
            className="send-button"
            aria-label="Send message"
            disabled={isLoading}
            onClick={sendMessage}
          >
            {isLoading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
