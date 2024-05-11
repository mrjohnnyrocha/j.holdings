// src/components/SideBar.js
import React, { useState } from 'react';
import '../../css/style.css'; // Ensure the CSS is correctly imported

function SideBar({ onChatChange }) {
    const [activeTab, setActiveTab] = useState('individual');

    const handleTabChange = (chatType) => {
        setActiveTab(chatType);
        onChatChange('123', chatType); // Dummy ID, replace with actual logic
    };

    return (
        <div className="sidebar">
            <a className={activeTab === 'individual' ? 'active' : ''} 
               onClick={() => handleTabChange('individual')}>
                Individual Chat
            </a>
            <a className={activeTab === 'group' ? 'active' : ''} 
               onClick={() => handleTabChange('group')}>
                Group Chat
            </a>
            <a className={activeTab === 'community' ? 'active' : ''} 
               onClick={() => handleTabChange('community')}>
                Community Chat
            </a>
        </div>
    );
}

export default SideBar;
