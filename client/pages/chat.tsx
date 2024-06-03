// pages/chat.tsx
import { useRouter } from "next/router";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import SideBar from "@/SideBar/SideBar";

const ChatPage = () => {
  const router = useRouter();
  const { chatId, query } = router.query;

  return (
    <div className="chatPage">
      <SideBar />
      <ChatWindow
        chatId={chatId as string}
        query=""
        type="default"
      />
      
    </div>
  );
};

export default ChatPage;
