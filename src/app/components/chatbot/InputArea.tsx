import React from "react";
import { Send } from "lucide-react";

interface InputAreaProps {
  input: string;
  setInput: (input: string) => void;
  handleSend: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  isAiResponding: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({
  input,
  setInput,
  handleSend,
  handleKeyPress,
  isAiResponding,
}) => {
  const MAX_CHARS = 500;
  const remainingChars = MAX_CHARS - input.length;

  return (
    <div className="p-5 bg-white border-t border-gray-100">
      <div className="flex gap-3 mb-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
            onKeyPress={handleKeyPress}
            disabled={isAiResponding}
            placeholder={
              isAiResponding ? "AI is responding..." : "Type your message..."
            }
            className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all text-sm placeholder:text-gray-400 text-black"
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!input.trim() || isAiResponding}
          className="bg-linear-to-r from-purple-600 to-blue-600 text-white p-3.5 rounded-2xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100 group"
          aria-label="Send message"
        >
          <Send
            size={20}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </button>
      </div>
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-2">
          {isAiResponding ? (
            <span className="flex items-center gap-2 text-purple-600">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce"></span>
                <span
                  className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></span>
                <span
                  className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></span>
              </span>
              AI is typing...
            </span>
          ) : (
            <span className="text-gray-400">Press Enter to send</span>
          )}
        </div>
        <p
          className={`font-medium ${
            remainingChars < 50 ? "text-red-500" : "text-gray-400"
          }`}
        >
          {remainingChars}
        </p>
      </div>
    </div>
  );
};

export default InputArea;
