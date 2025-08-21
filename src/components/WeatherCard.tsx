
import { Card, CardContent } from "@/components/ui/card";
import { Thermometer } from "lucide-react";
import { WeatherIcon } from "./WeatherIcon";

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

interface WeatherCardProps {
  weatherData: WeatherData;
  loading: boolean;
  theme: "day" | "night";
}

export function WeatherCard({ weatherData, loading, theme }: WeatherCardProps) {
  const isDayTheme = theme === "day";

  if (loading) {
    return (
      <div className="text-center">
        <div
          className={`animate-spin w-12 h-12 border-4 rounded-full mx-auto mb-4 ${
            isDayTheme
              ? "border-red-200 border-t-red-500"
              : "border-purple-200 border-t-purple-400"
          }`}
        />
        <p className={isDayTheme ? "text-gray-600" : "text-gray-300"}>
          Loading weather...
        </p>
      </div>
    );
  }

  if (!weatherData) return null;

  return (
    <Card
      className={`backdrop-blur-sm shadow-xl max-w-sm w-full ${
        isDayTheme
          ? "bg-white/80 border-red-200"
          : "bg-gray-800/80 border-purple-400/30"
      }`}
    >
      <CardContent className="p-8 text-center space-y-6">
        <div
          className={`flex items-center justify-center animate-bounce-gentle ${
            isDayTheme ? "text-red-600" : "text-purple-400"
          }`}
        >
          <WeatherIcon
            condition={weatherData.current.condition.text}
            isDay={isDayTheme}
          />
        </div>

        <div>
          <div
            className={`font-serif font-bold text-5xl mb-2 ${
              isDayTheme ? "text-gray-800" : "text-white"
            }`}
          >
            {Math.round(weatherData.current.temp_c)}°C
          </div>
          <p
            className={`font-medium ${
              isDayTheme ? "text-gray-600" : "text-gray-300"
            }`}
          >
            {weatherData.current.condition.text}
          </p>
          <p
            className={`text-sm mt-1 ${
              isDayTheme ? "text-gray-500" : "text-gray-400"
            }`}
          >
            {weatherData.location.name}, {weatherData.location.country}
          </p>
        </div>

        <div
          className={`grid grid-cols-2 gap-4 pt-4 border-t ${
            isDayTheme ? "border-red-100" : "border-purple-400/30"
          }`}
        >
          <div className="text-center">
            <Thermometer
              className={`w-5 h-5 mx-auto mb-1 ${
                isDayTheme ? "text-red-500" : "text-purple-400"
              }`}
            />
            <p
              className={`text-xs ${
                isDayTheme ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Feels like
            </p>
            <p
              className={`font-semibold ${
                isDayTheme ? "text-gray-700" : "text-gray-200"
              }`}
            >
              {Math.round(weatherData.current.feelslike_c)}°C
            </p>
          </div>
          <div className="text-center">
            <div className="w-5 h-5 bg-blue-400 rounded-full mx-auto mb-1" />
            <p
              className={`text-xs ${
                isDayTheme ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Humidity
            </p>
            <p
              className={`font-semibold ${
                isDayTheme ? "text-gray-700" : "text-gray-200"
              }`}
            >
              {weatherData.current.humidity}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
