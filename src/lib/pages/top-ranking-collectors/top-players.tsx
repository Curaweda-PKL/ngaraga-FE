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

  // Fallback sample data if API call fails or returns no data
  const sampleCollectors: CollectorUI[] = [
    {
      id: "1",
      name: "Joyner",
      card: 2300,
      specialCard: 602,
      followers: "12k",
      avatar: "https://comickaze.in/wp-content/uploads/woocommerce-placeholder-600x600.png",
    },
  ];

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
            avatar: apiCollector.image || "https://comickaze.in/wp-content/uploads/woocommerce-placeholder-600x600.png",
          }));
          setCollectors(uiCollectors);
        } else {
          // Fallback to sample data if API data is missing
          setCollectors(sampleCollectors);
        }
      } catch (error) {
        console.error("Error fetching collectors ranking:", error);
        // Fallback to sample data in case of an error
        setCollectors(sampleCollectors);
      }
    };

    fetchCollectors();
  }, []);

  // Use fetched collectors if available; otherwise use sample data
  const displayedCollectors = collectors.length > 0 ? collectors : sampleCollectors;

  return (
    // Responsive container: smaller padding on mobile and restored on md/lg screens.
    <div className="px-4 md:px-20 py-8 md:py-16 rounded-lg min-h-screen w-full lg:w-screen">
      {/* Dynamic Title and Description */}
      <h1 className="text-2xl text-[#171717] font-bold">{pageContent.title}</h1>
      <p className="text-[#404040] mt-2">{pageContent.description}</p>

      {/* Responsive Table Container */}
      <div className="mt-6 overflow-x-auto">
        {/* Set a minimum width to preserve the table layout on smaller screens */}
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
            {/* If there is a missing column intentionally, it will still maintain spacing */}
          </div>

          {/* Collectors Table Rows */}
          {displayedCollectors.map((collector, index) => (
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
                    className="w-8 h-8 rounded-full mr-3 cursor-pointer hover:opacity-80"
                    onClick={() => navigate(`/account/${collector.name}`)}
                  />
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
    </div>
  );
};

export default TopCollectors;
