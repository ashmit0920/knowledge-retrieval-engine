import React, { useState } from 'react';
import './LandingPage.css';

function ChatSection() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessages = [...messages, { sender: 'user', text: input }];
      setMessages([...newMessages, { sender: 'bot', text: 'Hello! How can I help you?' }]);
      setInput('');
    }
  };

  return (
    <div className="landing-page">
      <h1>Upload, Ask, <span>Discover</span></h1>
      <p>Your custom knowledge base at your fingertips. Upload documents, ask questions, and discover insights.</p>

      {/* Chat Interface */}
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        
        {/* Input Field */}
        <form className="chat-input-container" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chat-input"
          />
        </form>
      </div>

      
    </div>
  );
}

export default ChatSection;