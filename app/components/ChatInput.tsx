'use client';

import { useState, FormEvent } from 'react';

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-3">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        className="flex-1 rounded-xl border-2 border-gray-100 bg-white/80 px-4 py-3
          placeholder:text-gray-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200
          outline-none transition-all duration-200 hover:shadow-md focus:shadow-lg
          backdrop-blur-sm text-gray-700 font-medium"
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className="rounded-xl bg-gradient-to-r from-indigo-800 to-purple-500 px-8 py-3
          text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50
          disabled:cursor-not-allowed transition-all duration-200 hover:scale-105
          active:scale-95 disabled:hover:scale-100"
      >
        Send
      </button>
    </form>
  );
}