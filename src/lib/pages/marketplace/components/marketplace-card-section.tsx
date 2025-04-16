import React, { memo, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL,  } from "@/middleware/utils";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@tanstack/react-query";

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
  filteredCards: Card[] | null;
  searchQuery?: string;
}

// Helper to generate image source.
const getImageSrc = (src: string): string => {
  if (!src) return "/placeholder.svg";
  let cleaned = src.replace(/\\/g, "/").replace(/^https?:\/\//, "");
  return  `${SERVER_URL}/${cleaned}`;
};

const CardItem: React.FC<{ card: Card }> = memo(({ card }) => {
  const imageSrc = getImageSrc(card.image);
  let categoryImageSrc = "/placeholder.svg";
  if (card.categoryImage && card.categoryImage !== "N/A") {
    categoryImageSrc = getImageSrc(card.categoryImage);
  }
  const isLegendary =
    card.category === "Legendary" || card.category === "Legendaris";

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
            loading="lazy"
          />
          <img
            src={categoryImageSrc}
            alt={card.category}
            className="absolute bottom-2 right-2 w-10 h-10 rounded-full border-2 border-white"
            loading="lazy"
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
            <h3
              className={`text-xl sm:text-2xl font-bold ${
                isLegendary ? "text-yellow-600" : "text-gray-800"
              }`}
            >
              {card.name}
            </h3>
            <span className="inline-block mt-4 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
              {card.category}
            </span>
          </div>
          <div>
            {card.discountedPrice ? (
              <p className="text-sm sm:text-base text-gray-600">
                Rp {card.discountedPrice}{" "}
                <span className="line-through">Rp {card.price}</span>
              </p>
            ) : (
              <p className="text-sm sm:text-base text-gray-600">
                Price: {card.price}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
});

export const MarketplaceCardSection: React.FC<MarketplaceCardSectionProps> = memo(
  ({ filteredCards, searchQuery }) => {
    const [visibleCount, setVisibleCount] = useState<number>(8);
    const { ref: sentinelRef, inView } = useInView({ threshold: 0 });

    const { data: queryCards, isLoading, error } = useQuery<Card[], Error>({
      queryKey: ["marketplaceCards"],
      queryFn: async () => {
        const response = await axios.get(
          `${SERVER_URL}/api/available/marketplace/cards`
        );
        if (response.data?.cards) {
          return response.data.cards.map((card: any): Card => ({
            id: card.id,
            name: card.name,
            category: card.category,
            categoryImage: card.categoryImage,
            image: card.image,
            price: card.price,
            discountedPrice: card.discountedPrice,
          }));
        }
        throw new Error("Failed to fetch cards");
      },
      enabled: filteredCards === null,
      initialData: [],
    });

    // Compute cards from filteredCards prop or fetched data.
    const cards: Card[] = useMemo(() => {
      return filteredCards !== null ? filteredCards : queryCards;
    }, [filteredCards, queryCards]);

    // Apply fuzzy search: split search query into words and filter cards where every word is found.
    const finalCards = useMemo(() => {
      if (searchQuery && searchQuery.trim() !== "") {
        const words = searchQuery.toLowerCase().split(/\s+/);
        const filtered = cards.filter((card) => {
          const cardText = `${card.name} ${card.category}`.toLowerCase();
          return words.every((word) => cardText.includes(word));
        });
        console.log("Filtered cards count:", filtered.length, "for query:", searchQuery);
        return filtered;
      }
      return cards;
    }, [cards, searchQuery]);
    

    // Compute visible cards.
    const visibleCards = useMemo(() => finalCards.slice(0, visibleCount), [
      finalCards,
      visibleCount,
    ]);

    useEffect(() => {
      if (inView && visibleCount < finalCards.length) {
        setVisibleCount((prev) => prev + 4);
      }
    }, [inView, visibleCount, finalCards.length]);

    if (filteredCards === null && isLoading) {
      return (
        <div className="w-full mb-10 lg:ml-8">
          <p>Loading...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="w-full mb-10 lg:ml-8">
          <p className="text-red-500">
            {error.message || "An error occurred while fetching cards."}
          </p>
        </div>
      );
    }
    if (finalCards.length === 0) {
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
          {visibleCards.map((card: Card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>
        {visibleCount < finalCards.length && (
          <div ref={sentinelRef} className="py-4 text-center">
            Loading more cards...
          </div>
        )}
      </div>
    );
  }
);

export default MarketplaceCardSection;
