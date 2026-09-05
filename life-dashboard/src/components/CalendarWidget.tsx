import type { ReactNode } from "react";
import type { CalendarEvent } from "../types";
import { WidgetCard } from "./WidgetCard";

interface CalendarWidgetProps {
  title: string;
  icon: ReactNode;
  events: CalendarEvent[];
  onClick?: () => void;
}

export function CalendarWidget({ title, icon, events, onClick }: CalendarWidgetProps) {
  return (
    <WidgetCard title={title} icon={icon} onClick={onClick}>
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
