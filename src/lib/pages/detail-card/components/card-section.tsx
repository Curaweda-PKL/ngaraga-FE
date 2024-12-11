import {useState} from "react";

export const cardData = [
  {
    id: 1,
    title: "Foxy Life",
    creator: "Orbitian",
    image: "/src/assets/img/foxy-life.png",
    price: "Rp 200.000",
  },
  {
    id: 2,
    title: "Cat from Future",
    creator: "Orbitian",
    image: "/src/assets/img/cat-from-future.png",
    price: "Rp 200.000",
  },
  {
    id: 3,
    title: "Psycho Dog",
    creator: "Orbitian",
    image: "/src/assets/img/psycho-dog.png",
    price: "Rp 200.000",
  },
  {
    id: 4,
    title: "Designer Bear",
    creator: "Orbitian",
    image: "/src/assets/img/designer-bear.png",
    price: "Rp 200.000",
  },
  {
    id: 5,
    title: "Dancing Robot 0375",
    creator: "Orbitian",
    image: "/src/assets/img/dancing-robot-0375.png",
    price: "Rp 200.000",
  },
  {
    id: 6,
    title: "Dancing Robot 0356",
    creator: "Orbitian",
    image: "/src/assets/img/dancing-robot-0356.png",
    price: "Rp 200.000",
  },
];

export const CardSection = () => {
  return (
    <div className="w-full py-12">
      {/* Header */}
      <div className="flex justify-between items-center px-6">
        <h2 className="text-3xl font-bold text-[#171717]">More Card</h2>
        <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition">
          More Card
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 px-6 mt-8 md:grid-cols-3">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="w-full flex flex-col items-start gap-4 bg-[#F2F2F2] rounded-2xl shadow-xl transition-transform hover:scale-[1.02]"
          >
            <figure className="w-full rounded-t-2xl overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-[260px] object-cover"
              />
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
