import { useEffect, useState } from "react";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Preloader from "../components/PreLoader/PreLoader";
import Router from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    Router.events.on("routeChangeStart", handleStart);

    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <>
      {loading && <Preloader />}
      <Component {...pageProps} />
      </>
    
    </SessionProvider>
  );
}

export default MyApp;
