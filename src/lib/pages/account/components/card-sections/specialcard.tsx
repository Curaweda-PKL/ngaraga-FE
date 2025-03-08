import React from "react";
import { SpecialCard } from "./types";
import { SERVER_URL } from "@/middleware/utils";

type SpecialCardsProps = {
  data: SpecialCard[];
  onCardClick: (card: SpecialCard) => void;
  onClaim: (card: SpecialCard) => void;
  claimingCardId: number | null;
};

const getRarityColor = (rarity: string): string => {
  switch (rarity) {
    case "Common":
      return "text-gray-600";
    case "Rare":
      return "text-blue-600";
    case "Epic":
      return "text-purple-600";
    case "Legendary":
      return "text-yellow-600";
    case "Special":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

const getRarityBackground = (rarity: string): string => {
  switch (rarity) {
    case "Common":
      return "bg-gray-100";
    case "Rare":
      return "bg-blue-100";
    case "Epic":
      return "bg-purple-100";
    case "Legendary":
      return "bg-yellow-100";
    case "Special":
      return "bg-red-100";
    default:
      return "bg-gray-100";
  }
};

const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]+>/g, "").trim();
};

const formatImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  const formattedPath = imagePath.replace(/\\/g, "/");
  return `${SERVER_URL}/${formattedPath}`;
};

const SpecialCards: React.FC<SpecialCardsProps> = ({ data, onCardClick, onClaim, claimingCardId }) => {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <svg
          width="100"
          height="100"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-6 text-gray-400"
        >
          <polygon points="32 4 39 24 60 24 42 38 49 58 32 46 15 58 22 38 4 24 25 24" />
        </svg>
        <p className="text-gray-500 text-xl">
          No special cards available. Start collecting some special cards!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((item) => {
        const imageSrc = item.image
          ? formatImageUrl(item.image)
          : item.product?.image
          ? formatImageUrl(item.product.image)
          : "/placeholder.svg";

        const ownedCount: number = item.ownedNormalCount ?? 0;
        const requiredCount: number = item.requiredNormalCount ?? 0;
        const isEligible = ownedCount >= requiredCount && item.claimStatus !== "claimed";

        return (
          <div
            key={item.id}
            className="cursor-pointer"
            onClick={() => onCardClick(item)}
          >
            {/* Gradient border wrapper for an exquisite look */}
            <div className="p-1 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-2xl">
              <div className="w-full flex flex-col rounded-2xl overflow-hidden transition-transform transform duration-300 hover:scale-105 shadow-xl bg-white">
                <figure className="w-full h-60 relative overflow-hidden">
                  <img
                    src={imageSrc}
                    alt={item.title || item.characterName || "Special Card"}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle overlay gradient for added drama */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-30"></div>
                </figure>
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                    {item.title || item.characterName || "Untitled Card"}
                  </h3>
                  <p
                    className={`inline-block text-base uppercase tracking-wider font-bold mb-3 px-4 py-1 rounded-full ${getRarityColor(item.rarity)} ${getRarityBackground(item.rarity)} shadow-sm`}
                  >
                    {item.rarity}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Owned: {ownedCount} / Required: {requiredCount}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="inline-block text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full shadow-inner">
                      {item.product?.cardDetail ? stripHtmlTags(item.product.cardDetail) : "No Category"}
                    </div>
                    {item.claimStatus === "claimed" ? (
                      <div className="bg-green-50 text-green-600 border border-green-600 px-4 py-1 rounded-full text-sm font-medium flex items-center">
                        <span className="mr-1">✓</span> Achieved
                      </div>
                    ) : isEligible ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onClaim(item);
                        }}
                        disabled={claimingCardId === item.id}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-1 rounded-full text-sm font-medium shadow-md"
                      >
                        {claimingCardId === item.id ? "Claiming..." : "Claim"}
                      </button>
                    ) : (
                      <div className="relative group">
                        <button
                          disabled
                          className="bg-gray-200 text-gray-600 px-4 py-1 rounded-full text-sm font-medium cursor-not-allowed"
                        >
                          Locked
                        </button>
                        <div className="absolute bottom-full right-0 mb-2 w-48 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          Required: {requiredCount} / Owned: {ownedCount}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SpecialCards;
