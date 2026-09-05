import messengerLogo from "../assets/messenger-logo.png";
import { LogoIcon } from "./LogoIcon";
import { WidgetCard } from "./WidgetCard";

interface MessengerWidgetProps {
  onClick?: () => void;
}

export function MessengerWidget({ onClick }: MessengerWidgetProps) {
  return (
    <WidgetCard title="Messenger" icon={<LogoIcon src={messengerLogo} alt="Messenger" />} onClick={onClick}>
      <p className="widget-summary">
        Meta's Messenger API doesn't grant third-party apps access to
        personal chats, so this widget just launches Messenger instead of
        showing fake data.
      </p>
      <a
        className="widget-launch-link"
        href="https://www.messenger.com/"
        target="_blank"
        rel="noreferrer"
        onClick={(event) => event.stopPropagation()}
      >
        Open Messenger →
      </a>
    </WidgetCard>
  );
}
