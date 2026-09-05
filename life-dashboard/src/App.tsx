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
import gmailLogo from "./assets/gmail-logo.png";
import googleCalendarLogo from "./assets/google-calendar-logo.png";
import msnLogo from "./assets/msn-logo.png";
import outlookLogo from "./assets/outlook-logo.png";
import { CalendarWidget } from "./components/CalendarWidget";
import { EmailWidget } from "./components/EmailWidget";
import { LinkedInWidget } from "./components/LinkedInWidget";
import { LogoIcon } from "./components/LogoIcon";
import { Modal } from "./components/Modal";
import { NewsWidget } from "./components/NewsWidget";
import { SettingsPanel } from "./components/SettingsPanel";
import { SortableTile } from "./components/SortableTile";
import { TeamsWidget } from "./components/TeamsWidget";
import { WeatherWidget } from "./components/WeatherWidget";
import {
  cnnHeadlines,
  msnHeadlines,
  personalCalendar,
  personalEmails,
  teamsContacts,
  weatherMock,
  workCalendar,
  workEmails,
} from "./mockData";
import type { WidgetId } from "./types";
import { useSettings } from "./useSettings";

const widgetLabels: Record<WidgetId, string> = {
  workEmail: "Work Email",
  personalEmail: "Personal Email",
  workCalendar: "Outlook Calendar",
  personalCalendar: "Personal Calendar",
  teams: "Teams",
  linkedin: "LinkedIn",
  msn: "MSN",
  cnn: "CNN",
  weather: "Weather",
};

function App() {
  const { settings, setTheme, toggleWidget, setWidgetOrder } = useSettings();
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
      case "msn":
        return (
          <NewsWidget
            title="MSN"
            icon={<LogoIcon src={msnLogo} alt="MSN" />}
            headlines={msnHeadlines}
            onClick={onClick}
          />
        );
      case "cnn":
        return (
          <NewsWidget
            title="CNN"
            icon={<LogoIcon src={cnnLogo} alt="CNN" />}
            headlines={cnnHeadlines}
            onClick={onClick}
          />
        );
      case "weather":
        return <WeatherWidget weather={weatherMock} onClick={onClick} />;
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
