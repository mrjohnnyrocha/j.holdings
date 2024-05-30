import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useSession } from "next-auth/react";
import SideBar from "@/SideBar/SideBar";
import BottomBar from "@/BottomBar/BottomBar";
import ChatArea from "@/ChatArea/ChatArea";
import styles from "@/styles/group-chat.module.css";

const GroupChat: React.FC = () => {
  const { data: session, status } = useSession();
  const [currentChat, setCurrentChat] = useState<{ id: string | null; type: string }>({ id: null, type: "group" });
  const handleNoSession = () => {
    const router = useRouter();
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
      <SideBar onChatChange={handleChatChange} />
      <ChatArea chatId={currentChat.id} type={currentChat.type} />
      <BottomBar onTabChange={(tab) => handleChatChange(tab, "group")} />
    </div>
  );
};

export default GroupChat;
