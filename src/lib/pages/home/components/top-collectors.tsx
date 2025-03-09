import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";
import { FaRocket } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion dari framer-motion

// Define the type for top collector card data
interface TopCollector {
  id: string;
  name: string;
  fullName?: string;
  image?: string;
  totalCards: number;
}

export const CollectorCards = () => {
  const navigate = useNavigate();

  // Local state for top collectors section header data
  const [topCollectorsData, setTopCollectorsData] = useState({
    topCollectorsTitle: "Top Collectors",
    topCollectorsDescription:
      "Checkout Top Rated Collectors On The Ngaraga Marketplace",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // State for the top collector card from the API, using the TopCollector type
  const [topCollectorCard, setTopCollectorCard] = useState<TopCollector | null>(
    null
  );
  const [collectorLoading, setCollectorLoading] = useState(false);
  const [collectorError, setCollectorError] = useState("");

  // Fetch top collectors section header data on mount
  useEffect(() => {
    const fetchTopCollectors = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/top-collectors/top-collectors`
        );
        // Assume the endpoint returns { topCollectorsSection: { topCollectorsTitle, topCollectorsDescription } }
        const { topCollectorsSection } = response.data;
        if (topCollectorsSection) {
          setTopCollectorsData(topCollectorsSection);
        }
      } catch (err) {
        console.error("Error fetching top collectors section:", err);
        setError("Unable to load top collectors section data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopCollectors();
  }, []);

  // Fetch top collector card from the API
  useEffect(() => {
    const fetchTopCollectorCard = async () => {
      setCollectorLoading(true);
      try {
        const response = await axios.get(`${SERVER_URL}/api/top-kolektor-card`);
        if (response.data && response.data.topCollector) {
          // Filter out collectors with no cards
          if (response.data.topCollector.totalCards > 0) {
            setTopCollectorCard(response.data.topCollector);
          } else {
            setCollectorError("No collectors with cards available.");
          }
        } else {
          setCollectorError("No top collector data available.");
        }
      } catch (err) {
        console.error("Error fetching top collector card:", err);
        setCollectorError("Something went wrong with this component.");
      } finally {
        setCollectorLoading(false);
      }
    };

    fetchTopCollectorCard();
  }, []);

  // Normalize the collector image URL
  let collectorImage = "";
  if (topCollectorCard && topCollectorCard.image) {
    const normalizedImage = topCollectorCard.image
      .replace(/\\/g, "/")
      .replace("uploadsprofile", "uploads/profile");
    collectorImage = normalizedImage.startsWith("http")
      ? normalizedImage
      : `${SERVER_URL}/${normalizedImage}`;
  }

  // Jika data masih loading, tampilkan animasi loading
  if (loading || collectorLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <motion.svg
          className="w-20 h-20"
          viewBox="0 0 50 50"
          fill="none"
          stroke="#e53e3e"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <circle cx="25" cy="25" r="20" />
        </motion.svg>
        <p className="text-xl mt-4">Loading...</p>
      </div>
    );
  }

  // Jika terjadi error, tampilkan animasi error
  if (error || collectorError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <motion.svg
          className="w-20 h-20"
          viewBox="0 0 50 50"
          fill="none"
          stroke="#e53e3e"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <circle cx="25" cy="25" r="20" />
        </motion.svg>
        <p className="text-xl mt-4">
          {error || collectorError || "Something went wrong. Please try again later."}
        </p>
      </div>
    );
  }

  // Jika tidak ada data kolektor yang valid, tampilkan animasi no data
  if (!topCollectorCard || topCollectorCard.totalCards === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <motion.svg
          className="w-20 h-20"
          viewBox="0 0 50 50"
          fill="none"
          stroke="#e53e3e"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <circle cx="25" cy="25" r="20" />
        </motion.svg>
        <p className="text-xl mt-4">No collectors with cards available.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center m-10">
      <div className="flex flex-col items-center bg-transparent border border-transparent gap-8 max-w-6xl w-full rounded-xl overflow-hidden">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 w-full p-8 justify-between">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <h2 className="text-4xl font-bold text-center lg:text-left text-[#171717] md:text-4xl">
              {topCollectorsData.topCollectorsTitle}
            </h2>
            <p className="text-2xl text-center lg:text-left text-[#404040] md:text-base">
              {topCollectorsData.topCollectorsDescription}
            </p>
          </div>

          {/* View Rankings Button */}
          <button
            onClick={() => navigate("/rankings")}
            className="flex items-center gap-2 bg-[#DDB11F] border-2 border-call-to-action text-white py-2 px-4 rounded-lg shadow-md hover:bg-call-to-actions-800 transition-all"
          >
            <FaRocket className="text-white" />
            <span>View Rankings</span>
          </button>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] w-full p-8">
          <motion.div
            onClick={() => navigate(`/account/${topCollectorCard.name}`)}
            className="cursor-pointer relative flex flex-col items-center gap-6 w-full h-[238px] rounded-xl bg-[#F2F2F2] p-6 shadow-xl"
            whileHover={{ scale: 1.05 }} // Animasi saat hover
            whileTap={{ scale: 0.95 }} // Animasi saat diklik
          >
            {/* Rank Badge */}
            <div className="absolute left-2 top-2 bg-black text-[#FFFFFF] text-xs font-bold py-1 px-2 rounded-full">
              1
            </div>

            {/* Avatar */}
            <img
              src={collectorImage}
              alt={topCollectorCard.name}
              className="w-[110px] h-[110px] rounded-full object-cover"
            />

            {/* Metadata */}
            <div className="text-center flex flex-col justify-between flex-grow">
              <h3 className="text-xl font-bold text-[#262626]">
                {topCollectorCard.name}
              </h3>
              <div className="flex justify-center items-center space-x-1 text-[#A3A3A3]">
                <p>Total Cards:</p>
                <p className="text-sm font-mono text-[#404040]">
                  {topCollectorCard.totalCards} cards
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};