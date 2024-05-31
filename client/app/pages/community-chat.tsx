import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import SideBar from "@/SideBar/SideBar";
import BottomBar from "@/BottomBar/BottomBar";
import ChatWindow from "@/ChatWindow/ChatWindow";
import styles from "../styles/community-chat.module.css";
import Header from "@/Header/Header";

const CommunityChat: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentChat, setCurrentChat] = useState<{ id: string | null; type: string }>({ id: null, type: "community" });

  useEffect(() => {
    if (!session) {
      router.push("/auth/sign-in");
    }
  }, [session, router]);

  const handleChatChange = (chatId: string, type: string) => {
    setCurrentChat({ id: chatId, type });
  };

  return (
    <div className={styles.chatContainer}>
      <Header />
      <SideBar onChatChange={handleChatChange} />
      <ChatWindow chatId={currentChat.id} type={currentChat.type} />
      <BottomBar onTabChange={(tab) => handleChatChange(tab, "community")} />
    </div>
  );
};

export default CommunityChat;
