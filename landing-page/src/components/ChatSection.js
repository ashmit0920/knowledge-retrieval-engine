import React, { useState } from 'react';
import './LandingPage.css';

function ChatSection() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [fileName, setFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessages = [...messages, { sender: 'user', text: input }];
      setMessages([...newMessages, { sender: 'bot', text: 'Hello! How can I help you?' }]);
      setInput('');
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);

      // Prepare file for upload
      const formData = new FormData();
      formData.append('document', file);  // FastAPI expects the field name "document"

      try {
        // Upload file to FastAPI backend
        const response = await fetch('http://localhost:8000/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setUploadStatus('Document uploaded successfully!');
          console.log('Response from server:', data);
        } else {
          setUploadStatus('Upload failed');
        }
      } catch (error) {
        console.error('Error uploading document:', error);
        setUploadStatus('Upload failed');
      }
    }
  };

  return (
    <div className="landing-page">
      <h1>Upload, Ask, <span>Discover</span></h1>

      {/* Document Uploader */}
      <div className="uploader-container">
        <input
          type="file"
          id="file-upload"
          accept=".pdf,.doc,.docx,.txt,.pptx,.csv,.xlsx"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
        <label htmlFor="file-upload" className="uploader-label">
          <span>Drag & Drop or Browse Files</span>
        </label>
        {fileName && <div className="file-name">{fileName}</div>}
        {uploadStatus && <div className='upload-status'>{uploadStatus}</div>}
      </div>

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