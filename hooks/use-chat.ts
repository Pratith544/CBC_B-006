"use client";

import { useState, useCallback } from "react";
import {
  useLanguageDetection,
  SupportedLanguage,
} from "./use-language-detection";
import { useTranslation } from "./use-translation";
import { useSpeech } from "./use-speech";
import {
  getCompletion,
  ChatMessage,
  RURAL_EMPOWERMENT_SYSTEM_PROMPT,
} from "@/lib/openaiAst";

export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  originalLanguage?: SupportedLanguage;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "system-1",
      role: "system",
      content: RURAL_EMPOWERMENT_SYSTEM_PROMPT,
      timestamp: Date.now(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentLanguage, setCurrentLanguage] =
    useState<SupportedLanguage>("en");

  const { detectLanguage, isDetecting } = useLanguageDetection();
  const { translateToEnglish, translateFromEnglish, isTranslating } =
    useTranslation();
  const {
    startListening,
    stopListening,
    speak,
    isListening,
    isSpeaking,
    transcript,
    audioFrequencyData,
  } = useSpeech();

  // Create a new message
  const createMessage = (
    role: MessageRole,
    content: string,
    originalLanguage?: SupportedLanguage
  ) => {
    return {
      id: `${role}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      role,
      content,
      timestamp: Date.now(),
      originalLanguage,
    };
  };

  // Add a message to the chat
  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  // Process user input, detect language, translate if needed, get AI response
  const sendMessage = useCallback(
    async (content: string, skipLangDetection = false) => {
      if (!content.trim() || isProcessing) return;

      setIsProcessing(true);

      try {
        // 1. Detect language if needed
        let detectedLang: SupportedLanguage = currentLanguage;
        if (!skipLangDetection) {
          detectedLang = await detectLanguage(content);
          setCurrentLanguage(detectedLang);
        }

        // 2. Add original user message to chat
        const userMessage = createMessage("user", content, detectedLang);
        addMessage(userMessage);

        // 3. Translate to English if needed
        let translatedContent = content;
        if (detectedLang !== "en") {
          translatedContent = await translateToEnglish(content, detectedLang);
        }

        // 4. Prepare messages for LLM (excluding system messages from the UI)
        const openaiMessages: ChatMessage[] = messages
          .filter((m) => m.role !== "system" || m.id === "system-1")
          .map((m) => ({
            role: m.role,
            content: m.content,
          }));

        // Add translated user message
        openaiMessages.push({
          role: "user",
          content: translatedContent,
        });

        // 5. Get AI response
        const response = await getCompletion(openaiMessages);

        // 6. Translate AI response if needed
        let translatedResponse = response.content;
        if (detectedLang !== "en") {
          translatedResponse = await translateFromEnglish(
            response.content,
            detectedLang
          );
        }

        // 7. Add AI response to chat
        const assistantMessage = createMessage("assistant", translatedResponse);
        addMessage(assistantMessage);

        // 8. Speak the response
        speak(translatedResponse, detectedLang);

        return assistantMessage;
      } catch (error) {
        console.error("Error in chat flow:", error);
        const errorMessage = createMessage(
          "assistant",
          "Sorry, I encountered an error. Please try again."
        );
        addMessage(errorMessage);
        return errorMessage;
      } finally {
        setIsProcessing(false);
      }
    },
    [
      messages,
      currentLanguage,
      isProcessing,
      detectLanguage,
      translateToEnglish,
      translateFromEnglish,
      speak,
      addMessage,
    ]
  );

  // Handle voice input finishing
  const handleVoiceInput = useCallback(async () => {
    if (transcript.trim()) {
      await sendMessage(transcript);
    }
  }, [transcript, sendMessage]);

  // Clear all messages except the system prompt
  const clearMessages = useCallback(() => {
    setMessages(messages.filter((m) => m.role === "system"));
  }, [messages]);

  return {
    messages,
    sendMessage,
    clearMessages,
    isProcessing,
    isDetecting,
    isTranslating,
    isListening,
    isSpeaking,
    transcript,
    currentLanguage,
    setCurrentLanguage,
    startListening,
    stopListening,
    handleVoiceInput,
    audioFrequencyData,
    speak,
  };
}
