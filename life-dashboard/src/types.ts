export interface EmailItem {
  id: string;
  sender: string;
  subject: string;
  unread: boolean;
}

export interface CalendarEvent {
  id: string;
  time: string;
  title: string;
}

export interface TeamsContact {
  id: string;
  name: string;
  status: "available" | "busy" | "away" | "offline";
}

export interface NewsItem {
  id: string;
  headline: string;
  category: string;
}

export type SkyCondition = "sunny" | "cloudy" | "rainy" | "thunderstorm";

export interface ForecastHour {
  id: string;
  time: string;
  sky: SkyCondition;
}

export interface WeatherData {
  location: string;
  condition: string;
  tempC: number;
  highC: number;
  lowC: number;
  forecast: ForecastHour[];
}

export type WidgetId =
  | "workEmail"
  | "personalEmail"
  | "workCalendar"
  | "personalCalendar"
  | "teams"
  | "linkedin"
  | "gmaNews"
  | "cnn"
  | "weather"
  | "messenger";

export type Theme = "system" | "light" | "dark";

export interface Settings {
  theme: Theme;
  widgetVisibility: Record<WidgetId, boolean>;
  widgetOrder: WidgetId[];
}
