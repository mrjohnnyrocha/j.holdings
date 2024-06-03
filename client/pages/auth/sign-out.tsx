import React from 'react';
import { signOut } from 'next-auth/react';

const SignOut: React.FC = () => {
  return (
    <div>
      <h1>Sign Out</h1>
      <button onClick={() => signOut({ callbackUrl: '/' })}>
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
