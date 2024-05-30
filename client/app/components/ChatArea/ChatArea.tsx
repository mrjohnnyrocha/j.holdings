import React from 'react';
import ChatWindow from '@/ChatWindow/ChatWindow';
import InputArea from '@/InputArea/InputArea';
import styles from './ChatArea.module.css';

const ChatArea: React.FC<{ chatId: string | null, type: string }> = ({ chatId, type }) => {
  return (
    <div className={styles.chatArea}>
      <ChatWindow chatId={chatId} type={type} />
      <InputArea userInput="" setUserInput={() => {}} sendMessage={() => {}} />
    </div>
  );
};

export default ChatArea;
