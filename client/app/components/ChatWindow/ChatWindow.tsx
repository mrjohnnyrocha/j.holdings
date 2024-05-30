import React, { useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic';
import Image from "next/image";
import Message from "@/Message/Message";
import SendButton from "@/SendButton/SendButton";
import styles from './ChatWindow.module.css';

const lottie = dynamic(() => import('lottie-web'), { ssr: false });

interface ChatWindowProps {
  chatId: string | null;
  type: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId, type }) => {
  const [userInput, setUserInput] = useState<string>("");
  const [messages, setMessages] = useState<
    { type: string; content: string | JSX.Element; html?: string }[]
  >([{ type: "j", content: "Welcome to the chat!" }]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const lottieContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getResponse = async (input: string): Promise<string> => {
    setIsLoading(true);
    input = input.toLowerCase().trim();
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/chat`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch the response from the server");
      }
      setIsLoading(false);
      return await response.text();
    } catch (error) {
      setIsLoading(false);
      console.error("Fetching error:", error);
      return `Error: ${(error as Error).message}`;
    }
  };

  const sendMessage = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.preventDefault();
    if (!userInput.trim()) return;
    const newMessages = [...messages, { type: "user", content: userInput }];
    getResponse(userInput).then((jResponse) => {
      newMessages.push({ type: "j", content: jResponse, html: jResponse });
      setMessages(newMessages);
      scrollToBottom();
      setUserInput("");
    });
  };

  useEffect(() => {
    if (isLoading && lottieContainerRef.current) {
      lottie.loadAnimation({
        container: lottieContainerRef.current,
        animationData: require('/public/assets/loading.json'),
        renderer: "svg",
        loop: true,
        autoplay: true,
      });
    }
  }, [isLoading]);

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatContainer}>
        <div className={styles.logoContainer}>
          <Image src="/assets/j_logo.png" alt="j Logo" className={styles.chatLogo} width={150} height={150} priority />
        </div>
        <div className={styles.messagesContainer}>
          {messages.map((message, index) => (
            <Message key={index} text={message.content} sender={message.type} />
          ))}
          {isLoading && <div ref={lottieContainerRef} className={styles.loadingAnimation}></div>}
          <div ref={messagesEndRef}></div>
        </div>
        <div className={styles.inputArea}>
          <input
            type="text"
            id="user-input"
            placeholder="Type your question to j and press Enter..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage(e)}
          />
          <SendButton onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
