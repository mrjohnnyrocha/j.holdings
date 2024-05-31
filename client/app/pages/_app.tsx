import { useEffect, useState, useRef } from 'react';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import PreLoader from '../components/PreLoader/PreLoader';
import Router from 'next/router';
import Header from '../components/Header/Header';
import MainLogo from '../components/MainLogo/MainLogo';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [loading, setLoading] = useState(true);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  useEffect(() => {
    const PreLoaderTimeout = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(PreLoaderTimeout);
  }, []);

  return (
    <SessionProvider session={session}>
      {loading && <PreLoader targetRef={logoRef} />}
      <Header targetRef={logoRef} />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
