import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '../SearchBar/SearchBar';
import styles from './UpperSideBar.module.css';

const UpperSideBar: React.FC = () => {
  return (
    <div className={styles.upperSidebar}>
      <div className={styles.sidebarLogo}>
      <Link href="/" passHref legacyBehavior>
        <a>
        <Image src="/assets/j_logo.png" alt="j Logo" width={13} height={54} />
        </a>
        </Link>
      </div>
      <SearchBar />
    </div>
  );
};

export default UpperSideBar;
