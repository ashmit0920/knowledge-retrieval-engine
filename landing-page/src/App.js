import React from 'react';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <LandingPage />
    </div>
  );
}

export default App;