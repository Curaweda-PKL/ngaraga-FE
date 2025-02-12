import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils"; // Import centralized server URL

const TopCollectors: React.FC = () => {
  const [pageContent, setPageContent] = useState({
    title: "Top Collectors",
    description: "Check out top ranking Card Collectors on the Card Marketplace.",
  });

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

  useEffect(() => {
    // Fetch page content from API
    const fetchPageContent = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/page-content/rankings`);
        if (response.data) {
          setPageContent({
            title: response.data.title || pageContent.title,
            description: response.data.description || pageContent.description,
          });
        }
      } catch (error) {
        console.error("Error fetching page content:", error);
      }
    };

    fetchPageContent();
  }, []);

  return (
    <div className="px-20 py-16 rounded-lg min-h-screen w-screen">
      {/* Dynamic Title and Description */}
      <h1 className="text-2xl text-[#171717] font-bold">{pageContent.title}</h1>
      <p className="text-[#404040] mt-2">{pageContent.description}</p>

      {/* Collectors Table */}
      <div className="mt-6">
        <div className="grid text-[#404040] grid-cols-5 border-2 bg-[#D4D4D4] border-background-secondary rounded-xl text-sm py-2">
          <div className="flex items-center">
            <span className="ml-4">#</span>
            <span>Collector</span>
          </div>
          <div className="text-right">Card</div>
          <div className="text-right">Special Card</div>
          <div className="text-right">Follower</div>
        </div>

        {todayCollectors.map((collector, index) => (
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
