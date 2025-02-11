import { FaRocket } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const CollectorCards = () => {
  // Initialize the navigate function
  const navigate = useNavigate();

  const trendingData = [
    {
      id: 4,
      username: "Kakarotto",
      avatar:
        "https://www.shutterstock.com/image-photo/cartoon-artistic-image-goku-dragonball-260nw-2540516459.jpg",
      totalCards: 25,
      rank: 1,
    },
    {
      id: 3,
      username: "Kakarotto",
      avatar:
        "https://www.shutterstock.com/image-photo/cartoon-artistic-image-goku-dragonball-260nw-2540516459.jpg",
      totalCards: 25,
      rank: 1,
    },
    {
      id: 1,
      username: "Kakarotto",
      avatar:
        "https://www.shutterstock.com/image-photo/cartoon-artistic-image-goku-dragonball-260nw-2540516459.jpg",
      totalCards: 25,
      rank: 1,
    },
    {
      id: 1,
      username: "Kakarotto",
      avatar:
        "https://www.shutterstock.com/image-photo/cartoon-artistic-image-goku-dragonball-260nw-2540516459.jpg",
      totalCards: 25,
      rank: 1,
    },
  ];

  return (
    <div className="flex items-center justify-center m-10">
      <div className="flex flex-col items-center bg-transparent border border-transparent gap-8 max-w-6xl w-full rounded-xl overflow-hidden">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 w-full p-8 justify-between">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <h2 className="text-4xl font-bold text-center lg:text-left text-[#171717] md:text-4xl">
              Top Collectors
            </h2>
            <p className="text-2xl text-center lg:text-left text-[#404040] md:text-base">
              Checkout Top Rated Collectors On The Ngaraga Marketplace
            </p>
          </div>

          {/* View Rankings Button */}
          <button
            onClick={() => navigate('/artist')}
            className="flex items-center gap-2 bg-[#DDB11F] border-2 border-call-to-action text-white py-2 px-4 rounded-lg shadow-md hover:bg-call-to-actions-800 transition-all"
          >
            <FaRocket className="text-white" />
            <span>View Rankings</span>
          </button>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] w-full p-8">
          {trendingData.map((card) => (
            <div
              key={card.id}
              onClick={() => navigate('/artist')}
              className="cursor-pointer relative flex flex-col items-center gap-6 w-full h-[238px] rounded-xl bg-[#F2F2F2] p-6 shadow-xl transition-transform hover:scale-105"
            >
              {/* Rank Badge */}
              <div className="absolute left-2 top-2 bg-black text-[#FFFFFF] text-xs font-bold py-1 px-2 rounded-full">
                {card.rank}
              </div>

              {/* Avatar */}
              <img
                src={card.avatar}
                alt={card.username}
                className="w-[110px] h-[110px] rounded-full object-cover"
              />

              {/* Metadata */}
              <div className="text-center flex flex-col justify-between flex-grow">
                <h3 className="text-xl font-bold text-[#262626]">
                  {card.username}
                </h3>
                <div className="flex justify-center items-center space-x-1 text-[#A3A3A3]">
                  <p>Total Cards:</p>
                  <p className="text-sm font-mono text-[#404040]">
                    {card.totalCards} cards
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
