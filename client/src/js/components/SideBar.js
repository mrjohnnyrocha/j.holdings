// src/components/SideBar.js
import React, { useState } from 'react';
import '../../css/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logo from '../../../public/static/assets/j_logo.png';

function SideBar({ onChatChange }) {
    const [activeTab, setActiveTab] = useState('individual');
    const navigate = useNavigate();

    const handleTabChange = (tabType) => {
        setActiveTab(tabType);
        onTabChange(tabType);
    };

    return (
        <div className="sidebar">
            <a className="sidebar-logo">
                <img src={logo} alt="j Logo" />
            </a>
            <a className={activeTab === 'individual' ? 'active' : ''}
                onClick={() => handleTabChange('individual')}>
                <FontAwesomeIcon icon={faUser} /> <span >Individual Chat</span>
            </a>
            <a className={activeTab === 'group' ? 'active' : ''}
                onClick={() => handleTabChange('group')}>
                <FontAwesomeIcon icon={faUsers} /> <span >Group Chat</span>
            </a>
            <a className={activeTab === 'community' ? 'active' : ''}
                onClick={() => handleTabChange('community')}>
                <FontAwesomeIcon icon={faGlobe} /> <span> Community Chat </span>
            </a>
            <a className={activeTab === 'signin' ? 'active' : ''}
                onClick={() => handleTabChange('signin')}>
                <span>Sign In</span>
            </a>
            <a className={activeTab === 'signup' ? 'active' : ''}
                onClick={() => handleTabChange('signup')}>
                <span> Sign Up
                </span>                
            </a>
            <a className={activeTab === 'about' ? 'active' : ''}
                onClick={() => handleTabChange('about')}>
                <span>About</span>
            </a>
        </div>

    );
}

export default SideBar;
