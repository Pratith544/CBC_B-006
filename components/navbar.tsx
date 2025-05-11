"use client";

import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Home,
  Settings,
  ThumbsUp,
  Languages as LanguagesIcon,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";
import TranslateWidget from "@/lib/translate";

export default function Navbar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isMobile = useMobile();

  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  // avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: "Home" },
    { icon: <Settings className="h-5 w-5" />, label: "Features" },
    { icon: <ThumbsUp className="h-5 w-5" />, label: "Benefits" },
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
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "font-bold text-xl",
            isDark ? "text-[#FF8F00]" : "text-[#D35400]"
          )}
        >
          Gram Net
        </span>
      </div>

      {isMobile ? (
        <>
          {/* Mobile controls */}
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div
              className={cn(
                "absolute top-full left-0 right-0 p-4 flex flex-col gap-2 shadow-lg",
                isDark ? "bg-[#121F2F]" : "bg-[#FFF9E6]"
              )}
            >
              {navItems.map((item, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  className="justify-start gap-2 w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Button>
              ))}

              {/* Translate widget inline */}
              <div className="mt-2">
                <TranslateWidget />
              </div>

              <Button
                className={cn(
                  "mt-4 gap-2",
                  isDark
                    ? "bg-[#FF8F00] hover:bg-[#FF8F00]/90"
                    : "bg-[#D35400] hover:bg-[#D35400]/90"
                )}
                onClick={() => setMenuOpen(false)}
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        /* Desktop menu */
        <div className="flex items-center gap-6">
          {navItems.map((item, i) => (
            <Button key={i} variant="ghost" className="flex items-center gap-2">
              {item.icon}
              {item.label}
            </Button>
          ))}

          <ModeToggle />

          {/* Languages dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLangOpen((v) => !v)}
              aria-label="Select language"
            >
              <LanguagesIcon className="h-5 w-5" />
            </Button>
            {langOpen && (
              <div
                className={cn(
                  "absolute right-0 mt-2 w-56 p-2 rounded shadow-xl",
                  isDark ? "bg-[#1A2A3A]" : "bg-white"
                )}
              >
                <TranslateWidget />
              </div>
            )}
          </div>

          <Button
            className={cn(
              isDark
                ? "bg-[#FF8F00] hover:bg-[#FF8F00]/90"
                : "bg-[#D35400] hover:bg-[#D35400]/90",
              "flex items-center gap-2"
            )}
          >
            Get Started <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </nav>
  );
}
