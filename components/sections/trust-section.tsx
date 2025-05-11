"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Download, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TrustSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={cn(
        "py-16 px-6 md:px-12",
        isDark ? "bg-[#1A2A3A]" : "bg-white/50"
      )}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2
              className={cn(
                "text-2xl md:text-3xl font-bold mb-6",
                isDark ? "text-[#F5F5F5]" : "text-[#333333]"
              )}
            >
              Trusted by Farmers & Small Businesses
            </h2>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold",
                    isDark
                      ? "bg-[#FF8F00] text-white"
                      : "bg-[#D35400] text-white"
                  )}
                >
                  100+
                </div>
                <span
                  className={cn(
                    "font-medium",
                    isDark ? "text-[#F5F5F5]" : "text-[#333333]"
                  )}
                >
                  Farmers using Gram Net daily
                </span>
              </div>

              <div className="grid grid-cols-5 gap-4 mt-6">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "aspect-square rounded-full",
                      isDark ? "bg-[#121F2F]" : "bg-gray-100"
                    )}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                        fill={isDark ? "#1A2A3A" : "#E5E5E5"}
                      />
                      <path
                        d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                        fill={isDark ? "#1A2A3A" : "#E5E5E5"}
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3
                className={cn(
                  "text-xl font-semibold",
                  isDark ? "text-[#F5F5F5]" : "text-[#333333]"
                )}
              >
                Hear from our users
              </h3>

              <div
                className={cn(
                  "p-4 rounded-lg",
                  isDark ? "bg-[#121F2F]" : "bg-white"
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex-shrink-0",
                      isDark ? "bg-[#1A2A3A]" : "bg-gray-100"
                    )}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                        fill={isDark ? "#FF8F00" : "#D35400"}
                      />
                      <path
                        d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                        fill={isDark ? "#FF8F00" : "#D35400"}
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4
                        className={cn(
                          "font-medium",
                          isDark ? "text-[#F5F5F5]" : "text-[#333333]"
                        )}
                      >
                        Rajesh Kumar
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "h-8 gap-1",
                          isDark ? "text-[#FFC107]" : "text-[#FFB30F]"
                        )}
                      >
                        <Volume2 className="h-3 w-3" />
                        <span className="text-xs">Listen</span>
                      </Button>
                    </div>
                    <p
                      className={cn(
                        "text-sm",
                        isDark ? "text-[#F5F5F5]/70" : "text-[#333333]/70"
                      )}
                    >
                      "Gram Net helped me find the right government scheme for
                      my farm. I got a subsidy I didn't even know existed!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2
              className={cn(
                "text-2xl md:text-3xl font-bold mb-6",
                isDark ? "text-[#F5F5F5]" : "text-[#333333]"
              )}
            >
              Our Partners
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "aspect-video rounded-lg flex items-center justify-center p-4",
                    isDark ? "bg-[#121F2F]" : "bg-white"
                  )}
                >
                  <div
                    className={cn(
                      "w-full h-6 rounded",
                      isDark ? "bg-[#1A2A3A]" : "bg-gray-100"
                    )}
                  ></div>
                </div>
              ))}
            </div>

            <div
              className={cn(
                "rounded-lg p-6 mb-6",
                isDark
                  ? "bg-gradient-to-r from-[#121F2F] to-[#1A2A3A] border border-[#FF8F00]/20"
                  : "bg-gradient-to-r from-white to-[#FFF9E6] border border-[#D35400]/10"
              )}
            >
              <div className="flex items-center gap-4 mb-4">
                <Download
                  className={cn(
                    "h-8 w-8",
                    isDark ? "text-[#FFC107]" : "text-[#FFB30F]"
                  )}
                />
                <h3
                  className={cn(
                    "text-xl font-semibold",
                    isDark ? "text-[#F5F5F5]" : "text-[#333333]"
                  )}
                >
                  Coming Soon
                </h3>
              </div>
              <p
                className={cn(
                  "mb-2",
                  isDark ? "text-[#F5F5F5]/80" : "text-[#333333]/80"
                )}
              >
                Offline version with no internet needed
              </p>
              <div
                className={cn(
                  "text-sm inline-block px-3 py-1 rounded-full",
                  isDark
                    ? "bg-[#FF8F00]/20 text-[#FFC107]"
                    : "bg-[#D35400]/10 text-[#D35400]"
                )}
              >
                Join waitlist
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
