import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import SideBar from "@/SideBar/SideBar";
import BottomBar from "@/BottomBar/BottomBar";
import ChatArea from "@/ChatArea/ChatArea";
import styles from "../styles/community-chat.module.css";

const CommunityChat: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter(); // Move useRouter to the top level of the functional component
  const [currentChat, setCurrentChat] = useState<{ id: string | null; type: string }>({ id: null, type: "community" });

  useEffect(() => {
    if (!session) {
      router.push("/auth/sign-in");
    }
  }, [session, router]); // Include router in the dependency array

  const handleChatChange = (chatId: string, type: string) => {
    setCurrentChat({ id: chatId, type });
  };

  return (
    <div className={styles.chatContainer}>
      <SideBar onChatChange={handleChatChange} />
      <ChatArea chatId={currentChat.id} type={currentChat.type} />
      <BottomBar onTabChange={(tab) => handleChatChange(tab, "community")} />
    </div>
  );
};

export default CommunityChat;
