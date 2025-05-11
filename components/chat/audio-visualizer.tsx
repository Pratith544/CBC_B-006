"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AudioVisualizerProps {
  frequencyData: number[];
  isActive: boolean;
  colorClass?: string;
  className?: string;
}

export function AudioVisualizer({
  frequencyData,
  isActive,
  colorClass = "bg-primary",
  className,
}: AudioVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate the number of bars based on container width
  const getBarCount = () => {
    if (!containerRef.current) return 30;
    const width = containerRef.current.clientWidth;
    return Math.min(50, Math.max(20, Math.floor(width / 10)));
  };

  // Smooth out the transition between frequency data points
  const smoothFrequencyData = (data: number[], barCount: number) => {
    if (data.length === 0) {
      return Array(barCount).fill(3); // Minimum bar height when inactive
    }

    // Resample the frequency data to match our bar count
    const step = data.length / barCount;
    return Array(barCount)
      .fill(0)
      .map((_, i) => {
        const dataIndex = Math.floor(i * step);
        const value = data[dataIndex] || 0;

        // Scale the value - in a real app, this would be tuned for actual audio data
        return Math.min(100, Math.max(3, value));
      });
  };

  useEffect(() => {
    // Force re-render on window resize to adjust bar count
    const handleResize = () => {
      if (containerRef.current) {
        // This will trigger a re-render
        containerRef.current.classList.add("resized");
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.classList.remove("resized");
          }
        }, 0);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const barCount = getBarCount();
  const processedData = smoothFrequencyData(frequencyData, barCount);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex items-end justify-center h-12 gap-[2px] pb-1 overflow-hidden",
        isActive ? "opacity-100" : "opacity-60",
        className
      )}
    >
      {processedData.map((value, index) => (
        <div
          key={index}
          className={cn(
            "w-1 rounded-full transition-all duration-100",
            isActive ? colorClass : "bg-muted-foreground/40"
          )}
          style={{
            height: `${value}%`,
            // Add slight randomization to make it look more natural
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}
