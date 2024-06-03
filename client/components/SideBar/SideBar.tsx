import React from 'react';
import UpperSideBar from './UpperSideBar/UpperSideBar';
import LowerSideBar from './LowerSideBar/LowerSideBar';
import styles from './SideBar.module.css';

const SideBar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <UpperSideBar />
      <LowerSideBar />
    </div>
  );
};

export default SideBar;
