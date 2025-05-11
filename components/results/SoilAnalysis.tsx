"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { GanttChart, BarChart4, AreaChart } from "lucide-react";
import { SoilAnalysis as SoilAnalysisType } from "@/types";

interface SoilAnalysisProps {
  soilAnalysis: SoilAnalysisType;
}

export default function SoilAnalysis({ soilAnalysis }: SoilAnalysisProps) {
  const { type, ph, fertility, improvement } = soilAnalysis;

  // pH scale visualization
  const phScale = [
    { value: 4, label: "Very Acidic", color: "bg-red-500" },
    { value: 5, label: "Acidic", color: "bg-orange-500" },
    { value: 6, label: "Slightly Acidic", color: "bg-yellow-500" },
    { value: 7, label: "Neutral", color: "bg-green-500" },
    { value: 8, label: "Slightly Alkaline", color: "bg-blue-400" },
    { value: 9, label: "Alkaline", color: "bg-blue-600" },
    { value: 10, label: "Very Alkaline", color: "bg-purple-500" },
  ];

  const getPhPosition = (ph: number) => {
    // Calculate position as percentage (for a range of 4-10)
    const percentage = ((ph - 4) / 6) * 100;
    return Math.max(0, Math.min(100, percentage));
  };

  const phPosition = getPhPosition(ph);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8">
      <div className="p-6">
        <SectionHeading
          title="Soil Analysis"
          subtitle="Understanding your soil composition and health"
          icon={<GanttChart size={24} className="text-brown-600" />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          <div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Soil Characteristics
              </h3>

              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Soil Type
                  </span>
                  <p className="text-base font-medium text-gray-900 dark:text-white capitalize">
                    {type}
                  </p>
                </div>

                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Fertility
                  </span>
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    {fertility}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      pH Level
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {ph}
                    </span>
                  </div>

                  <div className="relative">
                    <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-400 to-purple-500 rounded-full mb-2"></div>

                    <div
                      className="absolute top-0 w-4 h-4 bg-white dark:bg-gray-200 border-2 border-gray-800 dark:border-white rounded-full transform -translate-x-1/2"
                      style={{ left: `${phPosition}%` }}
                    ></div>

                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>4</span>
                      <span>5</span>
                      <span>6</span>
                      <span>7</span>
                      <span>8</span>
                      <span>9</span>
                      <span>10</span>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>Acidic</span>
                      <span className="text-center">Neutral</span>
                      <span className="text-right">Alkaline</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <BarChart4
                  size={20}
                  className="text-green-600 dark:text-green-400 mr-2"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Soil Improvement Recommendations
                </h3>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {improvement}
              </p>

              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/30">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                    <AreaChart size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                      Benefit of Soil Improvement
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Improving your soil quality can increase crop yields by
                      20-30% and enhance long-term soil health and
                      sustainability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
