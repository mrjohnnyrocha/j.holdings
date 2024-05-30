import React from 'react';
import styles from '../styles/about.module.css';
import SideBar from '../components/SideBar/SideBar';

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <SideBar />
      <div className={styles.aboutContent}>
        <h1>About Us</h1>
        <div className={styles.aboutSection}>
          <h2>About j</h2>
          <p>Information about j.</p>
        </div>
        <div className={styles.aboutSection}>
          <h2>Joao Rocha</h2>
          <p>Information about Joao Rocha.</p>
        </div>
        <div className={styles.aboutSection}>
          <h2>Portfolio</h2>
          <p>Details of the portfolio.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
