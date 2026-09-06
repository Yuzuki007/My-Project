import type { ReactNode } from "react";
import type { NewsItem } from "../types";
import { WidgetCard } from "./WidgetCard";

interface NewsWidgetProps {
  title: string;
  icon: ReactNode;
  headlines: NewsItem[];
  loading?: boolean;
  error?: string | null;
  onClick?: () => void;
}

export function NewsWidget({ title, icon, headlines, loading, error, onClick }: NewsWidgetProps) {
  return (
    <WidgetCard title={title} icon={icon} onClick={onClick}>
      {loading && <p className="widget-summary">Loading…</p>}
      {error && !loading && <p className="widget-summary">{error}</p>}
      {!loading && !error && (
        <ul className="widget-list">
          {headlines.map((item) => (
            <li key={item.id}>
              <span className="news-category">{item.category}</span> —{" "}
              {item.headline}
            </li>
          ))}
        </ul>
      )}
    </WidgetCard>
  );
}
