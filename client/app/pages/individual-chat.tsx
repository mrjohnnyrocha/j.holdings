import React from 'react';
import styles from '../styles/individual-chat.module.css';
import SideBar from '@/SideBar/SideBar';
import ChatArea from '@/ChatArea/ChatArea';
import BottomBar from '@/BottomBar/BottomBar';

const IndividualChat = () => {
  return (
    <div className={styles.individualChatContainer}>
      <SideBar />
      <div className={styles.chatArea}>
        <ChatArea chatId="some-chat-id" type="individual" />
        <BottomBar onTabChange={(tab) => console.log(tab)} />
      </div>
    </div>
  );
};

export default IndividualChat;
