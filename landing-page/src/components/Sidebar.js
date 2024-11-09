import React from 'react';
import './Sidebar.css'

function Sidebar() {
    return (
        <div className='sidebar'>
            <h2>Menu</h2>
            <nav>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact</li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;