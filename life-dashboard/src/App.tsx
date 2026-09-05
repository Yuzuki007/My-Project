import "./App.css";
import { CalendarWidget } from "./components/CalendarWidget";
import { EmailWidget } from "./components/EmailWidget";
import { LinkedInWidget } from "./components/LinkedInWidget";
import { TeamsWidget } from "./components/TeamsWidget";
import {
  personalCalendar,
  personalEmails,
  teamsContacts,
  workCalendar,
  workEmails,
} from "./mockData";

function App() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>My Workspace</h1>
        <p>All mock data for now — real integrations come later.</p>
      </header>
      <div className="widget-grid">
        <EmailWidget title="Work Email" emails={workEmails} />
        <EmailWidget title="Personal Email" emails={personalEmails} />
        <CalendarWidget title="Work Calendar" events={workCalendar} />
        <CalendarWidget title="Personal Calendar" events={personalCalendar} />
        <TeamsWidget contacts={teamsContacts} />
        <LinkedInWidget />
      </div>
    </div>
  );
}

export default App;
