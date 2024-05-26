// src/pages/About.js
import React from 'react';
import MainLayout from './MainLayout';
import '../../css/style.css';

const AboutPage = ({ onChatChange, onTabChange }) => {
  return (
    <MainLayout onChatChange={onChatChange} onTabChange={onTabChange}>
      <div className="page-container">
        <h1>About Us</h1>
        <p>Information about the company...</p>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
