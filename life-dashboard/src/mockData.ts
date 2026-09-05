import type { CalendarEvent, EmailItem, TeamsContact } from "./types";

export const workEmails: EmailItem[] = [
  { id: "w1", sender: "Manager", subject: "Project update needed", unread: true },
  { id: "w2", sender: "IT Security", subject: "Password expiry reminder", unread: true },
  { id: "w3", sender: "Sarah", subject: "Meeting moved to 2pm", unread: false },
];

export const personalEmails: EmailItem[] = [
  { id: "p1", sender: "Amazon", subject: "Your order has shipped", unread: true },
  { id: "p2", sender: "Mom", subject: "Dinner on Sunday?", unread: false },
];

export const workCalendar: CalendarEvent[] = [
  { id: "wc1", time: "10:00", title: "Team standup" },
  { id: "wc2", time: "14:00", title: "Widget review" },
];

export const personalCalendar: CalendarEvent[] = [
  { id: "pc1", time: "13:00", title: "Dentist appointment" },
  { id: "pc2", time: "18:00", title: "Gym" },
];

export const teamsContacts: TeamsContact[] = [
  { id: "t1", name: "John", status: "available" },
  { id: "t2", name: "Sarah", status: "busy" },
  { id: "t3", name: "Mike", status: "away" },
];
