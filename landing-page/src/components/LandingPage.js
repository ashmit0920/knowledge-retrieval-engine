import React, { useState } from 'react';
import './LandingPage.css';

function LandingPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [fileName, setFileName] = useState('');
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessages = [...messages, { sender: 'user', text: input }];
      setMessages([...newMessages, { sender: 'bot', text: 'Hello! How can I help you?' }]);
      setInput('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="landing-page">
      <h1>Upload, Ask, <span>Discover</span></h1>
      <p>Your custom knowledge base at your fingertips. Upload documents, ask questions, and discover insights.</p>

      {/* Feature Section */}
      <div className='features'>
        <div className='feature'>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00aaff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="line-chart" class="lucide lucide-line-chart icon-2xl text-accent h-8 w-8 icon" icon-name="line-chart"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
          <h3>Performance</h3>
          <p>Mindsy uses Gemini 1.5 Flash to provide lightning-fast responses with minimal loading times.</p>
        </div>

        <div className='feature'>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00aaff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="settings" class="lucide lucide-settings icon-xl absolute left-0 top-4 text-accent-400 icon" icon-name="settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          <h3>Security</h3>
          <p>Your data is safeguarded and handled in the user-environment, ensuring privacy and confidentiality.</p>
        </div>

        <div className='feature'>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00aaff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="square-pen" class="lucide lucide-square-pen icon-2xl text-accent h-8 w-8 icon" icon-name="square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path></svg>
          <h3>Ease of Use</h3>
          <p>A simple, intuitive interface makes navigating and querying documents effortless.</p>
        </div>
      </div>
      
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
      </div>

    </div>
  );
}

export default LandingPage;
