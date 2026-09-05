import linkedinLogo from "../assets/linkedin-logo.png";
import { LogoIcon } from "./LogoIcon";
import { WidgetCard } from "./WidgetCard";

interface LinkedInWidgetProps {
  onClick?: () => void;
}

export function LinkedInWidget({ onClick }: LinkedInWidgetProps) {
  return (
    <WidgetCard title="LinkedIn" icon={<LogoIcon src={linkedinLogo} alt="LinkedIn" />} onClick={onClick}>
      <p className="widget-summary">
        LinkedIn doesn't allow third-party apps to read messages, so this
        widget just launches LinkedIn instead of showing fake data.
      </p>
      <a
        className="widget-launch-link"
        href="https://www.linkedin.com/messaging/"
        target="_blank"
        rel="noreferrer"
        onClick={(event) => event.stopPropagation()}
      >
        Open LinkedIn Messages →
      </a>
    </WidgetCard>
  );
}
