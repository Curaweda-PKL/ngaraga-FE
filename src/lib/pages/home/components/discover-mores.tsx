import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion dari framer-motion

// Type definitions for API response
interface CategoryItem {
  id: number;
  name: string;
  image: string;
}

interface DiscoverCardItem {
  id: number;
  characterName: string;
  product: {
    image: string;
    price: string;
    category?: CategoryItem; // Mengambil kategori berdasarkan categoryId
  };
}

interface DiscoverCardData {
  slug: string;
  exploreTrendingTitle: string;
  exploreTrendingDescription: string;
  card: DiscoverCardItem[];
}

interface DiscoverApiResponse {
  exploreTrendingCard: DiscoverCardData;
}

export const DiscoverMoreCards = () => {
  const navigate = useNavigate();
  const [discoverData, setDiscoverData] = useState<DiscoverCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<DiscoverApiResponse>(`${SERVER_URL}/api/explore-trending/explore-trending`)
      .then((response) => {
        setDiscoverData(response.data.exploreTrendingCard);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching discover cards:", err);
        setError(err.message || "Something went wrong.");
        setLoading(false);
      });
  }, []);

  // Jika data masih loading, tampilkan animasi loading
  if (loading) {
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
  if (error) {
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
        <p className="text-xl mt-4">Something went wrong. Please try again later.</p>
      </div>
    );
  }

  // Jika data tidak ditemukan, tampilkan animasi no data
  if (!discoverData) {
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
        <p className="text-xl mt-4">No data found.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-background-primary pt-24">
      <div className="max-w-6xl w-full">
        {/* Header Section */}
        <div className="flex items-center justify-between w-full px-8 mb-8">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-[#171717] text-4xl font-bold font-[Poppins]">
              {discoverData.exploreTrendingTitle || "Discover More Cards"}
            </h2>
            <p className="text-2xl text-[#404040] font-[Nunito]">
              {discoverData.exploreTrendingDescription || "Explore New Trending Cards"}
            </p>
          </div>
          {/* Button for Large Screens */}
          <button
            onClick={() => navigate("/marketplace")}
            className="hidden lg:block bg-call-to-action text-white px-4 py-2 rounded-md hover:bg-call-to-actions-800 transition-colors font-[Poppins]"
          >
            See All
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3 px-8 mb-8">
          {discoverData.card.length > 0 ? (
            discoverData.card.map((card) => (
              <motion.div
                key={card.id}
                onClick={() => navigate(`/detail-cards/${card.id}`)}
                className="cursor-pointer w-full flex flex-col items-start gap-4 bg-[#F2F2F2] rounded-2xl shadow-xl"
                whileHover={{ scale: 1.05 }} // Animasi saat hover
                whileTap={{ scale: 0.95 }} // Animasi saat diklik
              >
                {/* Image */}
                <figure className="w-full rounded-t-2xl overflow-hidden">
                  {card.product.image ? (
                    <img
                      src={`${SERVER_URL}/${card.product.image}`}
                      alt={card.characterName}
                      className="w-full h-[260px] object-contain bg-white"
                    />
                  ) : (
                    <div className="w-full h-[260px] flex items-center justify-center bg-[#3B3B3B] text-gray-400 rounded-t-2xl" />
                  )}
                </figure>

                {/* Card Details */}
                <div className="p-6 flex flex-col items-start gap-2 w-full">
                  <h3 className="text-2xl font-bold text-[#262626] font-[Poppins]">
                    {card.characterName}
                  </h3>

                  {/* Render kategori (gambar + nama) di bawah characterName */}
                  {card.product.category ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={`${SERVER_URL}/${card.product.category.image}`}
                        alt={card.product.category.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-lg text-[#404040] font-[Nunito]">
                        {card.product.category.name}
                      </span>
                    </div>
                  ) : (
                    <span className="text-base text-gray-400">No category</span>
                  )}

                  <span className="text-lg text-[#262626] font-[Nunito]">
                    {card.product.price}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              No cards available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscoverMoreCards;