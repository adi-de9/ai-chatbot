
import React from 'react';
import { Sparkles, Zap, Shield, MessageSquare } from 'lucide-react';

interface LandingPageProps {
  setIsOpen: (isOpen: boolean) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setIsOpen }) => {
  return (
    <div className="container mx-auto px-4 py-20 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6 border border-purple-100">
            <Sparkles size={16} className="text-purple-600" />
            <span className="text-sm font-medium text-purple-600">Powered by Advanced AI</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold bg-linear-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
            Real-Time AI
            <br />Chatbot Experience
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the future of conversation with intelligent streaming responses and seamless real-time communication
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="group relative bg-linear-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Start Chatting</span>
            <MessageSquare size={20} className="group-hover:rotate-12 transition-transform" />
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
          </button>
        </div>


      </div>
    </div>
  );
};

export default LandingPage;
