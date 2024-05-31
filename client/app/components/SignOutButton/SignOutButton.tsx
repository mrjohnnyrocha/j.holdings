// components/SignOutButton.tsx
import React from 'react';
import { signOut } from 'next-auth/react';
import styles from './SignOutButton.module.css'

const SignOutButton: React.FC = () => {
  return <button className={styles.signOutButton} onClick={() => signOut()}>Sign Out</button>;
};

export default SignOutButton;
