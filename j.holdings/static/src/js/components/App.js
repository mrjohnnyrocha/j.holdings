// components/App.js
import React, { useState, useEffect, useRef } from 'react';
import '../../css/style.css';
import lottie from 'lottie-web';
import logo from '../../assets/j_icon.png';
import loadingAnimation from '../../assets/loading.json';
import Message from './Message';

function App() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    { type: 'j', html: 'Welcome to j AI assistant! I can provide you insights about the professional life of João Rocha.' },  // Initial message
    { type: 'j', html: 'You can ask me anything regarding his portfolio, professional experience and skills, job history and education, or any other inquiries you may have.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const lottieContainerRef = useRef(null); // Ref for the Lottie container
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  


  const getResponse = async (input) => {
    setIsLoading(true);
    input = input.toLowerCase().trim();
    console.log('env secret:', process.env.REACT_APP_API_URL  )
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

  const sendMessage = (event) => {
    event.preventDefault();
    if (!userInput.trim()) return;
    const newMessages = [...messages, { type: 'user', text: userInput }];
    getResponse(userInput).then(jResponse => {
      newMessages.push({ type: 'j', text: jResponse, html: jResponse });
      setMessages(newMessages);
      scrollToBottom();
      setUserInput('');
    });
  };

  useEffect(() => {
    if (isLoading) {
      const animation = lottie.loadAnimation({
        container: lottieContainerRef.current,
        animationData: loadingAnimation,
        renderer: 'svg',
        loop: true,
        autoplay: true
      });

      return () => {
        animation.destroy();
      };
    }
  }, [isLoading]);


  return (
    <div>
      <div className="logo-container">
        <img src={logo} alt="j Logo" className="chat-logo" />
        <div id="logo-text"><br ></br>Welcome. Ask me anything about João Rocha.</div>
      </div>
      <div id="chat-container">
        <Message messages={messages} />
        {isLoading && <div id="lottie" ref={lottieContainerRef}></div>}
        <div style={{ float:"left", clear: "both" }} ref={messagesEndRef}></div> {/* New line for scrolling ref */}
        <div id="input-area">
          <input
            type="text"
            id="user-input"
            placeholder="Type your question to j and press Enter..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
          />
          <button onClick={sendMessage} className="send-button">Ask j</button>
        </div>
      </div>
    </div>
  );
}

export default App;
