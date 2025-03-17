import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils"; // Sesuaikan dengan path yang benar
import { motion } from "framer-motion"; // Import motion dari framer-motion

interface Category {
  id: number;
  code: string;
  name: string;
  image: string | null; // Misalnya: "image1.jpg"
}

interface HeroCategoryData {
  slug: string;
  heroCategoryTitle: string;
  heroCategoryDescription: string;
  categories: Category[];
}

export const BrowseCategories = () => {
  const navigate = useNavigate();
  const [heroCategoryData, setHeroCategoryData] = useState<HeroCategoryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data dari backend saat komponen dimuat
  useEffect(() => {
    const fetchHeroCategoryData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/hero-category/hero-category`);
        setHeroCategoryData(response.data.heroCategory);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hero category data:", err);
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchHeroCategoryData();
  }, []);

  // Jika data masih loading, tampilkan loading state dengan animasi
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

  // Jika terjadi error, tampilkan pesan error dengan animasi
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

  // Jika data tidak ditemukan, tampilkan pesan dengan animasi
  if (!heroCategoryData) {
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
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center bg-transparent border border-transparent gap-8 max-w-6xl w-full rounded-xl overflow-hidden">
        {/* Text Section */}
        <div className="flex flex-col items-center lg:items-start gap-8 w-full p-8">
          <h2 className="text-4xl font-bold text-center lg:text-left text-[#171717] md:text-4xl">
            {heroCategoryData.heroCategoryTitle}
          </h2>
          <p className="text-center lg:text-left text-gray-600">
            {heroCategoryData.heroCategoryDescription}
          </p>
        </div>

        {/* Cards Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full px-4"
          style={{ gap: "30px" }}
        >
          {heroCategoryData.categories.map((category) => (
            <motion.div
              key={category.id}
              onClick={() => navigate("/marketplace")}
              className="cursor-pointer w-full flex flex-col items-start gap-[15px] shadow-xl rounded-lg bg-[#3B3B3B] transition-transform hover:scale-[1.02]"
              whileHover={{ scale: 1.05 }} // Animasi saat hover
              whileTap={{ scale: 0.95 }} // Animasi saat diklik
            >
              <figure className="relative w-full flex items-center justify-center bg-gray-700 rounded-t-lg" style={{ height: "316px" }}>
                {category.image ? (
                  // Tampilkan gambar kategori sebagai ikon kecil di tengah
                  <img
                    src={`${SERVER_URL}/${category.image}`} // Path gambar kategori
                    alt={category.name}
                    className="w-24 h-24 object-contain" // Ukuran gambar diatur sebagai ikon kecil
                  />
                ) : (
                  // Jika tidak ada gambar, tampilkan placeholder
                  <div className="w-full h-[316px] flex items-center justify-center bg-gray-700 text-gray-400 rounded-t-lg">
                    No Image Available
                  </div>
                )}
              </figure>
              {/* Tampilkan nama kategori di bawah gambar */}
              <div className="p-4 flex flex-col gap-4">
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};