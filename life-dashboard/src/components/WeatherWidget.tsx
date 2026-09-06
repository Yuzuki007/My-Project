import type { SkyCondition, WeatherData } from "../types";
import { WidgetCard } from "./WidgetCard";

interface WeatherWidgetProps {
  weather: WeatherData | null;
  loading?: boolean;
  error?: string | null;
  onClick?: () => void;
}

const SKY_ICONS: Record<SkyCondition, string> = {
  sunny: "☀️",
  cloudy: "☁️",
  rainy: "🌧️",
  thunderstorm: "⛈️",
};

export function WeatherWidget({ weather, loading, error, onClick }: WeatherWidgetProps) {
  return (
    <WidgetCard title="Weather" icon="⛅" onClick={onClick}>
      {loading && <p className="widget-summary">Loading…</p>}
      {error && !loading && <p className="widget-summary">{error}</p>}
      {weather && !loading && !error && (
        <>
          <p className="weather-location">{weather.location}</p>
          <p className="weather-temp">{weather.tempC}°C</p>
          <p className="widget-summary">
            {weather.condition} — H:{weather.highC}° L:{weather.lowC}°
          </p>
          {weather.forecast.length > 0 && (
            <div className="weather-forecast">
              {weather.forecast.map((hour) => (
                <div key={hour.id} className="weather-forecast-hour">
                  <span className="weather-forecast-time">{hour.time}</span>
                  <span className="weather-forecast-icon">{SKY_ICONS[hour.sky]}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </WidgetCard>
  );
}
