import './App.css';
import ChatBox from './components/chat';
import Sidebar from './components/sidebar';
import React from 'react';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <ChatBox />
    </div>
  );
}

export default App;
