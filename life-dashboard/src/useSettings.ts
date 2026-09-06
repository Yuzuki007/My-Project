import { useEffect, useState } from "react";
import type { Settings, Theme, WidgetId } from "./types";

const STORAGE_KEY = "sync365-settings";

const defaultWidgetOrder: WidgetId[] = [
  "workEmail",
  "personalEmail",
  "workCalendar",
  "personalCalendar",
  "teams",
  "linkedin",
  "messenger",
  "gmaNews",
  "cnn",
  "weather",
];

const defaultSettings: Settings = {
  theme: "system",
  widgetVisibility: {
    workEmail: true,
    personalEmail: true,
    workCalendar: true,
    personalCalendar: true,
    teams: true,
    linkedin: true,
    messenger: true,
    gmaNews: true,
    cnn: true,
    weather: true,
  },
  widgetOrder: defaultWidgetOrder,
};

function mergeWidgetOrder(stored: unknown): WidgetId[] {
  const storedOrder = Array.isArray(stored) ? (stored as WidgetId[]) : [];
  const knownIds = new Set(defaultWidgetOrder);
  const validStoredOrder = storedOrder.filter((id) => knownIds.has(id));
  const missingIds = defaultWidgetOrder.filter(
    (id) => !validStoredOrder.includes(id)
  );
  return [...validStoredOrder, ...missingIds];
}

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;
    const parsed = JSON.parse(raw);
    return {
      theme: parsed.theme ?? defaultSettings.theme,
      widgetVisibility: {
        ...defaultSettings.widgetVisibility,
        ...parsed.widgetVisibility,
      },
      widgetOrder: mergeWidgetOrder(parsed.widgetOrder),
    };
  } catch {
    return defaultSettings;
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(loadSettings);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // localStorage unavailable (private browsing, etc.) - settings just won't persist
    }
  }, [settings]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", settings.theme);
  }, [settings.theme]);

  function setTheme(theme: Theme) {
    setSettings((prev) => ({ ...prev, theme }));
  }

  function toggleWidget(id: WidgetId) {
    setSettings((prev) => ({
      ...prev,
      widgetVisibility: {
        ...prev.widgetVisibility,
        [id]: !prev.widgetVisibility[id],
      },
    }));
  }

  function setWidgetOrder(order: WidgetId[]) {
    setSettings((prev) => ({ ...prev, widgetOrder: order }));
  }

  return { settings, setTheme, toggleWidget, setWidgetOrder };
}
