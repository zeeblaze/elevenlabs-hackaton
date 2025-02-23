'use client';

import { useState, useRef, useEffect } from 'react';
import { BsTelephoneFill, BsTelephoneXFill } from 'react-icons/bs';
import { useConversation } from '@11labs/react';

export interface RealTimeProps {
  onBack: () => void;
}

export default function RealTime({ onBack }: RealTimeProps) {
  const [isRecording, setIsRecording] = useState(false);
  const conversation = useConversation();
  const {status, isSpeaking} = conversation;
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else if (mediaRecorderRef.current) {
      stopRecording();
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      const conversationId = await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID!
      });
      console.log('Conversation started:', conversationId);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      await conversation.endSession();
      console.log('Conversation ended');
    }
  };

  const handleRecordClick = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="flex flex-col h-screen max-w-4xl mx-auto p-6 md:p-6 space-y-4">
        <button
          onClick={onBack}
          className="self-start mb-2 px-4 py-2 text-sm md:text-base text-indigo-600 hover:text-indigo-800 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
          ← Back
        </button>
        <div className="flex-col h-full bg-white/60 backdrop-blur-sm rounded-2xl p-2 md:p-2 shadow-lg transition-all duration-200 hover:shadow-xl flex items-center justify-center">
          {status === "connected" ? (
            <p className="text-center text-base md:text-lg font-medium text-indigo-500">
              {isSpeaking ? 'Agent is speaking...' : 'Agent is listening...'}
            </p>
          ) : (
            <p className="text-center text-base md:text-lg font-medium text-red-500">
              {status === "disconnected" ? 'Tutor disconnected' : 'Connecting with tutor...'}
            </p>
          )}
          <button
            onClick={handleRecordClick}
            className={`rounded-full p-12 md:p-20 text-white font-medium shadow-lg hover:shadow-xl
              transition-all duration-200 hover:scale-105 active:scale-95
              ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`}
          >
            {isRecording ? 
              <BsTelephoneXFill className="w-16 h-16 md:w-32 md:h-32" /> : 
              <BsTelephoneFill className="w-16 h-16 md:w-32 md:h-32" />
            }
          </button>
          <div className={`mt-4 md:mt-8 text-center text-base md:text-lg font-medium transition-all duration-200 ${isRecording ? 'text-red-500' : 'text-indigo-500'}`}>
            {isRecording ? 'Conversation in progress...' : 'Ready to start conversation'}
          </div>
        </div>
      </div>
    </div>
  );
}