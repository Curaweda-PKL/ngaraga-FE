import React from "react";
import { Card } from "./types";

type SpecialCardsProps = {
  data: Card[];
};

const getRarityColor = (rarity: string) => {
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

const SpecialCards: React.FC<SpecialCardsProps> = ({ data }) => {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((item) => (
        <a href="/special-card-detail" key={item.id} className="block">
          <div className="w-full flex flex-col rounded-lg overflow-hidden transition-transform hover:scale-[1.02]">
            <figure className="w-full h-[240px] rounded-t-lg overflow-hidden relative">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="bg-gray-100 p-4 rounded-b-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
              <p className={`text-sm mb-2 ${getRarityColor(item.rarity)}`}>{item.rarity}</p>
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  {item.index} / {item.total}
                </div>
                {item.achieved ? (
                  <div className="bg-call-to-action-600 text-call-to-action border border-call-to-action px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <span className="mr-1">✓</span> Achieved
                  </div>
                ) : item.index === "00" && item.total === "03" ? (
                  <div className="relative group">
                    <button
                      disabled
                      className="bg-gray-300 text-gray-600 px-4 py-1 rounded-full text-xs font-medium cursor-not-allowed"
                    >
                      Locked
                    </button>
                    <div className="absolute bottom-full right-0 mb-2 w-48 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      Missing requirements: 00/03
                    </div>
                  </div>
                ) : (
                  <button className="bg-call-to-action hover:bg-yellow-600 text-white px-4 py-1 rounded-full text-xs font-medium">
                    Klaim
                  </button>
                )}
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default SpecialCards;
