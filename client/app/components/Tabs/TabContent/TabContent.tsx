import React from 'react';
import styles from './TabContent.module.css';

interface TabContentProps {
  children: React.ReactNode;
}

const TabContent: React.FC<TabContentProps> = ({ children }) => {
  return <div className={styles.tabContentContainer}>{children}</div>;
};

export default TabContent;

