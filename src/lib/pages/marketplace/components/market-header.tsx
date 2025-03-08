import React, { useState, useCallback, useEffect, memo } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { PiSlidersHorizontalDuotone } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import { DropdownMarket } from "./dropdown-market";
import FilterModal from "./modal-sm";
import { SERVER_URL } from "@/middleware/utils";
import { Card } from "./marketplace-card-section";

interface MarketHeaderProps {
  onFilteredCards: (cards: Card[] | null) => void;
  onSearchQueryChange: (query: string) => void;
}

export const MarketHeader: React.FC<MarketHeaderProps> = ({
  onFilteredCards,
  onSearchQueryChange,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const defaultContent = {
    title: "Welcome to Our Marketplace!",
    description: "Discover and explore amazing Cards.",
  };

  // Fetch page content using React Query.
  const {
    data: pageContentData,
    isLoading: isPageContentLoading,
  } = useQuery<{ title: string; description: string }>({
    queryKey: ["pageContent", "marketplace"],
    queryFn: async () => {
      const response = await fetch(`${SERVER_URL}/api/page-content/marketplace`);
      if (!response.ok) throw new Error("Failed to fetch page content");
      return response.json();
    },
  });

  // Fetch filtered cards (only when a filter other than ALL is selected).
  const {
    data: filteredCardsData,
  } = useQuery<Card[]>({
    queryKey: ["filteredCards", selectedFilter],
    queryFn: async () => {
      const response = await fetch(
        `${SERVER_URL}/api/filter/cards?type=${selectedFilter}`
      );
      if (!response.ok) throw new Error("Failed to fetch filtered cards");
      const data = await response.json();
      if (!data.cards || !Array.isArray(data.cards))
        throw new Error("Invalid data format");
      return data.cards.map((card: any): Card => ({
        id: card.id,
        name: card.product?.name || "Unnamed Card",
        category: card.product?.category?.name || "Unknown Category",
        categoryImage: card.product?.category?.image || "",
        image: card.product?.image || "",
        price: card.product?.price ? card.product.price.toString() : "",
        discountedPrice: card.product?.discountedPrice
          ? card.product.discountedPrice.toString()
          : "",
      }));
    },
    enabled: selectedFilter !== "ALL",
  });

  // Whenever filtered cards update, pass the data to the parent.
  useEffect(() => {
    if (selectedFilter === "ALL") {
      onFilteredCards(null);
    } else {
      onFilteredCards(filteredCardsData ?? []);
    }
  }, [selectedFilter, filteredCardsData, onFilteredCards]);

  const handleSelectFilter = useCallback(
    (filter: string) => {
      if (filter !== selectedFilter) {
        setSelectedFilter(filter);
      }
    },
    [selectedFilter]
  );

  return (
    <div className="bg-background-color w-full px-4 py-10 lg:px-8 lg:py-20">
      <div className="mx-auto ml-0 lg:ml-7">
        {/* Title and Subtitle with Fallback Static Text */}
        <div className="mb-10 ml-4 lg:ml-0">
          {isPageContentLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-[#171717] mb-2">
                {pageContentData?.title || defaultContent.title}
              </h1>
              <p className="text-lg text-[#404040]">
                {pageContentData?.description || defaultContent.description}
              </p>
            </>
          )}
        </div>

        {/* Controls: Filter and Search */}
        <div className="relative w-full flex items-center gap-4">
          {/* Mobile Modal */}
          <div className="block md:hidden">
            <button
              className="flex items-center gap-2 bg-white text-[#404040] border-2 py-3 px-5 rounded-full hover:bg-gray-100"
              onClick={() => setIsModalOpen(true)}
            >
              <PiSlidersHorizontalDuotone className="w-5 h-5" />
              <span>{selectedFilter}</span>
            </button>
            <FilterModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onApply={() => setIsModalOpen(false)}
            >
              <ul>
                <li
                  className="py-2 cursor-pointer"
                  onClick={() => {
                    handleSelectFilter("ALL");
                    setIsModalOpen(false);
                  }}
                >
                  All
                </li>
                <li
                  className="py-2 cursor-pointer"
                  onClick={() => {
                    handleSelectFilter("NORMAL");
                    setIsModalOpen(false);
                  }}
                >
                  NORMAL
                </li>
                <li
                  className="py-2 cursor-pointer"
                  onClick={() => {
                    handleSelectFilter("SPECIAL");
                    setIsModalOpen(false);
                  }}
                >
                  SPECIAL
                </li>
              </ul>
            </FilterModal>
          </div>

          {/* Desktop Dropdown */}
          <div className="hidden md:block">
            <DropdownMarket
              buttonText={selectedFilter}
              iconLeft={<PiSlidersHorizontalDuotone className="w-5 h-5" />}
              iconRight={<MdArrowDropDown className="w-5 h-5 text-gray-400" />}
            >
              <li>
                <a
                  className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 rounded-lg"
                  onClick={() => handleSelectFilter("ALL")}
                >
                  All
                </a>
              </li>
              <li>
                <a
                  className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 rounded-lg"
                  onClick={() => handleSelectFilter("NORMAL")}
                >
                  NORMAL
                </a>
              </li>
              <li>
                <a
                  className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 rounded-lg"
                  onClick={() => handleSelectFilter("SPECIAL")}
                >
                  SPECIAL
                </a>
              </li>
            </DropdownMarket>
          </div>

          {/* Search Input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search your favourite cards then tap enter"
              className="w-full rounded-full bg-white text-[#404040] border-2 py-3 px-5 pr-14 outline-none placeholder-gray-500"
              onChange={(e) => {
                console.log("Search query:", e.target.value);
                onSearchQueryChange(e.target.value);
              }}
            />
            <button
              type="button"
              className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MarketHeader);
