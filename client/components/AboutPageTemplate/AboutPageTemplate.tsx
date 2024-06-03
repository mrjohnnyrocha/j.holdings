// components/AboutPageTemplate/AboutPageTemplate.tsx
import React, { useState } from "react";
import SideBar from "../SideBar/SideBar";
import ChatWindow from "../ChatWindow/ChatWindow";
import styles from "../../styles/AboutPageTemplate.module.css";

const AboutPageTemplate = () => {
  const [activeTab, setActiveTab] = useState<string>("about-j");

  const renderContent = () => {
    switch (activeTab) {
      case "about-j":
        return (
          <div className={styles.content}>
            <h2>About J</h2>
            <p>Information about J.</p>
          </div>
        );
      case "about-joao-rocha":
        return (
          <div className={styles.content}>
            <h2>About João Rocha</h2>
            <p>Information about João Rocha.</p>
          </div>
        );
      case "portfolio":
        return (
          <div className={styles.content}>
            <h2>Portfolio</h2>
            <embed
              src="/resume.pdf"
              width="800px"
              height="600px"
              type="application/pdf"
            />
          </div>
        );
      default:
        return (
          <div className={styles.content}>
            <h2>Welcome</h2>
            <p>Select a tab to view content.</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.aboutPageTemplate}>
      <SideBar />
      <div className={styles.mainContent}>
        {renderContent()}
        <ChatWindow chatId={null} query="" type="about" />
      </div>
    </div>
  );
};

export default AboutPageTemplate;
