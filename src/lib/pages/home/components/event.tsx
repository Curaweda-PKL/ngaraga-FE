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
      className="relative mt-24 flex justify-center items-end h-screen bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(221, 177, 31, 0) 0%, rgba(221, 177, 31, 0.5) 100%), url(${mushroom})`,
      }}
    >
      {/* Main Content */}
      <div className="absolute inset-0 flex justify-between items-end p-8 sm:p-12 md:p-16 lg:p-20">
        {/* Bottom-Left Section */}
        <div className="flex flex-col space-y-8 text-white">
          {/* Profile Section */}
          <div className="flex items-center space-x-3 px-3 py-2 bg-gray-300 rounded-xl w-fit">
            <img
              src="https://via.placeholder.com/40"
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-black font-semibold">Shroomie</span>
          </div>

          {/* Event Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Magic Mushrooms</h1>

          {/* CTA Button */}
          <button className="py-2 px-6 sm:py-3 sm:px-8 bg-call-to-action text-white font-medium rounded-lg shadow-md hover:bg-gray-100 transition w-28 sm:w-36 md:w-40 lg:w-44">
            See Card
          </button>
        </div>

        {/* Bottom-Right Section */}
        <div className="flex flex-col items-center text-white p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-700 bg-opacity-50 backdrop-blur-md rounded-xl">
          <p className="text-sm sm:text-base md:text-lg font-mono mb-4 font-medium">Auction ends in:</p>
          <div className="flex text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-mono space-x-3">
            <span>{formatTime(timeRemaining)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
