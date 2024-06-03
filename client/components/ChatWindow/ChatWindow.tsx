import React, { useState, useEffect, useRef } from "react";
import lottie from "lottie-web";
import Image from "next/image";
import { useRouter } from "next/router";
import Message from "../Message/Message";
import WelcomeMessage from "../Message/WelcomeMessage";
import InputArea from "../InputArea/InputArea";
import styles from "./ChatWindow.module.css";

interface ChatWindowProps {
  chatId: string | null;
  query: string;
  type: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId, query, type }) => {
  const [userInput, setUserInput] = useState<string>("");
  const [messages, setMessages] = useState<{ type: string; content: string | JSX.Element; html?: string }[]>([
    { type: "j", content: <WelcomeMessage /> }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const lottieContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

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
        body: JSON.stringify({ message: input, chatId }),
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

  const sendMessage = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent> | null) => {
    if (event) {
      event.preventDefault();
    }
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
      const animation = lottie.loadAnimation({
        container: lottieContainerRef.current,
        path: "/assets/loading.json",
        renderer: "svg",
        loop: true,
        autoplay: true,
      });

      return () => {
        animation.destroy();
      };
    }
  }, [isLoading]);

  useEffect(() => {
    if (router.query.query) {
      setUserInput(router.query.query as string);
      sendMessage(null);
    }
  }, [router.query.query]);

  return (
    <div className={styles.chatWindow}>
      <div id="chat-container">
        <div className={styles.logoContainer}>
          <Image src="/assets/j_logo.png" alt="j Logo" width={14} height={53} />
        </div>
        <Message messages={messages} />
        {isLoading && <div id="lottie" ref={lottieContainerRef}></div>}
        <div style={{ float: "left", clear: "both" }} ref={messagesEndRef}></div>
        <InputArea
          userInput={userInput}
          setUserInput={setUserInput}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
