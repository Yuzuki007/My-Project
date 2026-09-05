import teamsLogo from "../assets/teams-logo.png";
import type { TeamsContact } from "../types";
import { LogoIcon } from "./LogoIcon";
import { WidgetCard } from "./WidgetCard";

interface TeamsWidgetProps {
  contacts: TeamsContact[];
  onClick?: () => void;
}

const statusColors: Record<TeamsContact["status"], string> = {
  available: "#3ba55d",
  busy: "#d83b01",
  away: "#f0b132",
  offline: "#8a8a8a",
};

export function TeamsWidget({ contacts, onClick }: TeamsWidgetProps) {
  return (
    <WidgetCard title="Teams" icon={<LogoIcon src={teamsLogo} alt="Teams" />} onClick={onClick}>
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
