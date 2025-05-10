'use client';

import { Mic, X } from 'lucide-react';
import React, { useState } from 'react';
import { IconButton } from './icon-button';

interface VoiceSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

// Add TypeScript declaration for window properties
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export const VoiceSearch = ({
  onSearch,
  placeholder = 'Search products...'
}: VoiceSearchProps) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  // Check if SpeechRecognition is available (only on client side)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!('webkitSpeechRecognition' in window) &&
          !('SpeechRecognition' in window)) {
        setIsSupported(false);
      }
    }
  }, []);

  const startListening = () => {
    if (!isSupported || typeof window === 'undefined') return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    setIsListening(true);

    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
      onSearch(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className="w-full h-[48px] px-4 py-2 text-lg border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={placeholder}
          aria-label="Search products"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-16 text-gray-500 hover:text-gray-700"
            aria-label="Clear search"
          >
            <X size={24} />
          </button>
        )}
        {isSupported && (
          <IconButton
            type="button"
            onClick={startListening}
            className={`absolute right-2 ${
              isListening ? 'text-red-500 animate-pulse' : 'text-primary'
            }`}
            aria-label={isListening ? 'Listening...' : 'Search by voice'}
            variant="ghost"
          >
            <Mic size={24} />
          </IconButton>
        )}
      </div>
      {isListening && (
        <div className="absolute inset-x-0 top-full mt-2 bg-popover text-popover-foreground p-4 rounded-lg shadow-lg text-center">
          <p className="text-lg font-medium animate-pulse">
            Listening... Speak now
          </p>
        </div>
      )}
    </form>
  );
};
