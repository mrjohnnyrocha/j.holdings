// components/Message.js
import React, { useState, useEffect, useRef } from 'react';
import '../style.css';
import logo from '../j_icon.png';

function Message({ messages }) {
    return (
        <div id="message-container">
            {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                    {msg.type === 'j' && (
                        <div id='icon'><img src={logo} alt="j Icon" className="icon" /></div>
                    )}
                    <span dangerouslySetInnerHTML={{ __html: msg.html || msg.text }} />
                </div>
            ))}
        </div>
    );
}

export default Message;