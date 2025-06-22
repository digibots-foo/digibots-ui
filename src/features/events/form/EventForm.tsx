type Props = {
  setFormOpen: (open: boolean) => void;
};
export default function EventForm({ setFormOpen }: Props) {
  return (
    <div className="card bg-base-100 p-4 flex flex-col gap-3 w-full">
      <h3 className="text-2xl font-semibold text-center text-primary">
        Create New Event
      </h3>
      <form className="flex flex-col gap-3 w-full">
        <input
          type="text"
          placeholder="Event Name"
          className="input input-lg w-full"
        />
        <input
          type="text"
          placeholder="Category"
          className="input input-lg w-full"
        />
        <textarea
          placeholder="Description"
          className="textarea textarea-lg w-full"
        ></textarea>

        <input
          type="text"
          placeholder="Date"
          className="input input-lg w-full"
        />
        <input
          type="text"
          placeholder="City"
          className="input input-lg w-full"
        />
        <input
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
