import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LandingPage from './LandingPage';
import ChatSection from './ChatSection'; // Import your new ChatSection

function App() {
  return (
    <Router>
      <div className="app">
        {/* Sidebar */}
        

        {/* Main Content */}
        <div className="main-content">
          <Routes>
            {/* Home Page Route */}
            <Route exact path="/" element={LandingPage} />

            {/* Get Started / Chat Section Route */}
            <Route path="/get-started" element={ChatSection} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
