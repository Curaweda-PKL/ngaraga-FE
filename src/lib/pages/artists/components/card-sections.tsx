import { useState, useRef, useEffect } from "react";

const cardData = [
  {
    id: 1,
    title: "Distant Galaxy",
    creator: "Animakid",
    image: "/src/assets/img/Distant-Galaxy.png",
    price: "Rp. 200.000",
  },
];

const specialCardData = [
  {
    id: 1,
    title: "Cosmic Symphony",
    creator: "NebulaKid",
    image: "/src/assets/img/Distant-Galaxy.png",
  },
];

export const CardContentSection = () => {
  const [activeTab, setActiveTab] = useState<"cards" | "specialCards">("cards");
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const tabsRef = useRef<HTMLDivElement>(null);

  const currentData = activeTab === "cards" ? cardData : specialCardData;

  useEffect(() => {
    const activeButton = tabsRef.current?.querySelector(
      activeTab === "cards" ? ".tab-cards" : ".tab-specialCards"
    ) as HTMLButtonElement;

    if (activeButton) {
      setUnderlineStyle({
        width: activeButton.offsetWidth,
        left: activeButton.offsetLeft - 35, 
      });
    }
  }, [activeTab]);

  return (
    <div className="w-full mb-10">
      {/* Tabs */}
      <div
        className="relative flex items-center justify-start pl-16 space-x-8 border-b border-gray-700 pb-4 mb-8"
        ref={tabsRef}
      >
        <button
          className={`tab-cards text-lg font-semibold ${
            activeTab === "cards" ? "text-[#2B2B2B]" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("cards")}
        >
          Card{" "}
          <span
            className={`text-lg px-3 py-1 rounded-full ${
              activeTab === "cards"
                ? "bg-[--old-primary] text-white"
                : "bg-gray-400 text-gray-800"
            }`}
          >
            ({cardData.length})
          </span>
        </button>

        <button
          className={`tab-specialCards text-lg font-semibold ${
            activeTab === "specialCards" ? "text-[#2B2B2B]" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("specialCards")}
        >
          Special Card{" "}
          <span
            className={`text-lg px-3 py-1 rounded-full ${
              activeTab === "specialCards"
                ? "bg-[--old-primary] text-white"
                : "bg-gray-400 text-gray-800"
            }`}
          >
            ({specialCardData.length})
          </span>
        </button>

        {/* Dynamic Underline */}
        <div
          className="absolute bottom-0 h-[2px] bg-[#2B2B2B] transition-all duration-300"
          style={{ width: underlineStyle.width, left: underlineStyle.left }}
        />
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 px-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {currentData.map((card) => (
          <div
            key={card.id}
            className="w-full h-[400px] flex flex-col items-start gap-4 bg-[#F2F2F2] rounded-2xl shadow-xl transition-transform hover:scale-[1.02] lg:w-[90%] md:w-full sm:w-full"
          >
            <figure className="w-full h-[260px] rounded-t-2xl overflow-hidden">
              {card.image ? (
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#3B3B3B] text-gray-400 rounded-t-2xl" />
              )}
            </figure>
            <div className="p-6 flex flex-col items-start gap-2 w-full flex-grow">
              <h3 className="text-2xl font-bold text-[#171717] font-[Poppins]">
                {card.title}
              </h3>
              <span className="text-base text-[#404040] font-[Nunito]">
                {card.creator}
              </span>
              {activeTab === "cards" && (
                <span className="text-base text-[#404040] font-[Nunito]">
                  {card.price}
                </span>
              )}
            </div>
            {activeTab === "specialCards" && (
              <div className="w-full px-4 pb-4 flex justify-between items-center">
                <span className="text-sm text-gray-800 font-semibold bg-white px-3 py-1 rounded-lg shadow">
                  0/4
                </span>
                <button className="bg-[#1E90FF] text-white text-sm font-semibold px-4 py-2 rounded-lg shadow hover:bg-[#1C86EE]">
                  Achieve
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
