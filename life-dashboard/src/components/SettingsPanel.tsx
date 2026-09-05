import type { Settings, Theme, WidgetId } from "../types";

interface SettingsPanelProps {
  settings: Settings;
  widgetLabels: Record<WidgetId, string>;
  onSetTheme: (theme: Theme) => void;
  onToggleWidget: (id: WidgetId) => void;
  onClose: () => void;
}

const themeOptions: { value: Theme; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export function SettingsPanel({
  settings,
  widgetLabels,
  onSetTheme,
  onToggleWidget,
  onClose,
}: SettingsPanelProps) {
  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-panel-header">
          <h2>Settings</h2>
          <button className="settings-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <section className="settings-section">
          <h3>Theme</h3>
          <div className="theme-options">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                className={
                  settings.theme === option.value
                    ? "theme-option active"
                    : "theme-option"
                }
                onClick={() => onSetTheme(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        <section className="settings-section">
          <h3>Widgets</h3>
          <div className="widget-toggle-list">
            {(Object.keys(widgetLabels) as WidgetId[]).map((id) => (
              <label key={id} className="widget-toggle-row">
                <input
                  type="checkbox"
                  checked={settings.widgetVisibility[id]}
                  onChange={() => onToggleWidget(id)}
                />
                {widgetLabels[id]}
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
