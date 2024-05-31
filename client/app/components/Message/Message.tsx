import React from 'react';
import styles from './Message.module.css';

interface Message {
  type: string;
  content: string | JSX.Element;
}

interface MessageProps {
  messages: Message[];
}

const Message: React.FC<MessageProps> = ({ messages }) => {
  return (
    <div className={styles.messagesContainer}>
      {messages.map((msg, index) => {
        const messageClass = msg.type === 'user' ? styles.user : styles.j;
        return (
          <div key={index} className={`${styles.message} ${messageClass}`}>
            {msg.type === 'j' && (
                  <div id='icon'><img src={'../assets/j_icon.png'} alt="j Icon" className={styles.jIcon} /></div>) 
              }
            {msg.type === 'user' && <><b style={{fontSize: '18px'}}>YOU: </b></>}
            {typeof msg.content === 'string' ? <p>{msg.content}</p> : msg.content}
          </div>
        );
      })}
    </div>
  );
};

export default Message;