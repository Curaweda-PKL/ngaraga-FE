import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";
import Cards from "./cards";
import SpecialCards from "./specialcard";
import Purchases from "./purchases";
import { Card } from "./types";
import { specialCardData, purchaseData } from "./data";

// Custom icon when no owned cards are found – a card outline with a sad face.
const NoOwnedCardsIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Card outline */}
    <rect x="8" y="12" width="48" height="40" rx="4" ry="4" />
    {/* Eyes */}
    <circle cx="22" cy="30" r="3" fill="currentColor" />
    <circle cx="42" cy="30" r="3" fill="currentColor" />
    {/* Frowning mouth */}
    <path d="M22 42 q10 8 20 0" />
  </svg>
);

export const CardSection = () => {
  // Tab state: "cards", "specialCards", or "purchases"
  const [activeTab, setActiveTab] = useState<"cards" | "specialCards" | "purchases">("cards");
  const [activeFilter, setActiveFilter] = useState<"All" | "Payment" | "Packaging" | "Shipping" | "Delivered">("All");
  const [ownedCards, setOwnedCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Flag to indicate the API returned a message about no owned cards.
  const [noCardsFound, setNoCardsFound] = useState<boolean>(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Replace with actual user id from your auth context or props.
  const userId = "123";

  const filteredPurchaseData =
    activeFilter === "All"
      ? purchaseData
      : purchaseData.filter((purchase) => purchase.status === activeFilter);

  // Fetch owned cards when the "cards" tab is active.
  useEffect(() => {
    if (activeTab === "cards") {
      const fetchOwnedCards = async () => {
        setLoading(true);
        try {
          // Use validateStatus so that 404 responses are not treated as errors.
          const response = await axios.get(`${SERVER_URL}/api/owned/user/${userId}`, {
            validateStatus: (status) => status < 500,
            withCredentials: true,
          });
          if (response.status === 404 && response.data.message === "No owned cards found for this user") {
            setNoCardsFound(true);
            setOwnedCards([]);
          } else if (response.status >= 200 && response.status < 300) {
            setNoCardsFound(false);
            setOwnedCards(response.data);
          } else {
            setError("Failed to fetch owned cards. Please try again later.");
          }
          setError(null);
        } catch (err) {
          setError("Failed to fetch owned cards. Please try again later.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchOwnedCards();
    }
  }, [activeTab, userId]);

  return (
    <div className="w-full mb-10 px-4 sm:px-6">
      {/* Tabs */}
      <div
        className="flex items-center justify-start space-x-4 sm:space-x-8 border-b border-gray-700 pb-4 mb-8 overflow-x-auto"
        ref={tabsRef}
      >
        <div className="relative">
          <button
            className={`tab-cards text-sm sm:text-lg font-semibold whitespace-nowrap ${
              activeTab === "cards" ? "text-[#2B2B2B]" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("cards")}
          >
            Card ({ownedCards.length})
          </button>
          {activeTab === "cards" && (
            <div className="absolute bottom-[-16px] left-0 right-0 h-[2px] bg-[#2B2B2B]" />
          )}
        </div>

        <div className="relative">
          <button
            className={`tab-specialCards text-sm sm:text-lg font-semibold whitespace-nowrap ${
              activeTab === "specialCards" ? "text-[#2B2B2B]" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("specialCards")}
          >
            Special Card ({specialCardData.length})
          </button>
          {activeTab === "specialCards" && (
            <div className="absolute bottom-[-16px] left-0 right-0 h-[2px] bg-[#2B2B2B]" />
          )}
        </div>

        <div className="relative">
          <button
            className={`tab-purchases text-sm sm:text-lg font-semibold whitespace-nowrap ${
              activeTab === "purchases" ? "text-[#2B2B2B]" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("purchases")}
          >
            Purchase ({purchaseData.length})
          </button>
          {activeTab === "purchases" && (
            <div className="absolute bottom-[-16px] left-0 right-0 h-[2px] bg-[#2B2B2B]" />
          )}
        </div>
      </div>

      {/* Filter Buttons for Purchases */}
      {activeTab === "purchases" && (
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-6">
          {["All", "Payment", "Packaging", "Shipping", "Delivered"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as any)}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium ${
                activeFilter === filter
                  ? "bg-call-to-action-100 text-call-to-action border-2 border-call-to-action"
                  : "bg-gray-50 text-gray-600 border border-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      {/* Render current tab */}
      {activeTab === "cards" && (
        <>
          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : noCardsFound ? (
            <div className="flex flex-col items-center justify-center py-10">
              <NoOwnedCardsIcon />
              <p className="mt-4 text-gray-500">
                No owned cards found for this user. Start collecting now!
              </p>
            </div>
          ) : ownedCards.length === 0 ? (
            <div className="text-center py-10">No cards to display.</div>
          ) : (
            <Cards data={ownedCards} />
          )}
        </>
      )}
      {activeTab === "specialCards" && <SpecialCards data={specialCardData} />}
      {activeTab === "purchases" && <Purchases data={filteredPurchaseData} />}
    </div>
  );
};
