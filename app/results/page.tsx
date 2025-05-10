"use client";

import { useState, useEffect } from "react";
import { generateLearningModules } from "@/lib/api";
import { LearningModule, QuestionnaireResponse } from "@/lib/types";
import LearningPath from "@/components/learning-path/LearningPath";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// Sample learning modules for demo purposes
const sampleModules: LearningModule[] = [
  {
    id: "mod-1",
    title: "Sustainable Irrigation Techniques",
    description: "Learn water-saving irrigation methods suitable for small to medium farms.",
    tags: ["water management", "sustainability", "irrigation"],
    difficulty: "beginner",
    estimatedTime: "2-3 hours",
    imageUrl: "https://images.pexels.com/photos/1368382/pexels-photo-1368382.jpeg"
  },
  {
    id: "mod-2",
    title: "Organic Pest Management",
    description: "Natural and effective approaches to control pests without harmful chemicals.",
    tags: ["organic", "pest control", "natural farming"],
    difficulty: "intermediate",
    estimatedTime: "3-4 hours",
    imageUrl: "https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg"
  },
  {
    id: "mod-3",
    title: "Farm Financial Planning",
    description: "Develop a financial plan for your farm including budgeting and record keeping.",
    tags: ["finance", "planning", "business"],
    difficulty: "intermediate",
    estimatedTime: "4-5 hours",
    imageUrl: "https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg"
  },
  {
    id: "mod-4",
    title: "Crop Rotation Strategies",
    description: "Optimize soil health and reduce pests with effective crop rotation planning.",
    tags: ["soil health", "crops", "rotation"],
    difficulty: "beginner",
    estimatedTime: "2 hours",
    imageUrl: "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg"
  },
  {
    id: "mod-5",
    title: "Marketing Agricultural Products",
    description: "Learn strategies to market your produce effectively and reach more customers.",
    tags: ["marketing", "sales", "business"],
    difficulty: "advanced",
    estimatedTime: "4 hours",
    imageUrl: "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg"
  }
];

export default function ResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchModules() {
      try {
        setLoading(true);
        
        // Get questionnaire responses from localStorage
        const storedResponses = localStorage.getItem('questionnaireResponses');
        
        if (!storedResponses) {
          setError("No questionnaire responses found. Please complete the assessment first.");
          setLoading(false);
          return;
        }
        
        const responses: QuestionnaireResponse = JSON.parse(storedResponses);
        
        // For demo purposes, use the sample modules
        // In production, uncomment this to use the actual API call
        // const generatedModules = await generateLearningModules(responses);
        
        setTimeout(() => {
          setModules(sampleModules);
          setLoading(false);
        }, 1500);
        
      } catch (err) {
        console.error("Error fetching learning modules:", err);
        setError("Failed to generate your learning path. Please try again.");
        setLoading(false);
      }
    }
    
    fetchModules();
  }, []);

  return (
    <div className="container mx-auto py-12">
      <Button
        variant="outline"
        onClick={() => router.push('/questionnaire')}
        className="mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Assessment
      </Button>
      
      <h1 className="text-3xl font-bold mb-6">Your Personalized Learning Path</h1>
      
      {loading ? (
        <div className="text-center py-16">
          <div className="w-full max-w-md mx-auto">
            <Progress value={60} className="h-2 mb-2" />
            <p>Analyzing your responses and creating your learning path...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-lg text-center">
          <p>{error}</p>
          <Button 
            variant="outline" 
            onClick={() => router.push('/questionnaire')}
            className="mt-4"
          >
            Go to Assessment
          </Button>
        </div>
      ) : (
        <LearningPath modules={modules} />
      )}
    </div>
  );
}