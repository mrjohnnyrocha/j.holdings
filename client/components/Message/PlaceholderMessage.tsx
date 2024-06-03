import React from 'react';
import Text from '@/Text/Text';

const placeholderMessageParts = [
    { text: '"Type your question to ', style: 'inherit' },
    { text: 'j', style: 'highlighted' },
    { text: ' and press Enter...', style: 'inherit' }
];

const PlaceholderMessage = () => {
    return <Text parts={placeholderMessageParts} />;
};

export default PlaceholderMessage;
