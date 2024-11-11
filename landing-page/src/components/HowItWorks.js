import React from 'react';
import './HowItWorks.css';

function HowItWorks() {
  return (
    <div className="how-it-works">
      <h2>How It Works</h2>
      <div className="timeline">
        {/* Step 1 */}
        <div className="timeline-item">
          <div className="icon">📄</div>
          <h3>Upload Document</h3>
          <p>Start by uploading your document to our platform.</p>
        </div>

        {/* Step 2 */}
        <div className="timeline-item">
          <div className="icon">💬</div>
          <h3>Ask a Question</h3>
          <p>Type in a question related to the document's content.</p>
        </div>

        {/* Step 3 */}
        <div className="timeline-item">
          <div className="icon">🤖</div>
          <h3>Get a Response</h3>
          <p>Receive a context-aware answer tailored to your query.</p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
