import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faGlobe } from '@fortawesome/free-solid-svg-icons';
import styles from './BottomBar.module.css';

const BottomBar: React.FC<{ onTabChange: (tab: string) => void }> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState<string>('individual');
  const [hoverActive, setHoverActive] = useState<boolean>(false);

  const iconMap: { [key: string]: any } = {
    individual: faUser,
    group: faUsers,
    community: faGlobe,
  };

  return (
    <div className={styles.bottomBar}>
      {["individual", "group", "community"].map((tab) => (
        <button
          key={tab}
          className={`${styles.navIcon} ${activeTab === tab && !hoverActive ? styles.active : ''}`}
          onClick={() => {
            setActiveTab(tab);
            onTabChange(tab);
            setHoverActive(false);
          }}
          onMouseEnter={() => setHoverActive(true)}
          onMouseLeave={() => setHoverActive(false)}
        >
          <FontAwesomeIcon icon={iconMap[tab]} />
        </button>
      ))}
    </div>
  );
};

export default BottomBar;
