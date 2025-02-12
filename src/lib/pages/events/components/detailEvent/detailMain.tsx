// MainContent.tsx
import React, { useState } from "react";
import { ClockIcon } from "../svgsIcon/clockIcon";
import { DateIcon } from "../svgsIcon/dateIcon";
import { LocationIcon } from "../svgsIcon/locationIcon";
import { DiscordIcon } from "../svgsIcon/discordIcon";
import { IgIcon } from "../svgsIcon/igIcon";
import { CopyIcon } from "../svgsIcon/copyIcon";
import { WaIcon } from "../svgsIcon/waIcon";
import { Link } from "react-router-dom";
import ShareModal from "./shareModal";

interface Reward {
  id: number;
  image: string;
  characterName: string;
  cardDetail: string;
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
    eventSpecialGuestName: string;
    eventSpecialGuestOccupation: string;
    eventSpecialGuestImage: string;
    eventDescription: string;
    cardRewards?: Reward[];
  } | null;
}

const MainContent: React.FC<MainContentProps> = ({ eventData }) => {
  const [activeTab, setActiveTab] = useState<"description" | "benefit">(
    "description"
  );
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const title = eventData?.eventName || "A Special Evening Celebration";
  const eventTime = eventData
    ? new Date(eventData.eventTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "10:00 AM - 10:00 PM";
  const eventDate = eventData
    ? new Date(eventData.eventDate).toLocaleDateString([], {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "07 Dec 2024";

  // Determine location display (Zoom link if online)
  const locationDisplay =
    eventData && eventData.eventType === "ONLINE" ? (
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

  const guestName = eventData?.eventSpecialGuestName || "Allison Torff";
  const guestOccupation =
    eventData?.eventSpecialGuestOccupation || "Founder Ngaraga";
  const guestImage =
    eventData && eventData.eventSpecialGuestImage
      ? `http://localhost:3000/uploads/event/${eventData.eventSpecialGuestImage}`
      : "https://via.placeholder.com/60";
  const description =
    eventData?.eventDescription ||
    `Step into a world of elegance and charm at A Special Evening Celebration. This exclusive event invites you to indulge in an enchanting night of sophistication, entertainment, and memorable experiences.`;
  const rewards = eventData?.cardRewards || [];

  return (
    <main className="container p-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-4xl mb-4 break-words">{title}</h1>
          <div className="mb-6">
            <h3 className="text-lg mb-2">Schedule</h3>
            <ul className="text-gray-700">
              <li className="flex items-center gap-2 mb-2">
                <ClockIcon />
                {eventTime}
              </li>
              <li className="flex items-center gap-2 mb-2">
                <DateIcon />
                {eventDate}
              </li>
              <li className="flex items-center gap-2">
                <LocationIcon />
                {locationDisplay}
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">Special Guest</h3>
            <div className="flex items-center gap-4">
              <img
                src={guestImage}
                alt="Guest"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h4 className="text-md font-semibold">{guestName}</h4>
                <p className="text-gray-500">{guestOccupation}</p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-lg mb-4">Share Event</h3>
            <div className="flex gap-4">
              {/* Clicking any of these buttons opens the share modal */}
              <button
                onClick={() => setShareModalOpen(true)}
                className="text-gray-500 hover:text-black transition"
              >
                <DiscordIcon />
              </button>
              <button
                onClick={() => setShareModalOpen(true)}
                className="text-gray-500 hover:text-black transition"
              >
                <IgIcon />
              </button>
              <button
                onClick={() => setShareModalOpen(true)}
                className="text-gray-500 hover:text-black transition"
              >
                <CopyIcon />
              </button>
              <button
                onClick={() => setShareModalOpen(true)}
                className="text-gray-500 hover:text-black transition"
              >
                <WaIcon />
              </button>
            </div>
          </div>
          <div className="mt-8">
            <Link to={`/register-events/${eventData?.id}`}>
              <button className="bg-call-to-actions-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-call-to-actions-800 transition">
                Register Now
              </button>
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex gap-8">
              <button
                onClick={() => setActiveTab("description")}
                className={`text-lg font-semibold pb-2 ${
                  activeTab === "description"
                    ? "text-black border-b-2 border-yellow-500"
                    : "text-gray-400"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("benefit")}
                className={`text-lg font-semibold pb-2 ${
                  activeTab === "benefit"
                    ? "text-black border-b-2 border-yellow-500"
                    : "text-gray-400"
                }`}
              >
                Benefit
              </button>
            </nav>
          </div>

          {activeTab === "description" ? (
            <div>
              <p
                className="text-gray-700 leading-relaxed mb-4 break-words"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          ) : (
            <div>
              {rewards.length > 0 ? (
                rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="flex items-center justify-between border border-gray-300 rounded-lg p-4 shadow-sm mb-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={`http://localhost:3000/${reward.image}`}
                        alt={reward.characterName}  
                        className="w-20 h-20 rounded-lg object-contain"
                      />
                      <div>
                        <h4 className="text-lg font-semibold">
                          {reward.characterName}
                        </h4>
                        <p
                          className="text-gray-700 leading-relaxed mb-4 break-words"
                          dangerouslySetInnerHTML={{
                            __html: reward.cardDetail,
                          }}
                        />
                      </div>
                    </div>
                    <button className="bg-neutral-colors-300 text-neutral-colors-500 px-4 py-2 rounded-lg">
                      Claim
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No benefits available.</p>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Render the share modal */}
      <ShareModal isOpen={isShareModalOpen} onClose={() => setShareModalOpen(false)} />
    </main>
  );
};

export default MainContent;
