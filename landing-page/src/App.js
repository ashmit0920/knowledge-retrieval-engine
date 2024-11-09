import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ChatSection from './components/ChatSection';
import Sidebar from './components/Sidebar';
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        {/* Sidebar always visible */}
        <Sidebar />
        
        {/* Main content area */}
        <div className="main-content">
          <Routes>
            {/* Home Page Route (LandingPage) */}
            <Route path="/" element={<LandingPage />} />

            {/* Get Started / Chat Section Route */}
            <Route path="/get-started" element={<ChatSection />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
