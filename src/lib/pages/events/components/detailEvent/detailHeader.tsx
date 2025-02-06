import React from "react";

interface HeaderProps {
  eventData?: {
    eventImage: string;
  } | null;
}

const Header: React.FC<HeaderProps> = ({ eventData }) => {
  // Use the fetched event image if available; otherwise, fallback to the placeholder.
  const bgImage = eventData && eventData.eventImage
    ? `http://localhost:3000/uploads/event/${eventData.eventImage}`
    : "https://via.placeholder.com/1280x500?text=Event+Image";

  return (
    <header
      className="relative w-full h-80 bg-center bg-cover"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    </header>
  );
};

export default Header;
