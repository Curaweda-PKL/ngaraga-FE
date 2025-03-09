import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { IoChevronDownOutline } from "react-icons/io5";
import { SERVER_URL } from "@/middleware/utils";

interface CardItem {
  id: number;
  name: string;
}

export const SectionSixForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    flashSaleHours: "",  // Input jam
    flashSaleMinutes: "", // Input menit
    selectedCard: "",
    flashSaleCardId: null as number | null,
  });

  const [availableCards, setAvailableCards] = useState<CardItem[]>([]);
  const [showCardDropdown, setShowCardDropdown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAvailableCards = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/available/marketplace/cards`);
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCardDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if ((name === "flashSaleHours" || name === "flashSaleMinutes") && isNaN(Number(value))) {
      return; // Hanya menerima angka
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearInput = (field: keyof typeof formData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleCardSelect = (card: CardItem) => {
    setFormData((prev) => ({
      ...prev,
      selectedCard: card.name,
      flashSaleCardId: card.id,
    }));
    setShowCardDropdown(false);
  };

  const handleSave = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    const { flashSaleHours, flashSaleMinutes, title, flashSaleCardId } = formData;
    const hours = Number(flashSaleHours) || 0;
    const minutes = Number(flashSaleMinutes) || 0;
    const totalMinutes = hours * 60 + minutes;

    if (!title || totalMinutes <= 0) {
      setErrorMessage("Title and valid flash sale duration are required.");
      setLoading(false);
      return;
    }

    const payload = {
      slug: "flash-sale",
      flashSaleTitle: title,
      flashSaleHours: hours,
      flashSaleMinutes: minutes,
      flashSaleCardId: flashSaleCardId,
    };

    try {
      const response = await fetch(`${SERVER_URL}/api/flash-sale`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to save flash sale.");
      }
      setSuccessMessage("Flash sale saved successfully.");
    } catch (error: any) {
      console.error("Error saving flash sale:", error);
      setErrorMessage(error.message || "Error saving flash sale.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-medium mb-8">Section 6 - Flash Sale</h2>
      {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}
      {successMessage && <div className="mb-4 text-green-600">{successMessage}</div>}

      <div className="grid grid-cols-3 gap-4">
        {/* Title */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Flash Sale Title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          {formData.title && (
            <IoMdClose className="absolute right-3 top-9 cursor-pointer text-gray-500" onClick={() => handleClearInput("title")} />
          )}
        </div>

        {/* Hours */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
          <input
            type="number"
            name="flashSaleHours"
            placeholder="0"
            min="0"
            value={formData.flashSaleHours}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Minutes */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Minutes</label>
          <input
            type="number"
            name="flashSaleMinutes"
            placeholder="0"
            min="0"
            value={formData.flashSaleMinutes}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Select Card */}
        <div ref={dropdownRef} className="relative col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Card</label>
          <button
            type="button"
            onClick={() => setShowCardDropdown(!showCardDropdown)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-left flex items-center justify-between bg-white"
          >
            <span className="text-gray-500">{formData.selectedCard || "Choose a Card"}</span>
            <IoChevronDownOutline className="text-gray-400 w-5 h-5" />
          </button>
          {showCardDropdown && (
            <div className="absolute z-10 mt-1 w-full border border-gray-300 rounded-lg bg-white max-h-60 overflow-y-auto">
              {availableCards.length === 0 ? (
                <div className="p-3 text-gray-500">No available cards.</div>
              ) : (
                availableCards.map((card) => (
                  <div key={card.id} onClick={() => handleCardSelect(card)} className="p-3 hover:bg-gray-100 cursor-pointer">
                    {card.name}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button onClick={handleSave} disabled={loading} className="px-4 py-2 bg-[#E9B824] text-white rounded-md hover:bg-[#d6a820] disabled:opacity-50">
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default SectionSixForm;
