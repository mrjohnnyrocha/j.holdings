// src/components/BottomBar.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faGlobe } from '@fortawesome/free-solid-svg-icons';
import '../../css/style.css'; // Ensure the CSS is correctly imported

function BottomBar({ onTabChange }) {


    return (
     
                <div className="bottom-bar">
                    <button className="nav-icon" onClick={() => onTabChange('individual')}>
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                    <button className="nav-icon" onClick={() => onTabChange('group')}>
                        <FontAwesomeIcon icon={faUsers} />
                    </button>
                    <button className="nav-icon" onClick={() => onTabChange('community')}>
                        <FontAwesomeIcon icon={faGlobe} />
                    </button>
                </div>
    );
}

export default BottomBar;

