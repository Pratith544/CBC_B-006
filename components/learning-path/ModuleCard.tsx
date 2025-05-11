import { LearningModule } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, BookOpen, ArrowRight } from "lucide-react";
import Image from "next/image";

interface ModuleCardProps {
  module: LearningModule;
  isCompleted: boolean;
  isCurrent: boolean;
  onClick: () => void;
}

export default function ModuleCard({
  module,
  isCompleted,
  isCurrent,
  onClick,
}: ModuleCardProps) {
  // Determine card border based on status
  const cardClasses = `
    h-full transition-all duration-300 hover:shadow-lg border-2
    ${isCompleted ? "border-green-500 bg-green-50 dark:bg-green-900/20" : ""}
    ${
      isCurrent && !isCompleted
        ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
        : ""
    }
    ${!isCurrent && !isCompleted ? "border-gray-200 dark:border-gray-700" : ""}
  `;

  return (
    <Card className={cardClasses}>
      <CardHeader className="relative pb-0">
        {module.imageUrl && (
          <div className="relative w-full h-40 rounded-t-lg overflow-hidden">
            <img
              src={module.imageUrl}
              alt={module.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <div className="flex justify-between items-start mt-3">
          <CardTitle className="text-xl">{module.title}</CardTitle>
          {isCompleted && (
            <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {module.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="py-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {module.description}
        </p>
        <div className="flex items-center gap-2 mt-3 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="h-4 w-4" />
          <span>{module.estimatedTime}</span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
          <BookOpen className="h-4 w-4" />
          <span>{module.difficulty}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onClick}
          className="w-full"
          variant={isCompleted ? "outline" : "default"}
        >
          {isCompleted
            ? "Review Module"
            : isCurrent
            ? "Continue Learning"
            : "Start Module"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
