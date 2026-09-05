import type { ReactNode } from "react";
import type { NewsItem } from "../types";
import { WidgetCard } from "./WidgetCard";

interface NewsWidgetProps {
  title: string;
  icon: ReactNode;
  headlines: NewsItem[];
  onClick?: () => void;
}

export function NewsWidget({ title, icon, headlines, onClick }: NewsWidgetProps) {
  return (
    <WidgetCard title={title} icon={icon} onClick={onClick}>
      <ul className="widget-list">
        {headlines.map((item) => (
          <li key={item.id}>
            <span className="news-category">{item.category}</span> —{" "}
            {item.headline}
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
