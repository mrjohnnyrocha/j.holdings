import React, { useEffect } from "react";
import styles from "./FriendlyCaptcha.module.css";

const FRIENDLY_CAPTCHA_SITE_KEY = process.env.FRIENDLY_RECAPTCHA_SITE_KEY;

const FriendlyCaptcha: React.FC = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("friendly-challenge/widget");
    }
  }, []);

  const reloadCaptcha = () => {
    if (typeof window !== "undefined" && window.FriendlyCaptcha) {
      window.FriendlyCaptcha.reset();
    }
  };

  return (
    <div className={styles.captchaContainer}>
      <div className="frc-captcha" data-sitekey={FRIENDLY_CAPTCHA_SITE_KEY}></div>
      <button onClick={reloadCaptcha} className={styles.reloadButton}>
        Reload Captcha
      </button>
    </div>
  );
};

export default FriendlyCaptcha;
