import React, {useState} from "react";

const EventDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"description" | "benefit">(
    "description"
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff] text-[#212529]">
      {/* Header Section */}
      <header
        className="relative w-full h-80 bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://via.placeholder.com/1280x500?text=Event+Image')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </header>

      {/* Content Section */}
      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">
              A Special Evening Celebration
            </h1>

            {/* Schedule Section */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Schedule</h3>
              <ul className="text-gray-700 leading-relaxed">
                <li className="flex items-center gap-2">
                  <span>⏰</span> 08.00 - 20.00
                </li>
                <li className="flex items-center gap-2">
                  <span>📅</span> 07 Dec 2024
                </li>
                <li className="flex items-center gap-2">
                  <span>📍</span> Jakarta
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

            {/* Button */}
            <div className="mt-8">
              <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition">
                Register Now
              </button>
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
                <p className="text-gray-700 leading-relaxed mb-4">
                  Step into a world of elegance and charm at A Special Evening
                  Celebration. This exclusive event invites you to indulge in an
                  enchanting night of sophistication, entertainment, and
                  memorable experiences. Designed to bring together
                  extraordinary individuals in a luxurious setting, this
                  celebration promises a perfect escape from the ordinary.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Held in the breathtaking ambiance of The Grand Ballroom, Elite
                  Hotel, Jakarta, this event is not just a gathering; it's a
                  journey of delight. From the moment you arrive, you'll be
                  greeted with impeccable hospitality, mesmerizing decor, and a
                  curated itinerary to ensure every moment is magical.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By attending this event, you will enjoy exclusive benefits
                  including:
                </p>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Networking opportunities with industry leaders.</li>
                  <li>Live performances by top-tier artists.</li>
                  <li>Gourmet dining and premium beverages.</li>
                  <li>A luxurious ambiance in the heart of Jakarta.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Share Event Section */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-bold mb-4">Share Event</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-500 hover:text-black transition"
            >
              <span>🐦</span> Twitter
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-black transition"
            >
              <span>📸</span> Instagram
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-black transition"
            >
              <span>💬</span> WhatsApp
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-black transition"
            >
              <span>🌐</span> Website
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetail;
