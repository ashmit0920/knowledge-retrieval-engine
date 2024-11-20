import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './LandingPage.css';

function ChatSection() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [fileName, setFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessages = [...messages, { sender: 'user', text: input }];
      setMessages(newMessages);
      
      try {
        // Send user message to backend
        const response = await fetch('http://localhost:8000/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: input }),
        });

        if (response.ok) {
          const data = await response.json();
          // Add bot response to messages
          setMessages([...newMessages, { sender: 'bot', text: data.response }]);
        } else {
          console.error('Error fetching response from bot');
          setMessages([...newMessages, { sender: 'bot', text: 'Error fetching response' }]);
        }
      } catch (error) {
        console.error('Error:', error);
        setMessages([...newMessages, { sender: 'bot', text: 'Error connecting to bot' }]);
      } finally {
        setInput(''); // Clear input field
      }
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(''); // Clear previous file name
      setUploadStatus(''); // Clear previous status message
      setIsUploading(true); // Set loading state to true

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
          setFileName(file.name);
          setUploadStatus('');
          // console.log('Response from server:', data);

        } else {
          setUploadStatus('Upload failed');
        }
      } catch (error) {
        console.error('Error uploading document:', error);
        setUploadStatus('Upload failed');
      } finally {
        setIsUploading(false);
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

        {/* Show loading spinner during upload */}
        {isUploading ? (
          <div className="uploading-status">
            <span>Uploading...</span>
            <span className="spinner"></span>
          </div>
        ) : (
          fileName && <div className="file-name">{fileName}</div>
        )}

        {/* Show upload status message if any */}
        {uploadStatus && <div className="upload-status">{uploadStatus}</div>} 
      
      </div>

      {/* Chat Interface */}
      {/* <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              {message.text}
            </div>
          ))}
        </div> */}
      
      {/* Chat Interface */}
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              {message.sender === 'bot' ? (
                <div className='bot-message'>
                  <ReactMarkdown
                    children={message.text}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={okaidia} // Use a syntax highlighting theme
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  />
                </div>
              ) : (
                message.text
              )}
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