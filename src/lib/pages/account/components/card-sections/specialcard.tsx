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

// Utility to strip HTML tags from a string.
const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]+>/g, "").trim();
};

// Utility to format image URL.
// If the image path does not start with "http", assume it's relative and prepend the SERVER_URL.
const formatImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  const formattedPath = imagePath.replace(/\\/g, "/");
  return `${SERVER_URL}/${formattedPath}`;
};

const SpecialCards: React.FC<SpecialCardsProps> = ({ data, onCardClick, onClaim, claimingCardId }) => {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((item) => {
        // Determine image source: use card's image if available,
        // otherwise use the image from the associated product,
        // and fallback to a placeholder if neither exists.
        const imageSrc = item.image
          ? formatImageUrl(item.image)
          : item.product?.image
          ? formatImageUrl(item.product.image)
          : "/placeholder.svg";

        // Fallback for computed properties:
        const ownedCount: number = item.ownedNormalCount ?? 0;
        const requiredCount: number = item.requiredNormalCount ?? 0;

        return (
          <div
            key={item.id}
            className="cursor-pointer block"
            onClick={() => onCardClick(item)}
          >
            <div className="w-full flex flex-col rounded-lg overflow-hidden transition-transform hover:scale-[1.02]">
              <figure className="w-full h-[240px] rounded-t-lg overflow-hidden relative">
                <img
                  src={imageSrc}
                  alt={item.title || item.characterName || "Special Card"}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="bg-gray-100 p-4 rounded-b-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {item.title || item.characterName || "Untitled Card"}
                </h3>
                <p className={`text-sm mb-2 ${getRarityColor(item.rarity)}`}>
                  {item.rarity}
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    {item.product?.cardDetail
                      ? stripHtmlTags(item.product.cardDetail)
                      : "No Category"}
                  </div>
                  {item.claimStatus === "claimed" ? (
                    <div className="bg-call-to-action-600 text-call-to-action border border-call-to-action px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <span className="mr-1">✓</span> Achieved
                    </div>
                  ) : item.claimStatus === "eligible" ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClaim(item);
                      }}
                      disabled={claimingCardId === item.id}
                      className="bg-call-to-action hover:bg-yellow-600 text-white px-4 py-1 rounded-full text-xs font-medium"
                    >
                      {claimingCardId === item.id ? "Claiming..." : "Klaim"}
                    </button>
                  ) : item.claimStatus === "locked" ||
                    (item.specialRequirement && !item.claimStatus) ? (
                    <div className="relative group">
                      <button
                        disabled
                        className="bg-gray-300 text-gray-600 px-4 py-1 rounded-full text-xs font-medium cursor-not-allowed"
                      >
                        Locked
                      </button>
                      <div className="absolute bottom-full right-0 mb-2 w-48 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        Required: {requiredCount} / Owned: {ownedCount}
                      </div>
                    </div>
                  ) : (
                    <button
                      disabled
                      className="bg-gray-300 text-gray-600 px-4 py-1 rounded-full text-xs font-medium cursor-not-allowed"
                    >
                      Unassigned
                    </button>
                  )}
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
