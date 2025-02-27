import {useState} from "react";
import {IoMdClose} from "react-icons/io";
import {IoChevronDownOutline} from "react-icons/io5";
import {
  BsPalette,
  BsCollectionPlay,
  BsMusicNote,
  BsTools,
} from "react-icons/bs";
import {BiSolidVideos} from "react-icons/bi";
import {MdSportsBasketball} from "react-icons/md";
import {IoImageOutline, IoGlobeOutline} from "react-icons/io5";

export const SectionFourForm = () => {
  const [formData] = useState({
    title: "Browse Categories",
    description: "",
    selectedCategories: [
      {id: 1, name: "Art", icon: BsPalette},
      {id: 2, name: "Collectibles", icon: BsCollectionPlay},
      {id: 3, name: "Music", icon: BsMusicNote},
      {id: 4, name: "Photography", icon: IoImageOutline},
      {id: 5, name: "Video", icon: BiSolidVideos},
      {id: 6, name: "Utility", icon: BsTools},
      {id: 7, name: "Sport", icon: MdSportsBasketball},
      {id: 8, name: "Virtual Worlds", icon: IoGlobeOutline},
    ],
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-lg font-medium mb-8">Section 4</h2>

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

          {/* Categories Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Categories <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-left flex items-center justify-between bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="text-gray-500">Choose a Categories</span>
                <IoChevronDownOutline
                  className={`text-gray-400 w-5 h-5 transform transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Selected Categories Display */}
              <div className="mt-2 grid grid-cols-3 gap-2">
                {formData.selectedCategories.map((category) => (
                  <div
                    key={category.id}
                    className="border border-yellow-200 rounded-lg p-3 flex items-center justify-between bg-yellow-50"
                  >
                    <div className="flex items-center gap-3">
                      <category.icon className="text-gray-700 w-5 h-5" />
                      <span className="text-gray-800 font-medium">
                        {category.name}
                      </span>
                    </div>
                    <button className="text-red-500 hover:bg-red-100 rounded-full p-1">
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

export default SectionFourForm;
