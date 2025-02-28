import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import LoginImage from "@/assets/img/spacestarry.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { SERVER_URL } from "@/middleware/utils"; // Import centralized server URL

type LoginFormData = {
  email: string;
  password: string;
};

type Notification = {
  type: "error" | "success";
  message: string;
};

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [thumbnailData, setThumbnailData] = useState<any>(null);

  // Fetch thumbnail data
  useEffect(() => {
    const fetchThumbnailData = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/auththumb/sign-in`
        );
        setThumbnailData(response.data.data);
      } catch (error) {
        console.error("Error fetching thumbnail data:", error);
      }
    };

    fetchThumbnailData();
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for this field when user types
    setError((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  };

  // Validate form before submitting
  const validateForm = () => {
    let valid = true;
    const newError: { [key: string]: string } = {};

    if (!formData.email) {
      newError.email = "Email cannot be empty!";
      valid = false;
    }
    if (!formData.password) {
      newError.password = "Password cannot be empty!";
      valid = false;
    }

    setError(newError);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${SERVER_URL}/api/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      // On successful login, show a success notification instead of an alert
      setNotification({
        type: "success",
        message: "Logged in successfully! Redirecting...",
      });
      console.log("Login Response:", response.data);

      // Redirect after a short delay (2 seconds)
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 2000);
    } catch (error: any) {
      console.error("Error during login:", error);
      const errorMessage =
        error.response?.data?.message || "Login failed! Please try again.";
      setError({ general: errorMessage });
      setNotification({ type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  // Toggle visibility for password
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
      className="bg-white"
      initial="hidden"
      animate="visible"
      variants={ariseVariant}
    >
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <motion.div
            className="max-w-xl lg:max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={ariseVariant}
          >
            {/* Notification Banner */}
            {notification && (
              <div
                className={`mb-4 rounded-md p-3 text-center ${
                  notification.type === "error"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {notification.message}
              </div>
            )}

            <motion.form
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-6 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              {/* Title and Description */}
              <div className="col-span-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {thumbnailData?.title || "Log In"}
                </h2>
                <p className="text-lg text-gray-500">
                  {thumbnailData?.description ||
                    "Welcome back! Please log in to your account."}
                </p>
              </div>

              {/* Email Input */}
              <div className="col-span-6 relative">
                <div
                  className={`mt-1 flex items-center border rounded-md bg-white py-3 px-4 shadow-sm ${
                    error.email ? "border-red-500" : "focus-within:border-[var(--typing)]"
                  }`}
                >
                  <FaEnvelope className="text-gray-500 mr-2 text-sm" />
                  <input
                    type="email"
                    id="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full border-none bg-transparent text-lg text-gray-500 focus:outline-none focus:ring-0"
                    autoComplete="email"
                    required
                  />
                </div>
                {error.email && (
                  <p className="text-red-500 text-sm">{error.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="col-span-6 relative">
                <div
                  className={`mt-1 flex items-center border rounded-md bg-white py-3 px-4 shadow-sm ${
                    error.password ? "border-red-500" : "focus-within:border-[var(--typing)]"
                  }`}
                >
                  <FaLock className="text-gray-500 mr-2 text-sm" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full border-none bg-transparent text-lg text-gray-500 focus:outline-none focus:ring-0"
                    autoComplete="current-password"
                    required
                  />
                  <div
                    className="text-gray-500 ml-2 cursor-pointer text-sm"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </div>
                </div>
                {error.password && (
                  <p className="text-red-500 text-sm">{error.password}</p>
                )}

                {/* Forgot Password Link */}
                <div className="mt-4 text-right">
                  <a
                    href="/forgot-password"
                    className="text-black text-sm underline"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              {/* General Error Message */}
              {error.general && (
                <div className="col-span-6">
                  <p className="text-red-500 text-center">{error.general}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="w-full inline-block shrink-0 rounded-md bg-call-to-action px-12 py-3 text-lg font-semibold text-white transition-all duration-200 ease-in-out hover:bg-orange-500 hover:text-white focus:outline-none focus:ring focus:ring-blue-600"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="col-span-6 text-center mt-4">
                <p className="text-gray-600">
                  Don't have an account?
                  <Link
                    to={"/signup"}
                    className="text-orange-500 hover:text-orange-600 ml-2"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </motion.form>
          </motion.div>
        </main>

        {/* Thumbnail / Background Image Section */}
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="login"
            src={
              thumbnailData?.image
                ? `${SERVER_URL}/${thumbnailData.image}`
                : LoginImage
            }
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
        </section>
      </div>
    </motion.section>
  );
};

export default AdminLogin;
