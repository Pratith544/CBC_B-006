"use client";

import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import type { Message } from "@/hooks/use-chat";

interface MessageListProps {
  messages: Message[];
  isProcessing: boolean;
  className?: string;
}

export function MessageList({
  messages,
  isProcessing,
  className,
}: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const filteredMessages = messages.filter((m) => m.role !== "system");

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isProcessing]);

  if (filteredMessages.length === 0 && !isProcessing) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center h-full text-center px-4 py-6",
          "text-muted-foreground",
          className
        )}
      >
        <Bot className="h-12 w-12 mb-4 opacity-50" />
        <h3 className="text-lg font-medium mb-2">Digital Assistant</h3>
        <p className="text-sm max-w-md">
          Ask me anything about farming, rural business, government schemes,
          applications, or financial topics. I'm here to assist you in any
          language.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea ref={scrollRef} className={cn("h-full pr-4", className)}>
      <div className="flex flex-col gap-4 py-4">
        <AnimatePresence initial={false}>
          {filteredMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex items-start gap-3 px-1",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <div className="flex-shrink-0 rounded-full bg-primary/10 p-2">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={cn(
                  "rounded-lg px-3 py-2 max-w-[80%] text-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>

              {message.role === "user" && (
                <div className="flex-shrink-0 rounded-full bg-primary p-2">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </motion.div>
          ))}

          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 px-1"
            >
              <div className="flex-shrink-0 rounded-full bg-primary/10 p-2">
                <Bot className="h-4 w-4" />
              </div>

              <div className="space-y-2 max-w-[80%]">
                <Skeleton className="h-4 w-24 rounded-lg" />
                <Skeleton className="h-4 w-32 rounded-lg" />
                <Skeleton className="h-4 w-20 rounded-lg" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollArea>
  );
}
