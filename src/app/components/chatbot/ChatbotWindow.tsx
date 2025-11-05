import React, { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageArea from "./MessageArea";
import InputArea from "./InputArea";
import { Message } from "../../types";
import { useWebSocket } from "../../hooks/useWebSocket";

interface ChatbotWindowProps {
  setIsOpen: (isOpen: boolean) => void;
}

const ChatbotWindow: React.FC<ChatbotWindowProps> = ({ setIsOpen }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const streamingRef = useRef("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      const timeout = setTimeout(() => {
        const welcomeMessage: Message = {
          id: `ai-welcome`,
          text: "Hi! 👋 How can I help you today?",
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-scroll while streaming updates arrive
  useEffect(() => {
    if (isAiResponding) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [streamingText, isAiResponding]);

  // ✅ Handle incoming streaming from WebSocket
  // ✅ Improved streaming handler with typing + loading state
  const handleWebSocketMessage = (data: any) => {
    // AI started streaming
    if (data.type === "stream") {
      setIsAiResponding(true);
      streamingRef.current += data.text ?? "";
      setStreamingText(streamingRef.current);
    }

    // AI finished streaming
    if (data.type === "end") {
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: streamingRef.current,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Reset
      setStreamingText("");
      streamingRef.current = "";
      setIsAiResponding(false);
    }

    // AI error
    if (data.type === "error") {
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        text: data.text ?? "An error occurred.",
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);

      // Reset
      setStreamingText("");
      streamingRef.current = "";
      setIsAiResponding(false);
    }
  };

  const { sendMessage, isConnected } = useWebSocket(handleWebSocketMessage);

  const handleSend = () => {
    if (!input.trim() || isAiResponding || !isConnected) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    if (isConnected) {
      sendMessage(input);
    } else {
      console.warn("WS offline: TODO fallback");
    }

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed bottom-8 right-8 w-full max-w-md h-[650px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">
      <ChatHeader
        setIsOpen={setIsOpen}
        setMessages={setMessages}
        isConnected={isConnected}
      />
      <MessageArea
        messages={messages}
        streamingText={streamingText}
        messagesEndRef={messagesEndRef}
        formatTime={formatTime}
        setInput={setInput}
        isAiResponding={isAiResponding}
      />

      <InputArea
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        handleKeyPress={handleKeyPress}
        isAiResponding={isAiResponding}
      />
    </div>
  );
};

export default ChatbotWindow;
