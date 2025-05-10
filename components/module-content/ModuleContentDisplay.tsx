"use client";

import { useState, useEffect } from "react";
import { ModuleContent } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  ArrowLeft,
  ArrowRight,
  BookMarked,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import ModuleQuiz from "./ModuleQuiz";

interface ModuleContentDisplayProps {
  moduleId: string;
  moduleContent: ModuleContent;
  onComplete: () => void;
  onBack: () => void;
}

export default function ModuleContentDisplay({
  moduleId,
  moduleContent,
  onComplete,
  onBack,
}: ModuleContentDisplayProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [readSections, setReadSections] = useState<number[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleNextSection = () => {
    if (activeSection < moduleContent.sections.length - 1) {
      setActiveSection(activeSection + 1);
      setReadSections((prev) =>
        prev.includes(activeSection) ? prev : [...prev, activeSection]
      );
    } else {
      // Reached the end of sections
      setReadSections((prev) =>
        prev.includes(activeSection) ? prev : [...prev, activeSection]
      );
      setShowQuiz(true);
    }
  };

  const handlePreviousSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  const handleCompleteModule = () => {
    // Save progress to localStorage
    const existingProgress = JSON.parse(
      localStorage.getItem("userProgress") || '{"completedModules": []}'
    );
    localStorage.setItem(
      "userProgress",
      JSON.stringify({
        ...existingProgress,
        completedModules: [...existingProgress.completedModules, moduleId],
      })
    );

    onComplete();
  };

  // Calculate reading progress
  const readingProgress =
    moduleContent.sections.length > 0
      ? (readSections.length / moduleContent.sections.length) * 100
      : 0;

  return (
    <div className="container mx-auto p-4">
      <Button variant="outline" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learning Path
      </Button>

      {!showQuiz ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar - Table of contents */}
          <Card className="lg:col-span-1 order-2 lg:order-1">
            <CardHeader>
              <CardTitle className="text-lg">Module Contents</CardTitle>
              <CardDescription>
                {readSections.length} of {moduleContent.sections.length}{" "}
                sections read
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[50vh] lg:h-[70vh] pr-4">
                <ul className="space-y-2">
                  <li
                    className={cn(
                      "p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                      activeSection === -1 && "bg-gray-100 dark:bg-gray-800"
                    )}
                    onClick={() => setActiveSection(-1)}
                  >
                    <div className="flex items-center">
                      <BookMarked className="mr-2 h-4 w-4 text-blue-500" />
                      <span className="font-medium">Introduction</span>
                    </div>
                  </li>

                  {moduleContent.sections.map((section, index) => (
                    <li
                      key={index}
                      className={cn(
                        "p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                        activeSection === index &&
                          "bg-gray-100 dark:bg-gray-800",
                        readSections.includes(index) &&
                          "text-green-600 dark:text-green-400"
                      )}
                      onClick={() => setActiveSection(index)}
                    >
                      <div className="flex items-center">
                        {readSections.includes(index) ? (
                          <div className="flex-shrink-0 h-4 w-4 mr-2 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                            ✓
                          </div>
                        ) : (
                          <div className="flex-shrink-0 h-4 w-4 mr-2 rounded-full border border-gray-300 text-xs flex items-center justify-center">
                            {index + 1}
                          </div>
                        )}
                        <span className="font-medium">{section.title}</span>
                      </div>
                    </li>
                  ))}

                  <li
                    className={cn(
                      "p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                      activeSection === moduleContent.sections.length &&
                        "bg-gray-100 dark:bg-gray-800"
                    )}
                    onClick={() =>
                      setActiveSection(moduleContent.sections.length)
                    }
                  >
                    <div className="flex items-center">
                      <BookMarked className="mr-2 h-4 w-4 text-blue-500" />
                      <span className="font-medium">Conclusion</span>
                    </div>
                  </li>
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Main content area */}
          <Card className="lg:col-span-2 order-1 lg:order-2">
            <CardHeader>
              <CardTitle className="text-2xl">{moduleContent.title}</CardTitle>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                <div
                  className="bg-green-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[50vh] lg:h-[65vh] pr-4">
                {activeSection === -1 ? (
                  <div className="prose dark:prose-invert max-w-none">
                    <h2>Introduction</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: moduleContent.introduction,
                      }}
                    />
                  </div>
                ) : activeSection === moduleContent.sections.length ? (
                  <div className="prose dark:prose-invert max-w-none">
                    <h2>Conclusion</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: moduleContent.conclusion,
                      }}
                    />

                    <h3 className="mt-8">Additional Resources</h3>
                    <ul className="space-y-2">
                      {moduleContent.resources.map((resource, index) => (
                        <li key={index}>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            {resource.title} ({resource.type})
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="prose dark:prose-invert max-w-none">
                      <h2>{moduleContent.sections[activeSection].title}</h2>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: moduleContent.sections[activeSection].content,
                        }}
                      />
                    </div>

                    {moduleContent.sections[activeSection].imageUrl && (
                      <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        <img
                          src={moduleContent.sections[activeSection].imageUrl}
                          alt={moduleContent.sections[activeSection].title}
                          className="w-full object-cover max-h-80"
                        />
                      </div>
                    )}

                    {moduleContent.sections[activeSection].videoUrl && (
                      <div className="mt-4 aspect-video">
                        <iframe
                          width="100%"
                          height="100%"
                          src={moduleContent.sections[activeSection].videoUrl}
                          title={moduleContent.sections[activeSection].title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={handlePreviousSection}
                  disabled={activeSection <= -1}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>

                {activeSection === moduleContent.sections.length ? (
                  <Button onClick={() => setShowQuiz(true)}>
                    Start Quiz <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleNextSection}>
                    {activeSection === moduleContent.sections.length - 1
                      ? "Continue to Conclusion"
                      : "Next"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <ModuleQuiz
          moduleTitle={moduleContent.title}
          onComplete={handleCompleteModule}
          onBack={() => setShowQuiz(false)}
        />
      )}
    </div>
  );
}
