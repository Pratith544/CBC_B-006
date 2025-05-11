"use client";

import { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { AudioButton } from "@/components/ui/audio-button";
import { LanguageSelector } from "@/components/language-selector";
import {
  Home,
  Settings,
  ThumbsUp,
  MessageSquareText,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <LogoIcon className="h-10 w-10 text-primary" />
          <span className="font-bold text-xl hidden sm:block">
            Voice Bridge
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavItem
            href="/"
            icon={<Home className="h-5 w-5" />}
            label="Home"
            audioText="Navigate to Home page"
          />
          <NavItem
            href="#features"
            icon={<Settings className="h-5 w-5" />}
            label="Features"
            audioText="Learn about our features"
          />
          <NavItem
            href="#benefits"
            icon={<ThumbsUp className="h-5 w-5" />}
            label="Benefits"
            audioText="Discover the benefits"
          />
          <NavItem
            href="#languages"
            icon={<MessageSquareText className="h-5 w-5" />}
            label="Languages"
            audioText="Available languages"
          />
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSelector />
          <ModeToggle />
          <Button
            size="lg"
            className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Get Started
            <span className="ml-2">→</span>
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-[62px] bg-background border-b border-border transition-transform duration-300 ease-in-out z-40",
          isOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <MobileNavItem
            href="/"
            icon={<Home className="h-6 w-6" />}
            label="Home"
            audioText="Navigate to Home page"
            onClick={toggleMenu}
          />
          <MobileNavItem
            href="#features"
            icon={<Settings className="h-6 w-6" />}
            label="Features"
            audioText="Learn about our features"
            onClick={toggleMenu}
          />
          <MobileNavItem
            href="#benefits"
            icon={<ThumbsUp className="h-6 w-6" />}
            label="Benefits"
            audioText="Discover the benefits"
            onClick={toggleMenu}
          />
          <MobileNavItem
            href="#languages"
            icon={<MessageSquareText className="h-6 w-6" />}
            label="Languages"
            audioText="Available languages"
            onClick={toggleMenu}
          />

          <div className="pt-2 flex items-center justify-between">
            <LanguageSelector />
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Get Started
              <span className="ml-2">→</span>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

function NavItem({
  href,
  icon,
  label,
  audioText,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  audioText: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary group relative"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      <AudioButton
        text={audioText}
        className="opacity-0 group-hover:opacity-100 transition-opacity absolute -right-1 -top-1"
      />
    </Link>
  );
}

function MobileNavItem({
  href,
  icon,
  label,
  audioText,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  audioText: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between px-3 py-3 rounded-md text-lg font-medium hover:bg-secondary"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      <AudioButton text={audioText} />
    </Link>
  );
}

function LogoIcon({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-primary-foreground flex items-center justify-center">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M5 20C5 12.268 11.268 6 19 6C26.732 6 33 12.268 33 20C33 27.732 26.732 34 19 34"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M19 34C15.134 34 12 30.866 12 27C12 23.134 15.134 20 19 20"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M26 27H35"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
