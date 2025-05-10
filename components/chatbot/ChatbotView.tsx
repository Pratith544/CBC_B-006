'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType } from '@/lib/types';
import { WeatherData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Trash2 } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { getChatbotResponse } from '@/lib/chatbotApi';

interface ChatbotViewProps {
  weatherData: WeatherData;
}

export default function ChatbotView({ weatherData }: ChatbotViewProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      role: 'assistant',
      content: 'Hello! I can help you determine which crops would grow best based on current and forecasted weather conditions. What would you like to know?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;
    
    const newMessage: ChatMessageType = {
      role: 'user',
      content: input.trim()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Get response from chatbot
      const response = await getChatbotResponse([...messages, newMessage], weatherData);
      
      // Add assistant's response
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: response
        }
      ]);
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      // Add error message
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again later.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hello! I can help you determine which crops would grow best based on current and forecasted weather conditions. What would you like to know?'
      }
    ]);
  };

  return (
    <div className="animate-in fade-in-50 duration-300">
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-xl font-bold">Crop Assistant</CardTitle>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={clearChat}
            title="Clear chat"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col h-[calc(100vh-280px)] min-h-[400px]">
            <div className="flex-1 overflow-y-auto mb-4 pr-2">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="flex items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about crops suitable for this weather..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={handleSend} 
                disabled={isLoading || input.trim() === ''}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              <p>
                Suggested questions:
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setInput("What crops can I grow in this weather?");
                    handleSend();
                  }}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs transition-colors"
                >
                  What crops can I grow in this weather?
                </button>
                <button
                  onClick={() => {
                    setInput("Is this good weather for tomatoes?");
                    handleSend();
                  }}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs transition-colors"
                >
                  Is this good weather for tomatoes?
                </button>
                <button
                  onClick={() => {
                    setInput("When should I plant wheat?");
                    handleSend();
                  }}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs transition-colors"
                >
                  When should I plant wheat?
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}