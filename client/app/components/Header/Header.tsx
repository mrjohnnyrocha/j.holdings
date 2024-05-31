import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 1250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="logoContainer" className={`${styles.header} ${visible ? styles.show : styles.hide}`}>
      <Image src="/assets/j_logo.png" alt="j Logo" width={100} height={100} className={styles.logo} />
    </div>
  );
};

export default Header;
