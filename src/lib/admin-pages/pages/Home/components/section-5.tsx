import {useState} from "react";
import {IoMdClose} from "react-icons/io";
import {IoChevronUpOutline} from "react-icons/io5";

export const SectionFiveForm = () => {
  const [formData] = useState({
    title: "Trending Cards",
    description: "Checkout our weekly updated trending collection.",
    selectedCards: [
      "Galactic Explorer",
      "Galactic Explorer",
      "Galactic Explorer",
    ],
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-medium mb-6">Section 5</h2>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.title}
              className="w-full border rounded-lg px-4 py-2.5 pr-10"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <IoMdClose className="text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.description}
              className="w-full border rounded-lg px-4 py-2.5 pr-10"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <IoMdClose className="text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>

        {/* Card Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Card *
          </label>
          <div className="relative">
            <button
              className="w-full border rounded-lg px-4 py-2.5 text-left flex items-center justify-between"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>Choose a Card</span>
              <IoChevronUpOutline
                className={`text-gray-400 transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Selected Cards Display */}
            <div className="mt-2 space-y-2">
              {formData.selectedCards.map((card, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-2 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">GE</span>
                    </div>
                    <span>{card}</span>
                  </div>
                  <button>
                    <IoMdClose className="text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
