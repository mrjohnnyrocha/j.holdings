import React, { useState } from "react";
import styles from "../styles/about.module.css";
import SideBar from "../components/SideBar/SideBar";
import Image from "next/image";

const About = () => {
  const [activeTab, setActiveTab] = useState("j");

  const renderContent = () => {
    switch (activeTab) {
      case "joao":
        return (
          <div className={styles.aboutSection}>
            <h2>About João Rocha</h2>
            <p>Information about João Rocha.</p>
          </div>
        );
      case "portfolio":
        return (
          <div className={styles.aboutSection}>
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
          <div className={styles.aboutSection}>
            <h2>About J</h2>
            <p>Information about j.</p>
          </div>
        );
    }
  };

  return (
    <div>
      {" "}
      <SideBar />{" "}
      <div className={styles.aboutContainer}>
        <div className={styles.aboutLogo}>
          <Image
            src="/assets/j_logo.png"
            alt="J Logo"
            width={100}
            height={100}
          />
        </div>
        <h1 className={styles.aboutUsTitle}>About Us</h1>
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${
              activeTab === "j" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("j")}
          >
            About J
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "joao" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("joao")}
          >
            About João Rocha
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "portfolio" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("portfolio")}
          >
            Portfolio
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default About;
