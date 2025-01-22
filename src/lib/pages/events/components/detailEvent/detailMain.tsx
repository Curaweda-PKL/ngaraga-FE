import React, { useState } from "react";
import { ClockIcon } from "../svgsIcon/clockIcon";
import { DateIcon } from "../svgsIcon/dateIcon";
import { LocationIcon } from "../svgsIcon/locationIcon";
import { DiscordIcon } from "../svgsIcon/discordIcon";
import { IgIcon } from "../svgsIcon/igIcon";
import { CopyIcon } from "../svgsIcon/copyIcon";
import { WaIcon } from "../svgsIcon/waIcon";

const MainContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"description" | "benefit">(
    "description"
  );

  return (
    <main className="container p-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Content */}
        <div className="flex-1">
          <h1 className="text-4xl mb-4">A Special Evening Celebration</h1>

          {/* Schedule Section */}
          <div className="mb-6">
            <h3 className="text-lg mb-2">Schedule</h3>
            <ul className="text-gray-700">
              <li className="flex items-center gap-2 mb-2">
                <ClockIcon />
                10:00 AM - 10:00 PM
              </li>
              <li className="flex items-center gap-2 mb-2">
                <DateIcon />
                07 Dec 2024
              </li>
              <li className="flex items-center gap-2">
                <LocationIcon  />
                Jakarta
              </li>
            </ul>
          </div>

          {/* Special Guest */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">Special Guest</h3>
            <div className="flex items-center gap-4">
              <img
                src="https://via.placeholder.com/60"
                alt="Guest"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h4 className="text-md font-semibold">Allison Torff</h4>
                <p className="text-gray-500">Founder Ngaraga</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg mb-4">Share Event</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-black transition">
                <span>
                  <DiscordIcon />
                </span>
              </a>
              <a href="#" className="text-gray-500 hover:text-black transition">
                <span>
                  <IgIcon />
                </span>
              </a>
              <a href="#" className="text-gray-500 hover:text-black transition">
                <span>
                  <CopyIcon />
                </span>
              </a>
              <a href="#">
                <span>
                  <WaIcon />
                </span>
              </a>
            </div>
          </div>

          {/* Button */}
          <div className="mt-8">
            <a href="/register-events">
              <button className="bg-call-to-actions-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-call-to-actions-800 transition">
                Register Now
              </button>
            </a>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1">
          {/* Tabs */}
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

          {/* Tab Content */}
          {activeTab === "description" ? (
            <div>
              <p className="text-gray-700 leading-relaxed mb-4 break-words">
                Step into a world of elegance and charm at A Special Evening
                Celebration. This exclusive event invites you to indulge in an
                enchanting night of sophistication, entertainment, and memorable
                experiences.
              </p>
              <p className="text-gray-700 leading-relaxed break-words pr-2">
                Held in the breathtaking ambiance of The Grand Ballroom, Elite
                Hotel, Jakarta, this event is not just a gathering; it's a
                journey of delight.
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between border border-gray-300 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReM-MbSm6AmKwDWD2d_OY2W67Q7URJJa4YvA&s"
                  alt="Card"
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold">Dancing Robot 0512</h4>
                  <p className="text-gray-500">Orbitian</p>
                </div>
              </div>
              <button className="bg-neutral-colors-300 text-neutral-colors-500 px-4 py-2 mt-8 rounded-lg">
                Klaim
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MainContent;
