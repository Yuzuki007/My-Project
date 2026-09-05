import type { CalendarEvent } from "../types";
import { WidgetCard } from "./WidgetCard";

interface CalendarWidgetProps {
  title: string;
  events: CalendarEvent[];
}

export function CalendarWidget({ title, events }: CalendarWidgetProps) {
  return (
    <WidgetCard title={title} icon="📅">
      <ul className="widget-list">
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.time}</strong> — {event.title}
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
