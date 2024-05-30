import React from "react";
import styles from "./InputArea.module.css";
import SendButton from "@/SendButton/SendButton";

const InputArea: React.FC<{
  userInput: string;
  setUserInput: (input: string) => void;
  sendMessage: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ userInput, setUserInput, sendMessage }) => {
  return (
    <div id="input-area" className={styles.inputArea}>
      <input
        type="text"
        id="user-input"
        placeholder="Type your question to j and press Enter..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage(e as unknown as React.FormEvent<HTMLFormElement>)}
      />
      <SendButton onClick={(event) => sendMessage(event)} />
    </div>
  );
};

export default InputArea;
