import React from 'react';
import styles from './Tab.module.css';

interface TabProps {
  isActive: boolean;
  label: string;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ isActive, label, onClick }) => {
  return (
    <div
      className={`${styles.tab} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default Tab;

