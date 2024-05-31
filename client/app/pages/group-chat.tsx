import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import SideBar from "@/SideBar/SideBar";
import BottomBar from "@/BottomBar/BottomBar";
import ChatWindow from "@/ChatWindow/ChatWindow";
import styles from "../styles/group-chat.module.css";
import Header from "@/Header/Header";

const GroupChat: React.FC = () => {
  const { data: session, status } = useSession();
  const [currentChat, setCurrentChat] = useState<{ id: string | null; type: string }>({ id: null, type: "group" });
  const router = useRouter();

  const handleNoSession = () => {
    router.push("/auth/sign-in");
  };

  useEffect(() => {
    if (!session) {
      handleNoSession();
    }
  }, [session]);

  const handleChatChange = (chatId: string, type: string) => {
    setCurrentChat({ id: chatId, type });
  };

  return (
    <div className={styles.chatContainer}>
      <Header />
      <SideBar onChatChange={handleChatChange} />
      <ChatWindow chatId={currentChat.id} type={currentChat.type} />
      <BottomBar onTabChange={(tab) => handleChatChange(tab, "group")} />
    </div>
  );
};

export default GroupChat;
