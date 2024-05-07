// components/Message.js
import React, { useState, useEffect, useRef } from 'react';
import '../../css/style.css';
import logo from '../../assets/j_icon.png';
import DOMPurify from 'dompurify';

function Message({ messages }) {
    return (
        <div id="message-container">
            {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                    {msg.type === 'j' && (
                        <div id='icon'><img src={logo} alt="j Icon" className="icon" /></div>) 
                    }
                    {msg.type === 'user' && <><b style={{fontSize: '18px'}}>YOU: </b> <br ></br></>}
                    <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.html) || msg.text }} />
                </div>
            ))}
        </div>
    );
}

export default Message;