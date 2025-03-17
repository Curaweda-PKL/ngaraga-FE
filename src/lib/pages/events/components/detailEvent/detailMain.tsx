import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";
import { ClockIcon } from "../svgsIcon/clockIcon";
import { CopyIcon } from "../svgsIcon/copyIcon";
import { DateIcon } from "../svgsIcon/dateIcon";
import { DiscordIcon } from "../svgsIcon/discordIcon";
import { IgIcon } from "../svgsIcon/igIcon";
import { LocationIcon } from "../svgsIcon/locationIcon";
import { WaIcon } from "../svgsIcon/waIcon";
import ShareModal from "./shareModal";

interface Reward {
  id: number;
  image: string;
  characterName: string;
  cardDetail: string;
  isClaimable?: boolean;
  isClaimed?: boolean;
}

interface CardClaim {
  id: number;
  userId: string;
  eventId: string;
  cardRewardId: number;
  claimedCardId?: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  claimedCard?: any;
  cardReward?: Reward;
}

interface MainContentProps {
  eventData?: {
    id: string;
    eventName: string;
    eventTime: string;
    eventDate: string;
    eventType: string;
    onlineZoomLink: string;
    offlineLocation: string | null;
    eventSpecialGuestName?: string;
    eventSpecialGuestOccupation?: string;
    eventSpecialGuestImage?: string;
    eventDescription: string;
    cardRewards?: Reward[];
    CardClaim?: CardClaim[];
  } | null;
}

// Simple error notification component positioned at top right
const ErrorNotification: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => (
  <div className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50">
    <div className="flex items-center">
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-xl font-bold">
        &times;
      </button>
    </div>
  </div>
);

const MainContent: React.FC<MainContentProps> = ({ eventData }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"description" | "benefit">("description");
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [pendingClaimId, setPendingClaimId] = useState<number | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [claimConfirmed, setClaimConfirmed] = useState(false);
  const [claimToken, setClaimToken] = useState<string | null>(null);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const title = eventData?.eventName || "A Special Evening Celebration";
  const eventTime = eventData
    ? new Date(eventData.eventTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "08:00 - 20:00";
  const eventDate = eventData
    ? new Date(eventData.eventDate).toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" })
    : "07 Dec 2024";

  const locationDisplay =
    eventData?.eventType === "ONLINE" ? (
      <a
        href={eventData.onlineZoomLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        Zoom Meet Link
      </a>
    ) : (
      eventData?.offlineLocation || "Jakarta"
    );

  const hasGuest =
    eventData?.eventSpecialGuestName ||
    eventData?.eventSpecialGuestOccupation ||
    eventData?.eventSpecialGuestImage;

  const description =
    eventData?.eventDescription || "Step into a world of elegance and charm...";

  // On mount, check for token in URL or localStorage and show the modal if found.
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");
    const storedToken = localStorage.getItem("claimToken");

    if (tokenFromUrl) {
      localStorage.setItem("claimToken", tokenFromUrl);
      setClaimToken(tokenFromUrl);
      setShowClaimModal(true);
    } else if (storedToken) {
      setClaimToken(storedToken);
      setShowClaimModal(true);
    }
  }, [location.search]);

  // Function to initiate the claim (GET request)
  const handleInitiateClaim = async () => {
    if (!claimToken) {
      setErrorMessage("No token provided.");
      return;
    }
    try {
      const response = await axios.get(`${SERVER_URL}/api/cardRewards/claim?token=${claimToken}`, {
        withCredentials: true,
      });
      if (response.data.pendingClaimId) {
        setPendingClaimId(response.data.pendingClaimId);
      } else if (response.data.message === "Invalid or expired token.") {
        setErrorMessage(response.data.message);
        localStorage.removeItem("claimToken");
        setClaimToken(null);
        setShowClaimModal(false);
      } else {
        console.error("Failed to create pending claim.");
        setErrorMessage("Failed to create pending claim.");
      }
    } catch (error: any) {
      console.error("Error initiating claim:", error);
      const errMsg = error.response?.data?.message || "Error initiating claim";
      setErrorMessage(errMsg);
    }
  };

  // Handler for confirming claim (POST request)
  const handleConfirmClaim = async () => {
    if (!pendingClaimId) return;
    setIsConfirming(true);
    try {
      await axios.post(
        `${SERVER_URL}/api/cardRewards/confirmClaim`,
        { claimId: pendingClaimId },
        { withCredentials: true }
      );
      setClaimConfirmed(true);
      setPendingClaimId(null);
      localStorage.removeItem("claimToken");
      setShowClaimModal(false);
    } catch (error: any) {
      console.error("Error confirming claim:", error);
      const errMsg = error.response?.data?.message || "Error confirming claim";
      setErrorMessage(errMsg);
    } finally {
      setIsConfirming(false);
    }
  };

  // Option to cancel the claim modal
  const handleCloseModal = () => {
    localStorage.removeItem("claimToken");
    setClaimToken(null);
    setShowClaimModal(false);
  };

  // The modal JSX (can be extracted to its own component)
  const ClaimModal = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
      <div className="bg-white rounded-lg shadow-lg z-10 p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Claim Your Reward</h2>
        <p className="mb-4 text-sm text-gray-600">
          Do you want to claim your event reward? Click "Claim Reward" to initiate the process.
        </p>
        {!pendingClaimId && (
          <button
            onClick={handleInitiateClaim}
            className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 mb-2"
          >
            Claim Reward
          </button>
        )}
        {pendingClaimId && (
          <button
            onClick={handleConfirmClaim}
            disabled={isConfirming}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {isConfirming ? "Confirming..." : "Confirm Claim"}
          </button>
        )}
        <button
          onClick={handleCloseModal}
          className="w-full mt-4 px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  // Determine confirmed claims (if any)
  const confirmedClaims = eventData?.CardClaim?.filter(
    (claim) => claim.status === "confirmed"
  );

  return (
    <div className="w-full px-4 sm:px-6 py-4 sm:py-8">
      {/* Error notification (top right) */}
      {errorMessage && (
        <ErrorNotification message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
      {showClaimModal && <ClaimModal />}
      <div className="flex flex-col md:flex-row mx-auto">
        {/* Left Column */}
        <div className="w-full md:w-1/2 md:pr-6 mb-8 md:mb-0">
          <h1 className="text-2xl sm:text-4xl font-bold mb-6">{title}</h1>
          <div className="mb-8">
            <h3 className="text-xl mb-4">Schedule</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600">
                <ClockIcon />
                {eventTime}
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <DateIcon />
                {eventDate}
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <LocationIcon />
                {locationDisplay}
              </li>
            </ul>
          </div>
          {hasGuest && (
            <div className="mb-8">
              <h3 className="text-xl mb-4">Special Guest</h3>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={
                    eventData?.eventSpecialGuestImage
                      ? `${SERVER_URL}/uploads/event/${eventData.eventSpecialGuestImage}`
                      : "/api/placeholder/48/48"
                  }
                  alt="Guest"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-lg">{eventData?.eventSpecialGuestName}</p>
                  <p className="text-gray-600">{eventData?.eventSpecialGuestOccupation}</p>
                </div>
              </div>
            </div>
          )}
          <Link to={`/register-events/${eventData?.id}`} className="block mb-8">
            <button className="w-full sm:w-auto sm:min-w-[200px] bg-call-to-actions-900 text-white py-3 px-6 rounded-lg font-medium">
              Register Now
            </button>
          </Link>
          <div>
            <h3 className="text-xl mb-4">Share Event</h3>
            <div className="flex gap-4">
              <button onClick={() => setShareModalOpen(true)} className="text-gray-500 hover:text-black">
                <DiscordIcon />
              </button>
              <button onClick={() => setShareModalOpen(true)} className="text-gray-500 hover:text-black">
                <IgIcon />
              </button>
              <button onClick={() => setShareModalOpen(true)} className="text-gray-500 hover:text-black">
                <CopyIcon />
              </button>
              <button onClick={() => setShareModalOpen(true)} className="text-gray-500 hover:text-black">
                <WaIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2">
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            <div className="flex w-full justify-center md:justify-start gap-8">
              <button
                onClick={() => setActiveTab("description")}
                className={`text-lg pb-2 whitespace-nowrap ${
                  activeTab === "description"
                    ? "border-b-2 border-yellow-500 text-black font-medium"
                    : "text-gray-400"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("benefit")}
                className={`text-lg pb-2 whitespace-nowrap ${
                  activeTab === "benefit"
                    ? "border-b-2 border-yellow-500 text-black font-medium"
                    : "text-gray-400"
                }`}
              >
                Benefit
              </button>
            </div>
          </div>

          {activeTab === "description" ? (
            <div className="text-gray-600">
              <p className="px-0 md:px-4" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          ) : (
            // In the Benefit tab, only display the claimed reward if confirmed.
            <div className="space-y-4">
              {confirmedClaims && confirmedClaims.length > 0 ? (
                confirmedClaims.map((claim) => {
                  // Use claim.cardReward if available; otherwise, fallback to find the reward details.
                  const reward =
                    claim.cardReward ||
                    eventData?.cardRewards?.find((r) => r.id === claim.cardRewardId);
                  return (
                    reward && (
                      <div key={reward.id} className="border border-gray-300 rounded-lg p-4 shadow-sm">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                            <img
                          src={
                            reward.image
                              ? `${SERVER_URL}/${reward.image}`
                              : `${SERVER_URL}/src/uploads/card/placeholder.png`
                          }
                              alt={reward.characterName}
                              className="w-20 h-20 rounded-lg object-contain"
                            />
                            <div>
                              <h4 className="text-lg font-semibold">{reward.characterName}</h4>
                              <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: reward.cardDetail }} />
                            </div>
                          </div>
                          <div className="w-full sm:w-auto mt-4 sm:mt-0">
                            <button
                              className="block w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center cursor-default"
                              disabled
                            >
                              <svg
                                className="w-5 h-5 mr-2 text-white animate-bounce"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                              Claimed
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  );
                })
              ) : null}
            </div>
          )}
        </div>
      </div>
      {isShareModalOpen && <ShareModal onClose={() => setShareModalOpen(false)} isOpen={isShareModalOpen} />}
    </div>
  );
};

export default MainContent;
