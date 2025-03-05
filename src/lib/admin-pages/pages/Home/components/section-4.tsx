import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";
import { IoMdClose } from "react-icons/io";
import { IoChevronDownOutline } from "react-icons/io5";

// TypeScript interfaces
interface Category {
  id: number;
  code: string;
  name: string;
  image: string | null;
  seriesId: number;
  createdAt: string;
  updatedAt: string;
  isSuspended: boolean;
}

interface HeroCategoryPayload {
  slug: string;
  heroCategoryTitle: string;
  heroCategoryDescription: string;
  categoryIds: number[]; // Array of category IDs
}

export const SectionFourForm: React.FC = () => {
  // Form state for hero category fields
  const [title, setTitle] = useState<string>("Browse Categories");
  const [description, setDescription] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]); // Array of selected categories

  // State for categories list and dropdown control
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Message and error state
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Fetch categories from endpoint on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/categories/all`);
        setCategories(response.data.categories);
      } catch (err) {
        console.error("Error fetching categories", err);
        setError("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // Handle Save button click to upsert the hero category section
  const handleSave = async () => {
    setMessage("");
    setError("");

    // Validate if at least one category is selected
    if (selectedCategories.length === 0) {
      setError("Please select at least one category.");
      return;
    }

    // Prepare payload
    const payload: HeroCategoryPayload = {
      slug: "hero-category",
      heroCategoryTitle: title,
      heroCategoryDescription: description,
      categoryIds: selectedCategories.map((cat) => cat.id), // Extract category IDs
    };

    try {
      const response = await axios.post(`${SERVER_URL}/api/hero-category`, payload);
      setMessage("Hero category saved successfully.");
    } catch (err: any) {
      console.error("Error saving hero category", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred while saving hero category.");
      }
    }
  };

  // Handle category selection
  const handleCategorySelect = (category: Category) => {
    if (selectedCategories.length >= 8) {
      setError("You can select a maximum of 8 categories.");
      return;
    }
    if (!selectedCategories.some((cat) => cat.id === category.id)) {
      setSelectedCategories([...selectedCategories, category]);
    }
    setIsDropdownOpen(false);
  };

  // Handle category removal
  const handleCategoryRemove = (categoryId: number) => {
    setSelectedCategories(selectedCategories.filter((cat) => cat.id !== categoryId));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-medium mb-8">Section 4 - Categories</h2>
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
                  placeholder={title}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <IoMdClose className="text-gray-400 hover:text-gray-600 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Categories (Max 8) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <button
              type="button"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-left flex items-center justify-between bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-gray-500">
                {selectedCategories.length > 0
                  ? `${selectedCategories.length} categories selected`
                  : "Choose categories"}
              </span>
              <IoChevronDownOutline
                className={`text-gray-400 w-5 h-5 transform transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 w-full border border-gray-300 rounded-lg bg-white shadow-lg max-h-60 overflow-auto">
                {categories
                  .filter((cat) => !selectedCategories.some((selected) => selected.id === cat.id))
                  .map((category) => (
                    <div
                      key={category.id}
                      onClick={() => handleCategorySelect(category)}
                      className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                    >
                      <div className="flex items-center gap-3">
                        {category.image && (
                          <img src={category.image} alt={category.name} className="w-6 h-6" />
                        )}
                        <span>{category.name}</span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Display selected categories */}
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5"
              >
                {category.image && (
                  <img src={category.image} alt={category.name} className="w-4 h-4" />
                )}
                <span>{category.name}</span>
                <button
                  onClick={() => handleCategoryRemove(category.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <IoMdClose className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Display success or error messages */}
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}

        {/* Save Button at the justify-end */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="bg-call-to-actions-900 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};