import React from "react";
import { Card } from "../../../account/components/card-sections/types";
import { SERVER_URL } from "@/middleware/utils";

type CardsProps = {
  data: Record<string, Card[]>;
};

const getBadgeClass = (category: string) => {
  switch (category) {
    case "Common":
      return "bg-gray-100 text-gray-600";
    case "Rare":
      return "bg-blue-100 text-blue-600";
    case "Epic":
      return "bg-purple-100 text-purple-600";
    case "Legendary":
      return "bg-yellow-100 text-yellow-600";
    case "Special":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const Cards: React.FC<CardsProps> = ({ data }) => {
  // Check if there are any cards in any group.
  const hasCards = Object.values(data).some((group) => group.length > 0);

  if (!hasCards) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <svg
          width="100"
          height="100"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-4"
        >
          <rect x="8" y="12" width="48" height="40" rx="4" ry="4" />
          <line x1="8" y1="12" x2="56" y2="52" />
          <line x1="56" y1="12" x2="8" y2="52" />
        </svg>
        <p className="text-gray-500 text-lg">
          Collect some cards and they will be displayed here.
        </p>
      </div>
    );
  }

  return (
    <>
      {Object.keys(data).map((group) => (
        <div key={group} className="mb-6">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data[group].map((item) => {
              // Use the enhanced "Legendary" style if category is "Legendary" or "kdwokow".
              const isLegendary =
                item.category === "Legendary" || item.category === "Legendaris";
              // Process card image.
              const imagePath = item.image ? item.image.replace(/\\/g, "/") : "";
              const imageSrc = imagePath
                ? `${SERVER_URL}/${imagePath}`
                : "/placeholder.svg";

              // Process category image if available.
              let categoryImageSrc = "/placeholder.svg";
              if (item.categoryImage && item.categoryImage !== "N/A") {
                const categoryImagePath = item.categoryImage.replace(/\\/g, "/");
                categoryImageSrc = `${SERVER_URL}/${categoryImagePath}`;
              }

              return (
                <div
                  key={item.id}
                  className={`relative w-full h-[420px] flex flex-col bg-white rounded-2xl shadow-lg transition-transform hover:scale-[1.02] ${
                    isLegendary ? "border-4 border-yellow-500" : "border border-gray-200"
                  }`}
                >
                  <figure className="w-full h-[260px] rounded-t-2xl overflow-hidden relative">
                    <img
                      src={imageSrc}
                      alt={item.name}
                      className="w-full h-full object-cover p-4"
                    />
                    {/* Category image overlay */}
                    <img
                      src={categoryImageSrc}
                      alt={item.product?.category?.name || "Category"}
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12l5-5m0 0l5 5m-5-5v12" />
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
                        {item.name}
                      </h3>
                      <span
                        className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold mt-4 ${getBadgeClass(item.category)}`}
                      >
                        {item.category}
                      </span>
                    </div>
                    <div className="">
                      {item.price && (
                        <p className="text-sm sm:text-base text-gray-600">
                          Price: {item.price}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default Cards;
