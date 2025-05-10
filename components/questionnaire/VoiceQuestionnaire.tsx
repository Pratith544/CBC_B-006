"use client";

import { useState, useEffect } from "react";
import { useChat } from "@/hooks/use-chat";
import {
  useLanguageDetection,
  SupportedLanguage,
} from "@/hooks/use-language-detection";
import { Question } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AudioVisualizer } from "../chat/audio-visualizer";
import { LanguageSelector } from "../chat/language-selector";
import { Mic, MicOff } from "lucide-react";

interface VoiceQuestionnaireProps {
  onComplete: (responses: Record<string, string>) => void;
}

export default function VoiceQuestionnaire({
  onComplete,
}: VoiceQuestionnaireProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const {
    isListening,
    isSpeaking,
    transcript,
    audioFrequencyData,
    startListening,
    stopListening,
    speak,
    handleVoiceInput,
  } = useChat();
  const { detectLanguage } = useLanguageDetection();
  const [currentLanguage, setCurrentLanguage] =
    useState<SupportedLanguage>("en");
  const questions: Question[] = [
    {
      id: "name",
      text: "What is your name?",
      type: "text",
      category: "personal",
      required: true,
    },
    {
      id: "age",
      text: "What is your age?",
      type: "text",
      category: "personal",
      required: true,
    },
    {
      id: "location",
      text: "Where do you live? (Village, District, State)",
      type: "text",
      category: "personal",
      required: true,
    },
    {
      id: "farmingExperience",
      text: "How many years of farming experience do you have?",
      type: "text",
      category: "agriculture",
      required: true,
    },
    {
      id: "cropTypes",
      text: "What crops do you currently grow?",
      type: "multiselect",
      options: [
        "Rice",
        "Wheat",
        "Corn",
        "Pulses",
        "Vegetables",
        "Fruits",
        "Cotton",
        "Other",
      ],
      category: "agriculture",
      required: true,
    },
    {
      id: "landSize",
      text: "How much land do you farm (in acres)?",
      type: "text",
      category: "agriculture",
      required: true,
    },
    {
      id: "challenges",
      text: "What are your biggest farming challenges?",
      type: "multiselect",
      options: [
        "Water scarcity",
        "Soil health",
        "Pests and diseases",
        "Market access",
        "Finance",
        "Weather unpredictability",
        "Labor shortage",
        "Technology adoption",
      ],
      category: "agriculture",
      required: true,
    },
    {
      id: "financialLiteracy",
      text: "How would you rate your understanding of financial matters?",
      type: "radio",
      options: ["Beginner", "Some knowledge", "Moderate", "Advanced"],
      category: "financial",
      required: true,
    },
    {
      id: "deviceAccess",
      text: "Which devices do you have access to?",
      type: "multiselect",
      options: [
        "Basic phone",
        "Smartphone",
        "Computer/Laptop",
        "Tablet",
        "None",
      ],
      category: "technical",
      required: true,
    },
    {
      id: "internetAccess",
      text: "How reliable is your internet connection?",
      type: "radio",
      options: ["No access", "Poor", "Moderate", "Good", "Excellent"],
      category: "technical",
      required: true,
    },
    {
      id: "learningInterests",
      text: "What topics are you most interested in learning about?",
      type: "multiselect",
      options: [
        "Sustainable farming practices",
        "Irrigation techniques",
        "Crop diversification",
        "Organic farming",
        "Farm mechanization",
        "Financial management",
        "Market linkages",
        "Rural entrepreneurship",
      ],
      category: "agriculture",
      required: true,
    },
    {
      id: "preferredLearningMethod",
      text: "How do you prefer to learn new information?",
      type: "multiselect",
      options: [
        "Reading",
        "Videos",
        "Hands-on practice",
        "Discussion with experts",
        "Group learning",
      ],
      category: "personal",
      required: true,
    },
  ];
  const currentQuestion = questions[currentQuestionIndex];

  // Speak the current question when it changes
  useEffect(() => {
    if (currentQuestion) {
      speak(currentQuestion.text, currentLanguage);
    }
  }, [currentQuestion, currentLanguage]);

  // Handle voice input completion
  useEffect(() => {
    if (transcript && !isListening) {
      // Save the response
      setResponses((prev) => ({
        ...prev,
        [currentQuestion.id]: transcript,
      }));

      // Move to next question after a short delay
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          onComplete(responses);
        }
      }, 1000);
    }
  }, [transcript, isListening]);

  // Handle language change
  const handleLanguageChange = async (language: SupportedLanguage) => {
    setCurrentLanguage(language);
    if (currentQuestion) {
      speak(currentQuestion.text, language);
    }
  };

  // Toggle listening
  const toggleListening = () => {
    if (isListening) {
      stopListening();
      handleVoiceInput();
    } else {
      startListening(currentLanguage);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <LanguageSelector
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />

        <Button
          onClick={toggleListening}
          variant={isListening ? "destructive" : "default"}
          className="flex items-center gap-2"
        >
          {isListening ? (
            <>
              <MicOff className="h-4 w-4" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="h-4 w-4" />
              Start Recording
            </>
          )}
        </Button>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h3>

        <p className="text-xl mb-4">{currentQuestion.text}</p>

        {(isListening || isSpeaking) && (
          <AudioVisualizer
            frequencyData={audioFrequencyData}
            isActive={isListening || isSpeaking}
            colorClass={isListening ? "bg-destructive" : "bg-primary"}
          />
        )}

        {transcript && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="font-medium">Your response:</p>
            <p className="text-lg">{transcript}</p>
          </div>
        )}
      </Card>

      <div className="text-sm text-muted-foreground">
        {isListening
          ? "Listening... Speak your answer clearly"
          : isSpeaking
          ? "Speaking question..."
          : "Click 'Start Recording' to answer"}
      </div>
    </div>
  );
}
