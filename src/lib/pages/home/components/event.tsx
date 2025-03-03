import React, { useState, useEffect } from "react";
import mushroom from "../../../../assets/img/mushroom.png";
import { SERVER_URL } from "@/middleware/utils";

export const Event: React.FC = () => {
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [flashSale, setFlashSale] = useState<any>(null);
  const slug = "flash-sale";

  useEffect(() => {
    const fetchFlashSale = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/flash-sale/${slug}`);
        const data = await response.json();

        if (response.ok) {
          setFlashSale(data.flashSale);

          // Ambil `endTime` dari backend
          const endTimestamp = new Date(data.endTime).getTime();
          setEndTime(endTimestamp);

          // Hitung timeRemaining berdasarkan waktu backend
          const now = Date.now();
          const remainingSeconds = Math.max(0, Math.floor((endTimestamp - now) / 1000));
          setTimeRemaining(remainingSeconds);
        } else {
          console.error("Failed to fetch flash sale:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch flash sale:", error);
      }
    };

    fetchFlashSale();
  }, []);

  useEffect(() => {
    if (endTime === null) return;

    const updateRemainingTime = () => {
      const now = Date.now();
      const remainingTime = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeRemaining(remainingTime);
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "Loading...";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="relative mt-24 flex justify-center items-end h-screen bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(221, 177, 31, 0) 0%, rgba(221, 177, 31, 0.5) 100%), url(${mushroom})`,
      }}
    >
      <div className="absolute inset-0 flex justify-between items-end p-8 sm:p-12 md:p-16 lg:p-20">
        <div className="flex flex-col space-y-8 text-white">
          <div className="flex items-center space-x-3 px-3 py-2 bg-gray-300 rounded-xl w-fit">
            <img src="https://via.placeholder.com/40" alt="Avatar" className="w-8 h-8 rounded-full" />
            <span className="text-black font-semibold">Shroomie</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            {flashSale ? flashSale.flashSaleTitle : "Loading..."}
          </h1>

          <button className="py-2 px-6 sm:py-3 sm:px-8 bg-call-to-action text-white font-medium rounded-lg shadow-md hover:bg-call-to-actions-700 transition w-28 sm:w-36 md:w-40 lg:w-44">
            See Card
          </button>
        </div>

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