import { Sun, Moon, Cloud, CloudRain, Snowflake } from "lucide-react";

interface WeatherIconProps {
  condition: string;
  isDay: boolean;
  className?: string;
}

export function WeatherIcon({
  condition,
  isDay,
  className = "w-16 h-16",
}: WeatherIconProps) {
  const conditionLower = condition.toLowerCase();

  if (conditionLower.includes("rain")) {
    return <CloudRain className={className} />;
  } else if (conditionLower.includes("snow")) {
    return <Snowflake className={className} />;
  } else if (conditionLower.includes("cloud")) {
    return <Cloud className={className} />;
  } else {
    return isDay ? (
      <Sun className={className} />
    ) : (
      <Moon className={className} />
    );
  }
}
