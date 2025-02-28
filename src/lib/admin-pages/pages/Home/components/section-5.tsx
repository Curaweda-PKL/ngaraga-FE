import {useState} from "react";
import {IoMdClose} from "react-icons/io";
import {IoChevronUpOutline} from "react-icons/io5";

export const SectionFiveForm = () => {
  const [formData] = useState({
    title: "Discover More Cards",
    description: "Explore new trending Cards",
    selectedCards: [
      "Galactic Explorer",
      "Galactic Explorer",
      "Galactic Explorer",
    ],
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-lg font-medium mb-8">Section 5</h2>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-x-8">
            {/* Left Column - Title */}
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
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

            {/* Right Column - Description */}
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
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

          {/* Card Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Card <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-left flex items-center justify-between bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="text-gray-500">Choose a Card</span>
                <IoChevronUpOutline
                  className={`text-gray-400 w-5 h-5 transform transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Selected Cards Display */}
              <div className="mt-2 grid grid-cols-3 gap-2">
                {formData.selectedCards.map((card, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded-lg p-3 flex items-center justify-between bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-medium">GE</span>
                      </div>
                      <span className="font-medium text-gray-800">{card}</span>
                    </div>
                    <button className="text-red-500 hover:bg-red-50 rounded-full p-1">
                      <IoMdClose className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionFiveForm;
