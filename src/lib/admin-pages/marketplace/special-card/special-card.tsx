import React, { useState, useEffect } from "react";
import { Edit3, Eye, EyeOff, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";

export const SpecialCard = () => {
  const navigate = useNavigate();

  // Notification state to show success/error messages.
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Define card state with additional isSuspended property.
  const [cards, setCards] = useState<
    {
      sku: string;
      uniqueCode: string;
      name: string;
      category: string;
      categoryCode: string;
      image: string;
      stock: number | string;
      price: number | string;
      selected: boolean;
      isSuspended: boolean;
    }[]
  >([]);

  // Fetch and map cards with fallback values.
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/cards/special`);
        const mappedCards = response.data.cards.map((card: any) => ({
          sku: card.sku || "N/A",
          uniqueCode: card.uniqueCode || "N/A",
          // Use card.name first, fallback to card.characterName if needed.
          name: card.name || card.characterName || "N/A",
          // If card.category is an object, use its name property;
          // otherwise, assume card.category is already the name.
          category:
            (typeof card.category === "object" ? card.category.name : card.category) ||
            card.categoryName ||
            "N/A",
          // Similar for categoryCode.
          categoryCode:
            (typeof card.category === "object" ? card.category.code : card.categoryCode) ||
            "N/A",
          image: card.image || "N/A",
          stock: card.stock !== undefined ? card.stock : "N/A",
          price: card.price !== undefined ? Number(card.price) : "N/A",
          selected: false,
          isSuspended: card.isSuspended || false,
        }));
        setCards(mappedCards);
      } catch (error: any) {
        console.error("Error fetching cards:", error.response?.data || error.message);
        setNotification({
          message: error.response?.data?.message || error.message,
          type: "error",
        });
      }
    };
  
    fetchCards();
  }, []);
  

  // Select/deselect all cards.
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const updatedCards = cards.map((card) => ({ ...card, selected: checked }));
    setCards(updatedCards);
  };

  // Select/deselect a single card.
  const handleSelectRow = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const updatedCards = [...cards];
    updatedCards[index].selected = checked;
    setCards(updatedCards);
  };

  // Toggle suspension status for a single card.
  const handleToggleSuspend = async (card: any) => {
    if (!card.uniqueCode) {
      setNotification({ message: "Unique code not found", type: "error" });
      return;
    }
    try {
      let response;
      if (card.isSuspended) {
        // If already suspended, unsuspend it.
        response = await axios.patch(`${SERVER_URL}/api/cards/${card.uniqueCode}/unsuspend`);
      } else {
        // Otherwise, suspend the card.
        response = await axios.patch(`${SERVER_URL}/api/cards/${card.uniqueCode}/suspend`);
      }
      // Update local card state with new suspension status.
      const updatedCard = response.data.card;
      setCards((prev) =>
        prev.map((c) =>
          c.uniqueCode === updatedCard.uniqueCode ? { ...c, isSuspended: updatedCard.isSuspended } : c
        )
      );
      setNotification({ message: response.data.message, type: "success" });
    } catch (error: any) {
      setNotification({ message: error.response?.data?.message || "Error updating card", type: "error" });
    }
  };

  // Delete a single card.
  const handleDelete = async (card: any) => {
    if (!window.confirm("Are you sure you want to delete this card?")) return;
    try {
      const response = await axios.delete(`${SERVER_URL}/api/cards/delete/${card.uniqueCode}`);
      setCards((prev) => prev.filter((c) => c.uniqueCode !== card.uniqueCode));
      setNotification({ message: response.data.message, type: "success" });
    } catch (error: any) {
      setNotification({ message: error.response?.data?.message || "Error deleting card", type: "error" });
    }
  };

  // Bulk delete selected cards.
  const handleBulkDelete = async () => {
    const selectedCards = cards.filter((card) => card.selected);
    if (selectedCards.length === 0) {
      setNotification({ message: "No cards selected for deletion", type: "error" });
      return;
    }
    if (!window.confirm("Are you sure you want to delete the selected cards?")) return;
    try {
      const deletePromises = selectedCards.map(async (card) => {
        await axios.delete(`${SERVER_URL}/api/cards/delete/${card.uniqueCode}`);
        return card.uniqueCode;
      });
      const deletedCodes = await Promise.all(deletePromises);
      setCards((prev) => prev.filter((c) => !deletedCodes.includes(c.uniqueCode)));
      setNotification({ message: "Selected cards deleted successfully", type: "success" });
    } catch (error: any) {
      setNotification({ message: error.response?.data?.message || "Error deleting cards", type: "error" });
    }
  };

  // Bulk suspend selected cards.
  const handleBulkSuspend = async () => {
    const selectedCards = cards.filter((card) => card.selected);
    if (selectedCards.length === 0) {
      setNotification({ message: "No cards selected for suspension", type: "error" });
      return;
    }
    if (!window.confirm("Are you sure you want to suspend the selected cards?")) return;
    try {
      const suspendPromises = selectedCards.map(async (card) => {
        if (!card.isSuspended) {
          const response = await axios.patch(`${SERVER_URL}/api/cards/${card.uniqueCode}/suspend`);
          return response.data.card;
        } else {
          // Return the card if it's already suspended.
          return card;
        }
      });
      const updatedCards = await Promise.all(suspendPromises);
      setCards((prev) =>
        prev.map((c) => {
          const updated = updatedCards.find((u) => u.uniqueCode === c.uniqueCode);
          return updated ? { ...c, isSuspended: updated.isSuspended } : c;
        })
      );
      setNotification({ message: "Selected cards suspended successfully", type: "success" });
    } catch (error: any) {
      setNotification({ message: error.response?.data?.message || "Error suspending cards", type: "error" });
    }
  };

  return (
    <div className="p-6">
      {notification && (
        <div
          className={`mb-4 p-2 rounded ${
            notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {notification.message}
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Special Card</h1>
        <div className="flex gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={handleBulkSuspend}
          >
            Suspend All Selected Items
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={handleBulkDelete}
          >
            Delete All Selected Items
          </button>
          <button
            className="bg-call-to-actions-900 hover:bg-call-to-actions-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={() => navigate("/admin/add-card")}
          >
            <Plus className="w-4 h-4" />
            <span>Add Card</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={cards.length > 0 && cards.every((card) => card.selected)}
                  onChange={handleSelectAll}
                />
              </th>
              <th>SKU</th>
              <th>Unique Code</th>
              <th>Image</th>
              <th>Card Name</th>
              <th>Category Name</th>
              <th>Category Code</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={card.selected}
                    onChange={(e) => handleSelectRow(index, e)}
                  />
                </td>
                <td>{card.sku}</td>
                <td>{card.uniqueCode}</td>
                <td>
                  {card.image && card.image !== "N/A" ? (
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-16 h-auto object-cover"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{card.name}</td>
                <td>{card.category}</td>
                <td>{card.categoryCode}</td>
                <td>{card.stock}</td>
                <td>
                  {typeof card.price === "number"
                    ? `Rp ${card.price.toLocaleString()}`
                    : card.price}
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      onClick={() => navigate("/admin/edit-card")}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      onClick={() => handleToggleSuspend(card)}
                    >
                      {card.isSuspended ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-red-500"
                      onClick={() => handleDelete(card)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {cards.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center py-4">
                  No cards found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
