import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Search, MessageSquare, Edit, Eye, Trash2 } from "lucide-react";
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
    }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/events")
      .then((response) => {
        // Transform API data to match the UI structure
        const fetchedEvents = response.data.map((event: any) => ({
          id: event.id,
          name: event.eventName,
          schedule: `${new Date(event.eventTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })} on ${new Date(event.eventDate).toLocaleDateString()}`,
          type: event.offlineLocation || event.onlineZoomLink || "Unknown",
          image: event.eventImage,
        }));
        setEvents(fetchedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  // Reset to first page whenever search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Filter events based on the search query (case-insensitive)
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  // Slice the filtered events to only show the events for the current page
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Check if all events on the current page are selected
  const allSelected =
    currentEvents.length > 0 &&
    currentEvents.every((event) => selectedEvents.includes(event.id));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // Add current page events to selection (if not already selected)
      const newSelected = [...selectedEvents];
      currentEvents.forEach((event) => {
        if (!newSelected.includes(event.id)) {
          newSelected.push(event.id);
        }
      });
      setSelectedEvents(newSelected);
    } else {
      // Remove current page events from selection
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

  // Delete a single event using axios
  const handleDeleteEvent = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }
    axios
      .delete(`http://localhost:3000/api/events/${id}`)
      .then(() => {
        // Remove the deleted event from state
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== id)
        );
        // Also remove it from selected events if it was selected
        setSelectedEvents((prevSelected) =>
          prevSelected.filter((eventId) => eventId !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  // Delete all selected events
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
        // Remove all deleted events from the state
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
    // Generate a button for each page
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
              <th className="p-4 text-left font-medium">Events Location</th>
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
                    onChange={(e) =>
                      handleSelectEvent(event.id, e.target.checked)
                    }
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`http://localhost:3000/uploads/event/${event.image}`} // Updated code with the prefix
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
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      onClick={() => navigate("/admin/add-event")}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <Eye className="w-4 h-4" />
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
    </div>
  );
};
