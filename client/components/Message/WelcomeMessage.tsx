import React from 'react';
import Text from '@/Text/Text';

const welcomeMessageParts = [
  { text: 'Welcome to j AI assistant! ', style: 'highlighted' },
  { text: 'I can provide you insights about the professional life of ', style: 'normal' },
  { text: 'João Rocha', style: 'highlighted' },
  { text: '. You can ask me anything regarding his portfolio, professional experience and skills, job history and education, or any other inquiries you may have.', style: 'normal' }
];

const WelcomeMessage = () => {
  return <Text parts={welcomeMessageParts} />;
} 

export default WelcomeMessage;
