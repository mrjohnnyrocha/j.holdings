import React from "react";
import styles from "./SendButton.module.css";

interface SendButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SendButton: React.FC<SendButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.sendButton}>
      Ask{" "}
      <div id="icon">
        <img
          src={"../assets/j_icon.png"}
          alt="j Icon"
          className={styles.jIcon}
        />
      </div>
      {" "}
    </button>
  );
};

export default SendButton;
