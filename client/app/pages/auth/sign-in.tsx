// pages/auth/sign-in.tsx
import React from 'react';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SideBar from '@/SideBar/SideBar';

const SignIn: React.FC = () => {
  const [providers, setProviders] = React.useState<any>(null);
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className="auth-container">
      < SideBar />
      <div className="form-container">
        <div className="logo-container">
          <Image src="/assets/j_logo.png" alt="j Logo" width={100} height={100} className="chat-logo" />
        </div>
        <h1>Sign In</h1>
        {providers &&
          Object.values(providers).map((provider: any) => (
            <button key={provider.name} onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
              Sign in with {provider.name}
            </button>
          ))}
        <div className="separator">OR</div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-container">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div className="input-container">
            <label>Password</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit" className="auth-button">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
