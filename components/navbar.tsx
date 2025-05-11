"use client";

import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Home,
  Settings,
  ThumbsUp,
  Languages,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

export default function Navbar() {
  const { theme } = useTheme();
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: "Home" },
    { icon: <Settings className="h-5 w-5" />, label: "Features" },
    { icon: <ThumbsUp className="h-5 w-5" />, label: "Benefits" },
    { icon: <Languages className="h-5 w-5" />, label: "Languages" },
  ];

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full py-4 px-6 md:px-12 flex items-center justify-between",
        isDark
          ? "bg-[#121F2F]/95 backdrop-blur-sm"
          : "bg-[#FFF9E6]/95 backdrop-blur-sm"
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "font-bold text-xl flex items-center",
            isDark ? "text-[#FF8F00]" : "text-[#D35400]"
          )}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M16 4C9.373 4 4 9.373 4 16C4 22.627 9.373 28 16 28C22.627 28 28 22.627 28 16C28 9.373 22.627 4 16 4ZM8 16C8 11.582 11.582 8 16 8V24C11.582 24 8 20.418 8 16Z"
              fill={isDark ? "#FF8F00" : "#D35400"}
            />
            <path
              d="M20 12C18.895 12 18 12.895 18 14V18C18 19.105 18.895 20 20 20C21.105 20 22 19.105 22 18V14C22 12.895 21.105 12 20 12Z"
              fill={isDark ? "#66BB6A" : "#2E8B57"}
            />
          </svg>
          Gram Net
        </div>
      </div>

      {isMobile ? (
        <>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {isMenuOpen && (
            <div
              className={cn(
                "absolute top-full left-0 right-0 p-4 flex flex-col gap-2 shadow-lg",
                isDark ? "bg-[#121F2F]" : "bg-[#FFF9E6]"
              )}
            >
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="justify-start gap-2 w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
              ))}
              <Button
                className={cn(
                  "mt-2 gap-2",
                  isDark
                    ? "bg-[#FF8F00] hover:bg-[#FF8F00]/90"
                    : "bg-[#D35400] hover:bg-[#D35400]/90"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center gap-6">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="flex items-center gap-2"
              aria-label={item.label}
            >
              {item.icon}
              <span>{item.label}</span>
            </Button>
          ))}
          <ModeToggle />
          <Button
            className={cn(
              isDark
                ? "bg-[#FF8F00] hover:bg-[#FF8F00]/90"
                : "bg-[#D35400] hover:bg-[#D35400]/90"
            )}
          >
            Get Started <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </nav>
  );
}
