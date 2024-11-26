export const TrendingCards = () => {
  const trendingData = [
    {
      id: 1,
      title: "DSGN Animals",
      creator: "MrFox",
      image: "/api/placeholder/400/400",
    },
    {
      id: 2,
      title: "Magic Mushrooms",
      creator: "Shroomie",
      image: "/api/placeholder/400/400",
    },
    {
      id: 3,
      title: "Disco Machines",
      creator: "BeKind2Robots",
      image: "/api/placeholder/400/400",
    },
  ];

  return (
    <div className="flex items-center justify-center text-white ">
      <div className="flex flex-col items-center bg-transparent border border-transparent gap-8 max-w-6xl w-full rounded-xl overflow-hidden">
        {/* Text Section */}
        <div className="flex flex-col items-center lg:items-start gap-8 w-full p-8">
          <h2 className="text-3xl font-bold text-center lg:text-left text-white md:text-4xl">
            Trending Cards
          </h2>
          <p className="text-sm text-center lg:text-left text-white md:text-base">
            Checkout Our Weekly Updated Trending Collection.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3 w-full px-8">
          {trendingData.map((card) => (
            <div
              key={card.id}
              className="overflow-hidden rounded-2xl bg-[#3B3B3B] transition-transform hover:scale-[1.02]"
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-white mb-2 text-xl font-bold text-transparent">
                  {card.title}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-purple-600" />
                  <span className="text-sm text-gray-400">{card.creator}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
