import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";
import Cards from "./cards";
import SpecialCards from "./specialcard";
import SpecialCardDetail from "../../specialcard-details";
import Purchases from "./purchases";
import { Card, SpecialCard } from "./types";
import { purchaseData } from "./data";

export const CardSections: React.FC = () => {
  // Tab state: "cards", "specialCards", or "purchases"
  const [activeTab, setActiveTab] = useState<"cards" | "specialCards" | "purchases">("cards");
  const [activeFilter, setActiveFilter] = useState<"All" | "Payment" | "Packaging" | "Shipping" | "Delivered">("All");
  const [ownedCards, setOwnedCards] = useState<Card[]>([]);
  const [specialCards, setSpecialCards] = useState<SpecialCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSpecialCards, setLoadingSpecialCards] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorSpecialCards, setErrorSpecialCards] = useState<string | null>(null);
  const [claimError, setClaimError] = useState<string | null>(null);
  const [claimingCardId, setClaimingCardId] = useState<number | null>(null);
  const [noCardsFound, setNoCardsFound] = useState<boolean>(false);
  // State for selected special card detail (null means list view)
  const [selectedSpecialCard, setSelectedSpecialCard] = useState<SpecialCard | null>(null);
  
  // Authenticated user data fetched from /api/me.
  const [user, setUser] = useState<{ id: number } | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Fetch the current user.
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/me`, { withCredentials: true });
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };
    fetchUser();
  }, []);

  // Filter purchase data based on active filter.
  const filteredPurchaseData =
    activeFilter === "All"
      ? purchaseData
      : purchaseData.filter((purchase) => purchase.status === activeFilter);

// Fetch owned cards for the "cards" tab.
useEffect(() => {
  if (activeTab === "cards" && user) {
    const fetchOwnedCards = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${SERVER_URL}/api/owned/user/${user.id}`, {
          validateStatus: (status) => status < 500,
          withCredentials: true,
        });
        if (
          response.status === 404 &&
          response.data.message === "No owned cards found for this user"
        ) {
          setNoCardsFound(true);
          setOwnedCards([]);
        } else if (response.status >= 200 && response.status < 300) {
          setNoCardsFound(false);
          // Update here: use response.data.cards since your response is { cards: [...] }
          setOwnedCards(response.data.cards);
          setError(null);
        } else {
          setError("Failed to fetch owned cards. Please try again later.");
        }
      } catch (err) {
        console.error("Error fetching owned cards:", err);
        setError("Failed to fetch owned cards. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOwnedCards();
  }
}, [activeTab, user]);


  // Fetch special cards as soon as a user is available.
  useEffect(() => {
    if (user) {
      const fetchSpecialCards = async () => {
        setLoadingSpecialCards(true);
        try {
          const response = await axios.get(`${SERVER_URL}/api/owned/special`, { withCredentials: true });
          setSpecialCards(response.data.cards);
          setErrorSpecialCards(null);
        } catch (err) {
          // If error is a 404 with "No special cards found", treat it as an empty list
          if (axios.isAxiosError(err) && err.response?.status === 404 && err.response.data.message === "No special cards found") {
            setSpecialCards([]);
            setErrorSpecialCards(null);
          } else {
            console.error("Error fetching special cards:", err);
            setErrorSpecialCards("Failed to fetch special cards. Please try again later.");
          }
        } finally {
          setLoadingSpecialCards(false);
        }
      };
      fetchSpecialCards();
    }
  }, [user]);
  

  // Handler to claim a special card.
  const handleClaimSpecialCard = async (card: SpecialCard) => {
    if (card.claimStatus !== "eligible") return;
    setClaimingCardId(card.id);
    setClaimError(null);
    try {
      await axios.post(
        `${SERVER_URL}/api/special-cards/claim`,
        { cardId: card.id },
        { withCredentials: true }
      );
      // Refresh the special cards after a successful claim.
      const response = await axios.get(`${SERVER_URL}/api/owned/special`, { withCredentials: true });
      setSpecialCards(response.data.cards);
    } catch (err) {
      console.error("Error claiming special card:", err);
      setClaimError("Failed to claim special card. Please try again later.");
    } finally {
      setClaimingCardId(null);
    }
  };

  return (
    <div className="w-full mb-10 px-4 sm:px-6">
      {/* Tabs */}
      <div
        className="flex items-center justify-start space-x-4 sm:space-x-8 border-b border-gray-700 pb-4 mb-8 overflow-x-auto ml-4"
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
            onClick={() => {
              setActiveTab("specialCards");
              setSelectedSpecialCard(null);
            }}
          >
            Special Card ({specialCards.length})
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
            // Wrap the ownedCards array into an object (grouped under "All") to match the expected prop type.
<Cards data={{ All: Array.isArray(ownedCards) ? ownedCards : [] }} />
          )}
        </>
      )}

      {activeTab === "specialCards" && (
        <>
          {loadingSpecialCards ? (
            <div className="text-center py-10">Loading special cards...</div>
          ) : errorSpecialCards ? (
            <div className="text-center py-10 text-red-500">{errorSpecialCards}</div>
          ) : selectedSpecialCard ? (
            <SpecialCardDetail
              specialCardId={selectedSpecialCard.id}
              onBack={() => setSelectedSpecialCard(null)}
            />
          ) : (
            <>
              {claimError && (
                <div className="text-center py-4 text-red-500">{claimError}</div>
              )}
              <SpecialCards
                data={specialCards}
                onCardClick={(card) => setSelectedSpecialCard(card)}
                onClaim={handleClaimSpecialCard}
                claimingCardId={claimingCardId}
              />
            </>
          )}
        </>
      )}

      {activeTab === "purchases" && <Purchases data={filteredPurchaseData} />}
    </div>
  );
};

// A simple icon component for when no owned cards are found.
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
    <rect x="8" y="12" width="48" height="40" rx="4" ry="4" />
    <circle cx="22" cy="30" r="3" fill="currentColor" />
    <circle cx="42" cy="30" r="3" fill="currentColor" />
    <path d="M22 42 q10 8 20 0" />
  </svg>
);

