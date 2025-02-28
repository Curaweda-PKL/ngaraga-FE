import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";
import { useNavigate } from "react-router-dom";

// Define the interface for the API response item
interface ApiCollector {
  userId: string;
  name: string;
  image?: string;
  followersCount: number;
  totalCards: number;
  cardTypes: {
    NORMAL: number;
    SPECIAL: number;
  };
}

// Define the interface for the collector as used in the UI
interface CollectorUI {
  id: string;
  name: string;
  card: number;
  specialCard: number;
  followers: string;
  avatar: string;
}

// Helper to format numbers into a short string (e.g. 1200 => "1.2k")
const formatFollowers = (count: number): string => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "k";
  }
  return count.toString();
};

const TopCollectors: React.FC = () => {
  const navigate = useNavigate();
  
  const [pageContent, setPageContent] = useState({
    title: "Top Collectors",
    description: "Check out top ranking Card Collectors on the Card Marketplace.",
  });
  const [collectors, setCollectors] = useState<CollectorUI[]>([]);

  // Fetch the page content (title and description)
  useEffect(() => {
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

  // Fetch collectors ranking from the API
  useEffect(() => {
    const fetchCollectors = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/top-player/rankings`);
        // Assuming our endpoint returns { data: ApiCollector[] }
        if (response.data && response.data.data) {
          const apiCollectors: ApiCollector[] = response.data.data;
          // Transform the API data to match our UI structure
          const uiCollectors: CollectorUI[] = apiCollectors.map((apiCollector) => ({
            id: apiCollector.userId,
            name: apiCollector.name,
            card: apiCollector.totalCards,
            specialCard: apiCollector.cardTypes.SPECIAL,
            followers: formatFollowers(apiCollector.followersCount),
            avatar: apiCollector.image || "",
          }));
          setCollectors(uiCollectors);
        } else {
          setCollectors([]);
        }
      } catch (error) {
        console.error("Error fetching collectors ranking:", error);
        setCollectors([]);
      }
    };

    fetchCollectors();
  }, []);

  return (
    <div className="px-4 md:px-20 py-8 md:py-16 rounded-lg min-h-screen w-full lg:w-screen">
      {/* Dynamic Title and Description */}
      <h1 className="text-2xl text-[#171717] font-bold">{pageContent.title}</h1>
      <p className="text-[#404040] mt-2">{pageContent.description}</p>

      {collectors.length === 0 ? (
        // Fallback UI when no collector exists.
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="mb-4">
            {/* Smiling emoticon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-gray-500"
              viewBox="0 0 64 64"
              fill="currentColor"
            >
              <circle cx="32" cy="32" r="30" fill="#FFE066" />
              <circle cx="22" cy="26" r="4" fill="#000" />
              <circle cx="42" cy="26" r="4" fill="#000" />
              <path
                d="M20,44a12,12,0,0,1,24,0"
                stroke="#000"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <p className="text-xl font-semibold">Be the first collector!</p>
        </div>
      ) : (
        // Render collectors table if data exists.
        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Collectors Table Header */}
            <div className="grid text-[#404040] grid-cols-5 border-2 bg-[#D4D4D4] border-background-secondary rounded-xl text-sm py-2">
              <div className="flex items-center">
                <span className="ml-4">#</span>
                <span>Collector</span>
              </div>
              <div className="text-right">Card</div>
              <div className="text-right">Special Card</div>
              <div className="text-right">Follower</div>
            </div>

            {/* Collectors Table Rows */}
            {collectors.map((collector, index) => (
              <div
                key={collector.id}
                className="grid grid-cols-5 items-center border-2 p-4 rounded-lg mt-4"
              >
                <div className="flex text-[#262626] items-center">
                  <span className="mr-2">{index + 1}</span>
                  <div className="flex items-center">
                    {collector.avatar ? (
                      <img
                        src={collector.avatar}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full mr-3 cursor-pointer hover:opacity-80"
                        onClick={() => navigate(`/account/${collector.name}`)}
                      />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full mr-3 flex items-center justify-center bg-gray-200 cursor-pointer hover:opacity-80"
                        onClick={() => navigate(`/account/${collector.name}`)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    )}
                    {collector.name}
                  </div>
                </div>
                <div className="text-right text-green-400">{collector.card}</div>
                <div className="text-right text-[#171717]">{collector.specialCard}</div>
                <div className="text-right text-[#171717]">{collector.followers}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopCollectors;
