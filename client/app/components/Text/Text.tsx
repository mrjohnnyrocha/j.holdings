import React from 'react';
import styles from './Text.module.css';

interface TextPart {
  style: string;
  text: string;
}

interface TextProps {
  parts: TextPart[];
}

const Text: React.FC<TextProps> = ({ parts }) => {
  return (
    <span>
      {parts.map((part, index) => (
        <span key={index} className={styles[part.style]}>
          {part.text}
        </span>
      ))}
    </span>
  );
}

export default Text;
