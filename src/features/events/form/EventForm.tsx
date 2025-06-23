import type { AppEvent } from "../../lib/types";
import { users } from "../../lib/data/sampleData";
import { u } from "motion/react-client";

type Props = {
  setFormOpen: (open: boolean) => void;
  createEvent: (event: AppEvent) => void;
  selectedEvent?: AppEvent | null;
  updateEvent?: (event: AppEvent) => void;
};
export default function EventForm({
  setFormOpen,
  createEvent,
  selectedEvent,
  updateEvent,
}: Props) {
  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };
  // create an event
  const onSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries()) as unknown as AppEvent;

    if (selectedEvent) {
      updateEvent?.({
        ...selectedEvent,
        ...data,
      });
      setFormOpen(false);
      return;
    } else {
      createEvent({
        ...data,
        id: crypto.randomUUID(),
        hostUid: users[0].uid,
        attendees: [
          {
            id: users[0].uid,
            displayName: users[0].displayName,
            photoURL: users[0].photoURL,
          },
        ],
      });
      setFormOpen(false);
    }
  };

  return (
    <div className="card bg-base-100 p-4 flex flex-col gap-3 w-full">
      <h3 className="text-2xl font-semibold text-center text-primary">
        {selectedEvent ? "Edit Event" : "Create Event"}
      </h3>
      <form action={onSubmit} className="flex flex-col gap-3 w-full">
        <input
          defaultValue={initialValues.title}
          name="title"
          type="text"
          placeholder="Event Name"
          className="input input-lg w-full"
        />
        <input
          defaultValue={initialValues.category}
          name="category"
          type="text"
          placeholder="Category"
          className="input input-lg w-full"
        />
        <textarea
          defaultValue={initialValues.description}
          name="description"
          placeholder="Description"
          className="textarea textarea-lg w-full"
        ></textarea>

        <input
          defaultValue={
            initialValues.date
              ? new Date(initialValues.date).toISOString().slice(0, 16)
              : ""
          }
          name="date"
          type="datetime-local"
          placeholder="Date"
          className="input input-lg w-full"
        />
        <input
          defaultValue={initialValues.city}
          name="city"
          type="text"
          placeholder="City"
          className="input input-lg w-full"
        />
        <input
          defaultValue={initialValues.venue}
          name="venue"
          type="text"
          placeholder="Venue"
          className="input input-lg w-full"
        />
        <div className="flex justify-end w-full gap-3">
          <button
            onClick={() => setFormOpen(false)}
            type="button"
            className="btn btn-neutral"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
