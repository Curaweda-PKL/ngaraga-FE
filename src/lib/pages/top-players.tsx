import React, {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "@/middleware/utils";

const TopCollectors: React.FC = () => {
  const [pageContent, setPageContent] = useState({
    title: "Top Collectors",
    description:
      "Check out top ranking Card Collectors on the Card Marketplace.",
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
    {
      id: 4,
      name: "Davis Franci",
      card: 2300,
      specialCard: 602,
      followers: "12k",
      avatar: "https://via.placeholder.com/32",
    },
  ];

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/page-content/rankings`
        );
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
    <div className="p-6 md:px-8 lg:px-20 py-8 lg:py-16 min-h-screen w-full bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Title and Description */}
        <h1 className="text-2xl text-[#171717] font-bold">
          {pageContent.title}
        </h1>
        <p className="text-[#404040] mt-2 text-base">
          {pageContent.description}
        </p>

        {/* Collectors Section */}
        <div className="mt-6">
          {/* Table Headers */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 text-[#404040] rounded-xl text-sm py-3 px-4 bg-[#F5F5F5]">
            <div className="flex items-center space-x-2">
              <span>#</span>
              <span>Collector</span>
            </div>
            <div className="text-right md:text-right lg:text-right">Card</div>
            <div className="hidden lg:block lg:text-right">Special Card</div>
            <div className="hidden lg:block lg:text-right">Follower</div>
          </div>

          {/* Collectors List */}
          <div className="space-y-4 mt-4">
            {todayCollectors.map((collector, index) => (
              <div
                key={collector.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 items-center">
                  {/* Collector Info */}
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600 w-6">{index + 1}</span>
                    <div className="flex items-center space-x-3">
                      <img
                        src={collector.avatar}
                        alt={collector.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-gray-900 font-medium">
                        {collector.name}
                      </span>
                    </div>
                  </div>

                  {/* Card Count */}
                  <div className="text-right">
                    <span className="text-green-500">
                      {index === 0 ? collector.card : "12k"}
                    </span>
                  </div>

                  {/* Desktop Only Columns */}
                  <div className="hidden lg:block lg:text-right text-[#171717]">
                    {collector.specialCard}
                  </div>
                  <div className="hidden lg:block lg:text-right text-[#171717]">
                    {collector.followers}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCollectors;
