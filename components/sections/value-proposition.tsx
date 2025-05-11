"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Volume2 } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function ValueProposition() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const values = [
    {
      title: "Speak naturally in your language",
      icon: (
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 16V48"
            stroke={isDark ? "#FFC107" : "#FFB30F"}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M20 24V40"
            stroke={isDark ? "#FFC107" : "#FFB30F"}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M44 24V40"
            stroke={isDark ? "#FFC107" : "#FFB30F"}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M8 32H56"
            stroke={isDark ? "#FFC107" : "#FFB30F"}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      ),
      description: "Use your native language to get information and assistance",
    },
    {
      title: "Get personalized suggestions",
      icon: (
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="12"
            y="12"
            width="40"
            height="40"
            rx="8"
            stroke={isDark ? "#66BB6A" : "#2E8B57"}
            strokeWidth="4"
          />
          <path
            d="M24 32L30 38L40 26"
            stroke={isDark ? "#66BB6A" : "#2E8B57"}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      description: "Recommendations tailored to your farm or business needs",
    },
    {
      title: "Works even on basic phones",
      icon: (
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="20"
            y="8"
            width="24"
            height="48"
            rx="4"
            stroke={isDark ? "#FF8F00" : "#D35400"}
            strokeWidth="4"
          />
          <circle cx="32" cy="48" r="4" fill={isDark ? "#FF8F00" : "#D35400"} />
          <line
            x1="20"
            y1="40"
            x2="44"
            y2="40"
            stroke={isDark ? "#FF8F00" : "#D35400"}
            strokeWidth="4"
          />
          <line
            x1="20"
            y1="16"
            x2="44"
            y2="16"
            stroke={isDark ? "#FF8F00" : "#D35400"}
            strokeWidth="4"
          />
        </svg>
      ),
      description: "Accessible on smartphones, feature phones, and landlines",
    },
  ];

  return (
    <section
      className={cn(
        "py-16 px-6 md:px-12",
        isDark ? "bg-[#1A2A3A]" : "bg-white/50"
      )}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2
            className={cn(
              "text-3xl md:text-4xl font-bold mb-4",
              isDark ? "text-[#F5F5F5]" : "text-[#333333]"
            )}
          >
            How Gram Net Helps You
          </h2>
          <p
            className={cn(
              "text-lg max-w-2xl mx-auto",
              isDark ? "text-[#F5F5F5]/80" : "text-[#333333]/80"
            )}
          >
            Simple, accessible technology that works for everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card
              key={index}
              className={cn(
                "border-2 transition-all hover:shadow-lg",
                isDark
                  ? "bg-[#121F2F] border-[#1A2A3A] hover:border-[#FF8F00]/50"
                  : "bg-white border-gray-100 hover:border-[#D35400]/50"
              )}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 p-4">{value.icon}</div>
                <h3
                  className={cn(
                    "text-xl font-semibold mb-2",
                    isDark ? "text-[#F5F5F5]" : "text-[#333333]"
                  )}
                >
                  {value.title}
                </h3>
                <p
                  className={cn(
                    "text-sm mb-4",
                    isDark ? "text-[#F5F5F5]/70" : "text-[#333333]/70"
                  )}
                >
                  {value.description}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "gap-2 mt-auto",
                    isDark
                      ? "text-[#FFC107] hover:text-[#FFC107]/90"
                      : "text-[#FFB30F] hover:text-[#FFB30F]/90"
                  )}
                >
                  <Volume2 className="h-4 w-4" />
                  Tap to hear more
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
