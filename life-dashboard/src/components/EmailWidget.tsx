import type { ReactNode } from "react";
import type { EmailItem } from "../types";
import { WidgetCard } from "./WidgetCard";

interface EmailWidgetProps {
  title: string;
  icon: ReactNode;
  emails: EmailItem[];
  onClick?: () => void;
}

export function EmailWidget({ title, icon, emails, onClick }: EmailWidgetProps) {
  const unreadCount = emails.filter((email) => email.unread).length;

  return (
    <WidgetCard title={title} icon={icon} onClick={onClick}>
      <p className="widget-summary">{unreadCount} unread</p>
      <ul className="widget-list">
        {emails.map((email) => (
          <li key={email.id} className={email.unread ? "unread" : ""}>
            <strong>{email.sender}</strong> — {email.subject}
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
