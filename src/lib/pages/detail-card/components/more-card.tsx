import React from "react";

interface CardProps {
  title: string;
  price: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({title, price, imageUrl}) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={imageUrl}
          alt={title}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm text-gray-500">Orbitian</p>
        <div className="card-actions justify-start">
          <span className="text-lg font-semibold">Price: {price}</span>
        </div>
      </div>
    </div>
  );
};

export const MoreCards: React.FC = () => {
  const cardsData = [
    {
      title: "Foxy Life",
      price: "Rp 200.000",
      imageUrl: "https://via.placeholder.com/300?text=Foxy+Life",
    },
    {
      title: "Cat from Future",
      price: "Rp 200.000",
      imageUrl: "https://via.placeholder.com/300?text=Cat+from+Future",
    },
    {
      title: "Psycho Dog",
      price: "Rp 200.000",
      imageUrl: "https://via.placeholder.com/300?text=Psycho+Dog",
    },
    {
      title: "Designer Bear",
      price: "Rp 200.000",
      imageUrl: "https://via.placeholder.com/300?text=Designer+Bear",
    },
    {
      title: "Dancing Robot 0375",
      price: "Rp 200.000",
      imageUrl: "https://via.placeholder.com/300?text=Dancing+Robot+0375",
    },
    {
      title: "Dancing Robot 0356",
      price: "Rp 200.000",
      imageUrl: "https://via.placeholder.com/300?text=Dancing+Robot+0356",
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">More Card</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            price={card.price}
            imageUrl={card.imageUrl}
          />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button className="btn btn-primary">More Card</button>
      </div>
    </div>
  );
};
