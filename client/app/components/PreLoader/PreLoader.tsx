import React from 'react';
import Image from 'next/image';
import styles from './PreLoader.module.css';

const PreLoader = () => {
  return (
    <div className={styles.preloader}>
      <Image src="/assets/j_logo.png" alt="j Logo" width={14*5} height={53*5} className={styles.flashingLogo} />
    </div>
  );
};

export default PreLoader;
