import React, { useEffect, useState } from "react";
import { Session } from "../types";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import SideBar from "@/SideBar/SideBar";
import Preloader from "@/PreLoader/PreLoader";
import styles from "../styles/index.module.css";
import Header from "@/Header/Header";

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
  const [currentChat, setCurrentChat] = useState<{
    id: string | null;
    type: string;
  }>({ id: null, type: "individual" });

  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    if (session) {
      fetch("/api/mongodb")
        .then((response) => response.json())
        .then((data) => setClusters(data.results));
    }
  }, [session]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 1000); // Hide preloader after 1 second

    return () => clearTimeout(timer);
  }, []);

  if (status === "loading") return <p>Loading...</p>;

  const handleChatChange = (chatId: string, type: string) => {
    setCurrentChat({ id: chatId, type });
  };

  return (
    <div className={styles.indexContainer}>
      {showPreloader ? (
        <Preloader />
      ) : (
        <>
          <Header />
          <SideBar onChatChange={handleChatChange} />
          <div className={styles.mainContent}>
            <div className={styles.logoContainer}>
              <Image
                src="/assets/j_logo.png"
                alt="j Logo"
                width={100}
                height={100}
                className={styles.logo}
              />
            </div>
            <h1>Home Page</h1>
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
        </>
      )}
    </div>
  );
};

export default Home;
