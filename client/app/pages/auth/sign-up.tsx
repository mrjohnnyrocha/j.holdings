import React from 'react';
import styles from '../../styles/auth/sign-up.module.css';
import Image from 'next/image';
import SideBar from '@/SideBar/SideBar';

const SignUp = () => {
  return (
    <div className={styles.authContainer}>
      < SideBar />
      <div className={styles.logoContainer}>
        <Image src="/assets/j_logo.png" alt="j Logo" width={100} height={100} />
      </div>
      <h1>Sign Up</h1>
      <div className={styles.oauthButtons}>
        <button className={styles.authButton}>Sign up with GitHub</button>
        <button className={styles.authButton}>Sign up with Google</button>
      </div>
      <div className={styles.inputContainer}>
        <label>First Name</label>
        <input type="text" className={styles.inputField} />
      </div>
      <div className={styles.inputContainer}>
        <label>Last Name</label>
        <input type="text" className={styles.inputField} />
      </div>
      <div className={styles.inputContainer}>
        <label>Email</label>
        <input type="text" className={styles.inputField} />
      </div>
      <div className={styles.inputContainer}>
        <label>Password</label>
        <input type="password" className={styles.inputField} />
      </div>
      <button className={styles.authButton}>Sign Up</button>
    </div>
  );
};

export default SignUp;
