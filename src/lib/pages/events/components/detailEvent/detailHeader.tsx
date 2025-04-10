import React from "react";
import { SERVER_URL } from "@/middleware/utils";

interface HeaderProps {
  eventData?: {
    eventImage: string;
  } | null;
}

const Header: React.FC<HeaderProps> = ({ eventData }) => {
  // Use the fetched event image if available; otherwise, fallback to the placeholder.
  const bgImage =
    eventData && eventData.eventImage
      ? `${SERVER_URL}/uploads/event/${eventData.eventImage}`
      : "/src/assets/img/dall-e.png";

  return (
    <header
      className="relative w-full h-80 bg-center bg-cover"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* Hapus atau komentari div ini untuk menghilangkan overlay transparan */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
    </header>
  );
};

export default Header;