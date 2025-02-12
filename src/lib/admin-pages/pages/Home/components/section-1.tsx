import {useState} from "react";
import {IoMdClose} from "react-icons/io";
import {IoChevronDownOutline} from "react-icons/io5";

export const HeroBanner = () => {
  const [formData] = useState({
    title: "Lorem Ipsum dolor amet zdzf",
    description:
      "Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor",
    selectedCard: "Galactic Explorer",
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-lg font-medium mb-8">Hero Banner</h2>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-x-8">
            {/* Left Column */}
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Banner Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.title}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <IoMdClose className="text-gray-400 hover:text-gray-600 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Banner Description
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.description}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <IoMdClose className="text-gray-400 hover:text-gray-600 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Select Card Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Card <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-left flex items-center justify-between bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <span className="text-gray-500">Choose a Card</span>
                <IoChevronDownOutline className="text-gray-400 w-5 h-5" />
              </button>
              {/* Selected Card Display */}
              {formData.selectedCard && (
                <div className="mt-2 border border-gray-300 rounded-lg p-3 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-medium">GE</span>
                    </div>
                    <span className="font-medium">{formData.selectedCard}</span>
                  </div>
                  <button>
                    <IoMdClose className="text-gray-400 hover:text-gray-600 w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
