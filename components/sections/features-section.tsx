"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Play,
  ShoppingBasket,
  Cloud,
  Mic,
  GraduationCap,
  Store,
  Languages,
  Sprout,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function FeaturesSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();

  const features = [
    {
      title: "Multilingual Voice Assistant",
      icon: (
        <Mic
          className={cn(
            "h-12 w-12",
            isDark ? "text-[#FF8F00]" : "text-[#D35400]"
          )}
        />
      ),
      description:
        "Voice driven assistant for agriculture in 32 Indian languages, helping with SHGs, business schemes, and more",
    },
    {
      title: "Realtime Marketplace",
      icon: (
        <ShoppingBasket
          className={cn(
            "h-12 w-12",
            isDark ? "text-[#66BB6A]" : "text-[#2E8B57]"
          )}
        />
      ),
      description:
        "Access live market prices of agricultural goods to make informed selling decisions",
      link: "/marketplaceRealtime",
    },
    {
      title: "Agricultural Recommendations",
      icon: (
        <Sprout
          className={cn(
            "h-12 w-12",
            isDark ? "text-[#FFC107]" : "text-[#FFB30F]"
          )}
        />
      ),
      description:
        "Comprehensive analysis, suggestions, and predictions based on your farm data",
      link: "agriRecommend",
    },
    {
      title: "Weather-Based Insights",
      icon: (
        <Cloud
          className={cn(
            "h-12 w-12",
            isDark ? "text-[#FF8F00]" : "text-[#D35400]"
          )}
        />
      ),
      description:
        "Realtime recommendations based on predicted weather patterns to ensure good yield",
      link: "/agriSuggest",
    },
    {
      title: "Interactive Learning Paths",
      icon: (
        <GraduationCap
          className={cn(
            "h-12 w-12",
            isDark ? "text-[#66BB6A]" : "text-[#2E8B57]"
          )}
        />
      ),
      description:
        "AI-driven educational content on diverse domains to empower rural communities",
      link: "/questionnaire",
    },
    {
      title: "Farmer Marketplace",
      icon: (
        <Store
          className={cn(
            "h-12 w-12",
            isDark ? "text-[#FFC107]" : "text-[#FFB30F]"
          )}
        />
      ),
      description:
        "Platform for farmers to sell products directly to customers without middlemen",
      link: "/marketPlace",
    },
    {
      title: "32+ Indian Languages",
      icon: (
        <Languages
          className={cn(
            "h-12 w-12",
            isDark ? "text-[#FF8F00]" : "text-[#D35400]"
          )}
        />
      ),
      description:
        "Entire application available in 32+ Indian languages for maximum accessibility",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2
            className={cn(
              "text-3xl md:text-4xl font-bold mb-4",
              isDark ? "text-[#F5F5F5]" : "text-[#333333]"
            )}
          >
            Features That Help You Succeed
          </h2>
          <p
            className={cn(
              "text-lg max-w-2xl mx-auto",
              isDark ? "text-[#F5F5F5]/80" : "text-[#333333]/80"
            )}
          >
            Everything you need to know, just a voice command away
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className={cn(
                "overflow-hidden transition-all hover:shadow-lg border-0",
                isDark ? "bg-[#1A2A3A]" : "bg-white"
              )}
            >
              <CardContent className="p-0">
                <div
                  className={cn("p-1", isDark ? "bg-[#121F2F]" : "bg-gray-50")}
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "p-3 rounded-full",
                          isDark ? "bg-[#121F2F]" : "bg-[#FFF9E6]"
                        )}
                      >
                        {feature.icon}
                      </div>
                      <h3
                        className={cn(
                          "text-lg font-semibold",
                          isDark ? "text-[#F5F5F5]" : "text-[#333333]"
                        )}
                      >
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <p
                    className={cn(
                      "mb-4",
                      isDark ? "text-[#F5F5F5]/80" : "text-[#333333]/80"
                    )}
                  >
                    {feature.description}
                  </p>
                  {feature.link ? (
                    <a href={feature.link} className="w-full">
                      <Button
                        className={cn(
                          "w-full gap-2 mt-2",
                          isDark
                            ? "bg-[#1A2A3A] border border-[#FF8F00]/30 hover:bg-[#FF8F00]/10 text-[#F5F5F5]"
                            : "bg-[#FFF9E6] border border-[#D35400]/30 hover:bg-[#D35400]/10 text-[#333333]"
                        )}
                      >
                        <Play className="h-4 w-4" /> Show me how
                      </Button>
                    </a>
                  ) : (
                    <Button
                      disabled
                      className={cn(
                        "w-full gap-2 mt-2 opacity-50 cursor-not-allowed",
                        isDark
                          ? "bg-[#1A2A3A] border border-[#555] text-[#777]"
                          : "bg-gray-100 border border-[#ccc] text-[#888]"
                      )}
                    >
                      <Play className="h-4 w-4" /> Show me how
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
