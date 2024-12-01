import React from 'react';

const TopCollectors: React.FC = () => {
  return (
    <div className="text-white px-20 py-16 rounded-lg min-h-screen w-screen">
      <h1 className="text-2xl font-bold">Top Collectors</h1>
      <p className="text-gray-400 mt-2">Check out top ranking Card Collectors on the Card Marketplace.</p>

      <div className="mt-6">
        <div className="flex justify-between border-b border-gray-700 pb-2">
          <button className="text-white border-b-2 border-white pb-1">Today</button>
          <button className="text-gray-400">This Week</button>
          <button className="text-gray-400">This Month</button>
          <button className="text-gray-400">All Time</button>
        </div>

        <div className="mt-4">
          <div className="grid grid-cols-5 text-gray-400 border border-2  border-background-secondary rounded-xl bg text-sm py-2">
            <div>#</div>
            <div>Collector</div>
            <div className="text-right">Card</div>
            <div className="text-right">Special Card</div>
            <div className="text-right">Follower</div>
          </div>

          {[
            { id: 1, name: "Jaydon Ekstrom Bothman", card: 2300, specialCard: 602, followers: "12k", avatar: "https://via.placeholder.com/32" },
            { id: 2, name: "Ruben Carder", card: 2300, specialCard: 602, followers: "12k", avatar: "https://via.placeholder.com/32" },
            { id: 3, name: "Alfredo Septimus", card: 2300, specialCard: 602, followers: "12k", avatar: "https://via.placeholder.com/32" },
          ].map((collector, index) => (
            <div
              key={collector.id}
              className="grid grid-cols-5 items-center bg-background-secondary p-4 rounded-lg mt-4"
            >
              <div>{index + 1}</div>
              <div className="flex items-center">
                <img
                  src={collector.avatar}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full mr-3"
                />
                {collector.name}
              </div>
              <div className="text-right text-green-400">{collector.card}</div>
              <div className="text-right">{collector.specialCard}</div>
              <div className="text-right">{collector.followers}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCollectors;
