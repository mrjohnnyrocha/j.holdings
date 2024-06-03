import React from "react";
import styles from "./Tab.module.css";

interface TabProps {
  isActive: boolean;
  label: string;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ isActive, label, onClick }) => {
  return (
    <button
      className={`${styles.tab} ${isActive ? styles.activeTab : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Tab;
