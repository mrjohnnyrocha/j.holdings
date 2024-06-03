import React, { useState } from "react";
import Tab from "../../components/Tabs/Tab/Tab";
import TabContainer from "../../components/Tabs/TabContainer/TabContainer";
import TabContent from "../../components/Tabs/TabContent/TabContent";
import styles from "../../styles/about/about.module.css";
import textStyles from "../../components/Text/Text.module.css";

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
    <div className={styles.mainContent}>
      <TabContent>
        <div className={styles.contentArea}>
          {renderContent()}
        </div>
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
      </TabContent>
    </div>
  );
};

export default About;
