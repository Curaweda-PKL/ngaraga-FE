import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
} from "react";
import { Clock, Calendar, MapPin, Video } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { SERVER_URL } from "@/middleware/utils";

interface EventData {
  id: string;
  title: string;
  time: string;
  date: string;
  location: string;
  image: string;
  type: "ONLINE" | "OFFLINE";
}

// Memoized card component to minimize re-rendering
const MoreEventCard: React.FC<{ event: EventData }> = memo(({ event }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
  );
});

export const MoreEvents: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 20; // Number of events per page
  const navigate = useNavigate();

  // Helper functions to format time and date
  const formatTime = (timeStr: string): string => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Fetch events with pagination
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}/api/events`, {
        params: { page, limit },
      });
      if (response.data && Array.isArray(response.data)) {
        const transformedEvents: EventData[] = response.data.map((event: any) => ({
          id: event.id,
          title: event.eventName,
          time: formatTime(event.eventTime),
          date: formatDate(event.eventDate),
          location: event.eventType === "ONLINE" ? "Zoom Meeting" : event.offlineLocation,
          image: event.eventImage
          ? `${SERVER_URL}/uploads/event/${event.eventImage.replace(/\\/g, "/")}`
          : "",
          type: event.eventType,
        }));
        setEvents((prev) => [...prev, ...transformedEvents]);
        if (response.data.length < limit) {
          setHasMore(false);
        }
      } else {
        setError("Unexpected response format");
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleMoreEvents = () => {
    navigate("/events");
  };

  // Virtualization states and refs
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [columns, setColumns] = useState(3);
  const rowHeight = 350; // Assumed fixed row height

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      setContainerHeight(container.clientHeight);
      const handleScroll = () => {
        setScrollTop(container.scrollTop);
      };
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Update columns based on container width
  useEffect(() => {
    const updateColumns = () => {
      const width = containerRef.current?.clientWidth || window.innerWidth;
      if (width < 768) setColumns(1);
      else if (width < 1024) setColumns(2);
      else setColumns(3);
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const totalRows = Math.ceil(events.length / columns);
  const visibleStartRow = Math.floor(scrollTop / rowHeight);
  const visibleRowCount = Math.ceil(containerHeight / rowHeight) + 2; // Adding overscan
  const startIndex = visibleStartRow * columns;
  const endIndex = Math.min(events.length, (visibleStartRow + visibleRowCount) * columns);
  const visibleEvents = events.slice(startIndex, endIndex);

  // Sentinel for infinite scrolling
  const { ref: loadMoreRef, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, loading]);

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

      {loading && events.length === 0 ? (
        <p>Loading events...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div
          ref={containerRef}
          style={{ height: "80vh", overflowY: "auto" }}
          className="relative"
        >
          {/* Spacer div representing full list height */}
          <div style={{ height: totalRows * rowHeight, position: "relative" }}>
            {/* Container for only visible items */}
            <div
              style={{
                position: "absolute",
                top: visibleStartRow * rowHeight,
                left: 0,
                right: 0,
              }}
            >
              <div
                className={`grid gap-4 ${
                  columns === 1
                    ? "grid-cols-1"
                    : columns === 2
                    ? "grid-cols-2"
                    : "grid-cols-3"
                }`}
              >
                {visibleEvents.map((event) => (
                  <MoreEventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          </div>
          {/* Sentinel element for infinite scrolling */}
          <div ref={loadMoreRef} />
        </div>
      )}
    </div>
  );
};
