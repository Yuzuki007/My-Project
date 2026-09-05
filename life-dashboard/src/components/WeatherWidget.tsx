import type { WeatherData } from "../types";
import { WidgetCard } from "./WidgetCard";

interface WeatherWidgetProps {
  weather: WeatherData;
  onClick?: () => void;
}

export function WeatherWidget({ weather, onClick }: WeatherWidgetProps) {
  return (
    <WidgetCard title="Weather" icon="⛅" onClick={onClick}>
      <p className="weather-location">{weather.location}</p>
      <p className="weather-temp">{weather.tempF}°F</p>
      <p className="widget-summary">
        {weather.condition} — H:{weather.highF}° L:{weather.lowF}°
      </p>
    </WidgetCard>
  );
}
