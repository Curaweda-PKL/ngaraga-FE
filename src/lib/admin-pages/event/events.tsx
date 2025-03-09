import { useState, useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, Search, Trash2 } from "lucide-react";
import { SERVER_URL } from "@/middleware/utils";
import EventsTable from "./EventsTable";
import ClaimLinkModal from "./ClaimLinkModal";

// Define interfaces for typed state
export interface EventItem {
  id: string;
  name: string;
  schedule: string;
  type: string;
  image: string;
  isSuspended: boolean;
}

export interface Notification {
  type: "success" | "error";
  message: string;
}

export interface CardReward {
  id: string | number;
  name: string;
}

export const Events: FC = () => {
  // --- States for Events List ---
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // --- Notification state ---
  const [notification, setNotification] = useState<Notification | null>(null);

  // --- Modal state for generating a Claim Link / QR ---
  const [claimLinkModalOpen, setClaimLinkModalOpen] = useState<boolean>(false);
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [generatedQRCode, setGeneratedQRCode] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // --- State for Cards (for the select option) ---
  const [cardRewards, setCardRewards] = useState<CardReward[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | number>("");

  // --- Fetch Events ---
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/events/admin`)
      .then((response) => {
        const fetchedEvents: EventItem[] = response.data.map((event: any) => ({
          id: event.id,
          name: event.eventName,
          schedule: `${new Date(event.eventTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })} on ${new Date(event.eventDate).toLocaleDateString()}`,
          type: event.eventType || "Unknown",
          image: event.eventImage,
          isSuspended:
            event.isSuspended === true || event.isSuspensed === true,
        }));
        setEvents(fetchedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  // --- Fetch Cards for the Generate Claim Link modal ---
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/cards/all`)
      .then((response) => {
        const cardsData = response.data.cards;
        const mappedCards: CardReward[] = cardsData.map((card: any) => ({
          id: card.id,
          name: card.name,
        }));
        setCardRewards(mappedCards);
        if (mappedCards.length > 0) {
          setSelectedCardId(mappedCards[0].id);
        }
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
      });
  }, []);

  // --- Reset current page when search query changes ---
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // --- Auto-clear notifications after 3 seconds ---
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // --- Pagination and Filtering ---
  const filteredEvents: EventItem[] = events.filter((event) =>
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

  // --- Handlers for Event selection, deletion, etc. ---
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
      .delete(`${SERVER_URL}/api/events/${id}`)
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
        axios.delete(`${SERVER_URL}/api/events/${id}`)
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

  // --- Handler: Toggle suspend/unsuspend event ---
  const handleToggleSuspend = (event: EventItem) => {
    const action = event.isSuspended ? "unsuspend" : "suspend";
    const url = `${SERVER_URL}/api/events/${event.id}/${action}`;
    axios
      .put(url)
      .then(() => {
        setEvents((prevEvents) =>
          prevEvents.map((ev) =>
            ev.id === event.id
              ? { ...ev, isSuspended: action === "suspend" }
              : ev
          )
        );
        setNotification({
          type: "success",
          message: `Event ${
            action === "suspend" ? "suspended" : "unsuspended"
          } successfully.`,
        });
      })
      .catch((error) => {
        console.error("Error updating event suspension:", error);
        setNotification({
          type: "error",
          message: "Error updating event suspension.",
        });
      });
  };

  // --- Handler: Generate Claim Link using the new endpoint ---
  const handleGenerateClaim = () => {
    if (!selectedCardId) return;
    setIsGenerating(true);
    axios
      .post(
        `${SERVER_URL}/api/cardRewards/${selectedCardId}/generateClaimLink`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        const claimUrl = response.data.claimUrl;
        setGeneratedLink(claimUrl);
        setGeneratedQRCode(claimUrl);
      })
      .catch((error) => {
        console.error("Error generating claim link:", error);
      })
      .finally(() => {
        setIsGenerating(false);
      });
  };

  // --- Handler: Copy the generated link to clipboard ---
  const handleCopyLink = () => {
    if (!generatedLink) return;
    navigator.clipboard
      .writeText(generatedLink)
      .then(() => {
        setNotification({
          type: "success",
          message: "Link copied to clipboard!",
        });
      })
      .catch((error) => {
        console.error("Copy failed:", error);
        setNotification({
          type: "error",
          message: "Failed to copy link.",
        });
      });
  };

  // --- Handler: Open Claim Link Modal (reset modal states as needed) ---
  const handleOpenClaimModal = () => {
    setSelectedCardId("");
    setClaimLinkModalOpen(true);
    setGeneratedLink("");
    setGeneratedQRCode("");
  };

  return (
    <div className="p-6">
      {/* Notification Message */}
      {notification && (
        <div
          title="Notification"
          className={`p-4 mb-4 text-sm rounded ${
            notification.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Breadcrumb */}
      <div
        className="flex items-center text-sm text-gray-500 mb-4"
        title="Breadcrumb"
      >
        <span>Events</span>
        <span className="mx-2">/</span>
        <span>Event List</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6" title="Event List Header">
        Event List
      </h1>

      {/* Top Buttons */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            title="Add new event"
            className="bg-call-to-actions-900 hover:bg-call-to-actions-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={() => navigate("/admin/add-event")}
          >
            <span title="Add">
              <Plus className="w-4 h-4" />
            </span>
            <span>Add Events</span>
          </button>
          {allSelected && (
            <button
              title="Delete selected events"
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              onClick={handleDeleteSelected}
            >
              <span title="Delete">
                <Trash2 className="w-4 h-4" />
              </span>
              <span>Delete Selected</span>
            </button>
          )}
        </div>

        {/* Search Input */}
        <div className="relative" title="Search events">
          <input
            type="text"
            placeholder="Search and enter"
            className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span title="Search">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </span>
        </div>
      </div>

      {/* Events Table */}
      <EventsTable
        events={currentEvents}
        selectedEvents={selectedEvents}
        allSelected={allSelected}
        onSelectAll={handleSelectAll}
        onSelectEvent={handleSelectEvent}
        onDeleteEvent={handleDeleteEvent}
        onToggleSuspend={handleToggleSuspend}
        onOpenClaimModal={handleOpenClaimModal}
        navigate={navigate}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Claim Link Modal */}
      {claimLinkModalOpen && (
        <ClaimLinkModal
          cardRewards={cardRewards}
          selectedCardId={selectedCardId}
          setSelectedCardId={setSelectedCardId}
          generatedLink={generatedLink}
          generatedQRCode={generatedQRCode}
          isGenerating={isGenerating}
          onGenerateClaim={handleGenerateClaim}
          onCopyLink={handleCopyLink}
          onClose={() => setClaimLinkModalOpen(false)}
        />
      )}
    </div>
  );
};

