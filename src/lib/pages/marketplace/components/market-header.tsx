import React, { useState, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md"; 
import { PiSlidersHorizontalDuotone } from "react-icons/pi"; 
import { DropdownMarket } from "./dropdown-market"; 
import FilterModal from "./modal-sm"; 
import { SERVER_URL } from "@/middleware/utils";

export const MarketHeader: React.FC = () => {
  // State to track the selected filter
  const [selectedFilter, setSelectedFilter] = useState<string>("Filter");

  // State to control the modal visibility
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // State to hold the fetched page content data
  const [pageContent, setPageContent] = useState<{ title: string; description: string } | null>(null);

  // State to track loading status
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Default content to use as a fallback if no data is returned
  const defaultContent = {
    title: "Welcome to Our Marketplace!",
    description: "Discover and explore amazing Cards."
  };

  // Fetch the page content for "marketplace" from the API
  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/page-content/marketplace`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPageContent(data);
      } catch (error) {
        console.error("Error fetching page content:", error);
        // Fallback to defaultContent if there is an error
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageContent();
  }, []); // Runs once when the component mounts

  // Function to handle the selection of a filter item
  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    // Updated responsive padding: smaller padding on mobile/md, original for lg screens
    <div className="bg-background-color w-full px-4 py-10 lg:px-8 lg:py-20">
      {/* Adjusted margin: no left margin on mobile/md; applied on lg */}
      <div className="mx-auto ml-0 lg:ml-7">
        {/* Title and Subtitle */}
        <div className="mb-10 ml-4 lg:ml-0">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-[#171717] mb-2">
                {pageContent?.title || defaultContent.title}
              </h1>
              <p className="text-lg text-[#404040]">
                {pageContent?.description || defaultContent.description}
              </p>
            </>
          )}
        </div>

        {/* Search Input and Filter */}
        <div className="relative w-full flex items-center gap-4">
          {/* Modal for Small Screens */}
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
              onApply={() => {
                // Handle apply logic
                console.log("Filters applied!");
                setIsModalOpen(false);
              }}
            >
              <ul>
                <li className="py-2">Item 1</li>
                <li className="py-2">Item 2</li>
                <li className="py-2">Item 3</li>
                <li className="py-2">Item 4</li>
                <li className="py-2">Item 5</li>
                <li className="py-2">Item 6</li>
                <li className="py-2">Item 7</li>
                <li className="py-2">Item 8</li>
              </ul>
            </FilterModal>
          </div>

          {/* Dropdown for Medium and Larger Screens */}
          <div className="hidden md:block">
            <DropdownMarket
              buttonText={selectedFilter}
              iconLeft={<PiSlidersHorizontalDuotone className="w-5 h-5" />}
              iconRight={<MdArrowDropDown className="w-5 h-5 text-gray-400" />}
            >
              <li>
                <a
                  className="block px-4 py-2 text-gray-700 rounded-lg hover-border-call-to-actions"
                  onClick={() => handleSelectFilter("Item 1")}
                >
                  Dropdown 1
                </a>
              </li>
              <li>
                <a
                  className="block px-4 py-2 text-gray-700 rounded-lg hover-border-call-to-actions"
                  onClick={() => handleSelectFilter("Item 2")}
                >
                  Item 2
                </a>
              </li>
              <li>
                <a
                  className="block px-4 py-2 text-gray-700 rounded-lg hover-border-call-to-actions"
                  onClick={() => handleSelectFilter("Item 3")}
                >
                  Item 3
                </a>
              </li>
            </DropdownMarket>
          </div>

          {/* Search Input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search your favourite NFTs"
              className="w-full rounded-full bg-white text-[#404040] border-2 py-3 px-5 pr-14 outline-none placeholder-gray-500"
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
