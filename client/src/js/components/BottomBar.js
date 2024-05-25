// src/components/BottomBar.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faGlobe } from '@fortawesome/free-solid-svg-icons';
import '../../css/style.css'; // Ensure the CSS is correctly imported

const iconMap = {
    individual: faUser,
    group: faUsers,
    community: faGlobe
  };
function BottomBar({ onTabChange }) {
    const [activeTab, setActiveTab] = useState('individual');
    const [hoverActive, setHoverActive] = useState(false);

    const handleTabChange = (chatType) => {
        setActiveTab(chatType);
        onChatChange('123', chatType); // Dummy ID, replace with actual logic
    };

    return (
        <div className="bottom-bar">
            {['individual', 'group', 'community'].map((tab) => (
                <button
                    key={tab}
                    className={`nav-icon ${activeTab === tab && !hoverActive ? 'active' : ''}`}
                    onClick={() => { setActiveTab(tab); setHoverActive(false); }}
                    onMouseEnter={() => setHoverActive(true)}
                    onMouseLeave={() => setHoverActive(false)}>
                    <FontAwesomeIcon icon={iconMap[tab]} />
                </button>
            ))}
        </div>
    );
}

export default BottomBar;

