import React, { useState, useEffect } from "react";
import mushroom from "../../../../assets/img/mushroom.png";

export const Event: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="relative mt-24 flex justify-center items-end self-stretch h-screen"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(221, 177, 31, 0.00) 0%, rgba(221, 177, 31, 0.50) 100%), url(${mushroom})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Main Content */}
      <div className="absolute inset-0 flex justify-between items-end p-20">
        {/* Bottom-Left Section */}
        <div className="flex flex-col space-y-8 text-white">
          {/* Profile Section */}
          <div
            className="flex items-center space-x-3 px-3 py-2"
            style={{
              borderRadius: "20px",
              background: "#3B3B3B",
              width: "fit-content",
            }}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-base font-semibold">Shroomie</span>
          </div>

          {/* Event Title */}
          <h1 className="text-5xl font-bold">Magic Mushrooms</h1>

          {/* CTA Button */}
          <button className="py-3 px-8 bg-call-to-action text-white font-medium rounded-lg shadow-md hover:bg-gray-100 transition w-36">
            See Card
          </button>
        </div>

        {/* Bottom-Right Section */}
        <div
          className="flex flex-col items-center text-white p-8"
          style={{
            borderRadius: "20px",
            background: "rgba(59, 59, 59, 0.50)",
            backdropFilter: "blur(5px)",
          }}
        >
          <p
            className="text-lg font-mono mb-4 font-medium"
            style={{
              lineHeight: "1.5",
            }}
          >
            Auction ends in:
          </p>
          <div
            className="flex text-3xl font-bold font-mono space-x-3"
            style={{
              lineHeight: "1.4",
            }}
          >
            <span>{formatTime(timeRemaining)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
