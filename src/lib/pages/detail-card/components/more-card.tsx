import React from "react";

export const CardCollection: React.FC = () => {
  type Cards = {
    imageUrl: string;
    title: string;
    subtitle: string;
    price: string;
  };

  const cards: Cards[] = [
    {
      imageUrl: "https://via.placeholder.com/150",
      title: "Magic Mushroom 0324",
      subtitle: "Shroomie",
      price: "Rp 200.000",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      title: "Happy Robot 032",
      subtitle: "BeKind2Robots",
      price: "Rp 200.000",
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      title: "Happy Robot 024",
      subtitle: "BeKind2Robots",
      price: "Rp 200.000",
    },
  ];

  return (
    <div className="container py-10">
      {/* Header Section */}
      <div className="mb-8 pl-0 ml-[4rem]">
        <h1 className="text-3xl font-bold mb-2 text-left">
          Distant Galaxy Special
        </h1>
        <p className="text-sm text-gray-700 mb-4 text-left">
          Minted on Sep 30, 2022
        </p>
        <p className="text-lg font-medium mb-4 text-left">
          Own the cards below for the special card
        </p>
      </div>

      {/* Cards Section */}
      <div className="max-w-7xl ml-[4rem] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-0">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-row items-start bg-gray-100 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full h-[150px] px-0 py-0"
          >
            {/* Image Section */}
            <div className="flex-shrink-0 w-2/5 h-full">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>

            {/* Text Section */}
            <div className="text-left pl-4 w-3/5 h-full flex flex-col justify-center">
              <h2 className="text-lg font-semibold mb-1">{card.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{card.subtitle}</p>
              <p className="text-lg font-bold">{card.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

