import React from "react";
import { Sparkles, Minimize2, X } from "lucide-react";

interface ChatHeaderProps {
  setIsOpen: (isOpen: boolean) => void;
  setMessages: (messages: any) => void;
  isConnected?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  setIsOpen,
  setMessages,
  isConnected,
}) => {
  return (
    <div className="bg-linear-to-r from-purple-600 via-blue-600 to-indigo-600 text-white p-5 flex items-center justify-between relative overflow-hidden">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      <div className="flex items-center gap-3 relative z-10">
        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
          <Sparkles size={20} />
        </div>
        <div>
          <h2 className="font-bold text-lg">AI Assistant</h2>
          <div className="flex items-center gap-1.5 text-xs text-white/90">
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-green-400 animate-pulse" : "bg-red-400"
              }`}
            ></div>
            <span>{isConnected ? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 relative z-10">
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-white/20 p-2 rounded-lg transition-all backdrop-blur-sm hover:scale-110"
          aria-label="Minimize chat"
        >
          <Minimize2 size={18} />
        </button>
        <button
          onClick={() => {
            setIsOpen(false);
            setMessages([]);
          }}
          className="hover:bg-white/20 p-2 rounded-lg transition-all backdrop-blur-sm hover:scale-110"
          aria-label="Close chat"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
