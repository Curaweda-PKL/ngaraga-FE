export const DiscoverMoreCards = () => {
  const discoverData = [
    {
      id: 1,
      title: "Distant Galaxy",
      creator: "MoonDancer",
      image: "/src/assets/img/Distant-Galaxy.png",
      price: "Rp. 200.000",
    },
    {
      id: 2,
      title: "Life On Edena",
      creator: "NebulaKid",
      image: "/src/assets/img/LifeonEdena.png",
      price: "Rp. 300.000",
    },
    {
      id: 3,
      title: "AstroFiction",
      creator: "Spaceone",
      image: "/src/assets/img/AstroFiction.png",
      price: "Rp. 200.000",
    },
  ];

  return (
    <div className="flex items-center justify-center bg-background-primary pt-24">
      <div className="max-w-6xl w-full">
        {/* Text Section */}
        <div className="flex items-center justify-between w-full px-8 mb-8">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-[#171717] text-4xl font-bold font-[Poppins]">
              Discover More Cards
            </h2>
            <p className="text-2xl text-[#404040] font-[Nunito]">
              Explore New Trending Cards
            </p>
          </div>
          {/* Button for Large Screens */}
          <button className="hidden lg:block bg-call-to-action text-white px-4 py-2 rounded-md hover:bg-[#8c44e6] transition-colors font-[Poppins]">
            See All
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3 px-8 mb-8">
          {discoverData.map((card) => (
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
                <h3 className="text-2xl font-bold text-[#262626] font-[Poppins]">
                  {card.title}
                </h3>
                <span className="text-base text-[#404040] font-[Nunito]">
                  {card.creator}
                </span>
                <span className="text-base text-[#262626] font-[Nunito]">
                  {card.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Button for Small and Medium Screens */}
        <div className="flex justify-center lg:hidden px-8">
          <button className="bg-call-to-action text-white px-6 py-3 rounded-md hover:bg-[#8c44e6] transition-colors font-[Poppins]">
            See All
          </button>
        </div>
      </div>
    </div>
  );
};
