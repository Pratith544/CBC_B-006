"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Lightbulb, ArrowRight } from "lucide-react";
import { ResourceOptimization as ResourceOptimizationType } from "@/types";

interface ResourceOptimizationProps {
  optimizations: ResourceOptimizationType[];
}

export default function ResourceOptimization({
  optimizations,
}: ResourceOptimizationProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8">
      <div className="p-6">
        <SectionHeading
          title="Resource Optimization Strategies"
          subtitle="Implement these strategies to maximize efficiency and sustainability"
          icon={<Lightbulb size={24} className="text-yellow-500" />}
        />

        <div className="mt-6 space-y-4">
          {optimizations.map((optimization, index) => (
            <div
              key={index}
              className={`border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden transition-all duration-300 ${
                expandedIndex === index
                  ? "bg-yellow-50 dark:bg-yellow-900/10"
                  : "bg-gray-50 dark:bg-gray-800"
              }`}
            >
              <button
                className="w-full px-5 py-4 flex items-center justify-between text-left"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      expandedIndex === index
                        ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                    }`}
                  >
                    <span>{index + 1}</span>
                  </div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    {optimization.title}
                  </h3>
                </div>
                <ArrowRight
                  size={18}
                  className={`transform transition-transform ${
                    expandedIndex === index ? "rotate-90" : ""
                  }`}
                />
              </button>

              {expandedIndex === index && (
                <div className="px-5 pb-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-gray-700 dark:text-gray-300">
                    {optimization.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
