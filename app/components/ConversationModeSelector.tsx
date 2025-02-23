'use client';

import Image from 'next/image';

interface ConversationModeSelectorProps {
  onModeSelect: (mode: 'realtime' | 'chat') => void;
}

export function ConversationModeSelector({ onModeSelect }: ConversationModeSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Choose Your Language Learning Mode</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <button
            onClick={() => onModeSelect('realtime')}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 flex flex-col items-center"
          >
            <div className="w-24 h-24 relative mb-6">
              <Image
                src="/window.svg"
                alt="Realtime conversation"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Realtime Conversation</h2>
            <p className="text-gray-600 text-center">
              Experience natural, flowing conversations with immediate responses and voice interaction.
            </p>
          </button>

          <button
            onClick={() => onModeSelect('chat')}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 flex flex-col items-center"
          >
            <div className="w-24 h-24 relative mb-6">
              <Image
                src="/globe.svg"
                alt="Chat conversation"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Chat Conversation</h2>
            <p className="text-gray-600 text-center">
              Exchange messages at your own pace with AI assistant in a familiar chat interface.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
