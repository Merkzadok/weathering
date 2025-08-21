"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

interface CityData {
  name: string;
  country: string;
}

interface SearchBarProps {
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  suggestions: CityData[];
  showSuggestions: boolean;
  onSuggestionClick: (cityName: string) => void;
  onFocus: () => void;
  theme?: "day" | "night";
}

export function SearchBar({
  inputValue,
  onInputChange,
  onSearch,
  suggestions,
  showSuggestions,
  onSuggestionClick,
  onFocus,
  theme = "day",
}: SearchBarProps) {
  const isDayTheme = theme === "day";

  return (
    <div className="relative max-w-md mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for a city..."
            value={inputValue}
            onChange={onInputChange}
            onFocus={onFocus}
            className={`${
              isDayTheme
                ? "bg-white/80 border-red-200 focus:border-red-400 text-gray-800 placeholder:text-gray-500"
                : "bg-gray-800/80 border-purple-400/30 focus:border-purple-400 text-white placeholder:text-gray-400"
            }`}
          />
          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <Button
          onClick={onSearch}
          className={`${
            isDayTheme
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-purple-500 hover:bg-purple-600 text-white"
          } px-4`}
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <Card
          className={`absolute top-full left-0 right-0 mt-2 z-50 ${
            isDayTheme
              ? "border-red-200 bg-white/95"
              : "border-purple-400/30 bg-gray-800/95"
          } backdrop-blur-sm`}
        >
          <CardContent className="p-2">
            {suggestions.map((city, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(city.name)}
                className={`w-full text-left p-2 rounded-md animate-slide-in ${
                  isDayTheme
                    ? "hover:bg-red-50 text-gray-700"
                    : "hover:bg-purple-900/50 text-gray-200"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {city.name}, {city.country}
              </button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
