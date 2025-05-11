"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LearningModule } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, BookOpen, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import ModuleCard from "./ModuleCard";
import PathVisualization from "./PathVisualization";

interface LearningPathProps {
  modules: LearningModule[];
}

export default function LearningPath({ modules }: LearningPathProps) {
  const router = useRouter();
  const [userProgress, setUserProgress] = useState<{
    completedModules: string[];
    currentModule?: string;
  }>({
    completedModules: [],
  });

  useEffect(() => {
    // In a real app, fetch this from your backend
    const savedProgress = localStorage.getItem("userProgress");
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    } else if (modules.length > 0) {
      // Set the first module as current if no progress exists
      setUserProgress({
        completedModules: [],
        currentModule: modules[0].id,
      });
    }
  }, [modules]);

  const handleModuleClick = (moduleId: string) => {
    router.push(`/module/${moduleId}`);
  };

  const calculateOverallProgress = () => {
    if (modules.length === 0) return 0;
    return (userProgress.completedModules.length / modules.length) * 100;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-2">Your Learning Journey</h2>
          <div className="flex items-center gap-3 mb-4">
            <Progress
              value={calculateOverallProgress()}
              className="h-2 flex-1"
            />
            <span className="text-sm font-medium">
              {userProgress.completedModules.length} of {modules.length}{" "}
              completed
            </span>
          </div>

          <div className="mt-6">
            <PathVisualization
              modules={modules}
              completedModules={userProgress.completedModules}
              currentModule={userProgress.currentModule}
              onModuleClick={handleModuleClick}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              isCompleted={userProgress.completedModules.includes(module.id)}
              isCurrent={userProgress.currentModule === module.id}
              onClick={() => handleModuleClick(module.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
