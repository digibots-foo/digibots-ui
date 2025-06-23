import { events } from "../../lib/data/sampleData";
import EventForm from "../form/EventForm";
import EventCard from "./EventCard";
import { AppEvent } from "../../lib/types";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { select } from "motion/react-client";

type Props = {
  formOpen: boolean;
  setFormOpen: (open: boolean) => void;
  formToggle: (event: AppEvent) => void;
  selectedEvent: AppEvent | null;
};

export default function EventDashboard({
  formOpen,
  setFormOpen,
  formToggle,
  selectedEvent,
}: Props) {
  const [appEvents, setAppEvents] = useState<AppEvent[]>(events);

  const handleCreateEvent = (newEvent: AppEvent) => {
    setAppEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  useEffect(() => {
    setAppEvents(events);

    return () => {
      // Cleanup if necessary
      setAppEvents([]);
    };
  }, []);
  return (
    <div className="flex flex-row w-full gap-6">
      <div className="w-3/5 flex flex-col gap-4">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className=" flex flex-col gap-4">
              {appEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  formToggle={formToggle}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="w-2/5 overflow-hidden">
        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <EventForm
                key={selectedEvent?.id || "new-event-form"}
                setFormOpen={setFormOpen}
                createEvent={handleCreateEvent}
                selectedEvent={selectedEvent}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
