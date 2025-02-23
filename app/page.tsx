'use client';

import { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { ConversationModeSelector } from './components/ConversationModeSelector';
import RealTime from './components/RealTime';

export default function Home() {
  const [selectedMode, setSelectedMode] = useState<'realtime' | 'chat' | null>(null);

  if (!selectedMode) {
    return <ConversationModeSelector onModeSelect={setSelectedMode} />;
  }

  return (
    <main>
      {selectedMode === 'chat' ? (
        <ChatInterface onBack={() => setSelectedMode(null)} />
      ) : (
        <RealTime onBack={() => setSelectedMode(null)} />
      )}
    </main>
  );
}