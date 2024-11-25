import React from 'react';
import './sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Perplexity</h2>
      <ul>
        <li>Home</li>
        <li>Discover</li>
        <li>Spaces</li>
        <li>Library</li>
      </ul>
      <div className="auth-buttons">
        <button>Sign Up</button>
        <button>Log In</button>
      </div>
    </div>
  );
};

export default Sidebar;
