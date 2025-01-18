import React, { useEffect, useState } from "react";
import axios from "axios";

interface EventCardProps {
  title: string;
  time: string;
  date: string;
  location: string;
  imageUrl: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  time,
  date,
  location,
  imageUrl,
}) => {
  return (
    <div className="card w-full bg-white shadow-xl rounded-lg overflow-hidden">
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

  const eventCards = [
    {
      title: "A Special Evening Celebration",
      time: "08.00 - 20.00",
      date: "07 Dec 2024",
      location: "Jakarta",
      imageUrl: "https://via.placeholder.com/300x200?text=Event+Image+1",
    },
    {
      title: "A Special Evening Celebration",
      time: "08.00 - 20.00",
      date: "07 Dec 2024",
      location: "Zoom Meeting",
      imageUrl: "https://via.placeholder.com/300x200?text=Event+Image+2",
    },
    {
      title: "A Special Evening Celebration",
      time: "08.00 - 20.00",
      date: "07 Dec 2024",
      location: "Jakarta",
      imageUrl: "https://via.placeholder.com/300x200?text=Event+Image+3",
    },
  ];

  useEffect(() => {
    // Fetch page content from API
    const fetchPageContent = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/page-content/browsevent");
        if (response.data) {
          setPageContent({
            title: response.data.title || pageContent.title,
            description: response.data.description || pageContent.description,
          });
        }
      } catch (error) {
        console.error("Error fetching page content:", error);
      }
    };

    fetchPageContent();
  }, []);

  return (
    <div className="w-full max-w-[1280px] px-5 py-10 mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#171717]">{pageContent.title}</h1>
        <p className="mt-2 text-lg text-[#404040]">{pageContent.description}</p>
      </div>

      {/* Search Input */}
      <div className="relative w-full max-w-[600px] mx-auto mb-10">
        <input
          type="text"
          placeholder="Search for your favorite Event"
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
      <a href="/detail-events">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventCards.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              time={event.time}
              date={event.date}
              location={event.location}
              imageUrl={event.imageUrl}
            />
          ))}
        </div>
      </a>
    </div>
  );
};

export default BrowseEvents;
