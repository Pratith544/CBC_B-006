"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SendIcon, PlusCircle, Loader2, Bot, User, TrendingUp } from 'lucide-react';
import { askAI } from '@/lib/ai';
import { Badge } from '@/components/ui/badge';
import CommodityPriceChart from './CommodityPriceChart';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  priceData?: {
    trend: 'up' | 'down' | 'stable';
    values: { date: string; price: number }[];
    forecast?: string;
  };
}

interface CommodityChatProps {
  commodityId: string;
  commodityName: string;
}

export default function CommodityChat({ commodityId, commodityName }: CommodityChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: `Hello! I'm your agricultural advisor. Ask me anything about ${commodityName} prices, market trends, cultivation practices, or other agricultural topics.`,
        timestamp: new Date()
      }
    ]);
  }, [commodityName]);

  // Function to extract price data from AI response
  const extractPriceData = (response: string) => {
    // Check if response contains price trend information
    if (response.toLowerCase().includes('price') || response.toLowerCase().includes('trend')) {
      // Generate sample price data for visualization
      const today = new Date();
      const values = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(today.getMonth() - (5 - i));
        
        // Base price with some random variation
        const basePrice = 2000 + Math.random() * 500;
        
        return {
          date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          price: Math.round(basePrice)
        };
      });

      // Determine trend based on response content
      let trend: 'up' | 'down' | 'stable' = 'stable';
      if (response.toLowerCase().includes('increase') || response.toLowerCase().includes('rising')) {
        trend = 'up';
      } else if (response.toLowerCase().includes('decrease') || response.toLowerCase().includes('falling')) {
        trend = 'down';
      }

      // Extract forecast if present
      const forecastMatch = response.match(/₹([\d,]+(-[\d,]+)?)/);
      const forecast = forecastMatch ? forecastMatch[0] : undefined;

      return { trend, values, forecast };
    }
    return undefined;
  };
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    
    const newUserMessage = {
      role: 'user' as const,
      content: userMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    setIsLoading(true);
    try {
      const response = await askAI(userMessage, commodityId, commodityName);
      const priceData = extractPriceData(response);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        priceData
      }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const suggestedQuestions = [
    `What factors are affecting ${commodityName} prices right now?`,
    `When is the best time to sell ${commodityName}?`,
    `What are the major markets for ${commodityName}?`,
    `What is the price forecast for ${commodityName} next month?`
  ];

  return (
    <Card className="h-full flex flex-col bg-gradient-to-b from-background to-muted/20">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Agricultural Advisor</CardTitle>
            <CardDescription>
              Your AI assistant for market insights and agricultural advice
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto max-h-[500px] py-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-2 max-w-[85%] ${
                message.role === 'user' ? 'flex-row-reverse' : ''
              }`}>
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-primary/10">
                  {message.role === 'user' ? (
                    <User className="h-5 w-5 text-primary" />
                  ) : (
                    <Bot className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className={`rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.priceData && (
                    <div className="mt-4 p-4 bg-background rounded-md border">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-medium">Price Trend Analysis</span>
                      </div>
                      <div className="h-[200px] w-full">
                        <CommodityPriceChart data={message.priceData.values} />
                      </div>
                      {message.priceData.forecast && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          Forecast: {message.priceData.forecast}
                        </p>
                      )}
                    </div>
                  )}
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {messages.length === 1 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs text-muted-foreground">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => {
                    setInput(question);
                    handleSendMessage();
                  }}
                >
                  <PlusCircle className="mr-1 h-3 w-3" />
                  {question}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-3 border-t">
        <div className="flex w-full items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask about ${commodityName}...`}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="shrink-0"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}