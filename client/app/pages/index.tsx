import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import SideBar from "../components/SideBar/SideBar";
import Image from "next/image";
import styles from "../styles/index.module.css";

const Home: React.FC = () => {
  const { data: session, status } = useSession();
  const [clusters, setClusters] = useState([]);
  const [currentChat, setCurrentChat] = useState({ id: null, type: "individual" });
  const [showPreLoader, setShowPreLoader] = useState(true);

  useEffect(() => {
    if (session) {
      fetch("/api/mongodb")
        .then((response) => response.json())
        .then((data) => setClusters(data.results));
    }
  }, [session]);

  useEffect(() => {
    const preLoaderTimeout = setTimeout(() => setShowPreLoader(false), 3000);
    return () => clearTimeout(preLoaderTimeout);
  }, []);

  if (status === "loading") return <p>Loading...</p>;

  const handleChatChange = (chatId: string, type: string) => {
    setCurrentChat({ id: chatId, type });
  };

  return (
    <div className={styles.indexContainer}>
      <SideBar onChatChange={handleChatChange} />
      <div className={styles.mainContent}>
        <h1>Welcome to YJ4</h1>
        <p>Your fully-fledged solution for seamless communication.</p>
        {!session ? (
          <>
            <button className={styles.button} onClick={() => signIn()}>
              Sign in
            </button>
            <button className={styles.button} onClick={() => signUp()}>
              Sign up
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
        <p>Experience the power of J4 for all your communication needs.</p>
      </div>
    </div>
  );
};

export default Home;
