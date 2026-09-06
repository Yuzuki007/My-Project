import { useEffect, useState } from "react";
import type { ForecastHour, SkyCondition, WeatherData } from "./types";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const CITY = import.meta.env.VITE_WEATHER_CITY || "New York";

interface UseWeatherResult {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

function toSkyCondition(main: string): SkyCondition {
  switch (main) {
    case "Clear":
      return "sunny";
    case "Rain":
    case "Drizzle":
      return "rainy";
    case "Thunderstorm":
      return "thunderstorm";
    default:
      return "cloudy";
  }
}

function formatHour(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toLocaleTimeString([], {
    hour: "numeric",
  });
}

export function useWeather(): UseWeatherResult {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!API_KEY) {
      setError("Missing API key — add VITE_OPENWEATHER_API_KEY to .env.local");
      setLoading(false);
      return;
    }

    const cityParam = encodeURIComponent(CITY);
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityParam}&units=metric&appid=${API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityParam}&units=metric&appid=${API_KEY}`;

    let cancelled = false;

    Promise.all([fetch(currentUrl), fetch(forecastUrl)])
      .then(async ([currentRes, forecastRes]) => {
        if (!currentRes.ok) throw new Error(`Weather API error (${currentRes.status})`);
        if (!forecastRes.ok) throw new Error(`Forecast API error (${forecastRes.status})`);
        return Promise.all([currentRes.json(), forecastRes.json()]);
      })
      .then(([current, forecast]) => {
        if (cancelled) return;

        // The forecast API returns 3-hour steps, so the next two entries
        // cover roughly the next 6 hours (not 6 separate hourly readings).
        const forecastHours: ForecastHour[] = (forecast.list ?? [])
          .slice(0, 2)
          .map((entry: { dt: number; weather: { main: string }[] }) => ({
            id: String(entry.dt),
            time: formatHour(entry.dt),
            sky: toSkyCondition(entry.weather?.[0]?.main ?? ""),
          }));

        setData({
          location: current.name,
          condition: current.weather?.[0]?.description ?? "Unknown",
          tempC: Math.round(current.main.temp),
          highC: Math.round(current.main.temp_max),
          lowC: Math.round(current.main.temp_min),
          forecast: forecastHours,
        });
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
