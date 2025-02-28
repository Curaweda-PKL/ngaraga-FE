import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Type definitions for trending card API response
interface Creator {
  name: string;
  image: string;
}

interface TrendingCardItem {
  id: number;
  characterName: string;
  product: {
    image: string;
  };
  creators: Creator[];
}

interface TrendingCardData {
  id: number;
  slug: string;
  tradingTitle: string;
  tradingDescription: string;
  card: TrendingCardItem[]; // Array of selected cards
  createdAt: string;
  updatedAt: string;
}

interface TrendingApiResponse {
  trendingCard: TrendingCardData;
}

// Fallback component for errors
const ErrorFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
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
      <p className="text-xl mt-4">Something went wrong in this component</p>
    </div>
  );
};

export const TrendingCards = () => {
  const navigate = useNavigate();
  const [trendingCard, setTrendingCard] = useState<TrendingCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch trending card data using the GET endpoint and fixed slug "trending-card"
  useEffect(() => {
    axios
      .get<TrendingApiResponse>(`${SERVER_URL}/api/trending-card/trending-card`)
      .then((response) => {
        setTrendingCard(response.data.trendingCard);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching trending card:", err);
        setError(err.message || "Something went wrong.");
        setLoading(false);
      });
  }, []);

  // Function to compute a normalized card image URL with fallback
  const getCardImage = (rawImage: string): string => {
    if (!rawImage) return "";
    const normalized = rawImage.replace(/\\/g, "/");
    return normalized.startsWith("http") ? normalized : `${SERVER_URL}/${normalized}`;
  };

  // Navigate to detail page using the card's id when clicked
  const handleCardClick = (cardId: number) => {
    navigate(`/detail-cards/${cardId}`);
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error || !trendingCard) return <ErrorFallback />;

  return (
    <div className="flex items-center justify-center px-4 sm:px-6">
      <div className="flex flex-col items-center bg-transparent border border-transparent gap-8 max-w-6xl w-full rounded-xl overflow-hidden">
        {/* Text Section with tutorial */}
        <div className="flex flex-col items-center lg:items-start gap-8 w-full p-8">
          <h2 className="text-4xl font-bold text-center lg:text-left text-[#171717] md:text-4xl">
            {trendingCard.tradingTitle || "Trending Cards"}
          </h2>
          <p className="text-2xl text-center lg:text-left text-[#404040] md:text-base">
            {trendingCard.tradingDescription ||
              "Checkout Our Weekly Updated Trending Collection."}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3 w-full sm:px-6 px-4 -mt-2">
          {trendingCard.card && trendingCard.card.length > 0 ? (
            trendingCard.card.map((card) => {
              const rawImage = card.product?.image || "";
              const cardImage = getCardImage(rawImage);
              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className="cursor-pointer w-full max-w-[330px] flex flex-col items-start gap-4 flex-shrink-0 rounded-lg transition-transform hover:scale-105 mx-auto"
                >
                  <figure className="w-full">
                    {cardImage ? (
                      <img
                        src={cardImage}
                        alt={card.characterName}
                        className="w-full rounded-t-lg h-[200px] object-cover"
                      />
                    ) : (
                      <div className="w-full h-[200px] flex items-center justify-center bg-gray-700 text-white rounded-t-lg">
                        <span>No Image Available</span>
                      </div>
                    )}
                  </figure>
                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-[#262626]">
                      {card.characterName}
                    </h3>
                    <div className="flex items-center gap-2">
                      {card.creators && card.creators.length > 0 ? (
                        <span className="text-sm text-[#404040]">
                          {card.creators[0].name}
                        </span>
                      ) : (
                        <span className="text-sm text-[#404040]">Unknown Creator</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-3 flex flex-col items-center justify-center">
              <svg
                className="w-20 h-20 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 8v4l3 3"></path>
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              <p className="mt-4 text-gray-500">No trending cards available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingCards;
