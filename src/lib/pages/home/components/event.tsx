import React, { useState, useEffect } from "react";
import { SERVER_URL } from "@/middleware/utils";
import { motion } from "framer-motion"; // Import motion untuk animasi

export const Event: React.FC = () => {
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [flashSale, setFlashSale] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const slug = "flash-sale";

  // Fallback Data
  const FALLBACK_FLASH_SALE = {
    heroCard: {
      characterName: "Flash Sale",
      product: {
        category: {
          image: "https://via.placeholder.com/150",
        },
        image: "https://via.placeholder.com/520x344",
      },
    },
  };

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
          setError("Failed to fetch flash sale data.");
          setFlashSale(FALLBACK_FLASH_SALE); // Gunakan fallback data
        }
      } catch (error) {
        console.error("Failed to fetch flash sale:", error);
        setError("Something went wrong. Please try again later.");
        setFlashSale(FALLBACK_FLASH_SALE); // Gunakan fallback data
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#3B3B3B]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-20 h-20 border-4 border-t-[#e53e3e] border-r-[#e53e3e] border-b-[#e53e3e] border-l-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#3B3B3B]">
        <motion.svg
          className="w-20 h-20"
          viewBox="0 0 50 50"
          fill="none"
          stroke="#e53e3e"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <circle cx="25" cy="25" r="20" />
        </motion.svg>
        <p className="text-xl mt-4 text-white">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="relative mt-24 flex justify-center items-end h-screen bg-cover bg-center"
      style={{
        backgroundColor: "#3B3B3B", // Warna abu-abu solid
      }}
    >
      <div className="absolute inset-0 flex justify-between items-end p-8 sm:p-12 md:p-16 lg:p-20">
        {/* Kiri: Informasi Kategori */}
        <div className="flex flex-col space-y-4 text-white">
          {flashSale?.heroCard?.product?.category && (
            <>
              <img
                src={`${SERVER_URL}/${flashSale.heroCard.product.category.image}`}
                alt={flashSale.heroCard.characterName}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full"
                onError={(e) => {
                  console.error("Error loading category image:", e);
                  e.currentTarget.src = "https://via.placeholder.com/150"; // Fallback image
                }}
              />
              <span className="text-lg sm:text-xl md:text-2xl font-semibold">
                {flashSale.heroCard.characterName}
              </span>
            </>
          )}
        </div>

        {/* Tengah: Gambar Kartu */}
        <div className="flex justify-center items-center w-full h-full">
          {flashSale?.heroCard?.product?.image && (
            <img
              src={`${SERVER_URL}/${flashSale.heroCard.product.image}`}
              alt={flashSale.heroCard.characterName}
              className="h-full max-h-screen w-auto object-contain"
              style={{
                maxWidth: "100%", // Lebar maksimum sesuai ukuran asli gambar
              }}
              onError={(e) => {
                console.error("Error loading card image:", e);
                e.currentTarget.src = "https://via.placeholder.com/520x344"; // Fallback image
              }}
            />
          )}
        </div>

        {/* Kanan: Timer dan Tombol */}
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