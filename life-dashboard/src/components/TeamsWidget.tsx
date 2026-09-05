import type { TeamsContact } from "../types";
import { WidgetCard } from "./WidgetCard";

interface TeamsWidgetProps {
  contacts: TeamsContact[];
}

const statusColors: Record<TeamsContact["status"], string> = {
  available: "#3ba55d",
  busy: "#d83b01",
  away: "#f0b132",
  offline: "#8a8a8a",
};

export function TeamsWidget({ contacts }: TeamsWidgetProps) {
  return (
    <WidgetCard title="Teams" icon="💬">
      <ul className="widget-list">
        {contacts.map((contact) => (
          <li key={contact.id}>
            <span
              className="status-dot"
              style={{ backgroundColor: statusColors[contact.status] }}
            />
            {contact.name} — {contact.status}
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
