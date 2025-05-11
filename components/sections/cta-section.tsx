"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Mic, Clock } from "lucide-react";

export default function CtaSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const steps = [
    "Speak your question",
    "Get instant answers",
    "Take action with confidence",
  ];

  return (
    <section className="py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute right-0 bottom-0 w-64 h-64 rounded-full opacity-10 translate-x-1/2 translate-y-1/2",
            isDark ? "bg-[#FF8F00]" : "bg-[#D35400]"
          )}
        />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div
          className={cn(
            "rounded-3xl p-8 md:p-12 shadow-xl",
            isDark
              ? "bg-gradient-to-br from-[#1A2A3A] to-[#121F2F] border border-[#FF8F00]/20"
              : "bg-gradient-to-br from-white to-[#FFF9E6] border border-[#D35400]/10"
          )}
        >
          <div className="text-center mb-8">
            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold mb-4",
                isDark ? "text-[#F5F5F5]" : "text-[#333333]"
              )}
            >
              Ready to get personalized help?
            </h2>
            <p
              className={cn(
                "text-lg max-w-2xl mx-auto",
                isDark ? "text-[#F5F5F5]/80" : "text-[#333333]/80"
              )}
            >
              Start using Gram Net today and transform how you access
              information
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4",
                    isDark
                      ? "bg-[#FF8F00] text-white"
                      : "bg-[#D35400] text-white"
                  )}
                >
                  {index + 1}
                </div>
                <p
                  className={cn(
                    "text-center font-medium",
                    isDark ? "text-[#F5F5F5]" : "text-[#333333]"
                  )}
                >
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center">
            <Button
              size="lg"
              className={cn(
                "gap-2 text-white rounded-full px-8 py-6 text-lg shadow-lg transition-all hover:shadow-xl mb-4",
                isDark
                  ? "bg-[#FF8F00] hover:bg-[#FF8F00]/90"
                  : "bg-[#D35400] hover:bg-[#D35400]/90",
                "animate-pulse hover:animate-none"
              )}
            >
              <Mic className="h-5 w-5" />
              Start Now
            </Button>

            <div className="flex items-center gap-2 text-sm opacity-75">
              <Clock className="h-4 w-4" />
              Takes just 2 minutes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
