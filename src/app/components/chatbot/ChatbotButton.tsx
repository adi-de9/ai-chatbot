import React from 'react';
import { MessageSquare } from 'lucide-react';

interface ChatbotButtonProps {
  setIsOpen: (isOpen: boolean) => void;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ setIsOpen }) => {
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-8 right-8 bg-linear-to-r from-purple-600 to-blue-600 text-white p-5 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-110 z-50 group"
      aria-label="Open chat"
    >
      <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" />
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
    </button>
  );
};

export default ChatbotButton;
