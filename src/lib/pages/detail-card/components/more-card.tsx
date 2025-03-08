import React, { useState, useEffect, useCallback } from "react";
import { FaRocket } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { SERVER_URL } from "@/middleware/utils";

type Card = {
  id: number;
  title: string;
  creator: string;
  image: string;
  categoryImage: string; 
  price?: string;
};

const CardItem: React.FC<{ card: Card; onClick: () => void }> = ({ card, onClick }) => {
  // Process main image path
  const imagePath = card.image ? card.image.replace(/\\/g, "/") : "";
  const imageSrc = imagePath ? `${SERVER_URL}/${imagePath}` : "/placeholder.svg";

  // Process category image path with conditional SERVER_URL prefix
  let categoryImageSrc = "/placeholder.svg";
  if (card.categoryImage && card.categoryImage !== "N/A") {
    categoryImageSrc =
      card.categoryImage.startsWith("http")
        ? card.categoryImage
        : `${SERVER_URL}/${card.categoryImage.replace(/\\/g, "/")}`;
  }

  return (
    <div
      key={card.id} // stable, unique key
      onClick={onClick}
      className="w-full h-[400px] flex flex-col items-start gap-4 bg-[#F2F2F2] rounded-2xl shadow-xl transition-transform hover:scale-[1.02] sm:w-full cursor-pointer"
    >
      <figure className="w-full h-[260px] rounded-t-2xl overflow-hidden relative">
        {card.image ? (
          <img
            src={imageSrc}
            alt={card.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#3B3B3B] text-gray-400 rounded-t-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" stroke="currentColor" fill="none" />
              <path
                d="M8 14s1.5 2 4 2 4-2 4-2"
                strokeWidth="2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <line
                x1="9"
                y1="9"
                x2="9.01"
                y2="9"
                strokeWidth="2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="15"
                y1="9"
                x2="15.01"
                y2="9"
                strokeWidth="2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
        {/* Category image overlay */}
        <img
          src={categoryImageSrc}
          alt="Category"
          className="absolute bottom-2 right-2 w-10 h-10 rounded-full border-2 border-white"
        />
      </figure>
      <div className="p-6 flex flex-col items-start gap-2 w-full flex-grow">
        <h3 className="text-2xl font-bold text-[#171717] font-[Poppins] sm:text-lg">
          {card.title}
        </h3>
        <span className="text-base text-[#404040] font-[Nunito] sm:text-sm">
          {card.creator}
        </span>
        {card.price && (
          <span className="text-base text-[#404040] font-[Nunito] sm:text-sm">
            Rp. {card.price}
          </span>
        )}
      </div>
    </div>
  );
};

export const MoreCardSection: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const LIMIT = 20; // Number of cards to fetch per page

  // Fetch cards for a given page
  const fetchCards = useCallback(async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/available/marketplace/cards?page=${pageNumber}&limit=${LIMIT}`
      );
      const newCards: Card[] =
        response.data?.cards.map((card: any) => ({
          id: card.id,
          title: card.name,
          creator: card.category,
          image: card.image,
          categoryImage: card.categoryImage,
          price: card.price,
        })) || [];
      // If fewer than LIMIT cards are returned, there are no more cards to load.
      if (newCards.length < LIMIT) {
        setHasMore(false);
      }
      // Append new cards to the existing list.
      setCards((prev) => [...prev, ...newCards]);
    } catch (err) {
      console.error("Error fetching cards:", err);
      setError("Failed to fetch cards");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load and subsequent loads when page changes
  useEffect(() => {
    fetchCards(page);
  }, [page, fetchCards]);

  // When the sentinel comes into view and more data is available, load the next page.
  useEffect(() => {
    if (inView && !loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [inView, loading, hasMore]);

  return (
    <div className="w-full mb-10 lg:ml-8">
      {/* Header Section */}
      <div className="flex justify-between items-center px-6 mb-6 mr-6 ml-2">
        <h2 className="text-2xl ml-2 font-bold text-[#171717] sm:text-xl">
          Explore More Cards
        </h2>
        <button
          onClick={() => navigate("/marketplace")}
          className="flex items-center px-4 py-2 bg-call-to-action text-white rounded-lg shadow-md hover:bg-call-to-actions-800 transition lg:flex hidden"
        >
          <FaRocket className="mr-2 text-xl sm:text-lg" />
          <span>More Cards</span>
        </button>
      </div>
      {error && (
        <div className="w-full mb-10 flex flex-col items-center justify-center h-[400px]">
          <p className="mt-4 text-gray-400">{error}</p>
        </div>
      )}
      {/* Cards Grid */}
      <div className="grid gap-6 px-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ml-2 lg:mr-6">
        {cards.map((card) => (
          <CardItem
            key={card.id} // stable, unique key
            card={card}
            onClick={() => navigate(`/detail-cards/${card.id}`)}
          />
        ))}
      </div>
      {/* Sentinel element for infinite scroll */}
      <div ref={ref} className="py-4 flex justify-center">
        {loading && <span className="text-gray-400">Loading...</span>}
        {!hasMore && <span className="text-gray-400">No more cards</span>}
      </div>
      {/* "More Cards" Button for Smaller Screens */}
      <div className="flex justify-center mt-6 sm:mt-8 w-full sm:w-auto lg:hidden">
        <button
          onClick={() => navigate("/marketplace")}
          className="flex items-center px-4 py-2 bg-call-to-action text-white rounded-lg shadow-md hover:bg-call-to-actions-800 transition"
        >
          <FaRocket className="mr-2 text-xl sm:text-lg" />
          <span>More Cards</span>
        </button>
      </div>
    </div>
  );
};
