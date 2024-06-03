import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { Session } from '../types';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import SideBar from '../components/SideBar/SideBar';
import PreLoader from '../components/PreLoader/PreLoader';
import Header from '../components/Header/Header';
import styles from '../styles/index.module.css';

interface Cluster {
  id: string;
  name: string;
}

const Home: React.FC = () => {
  const { data: session, status } = useSession() as {
    data: Session | null;
    status: string;
  };
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [currentChat, setCurrentChat] = useState<{ id: string | null; type: string }>({ id: null, type: 'individual' });
  const targetRef = useRef<HTMLDivElement>(null);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    if (session) {
      fetch('/api/mongodb')
        .then((response) => response.json())
        .then((data) => setClusters(data.results));
    }
  }, [session]);

  if (status === 'loading') return <p>Loading...</p>;

  const handleChatChange = (chatId: string, type: string) => {
    setCurrentChat({ id: chatId, type });
  };

  return (
    <div className={styles.indexContainer}>
      {showPreloader && <PreLoader targetRef={targetRef} />}
      <Header targetRef={targetRef} />
      <SideBar />
      <div className={styles.mainContent}>
        <h1>Welcome to YJ4</h1>
        <p>
          YJ4 is a chat application that allows you to know more about mrjohnnyrocha - or João Rocha.
        </p>
        <Image src={'/assets/underConstruction.svg'} alt="Under Construction" width={200} height={200} />
        {!session ? (
          <>
            <p>Not signed in</p>
            <button className={styles.button} onClick={() => signIn()}>
              Sign in
            </button>
          </>
        ) : (
          <>
            <p>Signed in as {session.user?.email}</p>
            <button className={styles.button} onClick={() => signOut()}>
              Sign out
            </button>
            <h2>MongoDB Clusters</h2>
            <ul>
              {clusters.map((cluster) => (
                <li key={cluster.id}>{cluster.name}</li>
              ))}
            </ul>
          </>
        )}
        <Link href="/individual-chat" legacyBehavior>
          <a className={styles.link}>Go to Chat Page</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
