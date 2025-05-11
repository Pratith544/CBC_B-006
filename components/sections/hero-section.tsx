"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Play, Volume2 } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

export default function HeroSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isMobile = useMobile();
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // Audio playback logic would go here
  };

  return (
    <section className="relative py-16 md:py-24 px-6 md:px-12 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute -right-24 -top-24 w-64 h-64 rounded-full opacity-10",
            isDark ? "bg-[#FF8F00]" : "bg-[#D35400]"
          )}
        />
        <div
          className={cn(
            "absolute -left-24 bottom-0 w-48 h-48 rounded-full opacity-10",
            isDark ? "bg-[#66BB6A]" : "bg-[#2E8B57]"
          )}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h1
                className={cn(
                  "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
                  isDark ? "text-[#F5F5F5]" : "text-[#333333]"
                )}
              >
                Smart Voice Assistant for Farmers & Small Businesses
              </h1>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={toggleAudio}
                aria-label="Play audio"
              >
                {isPlaying ? (
                  <Volume2
                    className={cn(
                      "h-4 w-4",
                      isDark ? "text-[#FFC107]" : "text-[#FFB30F]"
                    )}
                  />
                ) : (
                  <Play
                    className={cn(
                      "h-4 w-4",
                      isDark ? "text-[#FFC107]" : "text-[#FFB30F]"
                    )}
                  />
                )}
                <span className="text-sm">Listen</span>
              </Button>
            </div>

            <p
              className={cn(
                "text-lg md:text-xl",
                isDark ? "text-[#F5F5F5]/80" : "text-[#333333]/80"
              )}
            >
              Speak in your own language. Get schemes, market prices & more —
              instantly.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className={cn(
                  "gap-2 text-white rounded-full px-8 shadow-lg transition-all hover:shadow-xl",
                  isDark
                    ? "bg-[#FF8F00] hover:bg-[#FF8F00]/90"
                    : "bg-[#D35400] hover:bg-[#D35400]/90",
                  "animate-pulse hover:animate-none"
                )}
              >
                <Mic className="h-5 w-5" />
                Start Talking
              </Button>
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    isDark ? "bg-[#FFC107]" : "bg-[#FFB30F]"
                  )}
                />
                <span className="text-sm opacity-75">
                  Audio welcome available
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div
              className={cn(
                "relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-xl",
                isDark ? "bg-[#1A2A3A]" : "bg-white"
              )}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-3/4 h-3/4">
                  {/* Animated illustration of a farmer speaking to a device */}
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center",
                      "animate-[pulse_3s_ease-in-out_infinite]"
                    )}
                  >
                    <svg
                      width="200"
                      height="200"
                      viewBox="0 0 200 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="100"
                        cy="100"
                        r="50"
                        fill={isDark ? "#FF8F00" : "#D35400"}
                        fillOpacity="0.2"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="30"
                        fill={isDark ? "#FF8F00" : "#D35400"}
                        fillOpacity="0.4"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="15"
                        fill={isDark ? "#FF8F00" : "#D35400"}
                      />
                    </svg>
                  </div>

                  {/* Farmer silhouette */}
                  <svg
                    className="absolute bottom-0 left-0"
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M40 80C40 69 49 60 60 60C71 60 80 69 80 80V100H40V80Z"
                      fill={isDark ? "#66BB6A" : "#2E8B57"}
                    />
                    <circle
                      cx="60"
                      cy="45"
                      r="15"
                      fill={isDark ? "#66BB6A" : "#2E8B57"}
                    />
                    <path
                      d="M85 75C85 75 95 85 95 95M35 75C35 75 25 85 25 95"
                      stroke={isDark ? "#66BB6A" : "#2E8B57"}
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Sound waves */}
                  <svg
                    className="absolute top-10 right-0"
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 40H60M10 25H70M30 55H50"
                      stroke={isDark ? "#FFC107" : "#FFB30F"}
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="animate-[pulse_2s_ease-in-out_infinite]"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
