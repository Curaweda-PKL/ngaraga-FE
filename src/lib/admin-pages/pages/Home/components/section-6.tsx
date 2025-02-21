import {useState} from "react";
import {IoMdClose} from "react-icons/io";
import {IoChevronDownOutline} from "react-icons/io5";

export const SectionSixForm = () => {
  const [formData] = useState({
    title: "Special Card",
    time: "24",
    selectedCard: "Space Walking",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-lg font-medium mb-8">Section 6</h2>

        <div className="grid grid-cols-3 gap-x-8">
          {/* Title */}
          <div>
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

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.time}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <IoMdClose className="text-gray-400 hover:text-gray-600 w-5 h-5" />
              </button>
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
                <IoChevronDownOutline className="text-gray-400 w-5 h-5" />
              </button>
              {/* Selected Card Display */}
              {formData.selectedCard && (
                <div className="mt-2 border border-gray-300 rounded-lg p-3 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-medium">SW</span>
                    </div>
                    <span className="font-medium text-gray-800">
                      {formData.selectedCard}
                    </span>
                  </div>
                  <button className="text-red-500 hover:bg-red-50 rounded-full p-1">
                    <IoMdClose className="w-4 h-4" />
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

export default SectionSixForm;
