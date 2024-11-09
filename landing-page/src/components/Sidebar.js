import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'

function Sidebar() {
    return (
        <div className='sidebar'>
            <h2>Mindsy.ai</h2>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/get-started">Get Started</Link></li>
                    <li>About Us</li>
                    <li>Contact</li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;