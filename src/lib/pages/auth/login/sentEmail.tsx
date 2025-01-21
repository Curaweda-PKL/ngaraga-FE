import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ForgotPasswordImage from "@/assets/img/spacestarry.png";

const SentEmail: React.FC = () => {
  const navigate = useNavigate();

  const ariseVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  };

  // Handle button click to navigate back to /login
  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <motion.section
      className="bg-white"
      initial="hidden"
      animate="visible"
      variants={ariseVariant}
    >
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="reset-password"
            src={ForgotPasswordImage}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <motion.div
            className="max-w-xl lg:max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={ariseVariant}
          >
            <div className="mt-8 grid grid-cols-6 gap-6">
              {/* Title */}
              <div className="col-span-6 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 break-words">
                  Check your Email!
                </h2>
                <h3 className="text-sm text-gray-800 mb-4 break-words">
                  Password reset instructions have been sent to your email
                </h3>
              </div>

              {/* Button to navigate back to login */}
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  onClick={handleBackToLogin}
                  className="w-full inline-block shrink-0 rounded-md bg-call-to-action px-12 py-3 text-lg font-semibold text-white transition-all duration-200 ease-in-out hover:bg-orange-500 hover:text-white focus:outline-none focus:ring focus:ring-blue-600"
                >
                  Back to Login
                </button>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </motion.section>
  );
};

export default SentEmail;
