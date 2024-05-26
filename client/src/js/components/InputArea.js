
import React, { useState } from 'react';
import '../../css/style.css';
import Text from './Text';

function InputArea({ sendMessage, Logo }) {
    const [userInput, setUserInput] = useState('');
    const placeholderMessageParts = [
        { text: '"Type your question to ', style: 'inherit' },
        { text: 'j', style: 'highlighted' },
        { text: ' and press Enter...', style: 'inherit' }
    ];
    const PlaceholderMessage = () => {
        return <Text parts={placeholderMessageParts} />;
    } 
    const SendButton = () => {
        return (
            <button onClick={sendMessage} className="send-button">
                Ask <Logo />
            </button>
        );
    }
    
    return (
        <div id="input-area">
            <input
                type="text"
                id="user-input"
                placeholder={<PlaceholderMessage />}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
            />
            <SendButton />
        </div>
    );
}


const getResponse = async (input) => {
    setIsLoading(true);
    input = input.toLowerCase().trim();
    console.log('env secret:', process.env.REACT_APP_API_URL)
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/groq-response`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: input
      });
      if (!response.ok) {
        throw new Error('Failed to fetch the response from the server');
      }
      setIsLoading(false);
      return await response.text();
    } catch (error) {
      setIsLoading(false);
      console.error("Fetching error:", error);
      return `Error: ${error.message}`;
    }
  };


export default InputArea;