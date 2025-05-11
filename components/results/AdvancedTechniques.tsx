"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Lightbulb, Zap, Clock, Wrench } from "lucide-react";
import { AdvancedTechnique } from "@/types";

interface AdvancedTechniquesProps {
  techniques: AdvancedTechnique[];
}

export default function AdvancedTechniques({
  techniques,
}: AdvancedTechniquesProps) {
  // Function to get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "hard":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8">
      <div className="p-6">
        <SectionHeading
          title="Advanced Farming Techniques"
          subtitle="Innovative approaches to enhance your farming practices"
          icon={<Zap size={24} className="text-purple-600" />}
        />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {techniques.map((technique, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3">
                  <Lightbulb size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {technique.title}
                </h3>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {technique.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <div className="flex items-center">
                  <Clock
                    size={16}
                    className="text-gray-500 dark:text-gray-400 mr-1"
                  />
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
                      technique.difficulty
                    )}`}
                  >
                    {technique.difficulty} difficulty
                  </span>
                </div>

                <div className="flex items-center">
                  <Wrench
                    size={16}
                    className="text-gray-500 dark:text-gray-400 mr-1"
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {technique.resourcesRequired}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
