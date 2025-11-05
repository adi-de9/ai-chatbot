import React from "react";
import { Message } from "../../types";
import ChatMessage from "./ChatMessage";
import { Sparkles } from "lucide-react";

interface MessageAreaProps {
  messages: Message[];
  streamingText: string;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  formatTime: (date: Date) => string;
  setInput: (input: string) => void;
  isAiResponding: boolean;
}

const MessageArea: React.FC<MessageAreaProps> = ({
  messages,
  streamingText,
  messagesEndRef,
  formatTime,
  setInput,
  isAiResponding,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-linear-to-b from-gray-50 to-white">
      {messages.length === 0 && !streamingText && (
        <div className="text-center mt-16">
          <div className="bg-linear-to-br from-purple-100 to-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Sparkles size={40} className="text-purple-600" />
          </div>
          <h3 className="font-bold text-xl text-gray-800 mb-2">Welcome! 👋</h3>
          <p className="text-gray-600 text-sm mb-4">I'm your AI assistant</p>
          <div className="flex flex-wrap gap-2 justify-center px-4">
            <button
              onClick={() => {
                setInput("What can you help me with?");
              }}
              className="text-xs bg-white border border-gray-200 px-3 py-2 rounded-full hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              What can you do?
            </button>
            <button
              onClick={() => {
                setInput("Tell me something interesting");
              }}
              className="text-xs bg-white border border-gray-200 px-3 py-2 rounded-full hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              Surprise me
            </button>
          </div>
        </div>
      )}

      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          formatTime={formatTime}
        />
      ))}

      {/* Streaming Message (typing indicator or live text) */}
      {isAiResponding && (
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl p-4 bg-white text-gray-800 shadow-sm border border-gray-100">
            {streamingText ? (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {streamingText}
              </p>
            ) : (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                <span className="text-xs">AI is thinking...</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageArea;
