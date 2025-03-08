// AssignRequirement.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";

interface Notification {
  message: string;
  type: "success" | "error";
}

interface CardType {
  id: number;
  sku: string;
  uniqueCode: string;
  name: string;
  category: string;
  categoryCode: string;
  image: string;
  stock: number;
  price: number;
  discountedPrice: number;
  productId: number;
}

export const AssignRequirement: React.FC = () => {
  // 'id' is the special card id coming from the URL, e.g. /admin/assign-requirement/:id
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [normalCards, setNormalCards] = useState<CardType[]>([]);
  const [assignedNormalCards, setAssignedNormalCards] = useState<CardType[]>([]);
  const [selectedNormalCardIds, setSelectedNormalCardIds] = useState<number[]>([]);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Helper to format image URLs.
  const formatImageUrl = (image: string): string => {
    if (!image || image === "N/A") return "N/A";
    const normalizedPath = image.replace(/\\/g, "/");
    return normalizedPath.startsWith("http")
      ? normalizedPath
      : `${SERVER_URL}/${normalizedPath}`;
  };

  // Fetch all NORMAL cards.
  const fetchNormalCards = async () => {
    try {
      const response = await axios.get<{ cards: any[] }>(
        `${SERVER_URL}/api/cards/normal`,
        { withCredentials: true }
      );
      const mappedCards: CardType[] = response.data.cards.map((card: any) => ({
        id: card.id,
        sku: card.sku || "N/A",
        uniqueCode: card.uniqueCode || "N/A",
        name: card.name || card.characterName || "N/A",
        category:
          typeof card.category === "object" ? card.category.name : card.category || "N/A",
        categoryCode:
          typeof card.category === "object" ? card.category.code : card.categoryCode || "N/A",
        image: card.image || "N/A",
        stock: card.stock,
        price: Number(card.price),
        discountedPrice: Number(card.discountedPrice),
        productId: card.productId, // include productId for later matching
      }));
      setNormalCards(mappedCards);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Error fetching normal cards";
      setNotification({ message, type: "error" });
    }
  };

  // Fetch assigned NORMAL cards for this special card.
  // Updated to expect the backend to return an array of product IDs.
  const fetchAssignedNormalCards = async () => {
    if (!id) return;
    try {
      // GET endpoint /api/special-cards/requirements/:id returns { requiredNormalCards: number[] }
      const response = await axios.get<{ requiredNormalCards: number[] }>(
        `${SERVER_URL}/api/special-cards/requirements/${id}`,
        { withCredentials: true }
      );
      const requiredProductIds = response.data.requiredNormalCards;
      // Filter the normalCards state to get those whose productId is in the required list.
      const mappedAssigned = normalCards.filter((card) =>
        requiredProductIds.includes(card.productId)
      );
      setAssignedNormalCards(mappedAssigned);
      // Pre-select the already assigned cards by their id.
      const assignedIds = mappedAssigned.map((card) => card.id);
      setSelectedNormalCardIds(assignedIds);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setAssignedNormalCards([]);
      } else {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Error fetching assigned normal cards";
        setNotification({ message, type: "error" });
      }
    }
  };

  useEffect(() => {
    fetchNormalCards();
  }, []);

  // When normalCards have been fetched, fetch the assigned ones.
  useEffect(() => {
    if (id && normalCards.length > 0) {
      fetchAssignedNormalCards();
    }
  }, [id, normalCards]);

  // Handle checkbox changes.
  const handleCheckboxChange = (cardId: number, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedNormalCardIds((prev) => [...prev, cardId]);
    } else {
      setSelectedNormalCardIds((prev) => prev.filter((id) => id !== cardId));
    }
  };

  // Submit the assignment payload.
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) {
      setNotification({ message: "Special card ID is missing", type: "error" });
      return;
    }
    if (selectedNormalCardIds.length === 0) {
      setNotification({
        message: "Please select at least one normal card as requirement",
        type: "error",
      });
      return;
    }
    setLoading(true);
    try {
      const payload = {
        id: parseInt(id, 10),
        requiredNormalCardIds: selectedNormalCardIds,
      };
      const response = await axios.post(
        `${SERVER_URL}/api/special-cards/assign`,
        payload,
        { withCredentials: true }
      );
      setNotification({ message: response.data.message, type: "success" });
      // Refresh assigned cards after a successful update.
      fetchAssignedNormalCards();
      navigate("/admin/special-card");
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Error assigning requirement";
      setNotification({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Assign Requirement for Special Card</h1>
      {notification && (
        <div
          className={`mb-4 p-2 rounded ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {notification.message}
        </div>
      )}
      {/* Display currently assigned normal cards */}
      {assignedNormalCards.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">
            Currently Assigned Normal Cards:
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {assignedNormalCards.map((card) => (
              <div
                key={card.id}
                className="flex items-center gap-4 p-2 border rounded"
              >
                {card.image && card.image !== "N/A" ? (
                  <img
                    src={formatImageUrl(card.image)}
                    alt={card.sku}
                    className="w-16 h-16 object-contain rounded"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded">
                    No Image
                  </div>
                )}
                <div>
                  <p className="font-semibold">{card.name}</p>
                  <p className="text-sm text-gray-600">SKU: {card.sku}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">
            Select Required Normal Cards:
          </h2>
          {normalCards.length === 0 ? (
            <p>
              No normal cards available. Please add normal cards first.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {normalCards.map((card) => (
                <div key={card.id} className="category-checkbox">
                  <input
                    type="checkbox"
                    id={`card-${card.id}`}
                    value={card.id}
                    onChange={(e) => handleCheckboxChange(card.id, e)}
                    checked={selectedNormalCardIds.includes(card.id)}
                    className="hidden"
                  />
                  <label
                    htmlFor={`card-${card.id}`}
                    className="bg-gray-50 p-2 rounded flex items-center gap-4 cursor-pointer border"
                  >
                    {card.image && card.image !== "N/A" ? (
                      <img
                        src={formatImageUrl(card.image)}
                        alt={card.sku}
                        className="w-16 h-16 object-contain rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded">
                        No Image
                      </div>
                    )}
                    <div className="flex flex-col">
                      <p className="font-semibold">{card.name}</p>
                      <p className="text-sm text-gray-600">SKU: {card.sku}</p>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Assigning..." : "Assign Requirement"}
          </button>
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            onClick={() => navigate("/admin/special-card")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignRequirement;
