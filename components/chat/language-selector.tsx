"use client";

import React, { useState } from "react";
import { Check, ChevronDown, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  SupportedLanguage,
  languageNames,
} from "@/hooks/use-language-detection";

interface LanguageSelectorProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
  className?: string;
}

export function LanguageSelector({
  currentLanguage,
  onLanguageChange,
  className,
}: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);

  // Helper for common/major languages in India
  const mainLanguages: SupportedLanguage[] = [
    "en",
    "hi",
    "bn",
    "te",
    "mr",
    "ta",
  ];

  // All other supported languages
  const otherLanguages: SupportedLanguage[] = Object.keys(languageNames)
    .filter((lang) => !mainLanguages.includes(lang as SupportedLanguage))
    .sort() as SupportedLanguage[];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "flex items-center gap-1 h-8 px-2 text-xs sm:text-sm",
            className
          )}
        >
          <Languages className="h-3.5 w-3.5 mr-1" />
          <span className="hidden sm:inline">Language:</span>{" "}
          {languageNames[currentLanguage].split(" ")[0]}
          <ChevronDown className="h-3.5 w-3.5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <ScrollArea className="h-[300px]">
          <DropdownMenuGroup>
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              Main Languages
            </div>
            {mainLanguages.map((lang) => (
              <DropdownMenuItem
                key={lang}
                className="flex items-center gap-2"
                onSelect={() => {
                  onLanguageChange(lang);
                  setOpen(false);
                }}
              >
                <div className="w-4">
                  {currentLanguage === lang && <Check className="h-4 w-4" />}
                </div>
                <span>{languageNames[lang]}</span>
              </DropdownMenuItem>
            ))}

            <div className="px-2 py-1.5 mt-2 text-xs font-semibold text-muted-foreground">
              Other Languages
            </div>
            {otherLanguages.map((lang) => (
              <DropdownMenuItem
                key={lang}
                className="flex items-center gap-2"
                onSelect={() => {
                  onLanguageChange(lang);
                  setOpen(false);
                }}
              >
                <div className="w-4">
                  {currentLanguage === lang && <Check className="h-4 w-4" />}
                </div>
                <span>{languageNames[lang]}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
