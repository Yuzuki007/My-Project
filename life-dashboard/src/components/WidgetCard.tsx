import type { ReactNode } from "react";

interface WidgetCardProps {
  title: string;
  icon: string;
  children: ReactNode;
}

export function WidgetCard({ title, icon, children }: WidgetCardProps) {
  return (
    <div className="widget-card">
      <div className="widget-card-header">
        <span className="widget-card-icon">{icon}</span>
        <h2>{title}</h2>
      </div>
      <div className="widget-card-body">{children}</div>
    </div>
  );
}
