export interface EmailItem {
  id: string;
  sender: string;
  subject: string;
  unread: boolean;
}

export interface CalendarEvent {
  id: string;
  time: string;
  title: string;
}

export interface TeamsContact {
  id: string;
  name: string;
  status: "available" | "busy" | "away" | "offline";
}
