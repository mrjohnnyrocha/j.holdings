import { useRouter } from 'next/router';
import ChatWindow from '../components/ChatWindow/ChatWindow';
import SideBar from '../components/SideBar/SideBar';
import styles from '../styles/individual-chat.module.css';

const IndividualChat = () => {
  const router = useRouter();
  const { chatId, query } = router.query;

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.mainContent}>
        <ChatWindow chatId={chatId as string} query={query as string} type="individual" />
      </div>
    </div>
  );
};

export default IndividualChat;
