'use client';

import { useState, useEffect } from 'react';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguageSelector() {
  const [mounted, setMounted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Languages className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setCurrentLanguage('en')}>
          <span className="h-4 w-4 mr-2 flex items-center justify-center">🇺🇸</span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCurrentLanguage('es')}>
          <span className="h-4 w-4 mr-2 flex items-center justify-center">🇪🇸</span>
          Hindi
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCurrentLanguage('kn')}>
          <span className="h-4 w-4 mr-2 flex items-center justify-center">🇫🇷</span>
          Kannada
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCurrentLanguage('ta')}>
          <span className="h-4 w-4 mr-2 flex items-center justify-center">🇫🇷</span>
          Tamil
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCurrentLanguage('ma')}>
          <span className="h-4 w-4 mr-2 flex items-center justify-center">🇫🇷</span>
          Malayalam
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}