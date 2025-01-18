export const TrendingCards = () => {
  const trendingData = [
    {
      id: 1,
      title: "DSGN Animals",
      creator: "MrFox",
      image: "https://i.ibb.co.com/rQyy7jc/PASUKAN-SULTAN-MATANGAJI.jpg",
    },
    {
      id: 2,
      title: "Magic Mushroom",
      creator: "Shroomie",
      image: "https://i.ibb.co.com/ZTK4pwT/MAKAN-MALAM-BERSAMA.jpg",
    },
    {
      id: 3,
      title: "Disco Machines",
      creator: "BeKind2Robots",
      image: "https://i.ibb.co.com/1R0ZKpW/DAENDELS-LEGEND.jpg",
    },
  ];

  return (
    <div className="flex items-center justify-center px-4 sm:px-6">
      <div className="flex flex-col items-center bg-transparent border border-transparent gap-8 max-w-6xl w-full rounded-xl overflow-hidden">
        {/* Text Section */}
        <div className="flex flex-col items-center lg:items-start gap-8 w-full p-8">
          <h2 className="text-4xl font-bold text-center lg:text-left text-[#171717] md:text-4xl">
            Trending Cards
          </h2>
          <p className="text-2xl text-center lg:text-left text-[#404040] md:text-base">
            Checkout Our Weekly Updated Trending Collection.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3 w-full sm:px-6 px-4">
          {trendingData.map((card) => (
            <div
              key={card.id}
              className="w-full max-w-[330px] flex flex-col items-start gap-[15px] flex-shrink-0  rounded-lg transition-transform hover:scale-[1.02] mx-auto"
            >
              <figure className="w-full">
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-[200px] flex items-center justify-center bg-gray-700 text-[#262626] rounded-t-lg">
                    No Image Available
                  </div>
                )}
              </figure>
              <div className="p-4 flex flex-col gap-4">
                <h3 className="text-xl font-bold text-[#262626]">
                  {card.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#404040]">{card.creator}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
