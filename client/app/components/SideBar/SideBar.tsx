// components/SideBar/SideBar.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import SignOutButton from "@/SignOutButton/SignOutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faGlobe } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import styles from "./SideBar.module.css";

interface SideBarProps {
  onChatChange?: (chatId: string, chatType: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ onChatChange }) => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<string>("individual");
  const router = useRouter();

  const handleTabChange = async (chatType: string) => {
    setActiveTab(chatType);

    let chatId = new Date().getTime().toString();
    if (chatType === "individual") {
      chatId = await getOrCreateIndividualChatId();
      onChatChange?.(chatId, chatType);
      router.push(`/individual-chat?chatId=${chatId}`);
    } else if (chatType === "group") {
      if (session) {
        router.push(`/group-chat`);
        return;
      } else {
        router.push("/auth/sign-in?redirect=/group-chat");
        return;
      }
    } else if (chatType === "community") {
      if (session) {
        router.push(`/community-chat`);
        return;
      }
    } else if (chatType === "signin") {
      router.push("/auth/sign-in");
      return;
    } else if (chatType === "signup") {
      router.push("/auth/sign-up");
      return;
    } else {
      router.push("/about");
      return;
    }
  };

  const getOrCreateIndividualChatId = async () => {
    const timestamp = Date.now();
    const chatId = `chat_${timestamp}`;
    return chatId;
  };

  if (status === "loading") {
    return null;
  } else {
    return (
      <div className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <Image src="/assets/j_logo.png" alt="j Logo" width={50} height={50} />
        </div>
        <a
          className={activeTab === "individual" ? styles.active : ""}
          onClick={() => handleTabChange("individual")}
        >
          <FontAwesomeIcon icon={faUser} /> <span>Individual Chat</span>
        </a>
        <a
          className={activeTab === "group" ? styles.active : ""}
          onClick={() => handleTabChange("group")}
        >
          <FontAwesomeIcon icon={faUsers} /> <span>Group Chat</span>
        </a>
        <a
          className={activeTab === "community" ? styles.active : ""}
          onClick={() => handleTabChange("community")}
        >
          <FontAwesomeIcon icon={faGlobe} /> <span>Community Chat</span>
        </a>
        {status === "authenticated" ? (
          <>
            <p>
              YOU ARE <b>{session?.user?.email}</b>
            </p>
            <SignOutButton />
          </>
        ) : (
          <>
            <Link href="/auth/sign-in" passHref legacyBehavior>
              <a
                className={activeTab === "signin" ? styles.active : ""}
                onClick={() => handleTabChange("signin")}
              >
                <span>Sign In</span>
              </a>
            </Link>
            <Link href="/auth/sign-up" passHref legacyBehavior>
              <a
                className={activeTab === "signup" ? styles.active : ""}
                onClick={() => handleTabChange("signup")}
              >
                <span>Sign Up</span>
              </a>
            </Link>
          </>
        )}
        <Link href="/about" legacyBehavior>
          <a
            className={activeTab === "about" ? styles.active : ""}
            onClick={() => handleTabChange("about")}
          >
            <span>About</span>
          </a>
        </Link>
      </div>
    );
  }
};

export default SideBar;
