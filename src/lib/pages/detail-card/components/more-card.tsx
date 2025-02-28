import React, { useState, useEffect } from "react";
import { FaRocket } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "@/middleware/utils";

type Card = {
  id: number;
  title: string;
  creator: string;
  image: string;
  price?: string;
};

export const MoreCardSection: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        // Using the endpoint to fetch cards data
        const response = await axios.get(`${SERVER_URL}/api/available/marketplace/cards`);
        if (response.data?.cards && response.data.cards.length > 0) {
          const transformedCards: Card[] = response.data.cards.map((card: any) => ({
            id: card.id,
            title: card.name,
            creator: card.category,
            image: card.image,
            price: card.price,
          }));
          setCards(transformedCards);
        } else {
          // No cards returned; trigger fallback UI
          setCards([]);
        }
      } catch (err) {
        console.error("Error fetching cards:", err);
        setError("Failed to fetch cards");
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  const handleMoreCards = () => {
    navigate("/marketplace");
  };

  return (
    <div className="w-full mb-10 lg:ml-8">
      {/* Header Section */}
      <div className="flex justify-between items-center px-6 mb-6 mr-6 ml-2">
        <h2 className="text-2xl ml-2 font-bold text-[#171717] sm:text-xl">
          Explore More Cards
        </h2>
        <button
          onClick={handleMoreCards}
          className="flex items-center px-4 py-2 bg-call-to-action text-white rounded-lg shadow-md hover:bg-call-to-actions-800 transition lg:flex hidden"
        >
          <FaRocket className="mr-2 text-xl sm:text-lg" />
          <span>More Cards</span>
        </button>
      </div>

      {loading ? (
        <p className="px-6">Loading...</p>
      ) : error || cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-[400px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
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
          <p className="mt-4 text-gray-400">{error || "No cards available"}</p>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
          {/* Cards Grid */}
          <div className="grid gap-6 px-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-grow ml-2">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => navigate(`/detail-cards/${card.id}`)}
                className="w-full h-[400px] flex flex-col items-start gap-4 bg-[#F2F2F2] rounded-2xl shadow-xl transition-transform hover:scale-[1.02] sm:w-full"
              >
                <figure className="w-full h-[260px] rounded-t-2xl overflow-hidden">
                  {card.image ? (
                    <img
                      src={`${SERVER_URL}/${card.image.replace(/\\/g, "/")}`}
                      alt={card.title}
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
            ))}
          </div>

          {/* "More Cards" Button for Smaller Screens */}
          <div className="flex justify-center mt-6 sm:mt-8 w-full sm:w-auto lg:hidden">
            <button
              onClick={handleMoreCards}
              className="flex items-center px-4 py-2 bg-call-to-action text-white rounded-lg shadow-md hover:bg-call-to-actions-800 transition"
            >
              <FaRocket className="mr-2 text-xl sm:text-lg" />
              <span>More Cards</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
