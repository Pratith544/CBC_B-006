"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  BookOpen,
  Building,
  FileStack,
  HelpCircle,
  HeartHandshake,
  Store,
  Tractor,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickActionsProps {
  onActionClick: (prompt: string) => void;
  className?: string;
}

// Common use cases for rural users
const quickActions = [
  {
    icon: Tractor,
    label: "Farming Tips",
    prompt:
      "What are some modern sustainable farming practices I can adopt in my small farm?",
  },
  {
    icon: Store,
    label: "Start Business",
    prompt:
      "I want to start a small business in my village. What options do I have with low investment?",
  },
  {
    icon: Building,
    label: "Startup Recognition",
    prompt:
      "Help me understand how to apply for startup recognition in India. What are the steps?",
  },
  {
    icon: FileStack,
    label: "Loan Application",
    prompt:
      "Guide me through the process of applying for an agricultural loan. What documents will I need?",
  },
  {
    icon: BookOpen,
    label: "Gov Schemes",
    prompt:
      "What government schemes are available for rural entrepreneurs in India?",
  },
  {
    icon: HeartHandshake,
    label: "Rural Finance",
    prompt: "Explain how microfinance works and how it can help my community",
  },
  {
    icon: AlertCircle,
    label: "Digital Safety",
    prompt: "How can I protect myself from online fraud and scams?",
  },
  {
    icon: HelpCircle,
    label: "Other Help",
    prompt: "I need help with something else",
  },
];

export function QuickActions({ onActionClick, className }: QuickActionsProps) {
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-4 gap-2", className)}>
      {quickActions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="h-auto py-3 flex flex-col items-center justify-center gap-2 text-xs"
          onClick={() => onActionClick(action.prompt)}
        >
          <action.icon className="h-4 w-4" />
          <span>{action.label}</span>
        </Button>
      ))}
    </div>
  );
}
