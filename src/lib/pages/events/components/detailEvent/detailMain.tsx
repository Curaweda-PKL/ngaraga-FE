import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  } | null;
}

const MainContent: React.FC<MainContentProps> = ({ eventData }) => {
  const [activeTab, setActiveTab] = useState<"description" | "benefit">("description");
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [claimedRewards, setClaimedRewards] = useState<{ [key: number]: string | null }>({});

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

  // Only render guest details if at least one guest detail is available.
  const hasGuest =
    eventData?.eventSpecialGuestName ||
    eventData?.eventSpecialGuestOccupation ||
    eventData?.eventSpecialGuestImage;

  const description =
    eventData?.eventDescription || "Step into a world of elegance and charm...";

  const handleClaimReward = async (cardId: number) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/cardRewards/${cardId}/generateClaimLink`,
        {},
        { withCredentials: true }
      );
      if (response.data.claimUrl) {
        setClaimedRewards((prev) => ({
          ...prev,
          [cardId]: response.data.claimUrl,
        }));
      }
    } catch (error) {
      console.error("Error claiming reward", error);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 py-4 sm:py-8 ">
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
                  activeTab === "description" ? "border-b-2 border-yellow-500 text-black font-medium" : "text-gray-400"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("benefit")}
                className={`text-lg pb-2 whitespace-nowrap ${
                  activeTab === "benefit" ? "border-b-2 border-yellow-500 text-black font-medium" : "text-gray-400"
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
            <div className="space-y-4">
              {eventData?.cardRewards?.length ? (
                eventData.cardRewards.map((reward) => (
                  <div key={reward.id} className="border border-gray-300 rounded-lg p-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                        <img
                          src={`${SERVER_URL}/${reward.image}`}
                          alt={reward.characterName}
                          className="w-20 h-20 rounded-lg object-contain"
                        />
                        <div>
                          <h4 className="text-lg font-semibold">{reward.characterName}</h4>
                          <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: reward.cardDetail }} />
                        </div>
                      </div>
                      <div className="w-full sm:w-auto mt-4 sm:mt-0">
                        {claimedRewards[reward.id] ? (
                          <a
                            href={claimedRewards[reward.id]!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full sm:w-auto text-center bg-green-600 text-white px-4 py-2 rounded-lg"
                          >
                            Open Reward
                          </a>
                        ) : reward.isClaimable ? (
                          <button
                            className="w-full sm:w-auto bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                            onClick={() => handleClaimReward(reward.id)}
                          >
                            Claim
                          </button>
                        ) : (
                          <button
                            className="w-full sm:w-auto bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                            disabled
                          >
                            Claim
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center md:text-left">No benefits available.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {isShareModalOpen && (
        <ShareModal onClose={() => setShareModalOpen(false)} isOpen={isShareModalOpen} />
      )}
    </div>
  );
};

export default MainContent;
