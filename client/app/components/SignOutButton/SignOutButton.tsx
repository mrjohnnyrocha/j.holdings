// components/SignOutButton.tsx
import React from 'react';
import { signOut } from 'next-auth/react';

const SignOutButton: React.FC = () => {
  return <button onClick={() => signOut()}>Sign Out</button>;
};

export default SignOutButton;
