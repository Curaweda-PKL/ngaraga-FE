import React, { memo, useEffect, useState } from "react";
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
  // When filtering, an array (even empty) is provided.
  // When no filtering is applied, the prop is null.
  filteredCards: Card[] | null;
}

// Memoized individual card component to avoid unnecessary re-renders.
const CardItem: React.FC<{ card: Card }> = memo(({ card }) => (
  <Link to={`/detail-cards/${card.id}`}>
    <div className="w-full h-96 flex flex-col bg-[#F2F2F2] rounded-2xl shadow-xl transition-transform hover:scale-[1.02]">
      {/* Image Section */}
      <figure className="w-full h-1/2 rounded-t-2xl overflow-hidden">
        {card.image && (
          <img
            src={`${SERVER_URL}/${card.image.replace(/\\/g, "/")}`}
            alt={card.name}
            className="w-full h-full object-contain pt-2 mt-2"
          />
        )}
      </figure>

      {/* Content Section */}
      <div className="p-6 flex flex-col items-start gap-2 w-full flex-1 overflow-hidden mt-6">
        <h3 className="text-2xl font-bold text-[#171717] font-[Poppins] line-clamp-2">
          {card.name}
        </h3>
        <span className="text-base text-[#404040] font-[Nunito] line-clamp-1">
          {card.category}
        </span>
        <div className="flex items-center gap-2">
          {card.discountedPrice ? (
            <>
              <span className="text-base text-[#171717]">
                Rp {card.discountedPrice}
              </span>
              <span className="text-base text-[#404040] line-through">
                Rp {card.price}
              </span>
            </>
          ) : (
            <span className="text-base text-[#404040]">Rp {card.price}</span>
          )}
        </div>
      </div>
    </div>
  </Link>
));


export const MarketplaceCardSection: React.FC<MarketplaceCardSectionProps> = memo(({ filteredCards }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // If filtering is active (filteredCards is an array), use it.
    // If filteredCards is null, fetch the default set of cards.
    if (filteredCards !== null) {
      setCards(filteredCards);
      setLoading(false);
    } else {
      const fetchMarketplaceCards = async () => {
        try {
          const response = await axios.get(`${SERVER_URL}/api/available/marketplace/cards`);
          if (response.data?.cards) {
            const transformedCards = response.data.cards.map((card: any) => ({
              id: card.id,
              name: card.name,
              category: card.category,
              image: card.image,
              price: card.price,
              discountedPrice: card.discountedPrice,
            }));
            setCards(transformedCards);
          }
        } catch (err) {
          console.error("Error fetching cards:", err);
          setError("Failed to fetch cards");
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

  if (cards.length === 0) {
    return (
      <div className="w-full mb-10 lg:ml-8 flex flex-col items-center justify-center gap-4 py-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#404040"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
        <p className="text-[#404040]">
          {filteredCards ? "No cards with this type" : "No cards available"}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mb-10 lg:ml-8">
      <div className="grid gap-6 px-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:mr-8">
        {cards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
  
});
