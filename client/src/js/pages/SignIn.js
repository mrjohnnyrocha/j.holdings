// src/pages/SignIn.js
import React from 'react';
import MainLayout from './MainLayout';
import '../../css/style.css';

const SignInPage = ({ onChatChange, onTabChange }) => {
  return (
    <MainLayout onChatChange={onChatChange} onTabChange={onTabChange}>
      <div className="page-container">
        <h1>Sign in</h1>
        <form>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </MainLayout>
  );
};

export default SignInPage;
