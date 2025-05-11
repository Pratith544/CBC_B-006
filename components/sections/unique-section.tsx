"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Mic, Wifi, UserCheck, LayoutGrid } from "lucide-react";

export default function UniqueSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const uniqueFeatures = [
    {
      title: "Voice Input",
      icon: (
        <Mic
          className={cn(
            "h-8 w-8",
            isDark ? "text-[#FF8F00]" : "text-[#D35400]"
          )}
        />
      ),
      description: "No typing needed - just speak naturally",
      before: "Complex keyboard input",
      after: "Simple voice commands",
    },
    {
      title: "Low Bandwidth",
      icon: (
        <Wifi
          className={cn(
            "h-8 w-8",
            isDark ? "text-[#66BB6A]" : "text-[#2E8B57]"
          )}
        />
      ),
      description: "Works even with poor internet connection",
      before: "Requires strong signal",
      after: "Works with minimal connectivity",
    },
    {
      title: "Personalization",
      icon: (
        <UserCheck
          className={cn(
            "h-8 w-8",
            isDark ? "text-[#FFC107]" : "text-[#FFB30F]"
          )}
        />
      ),
      description: "Tailored to your specific needs",
      before: "Generic information",
      after: "Customized for your farm/business",
    },
    {
      title: "Simple Design",
      icon: (
        <LayoutGrid
          className={cn(
            "h-8 w-8",
            isDark ? "text-[#FF8F00]" : "text-[#D35400]"
          )}
        />
      ),
      description: "Easy to use for everyone",
      before: "Complex interfaces",
      after: "Intuitive, accessible design",
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
            What Makes Gram Net Unique
          </h2>
          <p
            className={cn(
              "text-lg max-w-2xl mx-auto",
              isDark ? "text-[#F5F5F5]/80" : "text-[#333333]/80"
            )}
          >
            Designed specifically for rural communities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {uniqueFeatures.map((feature, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 flex items-start justify-center md:justify-start">
                <div
                  className={cn(
                    "p-4 rounded-full",
                    isDark ? "bg-[#121F2F]" : "bg-[#FFF9E6]"
                  )}
                >
                  {feature.icon}
                </div>
              </div>
              <div>
                <h3
                  className={cn(
                    "text-xl font-semibold mb-2 text-center md:text-left",
                    isDark ? "text-[#F5F5F5]" : "text-[#333333]"
                  )}
                >
                  {feature.title}
                </h3>
                <p
                  className={cn(
                    "mb-4 text-center md:text-left",
                    isDark ? "text-[#F5F5F5]/80" : "text-[#333333]/80"
                  )}
                >
                  {feature.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div
                    className={cn(
                      "flex-1 p-4 rounded-lg",
                      isDark ? "bg-[#121F2F]/80" : "bg-gray-100"
                    )}
                  >
                    <div className="text-sm font-medium mb-2 opacity-60">
                      Before
                    </div>
                    <div
                      className={cn(
                        "text-sm",
                        isDark ? "text-[#F5F5F5]/70" : "text-[#333333]/70"
                      )}
                    >
                      {feature.before}
                    </div>
                  </div>

                  <div className="flex items-center justify-center text-2xl">
                    →
                  </div>

                  <div
                    className={cn(
                      "flex-1 p-4 rounded-lg",
                      isDark
                        ? "bg-gradient-to-r from-[#FF8F00]/20 to-[#66BB6A]/20 border border-[#FF8F00]/30"
                        : "bg-gradient-to-r from-[#D35400]/10 to-[#2E8B57]/10 border border-[#D35400]/20"
                    )}
                  >
                    <div
                      className={cn(
                        "text-sm font-medium mb-2",
                        isDark ? "text-[#FFC107]" : "text-[#D35400]"
                      )}
                    >
                      After
                    </div>
                    <div
                      className={cn(
                        "text-sm font-medium",
                        isDark ? "text-[#F5F5F5]" : "text-[#333333]"
                      )}
                    >
                      {feature.after}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
