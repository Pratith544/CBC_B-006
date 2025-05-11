"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X, Minimize2, Maximize2, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { LanguageSelector } from "./language-selector";
import { QuickActions } from "./quick-actions";
import { cn } from "@/lib/utils";
import { useChat } from "@/hooks/use-chat";
import { SupportedLanguage } from "@/hooks/use-language-detection";

interface ChatModalProps {
  defaultOpen?: boolean;
  className?: string;
}

export function ChatModal({ defaultOpen = false, className }: ChatModalProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(true);

  const {
    messages,
    sendMessage,
    clearMessages,
    isProcessing,
    isListening,
    isSpeaking,
    transcript,
    currentLanguage,
    setCurrentLanguage,
    startListening,
    stopListening,
    handleVoiceInput,
    audioFrequencyData,
  } = useChat();

  // Automatically hide quick actions after first message
  useEffect(() => {
    if (messages.filter((m) => m.role !== "system").length > 0) {
      setShowActions(false);
    }
  }, [messages]);

  // Close chat when ESC is pressed
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Start voice input logic
  const handleStartListening = () => {
    startListening(currentLanguage);
  };

  // Handle language change
  const handleLanguageChange = (language: SupportedLanguage) => {
    setCurrentLanguage(language);
  };

  // Quick action selected
  const handleQuickAction = (prompt: string) => {
    sendMessage(prompt, true);
  };

  // Toggle expanded state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Chat Fab Button - Always visible when chat is closed */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg z-50"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 100,
              x: 0,
              width: "100%",
              height: "60%",
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: isExpanded ? 0 : "calc(50% - 10rem)",
              width: isExpanded ? "90%" : "20rem",
              height: isExpanded ? "70%" : "32rem",
            }}
            exit={{
              opacity: 0,
              y: 100,
              transition: {
                duration: 0.2,
              },
            }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
            className={cn(
              "fixed bottom-4 right-4 z-50",
              isExpanded
                ? "left-4 lg:left-auto lg:right-4 lg:w-1/3"
                : "max-w-xs right-36",
              className
            )}
          >
            <Card className="h-full min-w-[28rem] flex flex-col border shadow-xl overflow-hidden relative">
              {/* Header */}
              <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="text-primary-foreground h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Digital Assistant</h3>
                    <p className="text-xs text-muted-foreground">
                      {isListening
                        ? "Listening..."
                        : isSpeaking
                        ? "Speaking..."
                        : "How can I help?"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={toggleExpanded}
                  >
                    {isExpanded ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <Separator />

              {/* Controls */}
              <div className="px-3 py-2 flex items-center justify-between bg-muted/50">
                <LanguageSelector
                  currentLanguage={currentLanguage}
                  onLanguageChange={handleLanguageChange}
                />

                <div className="flex items-center gap-2">
                  {isListening ? (
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Mic className="h-3 w-3 animate-pulse text-destructive" />
                      <span>Recording...</span>
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">
                      {messages.filter((m) => m.role !== "system").length}{" "}
                      messages
                    </div>
                  )}
                </div>
              </div>

              {/* Message List */}
              <CardContent className="flex-1 p-0 overflow-hidden">
                <MessageList
                  messages={messages}
                  isProcessing={isProcessing}
                  className="h-full"
                />
              </CardContent>

              {/* Quick Actions */}
              <AnimatePresence>
                {showActions &&
                  messages.filter((m) => m.role !== "system").length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-3 py-2 border-t"
                    >
                      <p className="text-xs font-medium mb-2">
                        I can help you with:
                      </p>
                      <QuickActions onActionClick={handleQuickAction} />
                    </motion.div>
                  )}
              </AnimatePresence>

              {/* Input Area */}
              <CardFooter className="p-3 pt-2">
                <MessageInput
                  onSendMessage={sendMessage}
                  isListening={isListening}
                  isSpeaking={isSpeaking}
                  isProcessing={isProcessing}
                  audioFrequencyData={audioFrequencyData}
                  onStartListening={handleStartListening}
                  onStopListening={stopListening}
                  onVoiceInputComplete={handleVoiceInput}
                  transcript={transcript}
                  currentLanguage={currentLanguage}
                  className="w-full"
                />
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
