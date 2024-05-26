// src/pages/SignUp.js
import React from 'react';
import MainLayout from './MainLayout';
import '../../css/style.css';

const SignUpPage = ({ onChatChange, onTabChange }) => {
  return (
    <MainLayout onChatChange={onChatChange} onTabChange={onTabChange}>
      <div className="page-container">
        <h1>Sign up</h1>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </MainLayout>
  );
};

export default SignUpPage;
