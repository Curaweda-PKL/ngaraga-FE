import { FaRocket } from 'react-icons/fa'; 
export const CollectorCards = () => {
  const trendingData = [
    {
      id: 1,
      username: "DSGN Animals",  
      avatar:
        "https://www.shutterstock.com/image-photo/cartoon-artistic-image-goku-dragonball-260nw-2540516459.jpg",
      totalCards: 25,
      rank: 1,
    },
  ];

  return (
    <div className="flex items-center justify-center text-white">
      <div className="flex flex-col items-center bg-transparent border border-transparent gap-8 max-w-6xl w-full rounded-xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 w-full p-8 justify-between">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <h2 className="text-3xl font-bold text-center lg:text-left text-white md:text-4xl">
              Collector Cards
            </h2>
            <p className="text-sm text-center lg:text-left text-white md:text-base">
              Showcase your top creators and collections.
            </p>
          </div>

          {/* View Rankings Button */}
          <button className="flex items-center gap-2 bg-[#3B3B3B] border-2 border-call-to-action text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#2A2A2A] transition-all">
            <FaRocket className="text-purple-600" /> 
            <span>View Rankings</span>
          </button>
        </div>
  
        {/* Cards Section */}
        <div className="grid gap-6 md:grid-cols-3 w-full px-8">
          {trendingData.map((card) => (
            <div
              key={card.id}
              className="relative flex flex-col items-center gap-6 w-[240px] h-[238px] rounded-xl bg-[#3B3B3B] p-6 shadow-xl transition-transform hover:scale-105"
            >
              {/* Rank Badge */}
              <div className="absolute left-2 top-2 bg-yellow-400 text-black text-xs font-bold py-1 px-2 rounded-full">
                #{card.rank}
              </div>
  
              {/* Avatar */}
              <img
                src={card.avatar}
                alt={card.username}  
                className="w-[110px] h-[110px] rounded-full object-cover"
              />
  
              {/* Metadata */}
              <div className="text-center flex flex-col justify-between flex-grow">
                <h3 className="text-xl font-bold text-white">{card.username}</h3>  
                <p className="text-sm font-mono text-white">
                  Total Cards: {card.totalCards} cards owned
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
