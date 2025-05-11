"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle, XCircle, Award } from "lucide-react";
import confetti from "canvas-confetti";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

// Sample quiz questions - in a real app, these would come from an API
const sampleQuizQuestions: QuizQuestion[] = [
  {
    question: "What is a key benefit of crop rotation?",
    options: [
      "Increasing pesticide effectiveness",
      "Reducing soil degradation and increasing fertility",
      "Eliminating the need for fertilizers",
      "Promoting monoculture agriculture",
    ],
    correctIndex: 1,
  },
  {
    question:
      "Which of the following is a sustainable water management practice?",
    options: [
      "Continuous flooding of fields",
      "Drip irrigation",
      "Deep tilling",
      "Increasing water pumping capacity",
    ],
    correctIndex: 1,
  },
  {
    question:
      "What is an important consideration when applying for an agricultural loan?",
    options: [
      "Always borrowing the maximum amount offered",
      "Focusing only on interest rates",
      "Creating a clear repayment plan based on harvest cycles",
      "Avoiding collateral requirements",
    ],
    correctIndex: 2,
  },
  {
    question: "Which practice can help improve soil health?",
    options: [
      "Adding cover crops during off-seasons",
      "Continuous tilling",
      "Removing all crop residue after harvest",
      "Applying maximum fertilizer",
    ],
    correctIndex: 0,
  },
];

interface ModuleQuizProps {
  moduleTitle: string;
  onComplete: () => void;
  onBack: () => void;
}

export default function ModuleQuiz({
  moduleTitle,
  onComplete,
  onBack,
}: ModuleQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      // Trigger confetti if score is good
      const correctAnswers = calculateScore();
      if (correctAnswers >= sampleQuizQuestions.length - 1) {
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }, 500);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onBack();
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return (
        score + (answer === sampleQuizQuestions[index].correctIndex ? 1 : 0)
      );
    }, 0);
  };

  const currentQuiz = sampleQuizQuestions[currentQuestion];

  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle className="text-xl">
          {showResults
            ? "Quiz Results"
            : `${moduleTitle} - Knowledge Check (Question ${
                currentQuestion + 1
              }/${sampleQuizQuestions.length})`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!showResults ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{currentQuiz.question}</h3>
            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={(value) => handleSelectAnswer(parseInt(value))}
            >
              {currentQuiz.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`answer-${index}`}
                  />
                  <Label
                    htmlFor={`answer-${index}`}
                    className="flex-grow cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-4 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <Award className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold">
                {calculateScore()} out of {sampleQuizQuestions.length} correct!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {calculateScore() >= sampleQuizQuestions.length - 1
                  ? "Excellent work! You've mastered this module."
                  : calculateScore() >= sampleQuizQuestions.length / 2
                  ? "Good job! You've learned the key concepts."
                  : "Keep learning! Review the module to improve your understanding."}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">
                Review Your Answers
              </h3>
              {sampleQuizQuestions.map((question, index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex">
                    <div className="mr-2">
                      {selectedAnswers[index] === question.correctIndex ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{question.question}</p>
                      <p className="mt-1">
                        <span className="text-gray-600 dark:text-gray-400">
                          Your answer:{" "}
                        </span>
                        <span
                          className={
                            selectedAnswers[index] === question.correctIndex
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }
                        >
                          {question.options[selectedAnswers[index]]}
                        </span>
                      </p>
                      {selectedAnswers[index] !== question.correctIndex && (
                        <p className="mt-1">
                          <span className="text-gray-600 dark:text-gray-400">
                            Correct answer:{" "}
                          </span>
                          <span className="text-green-600 dark:text-green-400">
                            {question.options[question.correctIndex]}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePreviousQuestion}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {!showResults ? "Previous" : "Return to Quiz"}
        </Button>

        {!showResults ? (
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswers[currentQuestion] === undefined}
          >
            {currentQuestion === sampleQuizQuestions.length - 1
              ? "Complete Quiz"
              : "Next Question"}
          </Button>
        ) : (
          <Button onClick={onComplete}>Complete Module</Button>
        )}
      </CardFooter>
    </Card>
  );
}
