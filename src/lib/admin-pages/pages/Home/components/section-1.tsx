import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { IoChevronDownOutline } from "react-icons/io5";
import { SERVER_URL } from "@/middleware/utils"; // centralized server URL

// Define a type for available cards
interface CardItem {
  id: number;
  name: string;
  // other properties can be added as needed
}

export const HeroBanner = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    selectedCard: "",
    heroCardId: null as number | null,
  });
  const [availableCards, setAvailableCards] = useState<CardItem[]>([]);
  const [showCardDropdown, setShowCardDropdown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch available cards on mount
  useEffect(() => {
    const fetchAvailableCards = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/api/available/marketplace/cards`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch available cards");
        }
        const data = await response.json();
        if (data.cards) {
          setAvailableCards(data.cards as CardItem[]);
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
        setErrorMessage("");
      }
    };

    fetchAvailableCards();
  }, []);

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowCardDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle change for title and description fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle card selection from dropdown
  const handleCardSelect = (card: CardItem) => {
    setFormData((prev) => ({
      ...prev,
      selectedCard: card.name,
      heroCardId: card.id,
    }));
    setShowCardDropdown(false);
  };

  // Handle Save button click to upsert hero banner
  const handleSave = async () => {
    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    // Validate required fields
    if (!formData.title || !formData.description) {
      setErrorMessage("Title and description are required.");
      setLoading(false);
      return;
    }

    // Prepare payload using a fixed slug (can be dynamic if needed)
    const payload = {
      slug: "hero-banner",
      heroBannerTitle: formData.title,
      heroBannerDescription: formData.description,
      heroCardId: formData.heroCardId,
    };

    try {
      const response = await fetch(`${SERVER_URL}/api/hero-banner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to save hero banner.");
      }
      setSuccessMessage("Hero banner saved successfully.");
    } catch (error: any) {
      console.error("Error saving hero banner:", error);
      setErrorMessage(error.message || "Error saving hero banner.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-medium mb-8">Section 1 - Hero Banner</h2>

      {errorMessage && (
        <div className="mb-4 text-red-600">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="mb-4 text-green-600">{successMessage}</div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-x-8">
          {/* Left Column: Hero Banner Title */}
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Banner Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="title"
                  placeholder="Enter hero banner title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formData.title && (
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, title: "" }))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <IoMdClose className="text-gray-400 hover:text-gray-600 w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* Right Column: Hero Banner Description */}
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Banner Description
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="description"
                  placeholder="Enter hero banner description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formData.description && (
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, description: "" }))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <IoMdClose className="text-gray-400 hover:text-gray-600 w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Select Card Section */}
        <div ref={dropdownRef}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Card <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCardDropdown(!showCardDropdown)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-left flex items-center justify-between bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <span className="text-gray-500">
                {formData.selectedCard || "Choose a Card"}
              </span>
              <IoChevronDownOutline className="text-gray-400 w-5 h-5" />
            </button>
            {showCardDropdown && (
              <div className="absolute z-10 mt-2 w-full border border-gray-300 rounded-lg bg-white max-h-60 overflow-y-auto">
                {availableCards.length === 0 ? (
                  <div className="p-3 text-gray-500">No available cards.</div>
                ) : (
                  availableCards.map((card: CardItem) => (
                    <div
                      key={card.id}
                      onClick={() => handleCardSelect(card)}
                      className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-medium">
                          {card.name.slice(0, 2)}
                        </span>
                      </div>
                      <span className="font-medium">{card.name}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-[#E9B824] text-white rounded-md hover:bg-[#d6a820] disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
