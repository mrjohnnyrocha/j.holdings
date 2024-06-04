import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faGlobe,
  faCaretDown,
  faCaretRight,
  faComment,
  faFolder,
  faBook,
  faSignIn,
  faPlusCircle,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import SignOutButton from "../../SignOutButton/SignOutButton";
import styles from "./LowerSideBar.module.css";

const LowerSideBar: React.FC = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<string>("individual");
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    console.log("Active tab changed to:", activeTab);
  }, [activeTab]);

  const handleTabChange = (chatType: string) => {
    setActiveTab(chatType);
    switch (chatType) {
      case "individual":
        router.push("/individual-chat");
        break;
      case "group":
        router.push("/group-chat");
        break;
      case "community":
        router.push("/community-chat");
        break;
      case "about-j":
        router.push("/about/about-j");
        break;
      case "about-joao-rocha":
        router.push("/about/about-joao-rocha");
        break;
      case "portfolio":
        router.push("/about/portfolio");
        break;
      default:
        break;
    }
  };

  const handleAboutToggle = () => {
    setIsAboutOpen(!isAboutOpen);
  };

  if (status === "loading") {
    return null;
  } else {
    return (
      <div className={styles.lowerSidebar}>
        <a
          className={`${styles.sidebarItem} ${
            activeTab === "individual" ? styles.active : ""
          }`}
          onClick={() => handleTabChange("individual")}
        >
          <FontAwesomeIcon icon={faComment} />
          <span className={styles.itemText}>Chat</span>
        </a>
        <a
          className={`${styles.sidebarItem} ${
            activeTab === "group" ? styles.active : ""
          }`}
          onClick={() => handleTabChange("group")}
        >
          <FontAwesomeIcon icon={faUsers} />
          <span className={styles.itemText}>Group Chat</span>
        </a>
        <a
          className={`${styles.sidebarItem} ${
            activeTab === "community" ? styles.active : ""
          }`}
          onClick={() => handleTabChange("community")}
        >
          <FontAwesomeIcon icon={faGlobe} />
          <span className={styles.itemText}>Community Chat</span>
        </a>
        <a
          className={`${styles.sidebarItem} ${
            activeTab === "about" ? styles.active : ""
          }`}
          onClick={handleAboutToggle}
        >
          <FontAwesomeIcon icon={faFolder} />
          <span className={styles.itemText}>
            About
            {isAboutOpen ? (
              <FontAwesomeIcon icon={faCaretDown} />
            ) : (
              <FontAwesomeIcon icon={faCaretRight} />
            )}
          </span>
        </a>
        {isAboutOpen && (
          <div className={styles.subSidebar}>
            <a
              className={`${styles.sidebarItem} ${
                activeTab === "about-j" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("about-j")}
            >
              <Image src="/assets/j_logo.png" width={7} height={27} alt="j" />
              <span className={styles.itemText}>About J</span>
            </a>
            <a
              className={`${styles.sidebarItem} ${
                activeTab === "about-joao-rocha" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("about-joao-rocha")}
            >
              <FontAwesomeIcon icon={faIdCard} />
              <span className={styles.itemText}>About João Rocha</span>
            </a>
            <a
              className={`${styles.sidebarItem} ${
                activeTab === "portfolio" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("portfolio")}
            >
              <FontAwesomeIcon icon={faBook} />
              <span className={styles.itemText}>Portfolio</span>
            </a>
          </div>
        )}
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
                className={`${styles.sidebarItem} ${
                  activeTab === "signin" ? styles.active : ""
                }`}
                onClick={() => handleTabChange("signin")}
              >
                <FontAwesomeIcon icon={faSignIn} />
                <span className={styles.itemText}>Sign In</span>
              </a>
            </Link>
            <Link href="/auth/sign-up" passHref legacyBehavior>
              <a
                className={`${styles.sidebarItem} ${
                  activeTab === "signup" ? styles.active : ""
                }`}
                onClick={() => handleTabChange("signup")}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
                <span className={styles.itemText}>Sign Up</span>
              </a>
            </Link>
          </>
        )}
      </div>
    );
  }
};

export default LowerSideBar;
