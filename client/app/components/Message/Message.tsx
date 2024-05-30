import React from 'react';
import styles from './Message.module.css';

const Message: React.FC<{ text: string, sender: string }> = ({ text, sender }) => {
  const messageClass = sender === 'user' ? styles.user : styles.j;

  return (
    <div className={`${styles.message} ${messageClass}`}>
      <p>{text}</p>
    </div>
  );
};

export default Message;
