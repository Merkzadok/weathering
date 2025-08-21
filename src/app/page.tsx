"use client";

import { WeatherSide } from "@/components/WeatherSide";
import type React from "react";

import { useState, useEffect } from "react";

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
    <div className="min-h-screen flex">
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
