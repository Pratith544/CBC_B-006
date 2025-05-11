"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AudioVisualizer } from "./audio-visualizer";
import { cn } from "@/lib/utils";
import type { SupportedLanguage } from "@/hooks/use-language-detection";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  audioFrequencyData: number[];
  onStartListening: () => void;
  onStopListening: () => void;
  onVoiceInputComplete: () => void;
  transcript: string;
  currentLanguage: SupportedLanguage;
  className?: string;
}

export function MessageInput({
  onSendMessage,
  isListening,
  isSpeaking,
  isProcessing,
  audioFrequencyData,
  onStartListening,
  onStopListening,
  onVoiceInputComplete,
  transcript,
  currentLanguage,
  className,
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update message with transcript when voice input is active
  useEffect(() => {
    if (isListening && transcript) {
      setMessage(transcript);
    }
  }, [isListening, transcript]);

  // Focus the textarea when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() && !isProcessing) {
      onSendMessage(message);
      setMessage("");

      // Reset the textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  // Handle voice input toggle
  const handleVoiceToggle = () => {
    if (isListening) {
      onStopListening();
      onVoiceInputComplete();
    } else {
      setMessage("");
      onStartListening();
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Enter (without Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isActive = isListening || isSpeaking;

  return (
    <div className={cn("space-y-2", className)}>
      {/* Audio visualizer */}
      <div
        className={cn(
          "w-full transition-all duration-300 ease-in-out",
          isActive ? "h-12 opacity-100" : "h-0 opacity-0"
        )}
      >
        {isActive && (
          <AudioVisualizer
            frequencyData={audioFrequencyData}
            isActive={isActive}
            colorClass={isListening ? "bg-primary" : "bg-accent-foreground"}
          />
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <Textarea
          ref={textareaRef}
          placeholder={`Type your message in ${
            currentLanguage === "en" ? "English" : "any language"
          }...`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-10 max-h-32 resize-none"
          disabled={isProcessing}
        />

        <div className="flex flex-col gap-2">
          <Button
            type="button"
            size="icon"
            variant={isListening ? "default" : "outline"}
            className={cn(
              "h-10 w-10 rounded-full",
              isListening && "animate-pulse bg-primary"
            )}
            onClick={handleVoiceToggle}
            disabled={isProcessing && !isListening}
          >
            {isListening ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>

          <Button
            type="submit"
            size="icon"
            className="h-10 w-10 rounded-full"
            disabled={(!message.trim() && !transcript) || isProcessing}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
