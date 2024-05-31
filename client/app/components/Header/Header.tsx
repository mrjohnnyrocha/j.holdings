import React, { useEffect, useState, RefObject } from "react";
import MainLogo from "../MainLogo/MainLogo";
import styles from "./Header.module.css";

interface HeaderProps {
  targetRef: RefObject<HTMLDivElement>;
}

const Header: React.FC<HeaderProps> = ({ targetRef }) => {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3300); // 3.3 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;

      if (prevScrollPos >= currentScrollPosition || currentScrollPosition < 10) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      setPrevScrollPos(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div
      id="logoContainer"
      className={`${styles.header} ${visible ? styles.show : styles.hide}`}
    >
      <MainLogo ref={targetRef} />
    </div>
  );
};

export default Header;
