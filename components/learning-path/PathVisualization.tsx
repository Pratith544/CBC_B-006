"use client";

import React, { useRef, useEffect } from "react";
import { LearningModule } from "@/lib/types";
import { motion } from "framer-motion";
import { CheckCircle, Circle, ChevronRight } from "lucide-react";

interface PathVisualizationProps {
  modules: LearningModule[];
  completedModules: string[];
  currentModule?: string;
  onModuleClick: (moduleId: string) => void;
}

export default function PathVisualization({
  modules,
  completedModules,
  currentModule,
  onModuleClick,
}: PathVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to current module when component mounts
    if (currentModule && containerRef.current) {
      const currentIndex = modules.findIndex((m) => m.id === currentModule);
      if (currentIndex > 0) {
        // Get the element at current index
        const element = containerRef.current.children[currentIndex * 2]; // *2 because we have nodes and connectors
        if (element) {
          // Calculate the position to center the element
          const containerWidth = containerRef.current.offsetWidth;
          const elementLeft = element.getBoundingClientRect().left;
          const containerLeft =
            containerRef.current.getBoundingClientRect().left;
          const scrollPosition =
            elementLeft - containerLeft - containerWidth / 2 + 25; // 25 is half the node width

          containerRef.current.scrollLeft = scrollPosition;
        }
      }
    }
  }, [currentModule, modules]);

  return (
    <div
      className="relative w-full overflow-x-auto pb-4 no-scrollbar"
      ref={containerRef}
    >
      <div className="flex items-center min-w-max px-4">
        {modules.map((module, index) => (
          <React.Fragment key={module.id}>
            {/* Module node */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex-shrink-0"
            >
              <button
                onClick={() => onModuleClick(module.id)}
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center relative z-10
                  transition-all duration-300 hover:scale-110
                  ${
                    completedModules.includes(module.id)
                      ? "bg-green-100 border-2 border-green-500"
                      : ""
                  }
                  ${
                    currentModule === module.id &&
                    !completedModules.includes(module.id)
                      ? "bg-amber-100 border-2 border-amber-500"
                      : ""
                  }
                  ${
                    currentModule !== module.id &&
                    !completedModules.includes(module.id)
                      ? "bg-gray-100 border-2 border-gray-300"
                      : ""
                  }
                `}
                aria-label={module.title}
              >
                {completedModules.includes(module.id) ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <Circle
                    className={`h-8 w-8 ${
                      currentModule === module.id
                        ? "text-amber-600"
                        : "text-gray-400"
                    }`}
                  />
                )}
              </button>

              {/* Module label */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs font-medium">
                  {module.title.length > 15
                    ? `${module.title.substring(0, 15)}...`
                    : module.title}
                </span>
              </div>
            </motion.div>

            {/* Connector (not for the last item) */}
            {index < modules.length - 1 && (
              <div className="flex-grow h-0.5 mx-1 relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: index * 0.1 + 0.1, duration: 0.5 }}
                  className={`h-full ${
                    completedModules.includes(module.id)
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                />
                <ChevronRight
                  className={`h-4 w-4 absolute top-1/2 right-0 transform -translate-y-1/2 ${
                    completedModules.includes(module.id)
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
