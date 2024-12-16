import React from "react";
import { motion } from "framer-motion";
import LoginImage from "@/assets/img/spacestarry.png";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  // Animation variants for arise effect
  const ariseVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  };

  return (
    <motion.section
      className="relative flex items-center justify-center min-h-screen bg-gray-900 text-white"
      initial="hidden"
      animate="visible"
      variants={ariseVariant}
    >
      {/* Background Image */}
      <img
        src={LoginImage}
        alt="404 Background"
        className="absolute inset-0 object-cover w-full h-full opacity-50"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-12">
        <motion.h1
          className="text-6xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          404
        </motion.h1>
        <motion.p
          className="text-xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>

        <motion.button
          onClick={() => navigate("/")}
          className="rounded-md bg-blue-600 px-8 py-3 text-lg font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Go Back Home
        </motion.button>
      </div>
    </motion.section>
  );
};

export default NotFoundPage;
