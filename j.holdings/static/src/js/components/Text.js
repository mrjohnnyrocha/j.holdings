//components/Text.js
import React from 'react';
import '../../css/style.css'; 

const Text = ({ parts }) => {
  return (
    <span>
      {parts.map((part, index) => (
        <span key={index} className={part.style}>
          {part.text}
        </span>
      ))}
    </span>
  );
};

export default Text;
