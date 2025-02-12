import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "@/middleware/utils";
  
interface EventCardProps {
  title: string;
  time: string;
  date: string;
  location: string;
  imageUrl: string;
  id?: string;
}
  
const EventCard: React.FC<EventCardProps> = ({
  title,
  time,
  date,
  location,
  imageUrl,
  id,
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (id) {
      navigate(`/detail-events/${id}`);
    } else {
      navigate("/detail-events");
    }
  };
  
  return (
    <div
      onClick={handleClick}
      className="cursor-pointer card w-full bg-white shadow-xl rounded-lg overflow-hidden"
    >
      <figure>
        <img
          src={imageUrl}
          alt={title}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <div className="flex items-center text-sm text-gray-500 mb-2 gap-2">
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m9 4a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {time}
          </span>
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7v1m0 0V7m0 0h8v1M4 21h16a1 1 0 001-1V9a1 1 0 00-1-1H4a1 1 0 00-1 1v11a1 1 0 001 1z"
              />
            </svg>
            {date}
          </span>
        </div>
        <p className="flex items-center text-sm text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zm0 1c-3.866 0-7 3.134-7 7h2a5 5 0 015-5 5 5 0 015 5h2c0-3.866-3.134-7-7-7z"
            />
          </svg>
          {location}
        </p>
      </div>
    </div>
  );
};
  
const BrowseEvents: React.FC = () => {
  const [pageContent, setPageContent] = useState({
    title: "Browse Events",
    description: "Explore a wide variety of events in our Event Directory.",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch page content from API
  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/page-content/browsevent`);
        if (response.data) {
          setPageContent({
            title: response.data.title || pageContent.title,
            description: response.data.description || pageContent.description,
          });
        }
      } catch (err) {
        console.error("Error fetching page content:", err);
      }
    };
  
    fetchPageContent();
  }, []);
  
  // Fetch events from API using axios
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/events`);
        if (response.data) {
          setEvents(response.data);
        }
      } catch (err: any) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
      }
    };
  
    fetchEvents();
  }, []);
  
  // Map API events into the format for the EventCard.
  const mappedEvents =
    events.length > 0
      ? events.map((event) => {
          // Format the event time and date.
          const eventTime = new Date(event.eventTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const eventDate = new Date(event.eventDate).toLocaleDateString([], {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          // When event type is ONLINE, display "Online"
          const eventLocation =
            event.eventType === "ONLINE"
              ? "Online"
              : event.offlineLocation || "Location TBD";
          // Adjust the image URL if needed.
          const imageUrl = event.eventImage.startsWith("http")
            ? event.eventImage
            : event.eventImage;
  
          return {
            id: event.id,
            title: event.eventName,
            time: eventTime,
            date: eventDate,
            location: eventLocation,
            imageUrl,
          };
        })
      : [];
  
  // Filter events based on the search term (case-insensitive)
  const displayEvents = mappedEvents.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Fallback UI when there is an error or no events are available.
  if (error || displayEvents.length === 0) {
    return (
      <div className="w-full max-w-[1280px] px-5 py-10 mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          {/* Animal SVG Illustration */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="150"
            viewBox="0 0 64 64"
            fill="none"
          >
            <path
              d="M32 2C15.432 2 2 15.432 2 32s13.432 30 30 30 30-13.432 30-30S48.568 2 32 2z"
              fill="#FFE0B2"
            />
            <path
              d="M20 24c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm24 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"
              fill="#6D4C41"
            />
            <path
              d="M32 54c-6.627 0-12-5.373-12-12h24c0 6.627-5.373 12-12 12z"
              fill="#D84315"
            />
          </svg>
          <p className="mt-6 text-xl text-center text-gray-700">
            {error
              ? error
              : "There are no available events right now. Maybe come back later."}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-[1280px] px-5 py-10 mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#171717]">
          {pageContent.title}
        </h1>
        <p className="mt-2 text-lg text-[#404040]">
          {pageContent.description}
        </p>
      </div>
  
      {/* Search Input */}
      <div className="relative w-full max-w-[600px] mx-auto mb-10">
        <input
          type="text"
          placeholder="Search for your favorite Event then hit enter"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-full bg-white text-[#404040] border-2 py-3 px-5 pl-5 pr-14 outline-none placeholder-gray-500"
        />
        <button
          type="button"
          className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
            />
          </svg>
        </button>
      </div>
  
      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayEvents.map((event, index) => (
          <EventCard
            key={index}
            id={event.id}
            title={event.title}
            time={event.time}
            date={event.date}
            location={event.location}
            imageUrl={`${SERVER_URL}/uploads/event/${event.imageUrl}`}
          />
        ))}
      </div>
    </div>
  );
};
  
export default BrowseEvents;
