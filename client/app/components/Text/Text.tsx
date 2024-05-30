import React from 'react';


interface TextPart {
  style: string;
  text: string;
}

interface TextProps {
  content: TextPart[];
}

const Text: React.FC<TextProps> = ({ content }) => {
  return (
    <span>
      {content.map((part, index) => (
        <span key={index} className={part.style}>
          {part.text}
        </span>
      ))}
    </span>
  );
}

export default Text;
