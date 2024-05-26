// src/components/MainLayout.js
import React from 'react';
import SideBar from '../components/SideBar';
import '../../css/style.css';
import logo from '../../../public/static/assets/j_logo.png';

const MainLayout = ({ children, onChatChange, onTabChange }) => {
  return (
    <div className="app-container">
      <SideBar onChatChange={onChatChange} onTabChange={onTabChange} />
      <div className="main-content">
        <div className="logo-container">
          <img src={logo} alt="j Logo" className="chat-logo" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
