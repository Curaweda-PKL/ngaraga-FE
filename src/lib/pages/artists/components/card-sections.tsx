import {useState} from "react";

const cardData = [
  {
    id: 1,
    title: "Distant Galaxy",
    creator: "Animakid",
    image: "/src/assets/img/Distant-Galaxy.png",
    price: "Rp. 200.000",
  },
  {
    id: 2,
    title: "Life On Edena",
    creator: "Animakid",
    image: "/src/assets/img/LifeonEdena.png",
    price: "Rp. 300.000",
  },
  {
    id: 3,
    title: "AstroFiction",
    creator: "Animakid",
    image: "/src/assets/img/AstroFiction.png",
    price: "Rp. 200.000",
  },
];

const specialCardData = [
  {
    id: 1,
    title: "Cosmic Symphony",
    creator: "NebulaKid",
    image: "/src/assets/img/Cosmic-Symphony.png",
    price: "Rp. 500.000",
  },
];

export const CardContentSection = () => {
  const [activeTab, setActiveTab] = useState<"cards" | "specialCards">("cards");

  const currentData = activeTab === "cards" ? cardData : specialCardData;

  return (
    <div className="w-full py-12">
      {/* Tabs */}
      <div className="flex justify-center space-x-8 border-b border-gray-700 pb-4 mb-8">
        <button
          className={`text-lg font-semibold ${
            activeTab === "cards"
              ? "text-[#A3A3A3] border-b-2 border-purple-500"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("cards")}
        >
          Card{" "}
          <span className="text-sm text-[#A3A3A3]">({cardData.length})</span>
        </button>
        <button
          className={`text-lg font-semibold ${
            activeTab === "specialCards"
              ? "text-[#A3A3A3] border-b-2 border-purple-500"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("specialCards")}
        >
          Special Card{" "}
          <span className="text-sm text-[#A3A3A3]">
            ({specialCardData.length})
          </span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 px-6 md:grid-cols-3">
        {currentData.map((card) => (
          <div
            key={card.id}
            className="w-full flex flex-col items-start gap-4 bg-[#F2F2F2] rounded-2xl shadow-xl transition-transform hover:scale-[1.02]"
          >
            <figure className="w-full rounded-t-2xl overflow-hidden">
              {card.image ? (
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-[260px] object-cover"
                />
              ) : (
                <div className="w-full h-[260px] flex items-center justify-center bg-[#3B3B3B] text-gray-400 rounded-t-2xl" />
              )}
            </figure>
            <div className="p-6 flex flex-col items-start gap-2 w-full">
              <h3 className="text-2xl font-bold text-[#171717] font-[Poppins]">
                {card.title}
              </h3>
              <span className="text-base text-[#404040] font-[Nunito]">
                {card.creator}
              </span>
              <span className="text-base text-[#404040] font-[Nunito]">
                  {card.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
