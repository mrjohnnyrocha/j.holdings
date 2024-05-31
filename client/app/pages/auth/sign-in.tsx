import React, { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import Separator from "@/Separator/Separator";
import SideBar from "@/SideBar/SideBar";
import Header from "@/Header/Header";
import styles from "../../styles/auth/sign-in.module.css";
import textStyles from "../../components/Text/Text.module.css";

const SignIn: React.FC = () => {
  const [providers, setProviders] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.mainContent}>
        <SideBar />
        <div className={styles.signInPage}>
          <div className={styles.signInContainer}>
            <div className={styles.logoContainer}>
              <Image
                src="/assets/j_logo.png"
                alt="j Logo"
                width={100}
                height={100}
                className={styles.logo}
              />
            </div>
            <div className={styles.formContainer}>
              <div className={styles.oauthButtons}>
                {providers &&
                  Object.values(providers).map((provider: any) => (
                    <button
                      key={provider.name}
                      onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                      className={styles.button}
                    >
                      <Image
                        src={`/assets/${provider.name.toLowerCase()}.svg`}
                        alt={provider.name}
                        width={20}
                        height={20}
                      />
                      Sign in with {provider.name}
                    </button>
                  ))}
              </div>
              <Separator />
              <form onSubmit={(e) => e.preventDefault()}>
                <div className={styles.inputContainer}>
                  <label className={textStyles.highlighted}>Email</label>
                  <input type="email" name="email" required />
                </div>
                <div className={styles.inputContainer}>
                  <label className={textStyles.highlighted}>Password</label>
                  <input type="password" name="password" required />
                </div>
                <button type="submit" className={styles.authButton}>
                  Sign in with  <div id='icon'><img src={'../assets/j_icon.png'} alt="j Icon" className={styles.jIcon} /></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
