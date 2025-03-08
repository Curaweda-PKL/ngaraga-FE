import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";

export type Card = {
  id: number;
  name: string;
  category: string;
  categoryImage: string; 
  image: string;
  price?: string;
  discountedPrice?: string;
};

interface MarketplaceCardSectionProps {
  // When filtering, an array (even empty) is provided.
  // When no filtering is applied, the prop is null.
  filteredCards: Card[] | null;
}

const CardItem: React.FC<{ card: Card }> = memo(({ card }) => {
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

  // Determine if the card is "Legendary"
  const isLegendary = card.category === "Legendary" || card.category === "Legendaris";

  return (
    <Link to={`/detail-cards/${card.id}`}>
      <div
        className={`relative w-full h-[420px] flex flex-col bg-white rounded-2xl shadow-lg transition-transform hover:scale-[1.02] ${
          isLegendary ? "border-4 border-yellow-500" : "border border-gray-200"
        }`}
      >
        <figure className="w-full h-[260px] rounded-t-2xl overflow-hidden relative">
          <img
            src={imageSrc}
            alt={card.name}
            className="w-full h-full object-cover p-4"
          />
          {/* Category image overlay */}
          <img
            src={categoryImageSrc}
            alt={card.category}
            className="absolute bottom-2 right-2 w-10 h-10 rounded-full border-2 border-white"
          />
          {isLegendary && (
            <div className="absolute top-2 left-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-yellow-400 animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
            </div>
          )}
        </figure>
        <div className="p-4 sm:p-6 flex flex-col justify-between flex-grow">
          <div>
            <h3 className={`text-xl sm:text-2xl font-bold ${isLegendary ? "text-yellow-600" : "text-gray-800"}`}>
              {card.name}
            </h3>
            <span className="inline-block mt-4 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
              {card.category}
            </span>
          </div>
          <div className="">
            {card.discountedPrice ? (
              <p className="text-sm sm:text-base text-gray-600">
                Rp {card.discountedPrice}{" "}
                <span className="line-through">Rp {card.price}</span>
              </p>
            ) : (
              <p className="text-sm sm:text-base text-gray-600">Price: {card.price}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
});

export default CardItem;

export const MarketplaceCardSection: React.FC<MarketplaceCardSectionProps> = memo(({ filteredCards }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
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
              categoryImage: card.categoryImage, // mapping new property
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
