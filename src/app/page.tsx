
"use client"

import React, { useState } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import LandingPage from './components/LandingPage';
import ChatbotButton from './components/chatbot/ChatbotButton';
import ChatbotWindow from './components/chatbot/ChatbotWindow';

export default function ChatbotApp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <AnimatedBackground />

      <LandingPage setIsOpen={setIsOpen} />

      {!isOpen && <ChatbotButton setIsOpen={setIsOpen} />}

      {isOpen && (
        <ChatbotWindow setIsOpen={setIsOpen} />
      )}

      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 640px) {
          .fixed.bottom-8.right-8.max-w-md {
            width: calc(100vw - 2rem);
            height: calc(100vh - 2rem);
            bottom: 1rem;
            right: 1rem;
            left: 1rem;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}
