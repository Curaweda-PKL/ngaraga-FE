import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import { SERVER_URL } from "@/middleware/utils";

interface CardItem {
  id: number;
  name: string;
  // Add additional properties if needed (e.g., image, etc.)
}

export const SectionTwoForm = () => {
  // Trending Card form state
  const [trendingTitle, setTrendingTitle] = useState("");
  const [trendingDescription, setTrendingDescription] = useState("");
  const [selectedCards, setSelectedCards] = useState<CardItem[]>([]);
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
        const response = await fetch(`${SERVER_URL}/api/available/marketplace/cards`);
        if (!response.ok) {
          throw new Error("Failed to fetch available cards");
        }
        const data = await response.json();
        if (data.cards) {
          setAvailableCards(data.cards);
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
        setErrorMessage("Error fetching available cards.");
      }
    };
    fetchAvailableCards();
  }, []);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCardDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle card selection (multi-select, up to 3 cards)
  const handleCardSelect = (card: CardItem) => {
    // Prevent duplicate selections
    if (selectedCards.find((c) => c.id === card.id)) {
      setErrorMessage("You cannot select the same card twice.");
      return;
    }
    // Limit to 3 cards
    if (selectedCards.length >= 3) {
      setErrorMessage("You can only select up to 3 cards.");
      return;
    }
    setSelectedCards((prev) => [...prev, card]);
    setErrorMessage("");
    setShowCardDropdown(false);
  };

  // Remove a selected card
  const handleRemoveCard = (cardId: number) => {
    setSelectedCards((prev) => prev.filter((c) => c.id !== cardId));
  };

  // Save trending card via upsert endpoint
  const handleSave = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    if (!trendingTitle || !trendingDescription || selectedCards.length < 1) {
      setErrorMessage("Title, description, and at least one card are required.");
      return;
    }
    setLoading(true);
    const payload = {
      slug: "trending-card",
      trendingTitle,
      trendingDescription,
      trendingCardIds: selectedCards.map((card) => card.id),
    };
    try {
      const response = await fetch(`${SERVER_URL}/api/trending-card`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to save trending card.");
      }
      setSuccessMessage("Trending card saved successfully.");
    } catch (error: any) {
      console.error("Error saving trending card:", error);
      setErrorMessage(error.message || "Error saving trending card.");
    } finally {
      setLoading(false);
    }
  };

  // Disable Save button if required fields are missing or if a save is in progress
  const isSaveDisabled = loading || !trendingTitle || !trendingDescription || selectedCards.length < 1;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-medium mb-2">Trending Cards</h2>
      <p className="text-sm text-gray-600 mb-8">
        Enter a title and description for the trending cards section, then select between 1 and 3 unique cards from the dropdown.
        Duplicate card selection is not allowed.
      </p>

      {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}
      {successMessage && <div className="mb-4 text-green-600">{successMessage}</div>}

      <div className="space-y-6">
        {/* Title and Description */}
        <div className="grid grid-cols-2 gap-x-8">
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter trending card title"
                  value={trendingTitle}
                  onChange={(e) => setTrendingTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {trendingTitle && (
                  <button
                    type="button"
                    onClick={() => setTrendingTitle("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <IoMdClose className="text-gray-400 hover:text-gray-600 w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter trending card description"
                  value={trendingDescription}
                  onChange={(e) => setTrendingDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {trendingDescription && (
                  <button
                    type="button"
                    onClick={() => setTrendingDescription("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <IoMdClose className="text-gray-400 hover:text-gray-600 w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Card Selection */}
        <div ref={dropdownRef}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Cards <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCardDropdown(!showCardDropdown)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-left flex items-center justify-between bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <span className="text-gray-500">
                {selectedCards.length > 0 ? "Select Cards" : "Choose Cards"}
              </span>
              {showCardDropdown ? (
                <IoChevronUpOutline className="text-gray-400 w-5 h-5" />
              ) : (
                <IoChevronDownOutline className="text-gray-400 w-5 h-5" />
              )}
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

        {/* Display Selected Cards (grid with 3 columns) */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          {selectedCards.map((card) => (
            <div
              key={card.id}
              className="border border-gray-300 rounded-lg p-3 flex items-center justify-between bg-white"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-medium">
                    {card.name.slice(0, 2)}
                  </span>
                </div>
                <span className="font-medium">{card.name}</span>
              </div>
              <button onClick={() => handleRemoveCard(card.id)}>
                <IoMdClose className="text-gray-400 hover:text-gray-600 w-5 h-5" />
              </button>
            </div>
          ))}
          {/* Render empty placeholders if fewer than 3 cards are selected */}
          {selectedCards.length < 3 &&
            Array.from({ length: 3 - selectedCards.length }).map((_, idx) => (
              <div
                key={idx}
                className="border border-dashed border-gray-300 rounded-lg p-3 flex items-center justify-center bg-gray-50 text-gray-500"
              >
                Empty
              </div>
            ))}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaveDisabled}
            className={`px-4 py-2 rounded-md ${
              isSaveDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#E9B824] hover:bg-[#d6a820] text-white"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionTwoForm;
