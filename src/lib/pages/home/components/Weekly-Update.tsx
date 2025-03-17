import type React from 'react';
import { useState, useEffect } from 'react';
import { SERVER_URL } from '@/middleware/utils';
import { motion } from "framer-motion";

export const WeeklyUpdateForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [weeklyData, setWeeklyData] = useState<{
    title: string;
    description: string;
    image: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback Data
  const FALLBACK_WEEKLY_DATA = {
    title: 'Join Our Weekly Update',
    description: 'Stay updated with the latest news and updates by subscribing to our weekly newsletter.',
    image: 'https://via.placeholder.com/520x344', // Fallback image
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/join-weekly/join-weekly`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);

        setWeeklyData({
          ...data,
          image: `${SERVER_URL}/src/uploads/AuthThumb/${data.image}`,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weekly data:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setLoading(false);

        // Gunakan fallback data jika terjadi error
        setWeeklyData(FALLBACK_WEEKLY_DATA);
      }
    };

    fetchData();
  }, []);

  const handleSubscribe = () => {
    if (email.trim() !== '') {
      setEmail('');
      alert('Thank you for subscribing!'); // Feedback sederhana untuk pengguna
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
        <p className="text-xl mt-4">Something went wrong. Using fallback data.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center py-16 max-w-6xl mx-auto sm:px-6 md:px-8 lg:px-0">
      <div className="flex flex-col lg:flex-row bg-[#3B3B3B] p-8 sm:p-12 lg:p-16 rounded-none lg:rounded-3xl w-full">
        {/* Gambar */}
        <div className="flex-1 flex justify-start items-center">
          {weeklyData?.image && (
            <img
              src={weeklyData.image}
              alt="Astronaut"
              className="max-w-[520px] max-h-[344px] w-auto h-auto object-contain"
              style={{ marginLeft: '-20px', marginTop: 'auto', marginBottom: 'auto' }}
              onError={(e) => {
                console.error('Error loading image:', e);
                e.currentTarget.src = FALLBACK_WEEKLY_DATA.image; // Fallback image jika gagal dimuat
              }}
            />
          )}
        </div>

        {/* Konten */}
        <div className="flex-1 flex flex-col justify-center text-white pl-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {weeklyData?.title || FALLBACK_WEEKLY_DATA.title}
          </h1>
          <p className="mb-6 text-lg sm:text-xl md:text-2xl text-left" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            {weeklyData?.description || FALLBACK_WEEKLY_DATA.description}
          </p>

          {/* Form Subscribe */}
          <div className="w-full max-w-lg flex bg-white rounded-2xl overflow-hidden">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email here"
              className="w-full px-4 py-3 text-gray-700 focus:outline-none"
            />
            <button
              onClick={handleSubscribe}
              className="bg-call-to-action text-white px-6 py-3 hover:bg-call-to-actions-800 focus:outline-none"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};