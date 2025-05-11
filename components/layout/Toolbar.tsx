"use client";

import { useState } from "react";
import { ViewType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BarChart2, MessageSquare, Search } from "lucide-react";

interface ToolbarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  location: string;
  onLocationSearch: (query: string) => void;
}

export default function Toolbar({
  activeView,
  onViewChange,
  location,
  onLocationSearch,
}: ToolbarProps) {
  const [searchQuery, setSearchQuery] = useState(location);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onLocationSearch(searchQuery.trim());
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center">
          <div className="flex items-center gap-2 text-primary font-medium text-lg">
            <BarChart2 className="h-6 w-6" />
            <span>AgriWeather Insights</span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className={cn(
            "relative flex-1 max-w-md transition-all duration-200",
            isSearchFocused ? "scale-105" : ""
          )}
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Enter location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </form>

        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onViewChange("weather")}
            className={cn(
              "px-4 py-2 rounded-md flex items-center gap-2 transition-colors",
              activeView === "weather"
                ? "bg-white text-primary shadow-sm"
                : "text-gray-600 hover:bg-gray-200"
            )}
          >
            <BarChart2 className="h-4 w-4" />
            <span className="hidden sm:inline">Weather</span>
          </button>
          <button
            onClick={() => onViewChange("chatbot")}
            className={cn(
              "px-4 py-2 rounded-md flex items-center gap-2 transition-colors",
              activeView === "chatbot"
                ? "bg-white text-primary shadow-sm"
                : "text-gray-600 hover:bg-gray-200"
            )}
          >
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Crop Assistant</span>
          </button>
        </div>
      </div>
    </div>
  );
}
