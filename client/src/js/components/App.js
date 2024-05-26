// src/components/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ChatWindow from './ChatWindow';
import BottomBar from './BottomBar'; 
import SideBar from './SideBar';
import '../../css/style.css';

import SignInPage from '../pages/Signin';
import SignUpPage from '../pages/SignUp';
import AboutPage from '../pages/About';


function App() {
  const [currentChat, setCurrentChat] = useState({ id: null, type: 'individual' });
  

  const handleChatChange = (chatId, type) => {
    setCurrentChat({ id: chatId, type: type });
  };

  const handleTabChange = (tabType) => {
    const navigate = useNavigate();
    if (tabType === 'signin' || tabType === 'signup' || tabType === 'about') {
      useHistory().push(`/${tabType}`);
    } else {
      setCurrentChat({ id: null, type: tabType });
    }
  };

  return (
    <Router>
      <div className="app-container">
          <SideBar onChatChange={handleChatChange} />
          <Routes>
            <Route path="/" exact>
              <ChatArea onTabChange={handleTabChange} chatId={currentChat.id} type={currentChat.type} />
            </Route>
            <Route path="/signin" component={SignInPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/about" component={AboutPage} />
          </Routes>
      </div>
    </Router>
   
  );
}

function ChatArea({ chatId, type }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-area">
      <button onClick={toggleChatWindow}>
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      {isOpen && (
        <>
          <ChatWindow chatId={chatId} type={type} />
          <BottomBar />
        </>
      )}
    </div>
  );
}

export default App;
