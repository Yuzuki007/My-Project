import type { EmailItem } from "../types";
import { WidgetCard } from "./WidgetCard";

interface EmailWidgetProps {
  title: string;
  emails: EmailItem[];
}

export function EmailWidget({ title, emails }: EmailWidgetProps) {
  const unreadCount = emails.filter((email) => email.unread).length;

  return (
    <WidgetCard title={title} icon="📧">
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
