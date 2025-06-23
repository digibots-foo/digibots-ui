// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { useState } from "react";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import Navbar from "./nav/Navbar";
import type { AppEvent } from "../../features/lib/types";

function App() {
  // const [count, setCount] = useState(0)
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  const handleFormToggle = (event: AppEvent) => {
    if (formOpen) {
      setFormOpen(false);
      setTimeout(() => {
        setSelectedEvent(event);
        setFormOpen(true);
      }, 300);
    } else {
      setSelectedEvent(event);
      setFormOpen(true);
    }
  };

  return (
    <div>
      <Navbar formToggle={handleFormToggle} />
      <div className="container mx-auto px-10 mt-24">
        <EventDashboard
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          formToggle={handleFormToggle}
          selectedEvent={selectedEvent}
        />
      </div>
    </div>
  );
}

export default App;
