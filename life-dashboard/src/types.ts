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

export interface WeatherData {
  location: string;
  condition: string;
  tempF: number;
  highF: number;
  lowF: number;
}

export type WidgetId =
  | "workEmail"
  | "personalEmail"
  | "workCalendar"
  | "personalCalendar"
  | "teams"
  | "linkedin"
  | "msn"
  | "cnn"
  | "weather";

export type Theme = "system" | "light" | "dark";

export interface Settings {
  theme: Theme;
  widgetVisibility: Record<WidgetId, boolean>;
  widgetOrder: WidgetId[];
}
