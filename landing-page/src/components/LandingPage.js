import React from 'react';
import './LandingPage.css';
import HowItWorks from './HowItWorks';

function LandingPage() {

  return (
    <div className="landing-page">
      <h1>Upload, Ask, <span>Discover.</span></h1>
      <p>Your custom knowledge base at your fingertips. Upload documents, ask questions, and discover insights.</p>

      {/* Feature Section */}
      <h2 className='subheading'>Why Mindsy.ai?</h2>

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

      <HowItWorks />

      {/* Use cases Section */}
      <h2 className='subheading'>Who is it for?</h2>

      <div className='features'>
        <div className='feature'>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00aaff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>          <h3>Finance</h3>
          <p>Quickly retrieve specific insights from reports and documents, saving time on complex data analysis and improving decision-making.</p>
        </div>

        <div className='feature'>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00aaff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>          <h3>Legal</h3>
          <p>Effortlessly search through lengthy legal documents to locate relevant clauses, case precedents, or terms.</p>
        </div>

        <div className='feature'>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00aaff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="square-pen" class="lucide lucide-square-pen icon-2xl text-accent h-8 w-8 icon" icon-name="square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path></svg>
          <h3>Healthcare</h3>
          <p>Access key patient data or research findings from extensive records, helping professionals make informed decisions swiftly.</p>
        </div>
      </div>

    </div>
  );
}

export default LandingPage;
