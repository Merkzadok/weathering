"use client";

import type React from "react";

import { Sun, Moon } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { WeatherCard } from "./WeatherCard";
import Lottie from "lottie-react";
import Sunny from "@/animations/Sun.json";
import Moony from "@/animations/Moon.json";

interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    feelslike_c: number;
  };
}

interface CityData {
  name: string;
  country: string;
}

interface WeatherSideProps {
  theme: "day" | "night";
  weatherData: WeatherData | null;
  loading: boolean;
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  suggestions: CityData[];
  showSuggestions: boolean;
  onSuggestionClick: (cityName: string) => void;
  onSearchFocus: () => void;
  showSearch?: boolean;
}

export function WeatherSide({
  theme,
  weatherData,
  loading,
  inputValue,
  onInputChange,
  onSearch,
  suggestions,
  showSuggestions,
  onSuggestionClick,
  onSearchFocus,
  showSearch = false,
}: WeatherSideProps) {
  const isDayTheme = theme === "day";

  return (
    <div
      className={`flex-1 relative overflow-hidden ${
        isDayTheme ? "day-theme" : "night-theme"
      }`}
    >
      <div
        className={`absolute inset-0 ${
          isDayTheme
            ? "bg-gradient-to-br from-red-50/50 to-yellow-50/50"
            : "bg-gradient-to-br from-gray-800/50 to-purple-900/50"
        }`}
      />

      {/* Decorative Elements */}
      <div
        className={`absolute animate-float ${
          isDayTheme
            ? "top-20 right-20 w-32 h-32 bg-yellow-200/30"
            : "top-16 left-20 w-28 h-28 bg-purple-400/20"
        } rounded-full`}
      />
      <div
        className={`absolute animate-bounce-gentle rounded-full ${
          isDayTheme
            ? "bottom-32 left-16 w-24 h-24 bg-orange-200/40"
            : "bottom-40 right-12 w-20 h-20 bg-blue-400/30"
        }`}
      />

      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            {isDayTheme ? (
              <Lottie
                animationData={Sunny}
                className="w-25 h-25 animate-pulse-glow"
              />
            ) : (
              <Lottie
                animationData={Moony}
                className="w-15 h-15  animate-pulse-glow"
              />
            )}
            <h1
              className={`font-serif font-bold text-3xl ${
                isDayTheme ? "text-gray-800" : "text-white"
              }`}
            >
              {isDayTheme ? "Day Weather" : "Night Weather"}
            </h1>
          </div>

          {/* Search Section - Only show on day side */}
          {showSearch && (
            <SearchBar
              inputValue={inputValue}
              onInputChange={onInputChange}
              onSearch={onSearch}
              suggestions={suggestions}
              showSuggestions={showSuggestions}
              onSuggestionClick={onSuggestionClick}
              onFocus={onSearchFocus}
              theme={theme}
            />
          )}
        </div>

        {/* Weather Display */}
        <div className="flex-1 flex items-center justify-center">
          {weatherData && (
            <WeatherCard
              weatherData={weatherData}
              loading={loading}
              theme={theme}
            />
          )}
        </div>
      </div>
    </div>
  );
}
