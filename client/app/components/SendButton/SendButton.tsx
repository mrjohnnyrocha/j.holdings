import React from 'react';
import styles from './SendButton.module.css';

interface SendButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SendButton: React.FC<SendButtonProps> = ({ onClick }) => {
  return <button onClick={onClick} className={styles.sendButton}>Send</button>;
};

export default SendButton;
