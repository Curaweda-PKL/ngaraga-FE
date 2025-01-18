import {useState} from "react";
import {IoMdClose} from "react-icons/io";
import {IoChevronDownOutline} from "react-icons/io5";

export const SectionSixForm = () => {
  const [formData] = useState({
    title: "Lorem Ipsum dolor amet zdzf",
    description:
      "Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor",
    cards: "240k+",
    collectors: "100k+",
    category: "240k+",
    selectedCard: "Galactic Explorer",
  });

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-4">
        <span className="text-gray-500 text-sm">Pages / Home</span>
        <h1 className="text-2xl font-semibold mt-2">Home</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-medium mb-6">Hero Banner</h2>

        <div className="space-y-6">
          {/* Hero Banner Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hero Banner Title *
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

          {/* Hero Banner Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hero Banner Description
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

          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Cards */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cards *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.cards}
                    className="w-full border rounded-lg px-4 py-2.5 pr-10"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <IoMdClose className="text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Collectors */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Collectors *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.collectors}
                    className="w-full border rounded-lg px-4 py-2.5 pr-10"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <IoMdClose className="text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.category}
                    className="w-full border rounded-lg px-4 py-2.5 pr-10"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <IoMdClose className="text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Card *
              </label>
              <div className="relative">
                <button className="w-full border rounded-lg px-4 py-2.5 text-left flex items-center justify-between">
                  <span>Choose a Card</span>
                  <IoChevronDownOutline className="text-gray-400" />
                </button>
                {/* Selected Card Display */}
                <div className="mt-2 border rounded-lg p-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">GE</span>
                    </div>
                    <span>{formData.selectedCard}</span>
                  </div>
                  <button>
                    <IoMdClose className="text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
