'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioButtonProps {
  text: string;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  label?: string;
}

export function AudioButton({ text, className, size = 'icon', label }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Button
      variant="ghost"
      size={size}
      className={cn(
        "hover:bg-primary/10 hover:text-primary",
        isPlaying && "text-primary animate-pulse",
        className
      )}
      onClick={playAudio}
    >
      <Volume2 className="h-4 w-4" />
      `${label}`
      <span className="sr-only">Play audio description</span>
    </Button>
  );
}