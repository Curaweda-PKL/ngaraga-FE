import React from "react";

type Card = {
  id: number;
  title: string;
  creator: string;
  image: string;
  price?: string;
};

const cardData: Card[] = [
  {
    id: 1,
    title: "Distant Galaxy",
    creator: "Animakid",
    image: "/src/assets/img/Distant-Galaxy.png",
    price: "Rp. 200.000",
  },
  {
    id: 1,
    title: "Distant Galaxy",
    creator: "Animakid",
    image: "/src/assets/img/Distant-Galaxy.png",
    price: "Rp. 200.000",
  },  {
    id: 1,
    title: "Distant Galaxy",
    creator: "Animakid",
    image: "/src/assets/img/Distant-Galaxy.png",
    price: "Rp. 200.000",
  },  {
    id: 1,
    title: "Distant Galaxy",
    creator: "Animakid",
    image: "/src/assets/img/Distant-Galaxy.png",
    price: "Rp. 200.000",
  },
];

export const MarketplaceCardSection:React.FC = () => {
  return (
    <div className="w-full mb-10 lg:ml-8">
      {/* Cards Grid */}
      <div className="grid gap-6 px-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {cardData.map((card) => (
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
              {card.price && (
                <span className="text-base text-[#404040] font-[Nunito]">
                  {card.price}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
