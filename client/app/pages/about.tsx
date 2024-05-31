import React, { useState } from "react";
import SideBar from "../components/SideBar/SideBar";
import Image from "next/image";
import Tab from "../components/Tabs/Tab/Tab";
import TabContainer from "../components/Tabs/TabContainer/TabContainer";
import TabContent from "../components/Tabs/TabContent/TabContent";
import styles from "../styles/about.module.css";
import textStyles from "../components/Text/Text.module.css";

const About = () => {
  const [activeTab, setActiveTab] = useState("j");

  const renderContent = () => {
    switch (activeTab) {
      case "joao":
        return (
          <div className={styles.aboutSection}>
            <h2 className={textStyles.highlighted}>About João Rocha</h2>
            <p className={textStyles.highlighted}>Information about João Rocha.</p>
          </div>
        );
      case "portfolio":
        return (
          <div className={styles.aboutSection}>
            <h2 className={textStyles.highlighted}>Portfolio</h2>
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
            <h2 className={textStyles.highlighted}>About J</h2>
            <p className={textStyles.highlighted}>Information about J.</p>
          </div>
        );
    }
  };

  return (
    <div>
      <SideBar />
      <TabContent>
        <div className={styles.aboutLogo}>
          <Image
            src="/assets/j_logo.png"
            alt="J Logo"
            width={100}
            height={100}
          />
        </div>
        <h1 className={styles.aboutUsTitle}>About Us</h1>
        <TabContainer>
          <Tab
            isActive={activeTab === "j"}
            label="About J"
            onClick={() => setActiveTab("j")}
          />
          <Tab
            isActive={activeTab === "joao"}
            label="About João Rocha"
            onClick={() => setActiveTab("joao")}
          />
          <Tab
            isActive={activeTab === "portfolio"}
            label="Portfolio"
            onClick={() => setActiveTab("portfolio")}
          />
        </TabContainer>
        {renderContent()}
      </TabContent>
    </div>
  );
};

export default About;
