import React from "react";
import styles from "../styles/individual-chat.module.css";
import SideBar from "@/SideBar/SideBar";
import ChatWindow from "@/ChatWindow/ChatWindow";
import BottomBar from "@/BottomBar/BottomBar";
import Header from "@/Header/Header";

const IndividualChat = () => {
  return (
    <div id="chatContainer">
      <Header />
      <SideBar />
      <div className={styles.chatWindow}>
        <ChatWindow chatId="some-chat-id" type="individual" />
      </div>
      <BottomBar onTabChange={(tab) => console.log(tab)} />
    </div>
  );
};

export default IndividualChat;
