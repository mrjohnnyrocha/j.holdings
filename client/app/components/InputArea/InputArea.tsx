import React from "react";
import { useState, useEffect } from "react";
import styles from "./InputArea.module.css";
import SendButton from "@/SendButton/SendButton";
import PlaceholderMessage from "@/Message/PlaceholderMessage";

interface InputAreaProps {
  userInput: string;
  setUserInput: (input: string) => void;
  sendMessage: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const placeholderMessageParts = [
  "Type your question to ",
  "j",
  " and press Enter..."
];

const InputArea: React.FC<InputAreaProps> = ({ userInput, setUserInput, sendMessage }) => {
  const [placeholder, setPlaceholder] = useState<string>(placeholderMessageParts.join(""));

  const handleFocus = () => {
    if (userInput === placeholder) {
      setUserInput("");
    }
  };

  const handleBlur = () => {
    if (userInput.trim() === "") {
      setUserInput(placeholder);
    }
  };

  useEffect(() => {
    setUserInput(placeholder);
  }, []);
  
  return (
    <div id="input-area" className={styles.inputArea}>
      <input
        type="text"
        id="user-input"
        className={styles.userInput}
        placeholder={<PlaceholderMessage />}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage(e as unknown as React.FormEvent<HTMLFormElement>)}
      />
      <SendButton onClick={(event) => sendMessage(event)} />
    </div>
  );
};

export default InputArea;
