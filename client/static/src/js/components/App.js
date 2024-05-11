// src/components/App.js
import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import BottomBar from './BottomBar'; // New component for handling chat types
import SideBar from './SideBar'; // New component for handling chat types
import '../../css/style.css';

function App() {
  const [currentChat, setCurrentChat] = useState({ id: null, type: 'individual' });
  const [currentTab, setCurrentTab] = useState({ id: null, type: 'individual' });

  // Function to change current chat context
  const handleChatChange = (chatId, type) => {
    setCurrentChat({ id: chatId, type: type });
  };

  const handleTabChange = (tabType) => {
    setCurrentTab({ id: null, type: tabType });
  }

  return (
    <div className="app-container">
      <SideBar onChatChange={handleChatChange} />
      <ChatWindow chatId={currentChat.id} type={currentChat.type} />
      <BottomBar onTabChange={handleTabChange} />
    </div>
  );
}

export default App;
