// todo: dischange foto

import React from "react";
import dog from "@/assets/img/dogpng.png";
import mushroom from "@/assets/img/mushroom.png";
import robotai from "@/assets/img/robotai.png";

interface Card {
  id: number;
  title: string;
  creator: string;
  avatar: string;
  image: string;
  price: string;
}

export const DiscoverMoreCards: React.FC = () => {
  const discoverData: Card[] = [
    {
      id: 1,
      title: "Distant Galaxy",
      creator: "MoonDancer",
      avatar:
        "https://www.shutterstock.com/image-photo/cartoon-artistic-image-goku-dragonball-260nw-2540516459.jpg",
      image: dog,
      price: "Rp. 200.000",
    },
    {
      id: 2,
      title: "Life On Edena",
      creator: "NebulaKid",
      avatar:
        "https://www.shutterstock.com/image-photo/cartoon-artistic-image-goku-dragonball-260nw-2540516459.jpg",
      image: mushroom,
      price: "Rp. 300.000",
    },
    {
      id: 3,
      title: "AstroFiction",
      creator: "Spaceone",
      avatar:
        "https://www.shutterstock.com/image-photo/cartoon-artistic-image-goku-dragonball-260nw-2540516459.jpg",
      image: robotai,
      price: "Rp. 200.000",
    },
  ];

  return (
    <div className="flex items-center justify-center text-white">
      <div className="flex flex-col items-center bg-transparent border border-transparent gap-8 max-w-6xl w-full rounded-xl overflow-hidden">
        {/* Text Section */}
        <div className="flex items-center justify-between w-full p-8">
          <div className="flex flex-col items-start gap-8">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Discover More Cards
            </h2>
            <p className="text-sm text-white md:text-base">
              Explore New Trending Cards
            </p>
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
            See All
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3 w-full px-8">
          {discoverData.map((card) => (
            <div
              key={card.id}
              className="w-full flex flex-col items-start gap-[15px] shadow-xl rounded-lg transition-transform hover:scale-[1.02]"
            >
              <figure className="w-full">
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-[200px] flex items-center justify-center bg-gray-700 text-gray-400 rounded-t-lg">
                    No Image Available
                  </div>
                )}
              </figure>
              <div className="p-4 flex flex-col gap-4 w-full">
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={card.avatar}
                      alt={card.creator}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-400">
                      {card.creator}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">{card.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
