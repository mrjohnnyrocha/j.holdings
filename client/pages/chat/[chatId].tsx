import { useRouter } from 'next/router';
import ChatWindow from '../../components/ChatWindow/ChatWindow';

const ChatPage = () => {
  const router = useRouter();
  const { chatId, query } = router.query;

  return <ChatWindow chatId={chatId as string} query={query as string} type="default" />;
};

export default ChatPage;
