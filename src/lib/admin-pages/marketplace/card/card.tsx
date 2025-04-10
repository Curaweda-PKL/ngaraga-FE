import React, { useState, useEffect, ChangeEvent } from "react";
import { Edit3, Eye, EyeOff, Trash2, Plus, QrCode, Archive } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { SERVER_URL } from "@/middleware/utils";

// Define interfaces for type safety.
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
  stock: number | string;
  price: number | string;
  discountedPrice: number | string;
  selected: boolean;
  isSuspended: boolean;
  productId?: number;
}

interface FetchCardsResponse {
  cards: any[];
}

export const Card: React.FC = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState<Notification | null>(null);
  const [cards, setCards] = useState<CardType[]>([]);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  // Fetch cards from the backend.
  const fetchCards = async (): Promise<void> => {
    try {
      const response = await axios.get<FetchCardsResponse>(`${SERVER_URL}/api/cards/normal`);
      setCards((prevCards) =>
        response.data.cards.map((card: any): CardType => {
          const existingCard = prevCards.find((c) => c.uniqueCode === card.uniqueCode);
          return {
            id: card.id,
            sku: card.sku || "N/A",
            uniqueCode: card.uniqueCode || "N/A",
            name: card.name || card.characterName || "N/A",
            category:
              (typeof card.category === "object" ? card.category.name : card.category) ||
              card.categoryName ||
              "N/A",
            categoryCode:
              (typeof card.category === "object" ? card.category.code : card.categoryCode) ||
              "N/A",
            image: card.image || "N/A",
            stock: card.stock !== undefined ? card.stock : "N/A",
            price: card.price !== undefined ? Number(card.price) : "N/A",
            discountedPrice:
              card.discountedPrice !== undefined && card.discountedPrice !== null
                ? Number(card.discountedPrice)
                : card.price !== undefined
                ? Number(card.price)
                : "N/A",
            selected: existingCard ? existingCard.selected : false,
            isSuspended: card.isSuspended || false,
            productId: card.productId || (card.product ? card.product.id : undefined),
          };
        })
      );
    } catch (error: unknown) {
      let message = "Error fetching cards";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      console.error("Error fetching cards:", message);
      setNotification({ message, type: "error" });
    }
  };

  // Initial fetch and polling for realtime updates.
  useEffect(() => {
    fetchCards();
    const interval = setInterval(() => {
      fetchCards();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-clear notifications after 2 seconds.
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Bulk selection handlers.
  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>): void => {
    const { checked } = e.target;
    const updatedCards = cards.map((card) => ({ ...card, selected: checked }));
    setCards(updatedCards);
  };

  const handleSelectRow = (index: number, e: ChangeEvent<HTMLInputElement>): void => {
    const { checked } = e.target;
    const updatedCards = [...cards];
    updatedCards[index].selected = checked;
    setCards(updatedCards);
  };

  // Toggle suspend status.
  const handleToggleSuspend = async (card: CardType): Promise<void> => {
    if (!card.uniqueCode) {
      setNotification({ message: "Unique code not found", type: "error" });
      return;
    }
    try {
      let response;
      if (card.isSuspended) {
        response = await axios.patch(`${SERVER_URL}/api/cards/${card.uniqueCode}/unsuspend`);
      } else {
        response = await axios.patch(`${SERVER_URL}/api/cards/${card.uniqueCode}/suspend`);
      }
      const updatedCard = response.data.card;
      setCards((prev) =>
        prev.map((c) =>
          c.uniqueCode === updatedCard.uniqueCode ? { ...c, isSuspended: updatedCard.isSuspended } : c
        )
      );
      setNotification({ message: response.data.message, type: "success" });
    } catch (error: unknown) {
      let message = "Error updating card";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      setNotification({ message, type: "error" });
    }
  };

  // Delete a single card and then re–fetch the updated list.
  const handleDelete = async (card: CardType): Promise<void> => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this card? if there only 1 stock the product is deleted too! You cannot revert this action! you really cant revert this action!"
    );
    if (!confirmed) return;

    try {
      const response = await axios.delete(`${SERVER_URL}/api/cards/delete/${card.uniqueCode}`);
      setNotification({ message: response.data.message, type: "success" });
      fetchCards();
    } catch (error: unknown) {
      let message = "Error deleting card";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      console.error("Error deleting card:", message);
      setNotification({ message, type: "error" });
    }
  };

  // Bulk delete cards and re–fetch.
  const handleBulkDelete = async (): Promise<void> => {
    const selectedCards = cards.filter((card) => card.selected);
    if (selectedCards.length === 0) {
      setNotification({ message: "No cards selected for deletion", type: "error" });
      return;
    }
    if (!window.confirm("Are you sure you want to delete this card? if there only 1 stock the product is deleted too! You cannot revert this action! you really cant revert this action! ")) return;
    try {
      const deletePromises = selectedCards.map(async (card) => {
        await axios.delete(`${SERVER_URL}/api/cards/delete/${card.uniqueCode}`);
        return card.uniqueCode;
      });
      await Promise.all(deletePromises);
      setNotification({ message: "Selected cards deleted successfully", type: "success" });
      fetchCards();
    } catch (error: unknown) {
      let message = "Error deleting cards";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      setNotification({ message, type: "error" });
    }
  };

  // Bulk suspend cards.
  const handleBulkSuspend = async (): Promise<void> => {
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
          return card;
        }
      });
      const updatedCards = await Promise.all(suspendPromises);
      setCards((prev) =>
        prev.map((c) => {
          const updated = updatedCards.find((u: CardType) => u.uniqueCode === c.uniqueCode);
          return updated ? { ...c, isSuspended: updated.isSuspended } : c;
        })
      );
      setNotification({ message: "Selected cards suspended successfully", type: "success" });
    } catch (error: unknown) {
      let message = "Error suspending cards";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      setNotification({ message, type: "error" });
    }
  };

  // Bulk unsuspend cards.
  const handleBulkUnsuspend = async (): Promise<void> => {
    const selectedCards = cards.filter((card) => card.selected);
    if (selectedCards.length === 0) {
      setNotification({ message: "No cards selected for unsuspension", type: "error" });
      return;
    }
    if (!window.confirm("Are you sure you want to unsuspend the selected cards?")) return;
    try {
      const unsuspendPromises = selectedCards.map(async (card) => {
        if (card.isSuspended) {
          const response = await axios.patch(`${SERVER_URL}/api/cards/${card.uniqueCode}/unsuspend`);
          return response.data.card;
        } else {
          return card;
        }
      });
      const updatedCards = await Promise.all(unsuspendPromises);
      setCards((prev) =>
        prev.map((c) => {
          const updated = updatedCards.find((u: CardType) => u.uniqueCode === c.uniqueCode);
          return updated ? { ...c, isSuspended: updated.isSuspended } : c;
        })
      );
      setNotification({ message: "Selected cards unsuspended successfully", type: "success" });
    } catch (error: unknown) {
      let message = "Error unsuspending cards";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      setNotification({ message, type: "error" });
    }
  };

  // Navigate to view QR codes.
  const handleQrButtonClick = (card: CardType): void => {
    if (!card.productId) {
      setNotification({ message: "Product ID not found for this card", type: "error" });
      console.error("Product ID not found for this card");
      return;
    }
    navigate(`/admin/cards/${card.productId}/qr-codes`);
  };

  // Delete product along with all unowned cards.
  const handleDeleteProduct = async (productId: number): Promise<void> => {
    const confirmed = window.confirm(
      "Are you sure you want to delete the product and all associated unowned cards? This action cannot be undone!"
    );
    if (!confirmed) return;
    try {
      const response = await axios.delete(`${SERVER_URL}/api/products/delete/${productId}`);
      setNotification({ message: response.data.message, type: "success" });
      fetchCards();
    } catch (error: unknown) {
      let message = "Error deleting product";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      console.error("Error deleting product:", message);
      setNotification({ message, type: "error" });
    }
  };

  // Helper to format image URLs.
  const formatImageUrl = (image: string): string => {
    if (!image || image === "N/A") return "N/A";
    const normalizedPath = image.replace(/\\/g, "/");
    return normalizedPath.startsWith("http")
      ? normalizedPath
      : `${SERVER_URL}/${normalizedPath}`;
  };

  // Pagination calculations.
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  return (
    <div className="p-6">
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Normal Card</h1>
        <div className="flex gap-2">
          {cards.some((card) => card.selected) && (
            <>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                title="Suspend All Selected Items"
                onClick={handleBulkSuspend}
              >
                Suspend All Selected Items
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                title="Unsuspend All Selected Items"
                onClick={handleBulkUnsuspend}
              >
                Unsuspend All Selected Items
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                title="Delete All Selected Items"
                onClick={handleBulkDelete}
              >
                Delete All Selected Items
              </button>
            </>
          )}
          <button
            className="bg-call-to-actions-900 hover:bg-call-to-actions-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            title="Add Products"
            onClick={() => navigate("/admin/add-card")}
          >
            <Plus className="w-4 h-4" />
            <span>Add Products</span>
          </button>
        </div>
      </div>
      <div className= "scrollbar-transparent-actions overflow-x-auto">
        <table className=" table min-w-max w-full">
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
              <th className="min-w-[150px]">SKU &amp; Image</th>
              <th className="min-w-[150px]">Unique Code</th>
              <th className="">Card Name</th>
              <th className="">Category Name</th>
              <th className="">Category Code</th>
              <th className="">Stock</th>
              <th className="">Price</th>
              <th className="">Discounted Price</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCards.map((card, index) => {
              // Calculate the actual index relative to the full array.
              const actualIndex = index + indexOfFirstCard;
              // Show "Delete Product" only on the first occurrence of each productId.
              const isFirstOccurrence =
                card.productId &&
                cards.findIndex((c) => c.productId === card.productId) === actualIndex;
              return (
                <tr key={actualIndex}>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={card.selected}
                      onChange={(e) => handleSelectRow(actualIndex, e)}
                    />
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {card.image && card.image !== "N/A" ? (
                        <img
                          src={formatImageUrl(card.image)}
                          alt={card.sku}
                          className="w-10 min-h-10 max-h-10 object-cover rounded-lg"
                        />
                      ) : null}
                      <span>{card.sku}</span>
                    </div>
                  </td>
                  <td>{card.uniqueCode}</td>
                  <td>{card.name}</td>
                  <td>{card.category}</td>
                  <td>{card.categoryCode}</td>
                  <td>{card.stock}</td>
                  <td className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {typeof card.price === "number"
                      ? `Rp ${card.price.toLocaleString()}`
                      : card.price}
                  </td>
                  <td className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {typeof card.discountedPrice === "number"
                      ? `Rp ${card.discountedPrice.toLocaleString()}`
                      : card.discountedPrice}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                        title="Edit Card"
                        onClick={() => navigate(`/admin/edit-card/${card.uniqueCode}`)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                        title={card.isSuspended ? "Unsuspend Card" : "Suspend Card"}
                        onClick={() => handleToggleSuspend(card)}
                      >
                        {card.isSuspended ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                        title="View QR Codes"
                        onClick={() => handleQrButtonClick(card)}
                      >
                        <QrCode className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg text-red-500"
                        title="Delete Card Stocks"
                        onClick={() => handleDelete(card)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {isFirstOccurrence && card.productId && (
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg text-red-500"
                          title="Delete Product"
                          onClick={() => {
                            if (card.productId !== undefined) {
                              handleDeleteProduct(card.productId);
                            } else {
                              console.error("Product ID is undefined");
                            }
                          }}
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
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
      {/* Pagination Controls */}
      <div className="flex justify-end items-center mt-4 gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2  rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-neutral-colors-100 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
