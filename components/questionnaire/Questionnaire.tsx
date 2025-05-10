"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Question, QuestionnaireResponse } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import QuestionItem from "./QuestionItem";
import VoiceQuestionnaire from "./VoiceQuestionnaire";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Mic,
  Keyboard,
} from "lucide-react";

// Sample questionnaire data
const questionnaire: Question[] = [
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
    options: ["Basic phone", "Smartphone", "Computer/Laptop", "Tablet", "None"],
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

export default function Questionnaire() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<QuestionnaireResponse>({});
  const [loading, setLoading] = useState(false);
  const [inputMethod, setInputMethod] = useState<"voice" | "text">("text");

  const currentQuestion = questionnaire[currentStep];
  const progress = ((currentStep + 1) / questionnaire.length) * 100;

  const handleResponse = (questionId: string, answer: string | string[]) => {
    setResponses((prev) => ({ ...prev, [questionId]: answer }));
  };
  const handleComplete = (voiceResponses: Record<string, string>) => {
    localStorage.setItem(
      "questionnaireResponses",
      JSON.stringify(voiceResponses)
    );
    router.push("/results");
  };
  const handleNext = () => {
    const currentId = currentQuestion.id;
    if (currentQuestion.required && !responses[currentId]) {
      return;
    }

    if (currentStep < questionnaire.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    localStorage.setItem("questionnaireResponses", JSON.stringify(responses));
    router.push("/results");
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Agricultural Learning Assessment
          </CardTitle>
          <CardDescription className="text-center">
            Answer these questions to receive personalized learning modules for
            improving your agricultural practices and financial knowledge.
          </CardDescription>
          <div className="mt-4 flex justify-center gap-4">
            <Button
              variant={inputMethod === "text" ? "default" : "outline"}
              onClick={() => setInputMethod("text")}
              className="flex items-center gap-2"
            >
              <Keyboard className="h-4 w-4" />
              Text Input
            </Button>
            <Button
              variant={inputMethod === "voice" ? "default" : "outline"}
              onClick={() => setInputMethod("voice")}
              className="flex items-center gap-2"
            >
              <Mic className="h-4 w-4" />
              Voice Input
            </Button>
          </div>
          <div className="mt-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-right mt-1 text-muted-foreground">
              Question {currentStep + 1} of {questionnaire.length}
            </p>
          </div>
        </CardHeader>
        <CardContent className="min-h-[300px]">
          {inputMethod === "voice" ? (
            <VoiceQuestionnaire onComplete={handleComplete} />
          ) : (
            <QuestionItem
              question={currentQuestion}
              response={responses[currentQuestion.id] || ""}
              onResponse={handleResponse}
            />
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={loading}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            {currentStep === questionnaire.length - 1 ? (
              <>
                {loading ? "Processing..." : "Submit"}
                {!loading && <CheckCircle size={16} />}
              </>
            ) : (
              <>
                Next
                <ArrowRight size={16} />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
