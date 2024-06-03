import { useEffect, useState, useRef } from 'react';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import PreLoader from '../components/PreLoader/PreLoader';
import Router, { useRouter } from 'next/router';
import Header from '../components/Header/Header';
import SideBar from '../components/SideBar/SideBar';
import ChatWindow from '../components/ChatWindow/ChatWindow';
import aboutStyles from '../styles/about/about.module.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isAboutPage = router.pathname.startsWith('/about');
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

      <div className={isAboutPage ? aboutStyles.container : ""}>
        {isAboutPage && <SideBar />}
        <div className={isAboutPage ? aboutStyles.mainContent : ""}>
          <Component {...pageProps} />
        </div>
        {isAboutPage && (
          <div className={aboutStyles.chatContainer}>
            <ChatWindow chatId="some-chat-id" query='' type="default" />
          </div>
        )}
      </div>
    </SessionProvider>
  );
}

export default MyApp;
