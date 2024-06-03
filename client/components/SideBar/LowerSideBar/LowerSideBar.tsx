import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faGlobe,
  faCaretDown,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import SignOutButton from "../../SignOutButton/SignOutButton";
import styles from "./LowerSideBar.module.css";
import textStyles from "../../Text/Text.module.css";

const LowerSideBar: React.FC = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<string>("individual");
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const router = useRouter();

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
      default:
        break;
    }
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
          <FontAwesomeIcon icon={faUser} />
          <span className={styles.itemText}>Individual Chat</span>
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
          onClick={() => setIsAboutOpen(!isAboutOpen)}
        >
          <span className={styles.itemText}>
            <Image src="/assets/about.jpg" width={7} height={12} alt="About" />
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
              href="/about/about-j"
              target="_blank"
              className={`${styles.sidebarItem} ${
                activeTab === "about-j" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("about-j")}
            >
              <span className={styles.itemText}>
                <Image src="/assets/j_logo.png" width={3} height={7} alt="j" />
                About J
              </span>
            </a>
            <a
              href="/about/about-joao-rocha"
              target="_blank"
              className={`${styles.sidebarItem} ${
                activeTab === "about-joao-rocha" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("about-joao-rocha")}
            >
              <span className={styles.itemText}>About João Rocha</span>
            </a>
            <a
              href="/about/portfolio"
              target="_blank"
              className={`${styles.sidebarItem} ${
                activeTab === "portfolio" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("portfolio")}
            >
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
                <span className={styles.itemText}>
                  <Image
                    src="/assets/sign-in.jpg"
                    width={7}
                    height={12}
                    alt="Sign In"
                  />
                  Sign In
                </span>
              </a>
            </Link>
            <Link href="/auth/sign-up" passHref legacyBehavior>
              <a
                className={`${styles.sidebarItem} ${
                  activeTab === "signup" ? styles.active : ""
                }`}
                onClick={() => handleTabChange("signup")}
              >
                <span className={styles.itemText}>
                  <Image
                    src="/assets/sign-up.jpg"
                    width={7}
                    height={12}
                    alt="Sign Up"
                  />
                  Sign Up
                </span>
              </a>
            </Link>
          </>
        )}
      </div>
    );
  }
};

export default LowerSideBar;
