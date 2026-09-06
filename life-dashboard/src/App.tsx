import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";
import "./App.css";
import cnnLogo from "./assets/cnn-logo.png";
import gmaNewsLogo from "./assets/gma-news-logo.png";
import gmailLogo from "./assets/gmail-logo.png";
import googleCalendarLogo from "./assets/google-calendar-logo.png";
import outlookLogo from "./assets/outlook-logo.png";
import { CalendarWidget } from "./components/CalendarWidget";
import { EmailWidget } from "./components/EmailWidget";
import { LinkedInWidget } from "./components/LinkedInWidget";
import { LogoIcon } from "./components/LogoIcon";
import { MessengerWidget } from "./components/MessengerWidget";
import { Modal } from "./components/Modal";
import { NewsWidget } from "./components/NewsWidget";
import { SettingsPanel } from "./components/SettingsPanel";
import { SortableTile } from "./components/SortableTile";
import { TeamsWidget } from "./components/TeamsWidget";
import { WeatherWidget } from "./components/WeatherWidget";
import {
  personalCalendar,
  personalEmails,
  teamsContacts,
  workCalendar,
  workEmails,
} from "./mockData";
import type { WidgetId } from "./types";
import { useCnnNews } from "./useCnnNews";
import { useGmaNews } from "./useGmaNews";
import { useSettings } from "./useSettings";
import { useWeather } from "./useWeather";

const widgetLabels: Record<WidgetId, string> = {
  workEmail: "Work Email",
  personalEmail: "Personal Email",
  workCalendar: "Outlook Calendar",
  personalCalendar: "Personal Calendar",
  teams: "Teams",
  linkedin: "LinkedIn",
  messenger: "Messenger",
  gmaNews: "GMA News",
  cnn: "CNN",
  weather: "Weather",
};

function App() {
  const { settings, setTheme, toggleWidget, setWidgetOrder } = useSettings();
  const weather = useWeather();
  const cnnNews = useCnnNews();
  const gmaNews = useGmaNews();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [expandedWidget, setExpandedWidget] = useState<WidgetId | null>(null);
  const [activeId, setActiveId] = useState<WidgetId | null>(null);
  const isVisible = (id: WidgetId) => settings.widgetVisibility[id];
  const visibleOrder = settings.widgetOrder.filter(isVisible);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  function renderWidget(id: WidgetId, onClick?: () => void) {
    switch (id) {
      case "workEmail":
        return (
          <EmailWidget
            title="Work Email"
            icon={<LogoIcon src={outlookLogo} alt="Outlook" />}
            emails={workEmails}
            onClick={onClick}
          />
        );
      case "personalEmail":
        return (
          <EmailWidget
            title="Personal Email"
            icon={<LogoIcon src={gmailLogo} alt="Gmail" />}
            emails={personalEmails}
            onClick={onClick}
          />
        );
      case "workCalendar":
        return (
          <CalendarWidget
            title="Outlook Calendar"
            icon={<LogoIcon src={outlookLogo} alt="Outlook" />}
            events={workCalendar}
            onClick={onClick}
          />
        );
      case "personalCalendar":
        return (
          <CalendarWidget
            title="Personal Calendar"
            icon={<LogoIcon src={googleCalendarLogo} alt="Google Calendar" />}
            events={personalCalendar}
            onClick={onClick}
          />
        );
      case "teams":
        return <TeamsWidget contacts={teamsContacts} onClick={onClick} />;
      case "linkedin":
        return <LinkedInWidget onClick={onClick} />;
      case "messenger":
        return <MessengerWidget onClick={onClick} />;
      case "gmaNews":
        return (
          <NewsWidget
            title="GMA News"
            icon={<LogoIcon src={gmaNewsLogo} alt="GMA News" />}
            headlines={gmaNews.headlines}
            loading={gmaNews.loading}
            error={gmaNews.error}
            onClick={onClick}
          />
        );
      case "cnn":
        return (
          <NewsWidget
            title="CNN"
            icon={<LogoIcon src={cnnLogo} alt="CNN" />}
            headlines={cnnNews.headlines}
            loading={cnnNews.loading}
            error={cnnNews.error}
            onClick={onClick}
          />
        );
      case "weather":
        return (
          <WeatherWidget
            weather={weather.data}
            loading={weather.loading}
            error={weather.error}
            onClick={onClick}
          />
        );
    }
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as WidgetId);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (!over || active.id === over.id) return;

    const oldIndex = visibleOrder.indexOf(active.id as WidgetId);
    const newIndex = visibleOrder.indexOf(over.id as WidgetId);
    const reordered = arrayMove(visibleOrder, oldIndex, newIndex);
    const hidden = settings.widgetOrder.filter((id) => !isVisible(id));
    setWidgetOrder([...reordered, ...hidden]);
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Sync365</h1>
          <p>All mock data for now — real integrations come later.</p>
        </div>
        <button
          className="settings-btn"
          onClick={() => setSettingsOpen(true)}
        >
          ⚙ Settings
        </button>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={visibleOrder} strategy={rectSortingStrategy}>
          <div className="widget-grid">
            {visibleOrder.map((id) => (
              <SortableTile key={id} id={id}>
                {renderWidget(id, () => setExpandedWidget(id))}
              </SortableTile>
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeId ? (
            <div className="drag-overlay-tile">{renderWidget(activeId)}</div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {settingsOpen && (
        <SettingsPanel
          settings={settings}
          widgetLabels={widgetLabels}
          onSetTheme={setTheme}
          onToggleWidget={toggleWidget}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      {expandedWidget && (
        <Modal onClose={() => setExpandedWidget(null)}>
          {renderWidget(expandedWidget)}
        </Modal>
      )}
    </div>
  );
}

export default App;
