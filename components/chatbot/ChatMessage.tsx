import { useState, useEffect } from 'react';
import { ChatMessage as ChatMessageType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [typedContent, setTypedContent] = useState('');
  
  // Typing effect for assistant messages
  useEffect(() => {
    if (message.role === 'assistant') {
      let index = 0;
      const timer = setInterval(() => {
        if (index < message.content.length) {
          setTypedContent(message.content.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 15); // typing speed
      
      return () => clearInterval(timer);
    } else {
      setTypedContent(message.content);
    }
  }, [message]);

  const isAssistant = message.role === 'assistant';
  
  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isAssistant ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isAssistant 
            ? "bg-gray-100 text-gray-900 rounded-tl-none" 
            : "bg-primary text-primary-foreground rounded-br-none"
        )}
      >
        {isAssistant ? (
          <div className="whitespace-pre-wrap">
            {typedContent}
            {typedContent.length < message.content.length && (
              <span className="animate-pulse">|</span>
            )}
          </div>
        ) : (
          <div className="whitespace-pre-wrap">{message.content}</div>
        )}
      </div>
    </div>
  );
}