'use client';

import { Message } from './ChatInterface';
import { motion } from 'framer-motion';

export interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-3 sm:space-y-6">
      {messages.map((message) => (
        <motion.div
          key={message.parts[0].text
            .replace(/[^a-zA-Z0-9]/g, '')
            .toLowerCase()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`
              max-w-[85%] sm:max-w-[70%] rounded-xl sm:rounded-2xl p-3 sm:p-4
              ${message.role === 'user'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                : 'bg-white/90 text-gray-800 border border-gray-100'}
              shadow-lg hover:shadow-xl transition-shadow duration-200
              backdrop-blur-sm
            `}
          >
            <p className="text-sm sm:text-base font-medium leading-relaxed">{message.parts[0].text}</p>
            <p className="text-[10px] sm:text-xs mt-1.5 sm:mt-2 opacity-80 font-medium">
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}