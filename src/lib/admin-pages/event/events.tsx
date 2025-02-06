import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Search, Edit, Eye, EyeOff, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [events, setEvents] = useState<
    {
      id: string;
      name: string;
      schedule: string;
      type: string;
      image: string;
      isSuspended: boolean;
    }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Modal state for suspend/unsuspend actions
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEvent, setModalEvent] = useState<{
    id: string;
    name: string;
    isSuspended: boolean;
  } | null>(null);
  const [modalAction, setModalAction] = useState<"suspend" | "unsuspend">("suspend");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/events/admin")
      .then((response) => {
        // Correct the mapping to use the API's "isSuspensed" field
        const fetchedEvents = response.data.map((event: any) => ({
          id: event.id,
          name: event.eventName,
          schedule: `${new Date(event.eventTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })} on ${new Date(event.eventDate).toLocaleDateString()}`,
          type: event.eventType || "Unknown",
          image: event.eventImage,
          // Use "isSuspensed" from the API and convert it to a boolean if needed
          isSuspended: event.isSuspensed === true,
        }));
        setEvents(fetchedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  // Reset current page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const allSelected =
    currentEvents.length > 0 &&
    currentEvents.every((event) => selectedEvents.includes(event.id));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSelected = [...selectedEvents];
      currentEvents.forEach((event) => {
        if (!newSelected.includes(event.id)) {
          newSelected.push(event.id);
        }
      });
      setSelectedEvents(newSelected);
    } else {
      const newSelected = selectedEvents.filter(
        (id) => !currentEvents.some((event) => event.id === id)
      );
      setSelectedEvents(newSelected);
    }
  };

  const handleSelectEvent = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedEvents((prev) => [...prev, id]);
    } else {
      setSelectedEvents((prev) => prev.filter((eventId) => eventId !== id));
    }
  };

  const handleDeleteEvent = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }
    axios
      .delete(`http://localhost:3000/api/events/${id}`)
      .then(() => {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== id)
        );
        setSelectedEvents((prevSelected) =>
          prevSelected.filter((eventId) => eventId !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  const handleDeleteSelected = () => {
    if (selectedEvents.length === 0) return;
    if (!window.confirm("Are you sure you want to delete selected events?")) {
      return;
    }
    Promise.all(
      selectedEvents.map((id) =>
        axios.delete(`http://localhost:3000/api/events/${id}`)
      )
    )
      .then(() => {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => !selectedEvents.includes(event.id))
        );
        setSelectedEvents([]);
      })
      .catch((error) => {
        console.error("Error deleting selected events:", error);
      });
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let page = 1; page <= totalPages; page++) {
      buttons.push(
        <button
          key={page}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? "bg-yellow-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      );
    }
    return buttons;
  };

  const openSuspendModal = (event: { id: string; name: string; isSuspended: boolean }) => {
    setModalEvent(event);
    setModalAction(event.isSuspended ? "unsuspend" : "suspend");
    setModalOpen(true);
  };

  const handleSuspendUnsuspend = () => {
    if (!modalEvent) return;
    const url = `http://localhost:3000/api/events/${modalEvent.id}/${modalAction}`;
    axios
      .put(url)
      .then(() => {
        setEvents((prevEvents) =>
          prevEvents.map((ev) =>
            ev.id === modalEvent.id ? { ...ev, isSuspended: modalAction === "suspend" } : ev
          )
        );
      })
      .catch((error) => {
        console.error("Error updating event suspension:", error);
      })
      .finally(() => {
        setModalOpen(false);
        setModalEvent(null);
      });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalEvent(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>Events</span>
        <span className="mx-2">/</span>
        <span>Event List</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Event List</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            className="bg-call-to-actions-900 hover:bg-call-to-actions-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={() => navigate("/admin/add-event")}
          >
            <Plus className="w-4 h-4" />
            <span> Add Events</span>
          </button>
          <button
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={handleDeleteSelected}
            disabled={selectedEvents.length === 0}
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Selected</span>
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search and enter"
            className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={allSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="p-4 text-left font-medium">Events Name</th>
              <th className="p-4 text-left font-medium">Schedule</th>
              <th className="p-4 text-left font-medium">Events Type</th>
              <th className="p-4 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.map((event) => (
              <tr key={event.id} className="border-b">
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedEvents.includes(event.id)}
                    onChange={(e) => handleSelectEvent(event.id, e.target.checked)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`http://localhost:3000/uploads/event/${event.image}`}
                      alt={event.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="font-medium">{event.name}</span>
                  </div>
                </td>
                <td className="p-4">{event.schedule}</td>
                <td className="p-4">{event.type}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      onClick={() => navigate("/admin/add-event")}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      onClick={() => navigate(`/admin/edit-event/${event.id}`)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      onClick={() => openSuspendModal(event)}
                    >
                      {event.isSuspended ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {currentEvents.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 gap-1">
        {renderPaginationButtons()}
        {totalPages > 0 && (
          <>
            <button
              className="px-3 py-1 rounded text-gray-600 hover:bg-gray-100"
              onClick={() =>
                currentPage > 1 && setCurrentPage((prev) => prev - 1)
              }
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              className="px-3 py-1 rounded text-gray-600 hover:bg-gray-100"
              onClick={() =>
                currentPage < totalPages && setCurrentPage((prev) => prev + 1)
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </>
        )}
      </div>

      {/* Modal for Suspend/Unsuspend Confirmation */}
      {modalOpen && modalEvent && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={handleCloseModal}
          ></div>
          <div className="bg-white rounded-lg shadow-lg z-10 p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">
              {modalAction === "suspend" ? "Suspend Event" : "Unsuspend Event"}
            </h2>
            <p className="mb-6">
              Are you sure you want to {modalAction} the event{" "}
              <span className="font-medium">{modalEvent.name}</span>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                onClick={handleSuspendUnsuspend}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
