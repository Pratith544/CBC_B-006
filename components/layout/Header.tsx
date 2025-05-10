"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-8 py-3",
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf size={28} className="text-green-600" />
          <span className="text-xl font-bold text-green-800 dark:text-green-400">
            KrushiSahayak
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="/" label="Home" />
          <NavLink href="/questionnaire" label="Get Recommendations" />
          <NavLink href="/about" label="About" />
          <NavLink href="/resources" label="Resources" />
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
            Start Now
          </button>
        </nav>

        <button
          className="md:hidden text-gray-700 dark:text-gray-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg animate-in slide-in-from-top-5">
          <div className="flex flex-col p-4 space-y-4">
            <MobileNavLink
              href="/"
              label="Home"
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavLink
              href="/questionnaire"
              label="Get Recommendations"
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavLink
              href="/about"
              label="About"
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavLink
              href="/resources"
              label="Resources"
              onClick={() => setIsMenuOpen(false)}
            />
            <button
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Start Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors"
    >
      {label}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors py-2 border-b border-gray-100 dark:border-gray-800"
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
