// MarketplaceCardSection.tsx
import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";

export type Card = {
  id: number;
  name: string;
  category: string;
  image: string;
  price?: string;
  discountedPrice?: string;
};

interface MarketplaceCardSectionProps {
  filteredCards?: Card[];
}

export const MarketplaceCardSection: React.FC<MarketplaceCardSectionProps> = ({ filteredCards }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // If filtered cards are provided, use them
    if (filteredCards && filteredCards.length > 0) {
      setCards(filteredCards);
      setLoading(false);
    } else {
      // Otherwise, fetch the default marketplace cards
      const fetchMarketplaceCards = async () => {
        try {
          const response = await axios.get(`${SERVER_URL}/api/available/marketplace/cards`);
          if (response.data && Array.isArray(response.data.cards)) {
            setCards(response.data.cards);
          } else {
            setError("Unexpected response format.");
          }
        } catch (err) {
          console.error("Error fetching marketplace cards:", err);
          setError("Failed to fetch marketplace cards. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchMarketplaceCards();
    }
  }, [filteredCards]);

  if (loading) {
    return (
      <div className="w-full mb-10 lg:ml-8">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mb-10 lg:ml-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full mb-10 lg:ml-8">
      {/* Cards Grid */}
      <div className="grid gap-6 px-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.id} to={`/detail-cards/${card.id}`}>
          <div className="w-full flex flex-col items-start gap-4 bg-[#F2F2F2] rounded-2xl shadow-xl transition-transform hover:scale-[1.02]">
              <figure className="w-full aspect-video rounded-t-2xl overflow-hidden">
                {card.image ? (
                  <img
                    src={`${SERVER_URL}/${card.image.replace(/\\/g, "/")}`}
                    alt={card.name}
                    className="w-full h-full object-contain pt-2 mt-2"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#3B3B3B] text-gray-400" />
                )}
              </figure>
              <div className="p-6 flex flex-col items-start gap-2 w-full">
                <h3 className="text-2xl font-bold text-[#171717] font-[Poppins] whitespace-normal">
                  {card.name}
                </h3>
                <span className="text-base text-[#404040] font-[Nunito] whitespace-normal">
                  {card.category}
                </span>
                <div className="flex items-center gap-2">
                  {card.discountedPrice && card.discountedPrice.trim() !== "" ? (
                    <>
                      <span className="text-base text-[#171717] font-[Nunito]">
                        Rp {card.discountedPrice}
                      </span>
                      <span className="text-base text-[#404040] font-[Nunito] line-through">
                        Rp {card.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-base text-[#404040] font-[Nunito]">
                      Rp {card.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
