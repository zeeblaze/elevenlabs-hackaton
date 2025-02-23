'use client';

import { useState, useEffect } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface Message {
  parts: [{ text: string }];
  role: 'model' | 'user';
}

export interface ChatInterfaceProps {
  onSendMessage?: (message: string) => void;
  onBack?: () => void;
}

export function ChatInterface({ onSendMessage, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(checkForMessages());
  const [selectedLanguage, setSelectedLanguage] = useState('Spanish');

  function checkForMessages() {
    const savedMessages = localStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : []
  }

  async function sendMessages(input: string) {
    setMessages((prevMessages) => [
      ...prevMessages,
      {role: "user", parts: [{ text: input }] }
    ]);    
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({model:"gemini-2.0-flash"})
    const chat = model.startChat({
      history: messages,
    });
    const result = await chat.sendMessage(input);
    setMessages((prevMessages) => [
      ...prevMessages,
      {role: "model", parts: [{ text: result.response.text() }] }
    ]);   
  }

  useEffect(() => {
    const saveMessages = () => localStorage.setItem('messages', JSON.stringify(messages));
    window.addEventListener('beforeunload', saveMessages);
    return () => window.removeEventListener('beforeunload', saveMessages);
  }, [messages]);

  const handleSendMessage = (text: string) => {
    sendMessages(text);
    onSendMessage?.(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="flex flex-col h-screen max-w-4xl mx-auto p-2 sm:p-4 md:p-6 space-y-2 sm:space-y-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-lg flex justify-between items-center">
          <button
            onClick={onBack}
            className="px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-indigo-600 hover:text-indigo-800 font-medium rounded-lg flex items-center gap-1 sm:gap-2 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </button>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>
        <div className="flex-1 overflow-y-auto bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg transition-all duration-200 hover:shadow-xl">
          <MessageList messages={messages} />
        </div>
        <div className="mt-auto bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-lg transition-all duration-200 hover:shadow-xl">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}