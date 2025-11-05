
import React from 'react';
import { Message } from '../../types';

interface ChatMessageProps {
  message: Message;
  formatTime: (date: Date) => string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, formatTime }) => {
  return (
    <div
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${message.sender === 'user'
          ? 'bg-linear-to-r from-purple-600 to-blue-600 text-white'
          : 'bg-white text-gray-800 border border-gray-100'
          }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        <p
          className={`text-xs mt-2 ${message.sender === 'user' ? 'text-purple-100' : 'text-gray-400'
            }`}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
