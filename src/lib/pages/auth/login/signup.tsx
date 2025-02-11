import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import LoginImage from "@/assets/img/spacestarry.png";
import axios from "axios";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Notification = {
  type: "error" | "success";
  message: string;
};

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [apiData, setApiData] = useState({
    image: LoginImage,
    title: "Sign Up",
    description: "Create an account to start using our service.",
  });

  // Initialize navigate from react-router-dom for redirection
  const navigate = useNavigate();

  // Fetch thumbnail and API text data
  useEffect(() => {
    const fetchThumbnailData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auththumb/sign-up");
        const { title, description, image } = response.data.data;

        setApiData({
          title: title || "Sign Up",
          description: description || "Create an account to start using our service.",
          image: image ? `http://localhost:3000/${image}` : LoginImage,
        });
      } catch (error) {
        console.error("Error fetching thumbnail data:", error);
        // Fallback data
        setApiData({
          image: LoginImage,
          title: "Sign Up",
          description: "Create an account to start using our service.",
        });
      }
    };

    fetchThumbnailData();
  }, []);

  // Handle input change and clear field errors on change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validate form inputs before submitting
  const validateForm = () => {
    let valid = true;
    const newError: { [key: string]: string } = {};

    // Name validation
    if (!formData.name) {
      newError.name = "Name cannot be empty!";
      valid = false;
    } else if (formData.name.length < 3) {
      newError.name = "Name must be at least 3 characters!";
      valid = false;
    }

    // Email validation
    if (!formData.email) {
      newError.email = "Email cannot be empty!";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newError.email = "Please enter a valid email address.";
        valid = false;
      }
    }

    // Password validation
    if (!formData.password) {
      newError.password = "Password cannot be empty!";
      valid = false;
    } else if (formData.password.length < 8) {
      newError.password = "Password must be at least 8 characters long.";
      valid = false;
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newError.confirmPassword = "Confirm Password cannot be empty!";
      valid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newError.confirmPassword = "Passwords do not match!";
      valid = false;
    }

    setError(newError);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/register-user",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setNotification({
          type: "success",
          message: "Account created successfully! Redirecting to login...",
        });
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error: any) {
      console.error("Error during registration:", error);
      let errorMessage = "Account creation failed! Please try again.";
      if (error.response && error.response.data) {
        const { message, errors } = error.response.data;
        if (message) {
          errorMessage = message;
          // Replace confusing messages with friendlier text
          if (errorMessage.toLowerCase().includes("must have number")) {
            errorMessage = "Please ensure your password meets our requirements.";
          }
        }
        setError(errors || {});
        setNotification({ type: "error", message: errorMessage });
      } else {
        setNotification({
          type: "error",
          message: "Something went wrong. Please try again later.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // Animation variants for a smooth entrance
  const ariseVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  };

  return (
    <motion.section className="bg-white" initial="hidden" animate="visible" variants={ariseVariant}>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="signup"
            src={apiData.image}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <motion.div className="max-w-xl lg:max-w-3xl" initial="hidden" animate="visible" variants={ariseVariant}>
            {/* Notification Banner */}
            {notification && (
              <div
                className={`mb-4 rounded-md p-3 text-center ${
                  notification.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
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
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{apiData.title}</h2>
                <p className="text-lg text-gray-500">{apiData.description}</p>
              </div>

              {/* Name Input */}
              <div className="col-span-6 relative">
                <div
                  className={`mt-1 flex items-center border rounded-md bg-white py-3 px-4 shadow-sm ${
                    error.name ? "border-[#D22424]" : "focus-within:border-[var(--typing)]"
                  }`}
                >
                  <FaUser className="text-gray-500 mr-2 text-sm" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Username"
                    className="w-full border-none bg-transparent text-lg text-gray-500 focus:outline-none focus:ring-0"
                    autoComplete="name"
                    required
                  />
                </div>
                {error.name && <p className="text-[#D22424] text-sm">{error.name}</p>}
              </div>

              {/* Email Input */}
              <div className="col-span-6 relative">
                <div
                  className={`mt-1 flex items-center border rounded-md bg-white py-3 px-4 shadow-sm ${
                    error.email ? "border-[#D22424]" : "focus-within:border-[var(--typing)]"
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
                {error.email && <p className="text-[#D22424] text-sm">{error.email}</p>}
              </div>

              {/* Password Input */}
              <div className="col-span-6 relative">
                <div
                  className={`mt-1 flex items-center border rounded-md bg-white py-3 px-4 shadow-sm ${
                    error.password ? "border-[#D22424]" : "focus-within:border-[var(--typing)]"
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
                    autoComplete="new-password"
                    required
                  />
                  <div className="text-gray-500 ml-2 cursor-pointer text-sm" onClick={togglePasswordVisibility}>
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </div>
                </div>
                {error.password && <p className="text-[#D22424] text-sm">{error.password}</p>}
              </div>

              {/* Confirm Password Input */}
              <div className="col-span-6 relative">
                <div
                  className={`mt-1 flex items-center border rounded-md bg-white py-3 px-4 shadow-sm ${
                    error.confirmPassword ? "border-[#D22424]" : "focus-within:border-[var(--typing)]"
                  }`}
                >
                  <FaLock className="text-gray-500 mr-2 text-sm" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="ConfirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full border-none bg-transparent text-lg text-gray-500 focus:outline-none focus:ring-0"
                    autoComplete="new-password"
                    required
                  />
                  <div className="text-gray-500 ml-2 cursor-pointer text-sm" onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </div>
                </div>
                {error.confirmPassword && <p className="text-[#D22424] text-sm">{error.confirmPassword}</p>}
              </div>

              {/* Submit Button */}
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="w-full inline-block shrink-0 rounded-md bg-call-to-action px-12 py-3 text-lg font-semibold text-white transition-all duration-200 ease-in-out hover:bg-orange-500 hover:text-white focus:outline-none focus:ring focus:ring-blue-600"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </div>

              {/* Sign In Link */}
              <div className="col-span-6 text-center mt-4">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <a href="/login" className="text-orange-500 hover:text-orange-600">
                    Sign in
                  </a>
                </p>
              </div>
            </motion.form>
          </motion.div>
        </main>
      </div>
    </motion.section>
  );
};

export default SignUp;
