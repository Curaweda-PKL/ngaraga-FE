export const BrowseCategories = () => {
  const trendingData = [
    {
      id: 1,
      title: "Art",
      image: "/src/assets/img/lumba.png",
      svgPath: "/src/assets/svg/PaintBrush.svg",
    },
    {
      id: 2,
      title: "Collectibles",
      image: "/src/assets/img/monkey.png",
      svgPath: "/src/assets/svg/Swatches.svg",
    },
    {
      id: 3,
      title: "Music",
      image: "/src/assets/img/gitar.png",
      svgPath: "/src/assets/svg/MusicNotes.svg",
    },
    {
      id: 4,
      title: "Photography",
      image: "/src/assets/img/oldman.png",
      svgPath: "/src/assets/svg/Camera.svg",
    },
    {
      id: 5,
      title: "Video",
      image: "/src/assets/img/magic-futuristic.png",
      svgPath: "/src/assets/svg/VideoCamera.svg",
    },
    {
      id: 6,
      title: "Utility",
      image: "/src/assets/img/key-isolated.png",
      svgPath: "/src/assets/svg/MagicWand.svg",
    },
    {
      id: 7,
      title: "Sport",
      image: "/src/assets/img/basketball.png",
      svgPath: "/src/assets/svg/Basketball.svg",
    },
    {
      id: 8,
      title: "Virtual World",
      image: "/src/assets/img/cyberpunk-city.png",
      svgPath: "/src/assets/svg/Planet.svg",
    },
  ];

  return (
    <div className="flex items-center justify-center text-white">
      <div className="flex flex-col items-center bg-transparent border border-transparent gap-8 max-w-6xl w-full rounded-xl overflow-hidden">
        {/* Text Section */}
        <div className="flex flex-col items-center lg:items-start gap-8 w-full p-8">
          <h2 className="text-3xl font-bold text-center lg:text-left text-white md:text-4xl">
            Browse Categories
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full px-4"
          style={{gap: "30px"}}
        >
          {trendingData.map((card) => (
            <div
              key={card.id}
              className="w-full flex flex-col items-start gap-[15px] shadow-xl rounded-lg bg-[#3B3B3B] transition-transform hover:scale-[1.02]"
            >
              <figure
                className="relative w-full"
                style={{height: "316px"}}
              >
                {card.image ? (
                  <>
                    {/* Blurred Background Image */}
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full rounded-t-lg object-cover filter blur-sm brightness-75"
                    />
                    {/* Centered SVG Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={card.svgPath}
                        alt={`${card.title} Icon`}
                        className="w-24 h-24"
                      />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-[316px] flex items-center justify-center bg-gray-700 text-gray-400 rounded-t-lg">
                    No Image Available
                  </div>
                )}
              </figure>
              <div className="p-4 flex flex-col gap-4">
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
