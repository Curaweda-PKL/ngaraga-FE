import React, { useState, useEffect } from "react";
import { Clock, Calendar, MapPin, Video } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "@/middleware/utils";

interface EventCard {
  id: string;
  title: string;
  time: string;
  date: string;
  location: string;
  image: string;
  type: "ONLINE" | "OFFLINE";
}

export const MoreEvents: React.FC = () => {
  const [events, setEvents] = useState<EventCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Helper function to format the event time (e.g., "15:22")
  const formatTime = (timeStr: string): string => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Helper function to format the event date (e.g., "26 Feb 2025")
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/events`);
        // Check if the response data is in the expected format
        if (response.data && Array.isArray(response.data)) {
          const transformedEvents: EventCard[] = response.data.map((event: any) => ({
            id: event.id,
            title: event.eventName,
            time: formatTime(event.eventTime),
            date: formatDate(event.eventDate),
            // For online events, we default to "Zoom Meeting"; for offline, we use the provided location
            location: event.eventType === "ONLINE" ? "Zoom Meeting" : event.offlineLocation,
            image: event.eventImage
              ? `${SERVER_URL}/${event.eventImage.replace(/\\/g, "/")}`
              : "",
            type: event.eventType,
          }));
          setEvents(transformedEvents);
        } else {
          setError("Unexpected response format");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleMoreEvents = () => {
    // Navigate to the events page
    navigate("/events");
    // Alternatively, you could use:
    // window.location.href = "http://localhost:5173/events";
  };

  return (
    <div className="w-full px-4 md:px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">More Event</h2>
        <button
          onClick={handleMoreEvents}
          className="px-4 py-2 bg-call-to-actions-900 text-white rounded-lg flex items-center gap-2 text-sm"
        >
          More Event
        </button>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-gray-200">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-4 bg-gray-50">
                <h3 className="font-medium text-gray-900 mb-3">{event.title}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {event.type === "ONLINE" ? (
                      <>
                        <Video className="w-4 h-4" />
                        <span>Zoom Meeting</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
