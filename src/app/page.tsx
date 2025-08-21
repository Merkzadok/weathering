"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { WeatherSide } from "@/components/WeatherSide";

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

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetchWeatherData("Ulaanbaatar");
  }, []);

  const fetchWeatherData = async (location: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${location}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCitySuggestions = async (cityName: string) => {
    if (cityName.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const cityUrl = `https://api.api-ninjas.com/v1/city?name=${cityName}`;
      const response = await fetch(cityUrl, {
        headers: {
          "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY1 || "",
        },
      });
      const data = await response.json();
      setSuggestions(data.slice(0, 5)); // Limit to 5 suggestions
    } catch (error) {
      console.log(error);
    }
  };

  const getInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const getData = event.target.value;
    setInputValue(getData);
    setShowSuggestions(true);
    fetchCitySuggestions(getData);
  };

  const handleSuggestionClick = (cityName: string) => {
    setInputValue(cityName);
    setShowSuggestions(false);
    setSuggestions([]);
    fetchWeatherData(cityName);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      fetchWeatherData(inputValue);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="min-h-screen flex relative bg-gradient-to-br from-blue-50 to-purple-100 overflow-hidden">
      {/* Background Floating Shapes */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden z-10">
        {/* Large floating circles with colored gradient */}
        <div
          className="absolute top-20 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full animate-pulse shadow-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255,200,150,0.4), transparent)",
          }}
        />
        <div
          className="absolute top-40 left-1/2 transform -translate-x-1/2 translate-x-8 w-16 h-16 rounded-full animate-bounce"
          style={{
            background:
              "radial-gradient(circle, rgba(150,200,255,0.4), transparent)",
          }}
        />
        <div
          className="absolute bottom-32 left-1/2 transform -translate-x-1/2 -translate-x-6 w-24 h-24 rounded-full animate-pulse delay-1000"
          style={{
            background:
              "radial-gradient(circle, rgba(255,150,200,0.35), transparent)",
          }}
        />

        {/* Connecting lines with soft glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-40 bg-gradient-to-b from-white/50 via-white/30 to-white/50 shadow-md"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent shadow-sm"></div>
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-20 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent shadow-sm"></div>

        {/* Animated colorful dots */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 translate-x-12 w-2 h-2 rounded-full animate-ping bg-yellow-300/70 shadow-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-x-16 w-1 h-1 rounded-full animate-ping delay-300 bg-pink-300/60 shadow-md"></div>
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 -translate-x-10 w-1.5 h-1.5 rounded-full animate-ping delay-700 bg-cyan-300/60 shadow-md"></div>
        {/* Middle Dynamic Orb */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="relative w-40 h-40 rounded-full bg-gradient-to-tr from-yellow-300/40 via-pink-300/30 to-purple-400/30 animate-spin-slow shadow-[0_0_80px_rgba(255,200,255,0.4)]">
            {/* Radiating rings */}
            <div className="absolute inset-0 rounded-full border border-white/20 animate-spin-slower"></div>
            <div className="absolute inset-0 rounded-full border border-white/30 animate-spin-slower delay-500"></div>
          </div>
        </div>
        {/* Geometric shapes with subtle glow */}
        <div
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 rotate-45 w-8 h-8 border-2 border-purple-300/60 animate-spin"
          style={{
            animationDuration: "20s",
            boxShadow: "0 0 15px rgba(128,0,255,0.4)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -rotate-45 w-6 h-6 border-2 border-pink-300/60 animate-spin"
          style={{
            animationDuration: "15s",
            boxShadow: "0 0 10px rgba(255,50,150,0.35)",
          }}
        />
      </div>

      {/* Day Side */}
      <WeatherSide
        theme="day"
        weatherData={weatherData}
        loading={loading}
        inputValue={inputValue}
        onInputChange={getInputValue}
        onSearch={handleSearch}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        onSuggestionClick={handleSuggestionClick}
        onSearchFocus={() => setShowSuggestions(true)}
        showSearch={true}
      />

      {/* Night Side */}
      <WeatherSide
        theme="night"
        weatherData={weatherData}
        loading={loading}
        inputValue={inputValue}
        onInputChange={getInputValue}
        onSearch={handleSearch}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        onSuggestionClick={handleSuggestionClick}
        onSearchFocus={() => setShowSuggestions(true)}
        showSearch={false}
      />
    </div>
  );
}
