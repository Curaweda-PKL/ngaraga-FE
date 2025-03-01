import {useState, useEffect, useRef} from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import {
  Plus,
  Search,
  Edit,
  Eye,
  EyeOff,
  Trash2,
  Link2,
  User,
} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {SERVER_URL} from "@/middleware/utils";

export const Events = () => {
  // --- States for Events List ---
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

  // --- Notification state for success/error messages ---
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // --- New modal state for Generating a Claim Link / QR ---
  const [claimLinkModalOpen, setClaimLinkModalOpen] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [generatedQRCode, setGeneratedQRCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // --- New state for Cards (for the select option) ---
  const [cardRewards, setCardRewards] = useState<
    {id: string | number; name: string}[]
  >([]);
  const [selectedCardId, setSelectedCardId] = useState<string | number>("");

  // --- Ref for QR Code element (for downloading) ---
  const qrRef = useRef(null);

  // --- Fetch Events ---
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/events/admin`)
      .then((response) => {
        const fetchedEvents = response.data.map((event: any) => ({
          id: event.id,
          name: event.eventName,
          schedule: `${new Date(event.eventTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })} on ${new Date(event.eventDate).toLocaleDateString()}`,
          type: event.eventType || "Unknown",
          image: event.eventImage,
          isSuspended: event.isSuspended === true || event.isSuspensed === true,
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
        const mappedCards = cardsData.map((card: any) => ({
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
      selectedEvents.map((id) => axios.delete(`${SERVER_URL}/api/events/${id}`))
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

  // --- New Handler: Directly toggle suspend/unsuspend without modal ---
  const handleToggleSuspend = (event: {
    id: string;
    name: string;
    isSuspended: boolean;
  }) => {
    const action = event.isSuspended ? "unsuspend" : "suspend";
    const url = `${SERVER_URL}/api/events/${event.id}/${action}`;
    axios
      .put(url)
      .then(() => {
        setEvents((prevEvents) =>
          prevEvents.map((ev) =>
            ev.id === event.id ? {...ev, isSuspended: action === "suspend"} : ev
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

  // --- New Handler: Generate Claim Link for the selected card ---
  const handleGenerateClaimLink = () => {
    if (!selectedCardId) return;
    setIsGenerating(true);
    axios
      .post(
        `${SERVER_URL}/api/cardRewards/${selectedCardId}/generateClaimLink`,
        {},
        {withCredentials: true}
      )
      .then((response) => {
        setGeneratedLink(response.data.claimUrl);
      })
      .catch((error) => {
        console.error("Error generating claim link:", error);
      })
      .finally(() => {
        setIsGenerating(false);
      });
  };

  // --- New Handler: Generate QR Code for the claim link ---
  const handleGenerateClaimQR = () => {
    if (!selectedCardId) return;
    setIsGenerating(true);
    axios
      .post(
        `${SERVER_URL}/api/cardRewards/${selectedCardId}/generateClaimLink`,
        {},
        {withCredentials: true}
      )
      .then((response) => {
        setGeneratedQRCode(response.data.claimUrl);
      })
      .catch((error) => {
        console.error("Error generating QR code:", error);
      })
      .finally(() => {
        setIsGenerating(false);
      });
  };

  // --- New Handler: Copy the generated link to clipboard ---
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
        setNotification({type: "error", message: "Failed to copy link."});
      });
  };

  // --- New Handler: Download the generated QR Code as PNG, JPG, or WEBP ---
  const downloadQRAs = (mimeType: string, extension: string) => {
    if (!qrRef.current) return;

    // Use type assertion to tell TypeScript what type qrRef.current is
    const element = qrRef.current as HTMLElement;
    const svg = element.querySelector("svg");
    if (!svg) return;

    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svg);
    if (!svgString.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/))
      svgString = svgString.replace(
        /^<svg/,
        '<svg xmlns="http://www.w3.org/2000/svg"'
      );
    if (!svgString.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/))
      svgString = svgString.replace(
        /^<svg/,
        '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
      );
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      // Add null check for ctx
      if (!ctx) return;

      if (mimeType !== "image/png") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const imgData = canvas.toDataURL(mimeType);
      const downloadLink = document.createElement("a");
      downloadLink.href = imgData;
      downloadLink.download = `qr-code.${extension}`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="p-6">
      {/* Notification Message */}
      {notification && (
        <div
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
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>Events</span>
        <span className="mx-2">/</span>
        <span>Event List</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Event List</h1>

      {/* Top Buttons */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            className="bg-call-to-actions-900 hover:bg-call-to-actions-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={() => navigate("/admin/add-event")}
          >
            <Plus className="w-4 h-4" />
            <span>Add Events</span>
          </button>
          {allSelected && (
            <button
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              onClick={handleDeleteSelected}
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Selected</span>
            </button>
          )}
        </div>

        {/* Search Input */}
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

      {/* Events Table */}
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
              <tr
                key={event.id}
                className="border-b"
              >
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
                      src={`${SERVER_URL}/uploads/event/${event.image}`}
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
                    <Link
                      to={`/admin/registered-user-event/${event.id}`}
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                    >
                      <User className="w-4 h-4" />
                    </Link>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      onClick={() => navigate(`/admin/edit-event/${event.id}`)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      onClick={() => handleToggleSuspend(event)}
                    >
                      {event.isSuspended ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      onClick={() => {
                        setSelectedCardId("");
                        setClaimLinkModalOpen(true);
                        setGeneratedLink("");
                        setGeneratedQRCode("");
                      }}
                    >
                      <Link2 className="w-4 h-4" />
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
                <td
                  colSpan={5}
                  className="p-4 text-center text-gray-500"
                >
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

      {/* --- New Modal for Generating Claim Link / QR --- */}
      {claimLinkModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setClaimLinkModalOpen(false)}
          ></div>
          <div className="bg-white rounded-lg shadow-lg z-10 p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Generate Claim Link</h2>
            <p className="mb-4 text-sm text-gray-600">
              Tutorial: Select the card from the dropdown below, then click
              "Generate Link" to create a secure claim link or "Generate QR" to
              create a QR code version of the claim link. Share the link or QR
              code with your users so they can claim the reward.
            </p>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Select Card:</label>
              <select
                value={selectedCardId}
                onChange={(e) => setSelectedCardId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                {cardRewards.length > 0 ? (
                  cardRewards.map((reward) => (
                    <option
                      key={reward.id}
                      value={reward.id}
                    >
                      {reward.name}
                    </option>
                  ))
                ) : (
                  <option value="">No cards available</option>
                )}
              </select>
            </div>
            {/* Display generated link with copy button */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  placeholder="Generated link will appear here"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
                  onClick={handleCopyLink}
                  disabled={!generatedLink}
                >
                  Copy
                </button>
              </div>
            </div>
            {/* Display QR code (and download buttons) if generated */}
            <div className="mb-4">
              {generatedQRCode && (
                <div className="flex flex-col items-center">
                  <p className="mb-2 text-sm text-gray-600">QR Code:</p>
                  <div ref={qrRef}>
                    <QRCode
                      value={generatedQRCode}
                      size={128}
                    />
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => downloadQRAs("image/png", "png")}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Download PNG
                    </button>
                    <button
                      onClick={() => downloadQRAs("image/jpeg", "jpg")}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Download JPG
                    </button>
                    <button
                      onClick={() => downloadQRAs("image/webp", "webp")}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                    >
                      Download WEBP
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Buttons for generating link and QR */}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setClaimLinkModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 ${
                  isGenerating ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleGenerateClaimLink}
                disabled={isGenerating || !selectedCardId}
              >
                {isGenerating ? "Generating..." : "Generate Link"}
              </button>
              <button
                className={`px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600 ${
                  isGenerating ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleGenerateClaimQR}
                disabled={isGenerating || !selectedCardId}
              >
                {isGenerating ? "Generating..." : "Generate QR"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
