import { WidgetCard } from "./WidgetCard";

export function LinkedInWidget() {
  return (
    <WidgetCard title="LinkedIn" icon="💼">
      <p className="widget-summary">
        LinkedIn doesn't allow third-party apps to read messages, so this
        widget just launches LinkedIn instead of showing fake data.
      </p>
      <a
        className="widget-launch-link"
        href="https://www.linkedin.com/messaging/"
        target="_blank"
        rel="noreferrer"
      >
        Open LinkedIn Messages →
      </a>
    </WidgetCard>
  );
}
