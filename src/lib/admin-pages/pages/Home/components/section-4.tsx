import {useState} from "react";
import {IoMdClose} from "react-icons/io";
import {
  IoChevronUpOutline,
  IoImageOutline,
  IoGlobeOutline,
} from "react-icons/io5";
import {
  BsPalette,
  BsCollectionPlay,
  BsMusicNote,
  BsTools,
} from "react-icons/bs";
import {BiSolidVideos} from "react-icons/bi";
import {MdSportsBasketball} from "react-icons/md";

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
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-medium mb-6">Section 4</h2>

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

        {/* Categories Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Categories *
          </label>
          <div className="relative">
            <button
              className="w-full border rounded-lg px-4 py-2.5 text-left flex items-center justify-between"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>Choose a Categories</span>
              <IoChevronUpOutline
                className={`text-gray-400 transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Selected Categories Display */}
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
              {formData.selectedCategories.map((category) => (
                <div
                  key={category.id}
                  className="border rounded-lg p-2 flex items-center justify-between bg-yellow-50"
                >
                  <div className="flex items-center space-x-2">
                    <category.icon className="text-gray-600 text-lg" />
                    <span className="text-gray-700">{category.name}</span>
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
