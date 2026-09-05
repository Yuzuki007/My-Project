import type { KeyboardEvent, ReactNode } from "react";

interface WidgetCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}

export function WidgetCard({ title, icon, children, onClick }: WidgetCardProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!onClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  }

  return (
    <div
      className={onClick ? "widget-card clickable" : "widget-card"}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="widget-card-header">
        <span className="widget-card-icon">{icon}</span>
        <h2>{title}</h2>
      </div>
      <div className="widget-card-body">{children}</div>
    </div>
  );
}
