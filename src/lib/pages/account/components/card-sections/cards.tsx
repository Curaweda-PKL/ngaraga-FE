import React from "react";
import { Card } from "./types";

type CardsProps = {
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

const Cards: React.FC<CardsProps> = ({ data }) => {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((item) => (
        <a href="/special-card-detail" key={item.id}>
          <div className="w-full h-[400px] flex flex-col items-start gap-4 bg-[#F2F2F2] rounded-2xl shadow-xl transition-transform hover:scale-[1.02]">
            <figure className="w-full h-[260px] rounded-t-2xl overflow-hidden">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="p-4 sm:p-6 flex flex-col items-start gap-2 w-full flex-grow">
              <h3 className="text-xl sm:text-2xl font-bold text-[#171717]">{item.title}</h3>
              <p className={`text-sm mb-2 ${getRarityColor(item.rarity)}`}>{item.rarity}</p>
              {item.price && <span className="text-sm sm:text-base text-[#404040]">{item.price}</span>}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Cards;
