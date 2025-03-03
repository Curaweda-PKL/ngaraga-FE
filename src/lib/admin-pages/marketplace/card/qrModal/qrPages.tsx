import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { zipSync } from "fflate";
import { FaDownload, FaTrash, FaRegTrashAlt, FaQrcode } from "react-icons/fa";
import { SERVER_URL } from "@/middleware/utils";
import { QrCodeGeneratorModal } from "./qrModal";

interface Notification {
  message: string;
  type: "success" | "error";
}

export interface CardType {
  id: number;
  uniqueCode: string;
  qrCode?: string; // This field holds the URL that will be encoded in the QR code.
  name?: string;
}

interface Product {
  id: number;
  name: string;
  // Add additional product fields as needed.
}

const QrCodesPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [cards, setCards] = useState<CardType[]>([]);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [qrModalInitialStartCode, setQrModalInitialStartCode] = useState<string>("");
  const [qrModalInitialEndCode, setQrModalInitialEndCode] = useState<string>("");
  const qrCodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Pagination, search, and selection state
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<string>("15");
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchProductCards = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/admin/get-cards-for-qr/${productId}`);
        // Expected response: { product: { ... }, cards: [ ... ] }
        setProduct(response.data.product);
        setCards(response.data.cards);
      } catch (error: any) {
        setNotification({
          message: error.response?.data?.message || error.message,
          type: "error",
        });
      }
    };
    fetchProductCards();
  }, [productId]);

  // Helper: Highlight the last segment (assumed to be 5 numbers) of the unique code.
  const highlightUniqueCode = (uniqueCode: string) => {
    const parts = uniqueCode.split("-");
    if (parts.length > 1) {
      const lastPart = parts.pop();
      const rest = parts.join("-");
      return (
        <>
          {rest}-<span className="text-green-500 font-bold">{lastPart}</span>
        </>
      );
    }
    return uniqueCode;
  };

  // Filter cards based on the search term (case-insensitive)
  const filteredCards = useMemo(() => {
    return cards.filter((card) =>
      card.uniqueCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cards, searchTerm]);

  const effectiveItemsPerPage = useMemo(() => {
    return itemsPerPage === "all" ? filteredCards.length : parseInt(itemsPerPage, 10);
  }, [itemsPerPage, filteredCards.length]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredCards.length / effectiveItemsPerPage) || 1;
  }, [filteredCards.length, effectiveItemsPerPage]);

  const currentCards = useMemo(() => {
    const startIndex = (currentPage - 1) * effectiveItemsPerPage;
    return filteredCards.slice(startIndex, startIndex + effectiveItemsPerPage);
  }, [filteredCards, currentPage, effectiveItemsPerPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "all") {
      if (
        !window.confirm(
          "Warning: Displaying all items may cause your browser to crash if there is a large amount of data. Do you want to proceed?"
        )
      ) {
        return;
      }
    }
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Open the QR generation modal using the latest card's unique code.
  const handleOpenQrModal = () => {
    if (cards.length === 0) {
      setNotification({
        message: "No cards available for QR generation.",
        type: "error",
      });
      return;
    }
    const latestCard = cards[0];
    setQrModalInitialStartCode(latestCard.uniqueCode);
    setQrModalInitialEndCode(latestCard.uniqueCode);
    setShowQrModal(true);
  };

  // Delete an individual card
  const handleDeleteCard = async (cardId: number) => {
    if (!window.confirm("Are you sure you want to delete this card?")) return;
    try {
      await axios.delete(`${SERVER_URL}/api/admin/delete-card/${cardId}`);
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
      setSelectedCardIds((prev) => prev.filter((id) => id !== cardId));
      setNotification({ message: "Card deleted successfully", type: "success" });
    } catch (error: any) {
      setNotification({
        message: error.response?.data?.message || error.message,
        type: "error",
      });
    }
  };

  // Delete the QR code from a card
  const handleDeleteQR = async (cardId: number) => {
    if (!window.confirm("Are you sure you want to delete the QR code for this card?")) return;
    try {
      await axios.delete(`${SERVER_URL}/api/admin/delete-qr-code/${cardId}`);
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === cardId ? { ...card, qrCode: undefined } : card
        )
      );
      setNotification({
        message: "QR code deleted successfully",
        type: "success",
      });
    } catch (error: any) {
      setNotification({
        message: error.response?.data?.message || error.message,
        type: "error",
      });
    }
  };

  // Download an individual QR code as a PNG file
  const handleDownloadIndividualQR = (card: CardType) => {
    const container = qrCodeRefs.current[card.uniqueCode];
    if (container) {
      const svgElement = container.querySelector("svg");
      if (svgElement) {
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
        const url = URL.createObjectURL(svgBlob);
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);
          canvas.toBlob((blob) => {
            if (blob) {
              const blobUrl = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = blobUrl;
              a.download = `${card.uniqueCode}.png`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(blobUrl);
            }
          }, "image/png");
        };
        img.src = url;
      } else {
        setNotification({ message: "QR code not found for download", type: "error" });
      }
    } else {
      setNotification({ message: "QR container not found", type: "error" });
    }
  };

  // Download selected QR codes as PNG files in a ZIP file.
  const downloadSelectedZip = async () => {
    if (selectedCardIds.length === 0) {
      setNotification({ message: "No cards selected for download", type: "error" });
      return;
    }
    const files: Record<string, Uint8Array> = {};
    const selectedCards = cards.filter(
      (card) => card.qrCode && selectedCardIds.includes(card.id)
    );
    await Promise.all(
      selectedCards.map(async (card) => {
        const container = qrCodeRefs.current[card.uniqueCode];
        if (container) {
          const svgElement = container.querySelector("svg");
          if (svgElement) {
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(svgElement);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
            const url = URL.createObjectURL(svgBlob);

            await new Promise<void>((resolve) => {
              img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                URL.revokeObjectURL(url);
                resolve();
              };
              img.src = url;
            });

            const blob = await new Promise<Blob | null>((resolve) =>
              canvas.toBlob((b) => resolve(b), "image/png")
            );

            if (blob) {
              const arrayBuffer = await blob.arrayBuffer();
              files[`${card.uniqueCode}.png`] = new Uint8Array(arrayBuffer);
            }
          }
        }
      })
    );
    const zipped = zipSync(files);
    const blob = new Blob([zipped], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "selected_qr_codes.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    // Optionally clear selection after download
    setSelectedCardIds([]);
  };

  // Download all QR codes as PNG files in a ZIP file.
  const downloadZip = async () => {
    const files: Record<string, Uint8Array> = {};
    const cardsWithQr = cards.filter((card) => card.qrCode);
    await Promise.all(
      cardsWithQr.map(async (card) => {
        const container = qrCodeRefs.current[card.uniqueCode];
        if (container) {
          const svgElement = container.querySelector("svg");
          if (svgElement) {
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(svgElement);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
            const url = URL.createObjectURL(svgBlob);

            await new Promise<void>((resolve) => {
              img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                URL.revokeObjectURL(url);
                resolve();
              };
              img.src = url;
            });

            const blob = await new Promise<Blob | null>((resolve) =>
              canvas.toBlob((b) => resolve(b), "image/png")
            );

            if (blob) {
              const arrayBuffer = await blob.arrayBuffer();
              files[`${card.uniqueCode}.png`] = new Uint8Array(arrayBuffer);
            }
          }
        }
      })
    );
    const zipped = zipSync(files);
    const blob = new Blob([zipped], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr_codes.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handler for select-all checkbox on the current page
  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // add all current cards' IDs if not already selected
      const newSelected = [
        ...new Set([...selectedCardIds, ...currentCards.map((card) => card.id)]),
      ];
      setSelectedCardIds(newSelected);
    } else {
      // remove current cards' IDs from selection
      const newSelected = selectedCardIds.filter(
        (id) => !currentCards.some((card) => card.id === id)
      );
      setSelectedCardIds(newSelected);
    }
  };

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

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h1 className="text-2xl font-semibold">
          Normal Card QR Codes for{" "}
          <span className="text-green-700">{product?.name || "Product"}</span>
        </h1>
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <button
            onClick={handleOpenQrModal}
            title="Generate QR Code"
            className="bg-call-to-actions-900 hover:bg-call-to-actions-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaQrcode /> <span className="hidden md:inline">Generate QR</span>
          </button>
          {/* New button: Download only selected cards if any selected */}
          {selectedCardIds.length > 0 && (
            <button
              onClick={downloadSelectedZip}
              title="Download Selected QR Codes as ZIP"
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FaDownload />{" "}
              <span className="hidden md:inline">Bulk Download Selected QR</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="search" className="font-medium">
            Search:
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Enter unique code"
            className="input input-bordered"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="itemsPerPage" className="font-medium">
            View:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="select select-bordered"
          >
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAllChange}
                  checked={
                    currentCards.length > 0 &&
                    currentCards.every((card) =>
                      selectedCardIds.includes(card.id)
                    )
                  }
                />
              </th>
              <th>Unique Code</th>
              <th>QR Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCards.length > 0 ? (
              currentCards.map((card) => (
                <tr key={card.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedCardIds.includes(card.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCardIds([...selectedCardIds, card.id]);
                        } else {
                          setSelectedCardIds(
                            selectedCardIds.filter((id) => id !== card.id)
                          );
                        }
                      }}
                    />
                  </td>
                  <td>{highlightUniqueCode(card.uniqueCode)}</td>
                  <td>
                    {card.qrCode ? (
                      <div
                        ref={(el) => {
                          qrCodeRefs.current[card.uniqueCode] = el;
                        }}
                      >
                        <QRCode value={card.qrCode || ""} size={100} />
                      </div>
                    ) : (
                      "No QR Code"
                    )}
                  </td>
                  <td className="flex gap-2">
                    {card.qrCode && (
                      <>
                        <button
                          onClick={() => handleDownloadIndividualQR(card)}
                          title="Download QR Code"
                          className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          <FaDownload />
                        </button>
                        <button
                          onClick={() => handleDeleteQR(card.id)}
                          title="Delete QR Code"
                          className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white"
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      title="Delete Card"
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No cards found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="btn btn-sm"
        >
          Previous
        </button>
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="btn btn-sm"
        >
          Next
        </button>
      </div>

      {showQrModal && (
        <QrCodeGeneratorModal
          isOpen={showQrModal}
          onClose={() => setShowQrModal(false)}
          initialStartCode={qrModalInitialStartCode}
          initialEndCode={qrModalInitialEndCode}
          productId={product?.id}
        />
      )}
    </div>
  );
};

export default QrCodesPage;
