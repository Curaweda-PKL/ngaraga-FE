import React, {useState} from "react";

const TopCollectors: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Today");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const todayCollectors = [
    {
      id: 1,
      name: "Jaydon Ekstrom Bothman",
      card: 2300,
      specialCard: 602,
      followers: "12k",
      avatar: "https://via.placeholder.com/32",
    },
    {
      id: 2,
      name: "Ruben Carder",
      card: 2300,
      specialCard: 602,
      followers: "12k",
      avatar: "https://via.placeholder.com/32",
    },
    {
      id: 3,
      name: "Alfredo Septimus",
      card: 2300,
      specialCard: 602,
      followers: "12k",
      avatar: "https://via.placeholder.com/32",
    },
  ];
  const weekCollectors = [
    {
      id: 1,
      name: "Samantha Grey",
      card: 1800,
      specialCard: 450,
      followers: "9k",
      avatar: "https://via.placeholder.com/32",
    },
    {
      id: 2,
      name: "Ethan Rodriguez",
      card: 1700,
      specialCard: 380,
      followers: "8.5k",
      avatar: "https://via.placeholder.com/32",
    },
    {
      id: 3,
      name: "Olivia Fernandez",
      card: 1600,
      specialCard: 320,
      followers: "7.8k",
      avatar: "https://via.placeholder.com/32",
    },
  ];

  const monthCollectors = [
    {
      id: 1,
      name: "Isabella Hernandez",
      card: 3500,
      specialCard: 800,
      followers: "15k",
      avatar: "https://via.placeholder.com/32",
    },
    {
      id: 2,
      name: "Liam Diaz",
      card: 3200,
      specialCard: 720,
      followers: "13.5k",
      avatar: "https://via.placeholder.com/32",
    },
    {
      id: 3,
      name: "Ava Ramirez",
      card: 3100,
      specialCard: 680,
      followers: "12.8k",
      avatar: "https://via.placeholder.com/32",
    },
  ];

  const allTimeCollectors = [
    {
      id: 1,
      name: "Benjamin Gutierrez",
      card: 5000,
      specialCard: 1200,
      followers: "20k",
      avatar: "https://via.placeholder.com/32",
    },
    {
      id: 2,
      name: "Sophia Reyes",
      card: 4800,
      specialCard: 1100,
      followers: "18k",
      avatar: "https://via.placeholder.com/32",
    },
    {
      id: 3,
      name: "Lucas Morales",
      card: 4600,
      specialCard: 1050,
      followers: "17.5k",
      avatar: "https://via.placeholder.com/32",
    },
  ];

  const getCollectors = () => {
    switch (activeTab) {
      case "This Week":
        return weekCollectors;
      case "This Month":
        return monthCollectors;
      case "All Time":
        return allTimeCollectors;
      default:
        return todayCollectors;
    }
  };

  const collectors = getCollectors();

  return (
    <div className="px-20 py-16 rounded-lg min-h-screen w-screen">
      <h1 className="text-2xl text-[#171717] font-bold">Top Collectors</h1>
      <p className="text-[#404040] mt-2">
        Check out top ranking Card Collectors on the Card Marketplace.
      </p>

      <div className="mt-6 ">
        <div className="grid text-[#404040] grid-cols-5 border-2 bg-[#D4D4D4] border-background-secondary rounded-xl bg text-sm py-2">
          <div className="flex items-center">
            <span className="ml-4">#</span>
            <span>Collector</span>
          </div>
          <div className="text-right">Card</div>
          <div className="text-right">Special Card</div>
          <div className="text-right">Follower</div>
        </div>

        {collectors.map((collector, index) => (
          <div
            key={collector.id}
            className="grid grid-cols-5 items-center border-2 p-4 rounded-lg mt-4"
          >
            <div className="flex text-[#262626] items-center">
              <span className="mr-2">{index + 1}</span>
              <div className="flex items-center">
                <img
                  src={collector.avatar}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full mr-3"
                />
                {collector.name}
              </div>
            </div>
            <div className="text-right text-green-400">{collector.card}</div>
            <div className="text-right text-[#171717]">
              {collector.specialCard}
            </div>
            <div className="text-right text-[#171717]">
              {collector.followers}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCollectors;
