import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import ForgotPasswordImage from "@/assets/img/spacestarry.png";

type ResetPasswordFormData = {
  newPassword: string;
  confirmNewPassword: string;
};

const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);

  // Handle form input changes
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

  // Validate form before submitting
  const validateForm = () => {
    let valid = true;
    const newError: { [key: string]: string } = {};

    // New password validation
    if (!formData.newPassword) {
      newError.newPassword = "New password cannot be empty!";
      valid = false;
    }

    // Confirm new password validation
    if (formData.newPassword !== formData.confirmNewPassword) {
      newError.confirmNewPassword = "Passwords do not match!";
      valid = false;
    }

    setError(newError);
    return valid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      alert("Password has been successfully reset!");
    }, 1000);
  };

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
            <motion.form
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-6 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              {/* Title */}
              <div className="col-span-6 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Reset your password
                </h2>
              </div>

              {/* New Password */}
              <div className="col-span-6 relative">
                <div
                  className={`mt-1 flex items-center border rounded-md bg-white py-3 px-4 shadow-sm ${
                    error.newPassword
                      ? "border-[#D22424]"
                      : "focus-within:border-[var(--typing)]"
                  }`}
                >
                  <FaLock className="text-gray-500 mr-2 text-sm" />
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="New Password"
                    className="w-full border-none bg-transparent text-lg text-gray-500 focus:outline-none focus:ring-0"
                    required
                  />
                </div>
                {error.newPassword && (
                  <p className="text-[#D22424] text-sm">{error.newPassword}</p>
                )}
              </div>

              {/* Confirm New Password */}
              <div className="col-span-6 relative">
                <div
                  className={`mt-1 flex items-center border rounded-md bg-white py-3 px-4 shadow-sm ${
                    error.confirmNewPassword
                      ? "border-[#D22424]"
                      : "focus-within:border-[var(--typing)]"
                  }`}
                >
                  <FaLock className="text-gray-500 mr-2 text-sm" />
                  <input
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    placeholder="Confirm New Password"
                    className="w-full border-none bg-transparent text-lg text-gray-500 focus:outline-none focus:ring-0"
                    required
                  />
                </div>
                {error.confirmNewPassword && (
                  <p className="text-[#D22424] text-sm">{error.confirmNewPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="w-full inline-block shrink-0 rounded-md bg-call-to-action px-12 py-3 text-lg font-semibold text-white transition-all duration-200 ease-in-out hover:bg-orange-500 hover:text-white focus:outline-none focus:ring focus:ring-blue-600"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </motion.form>
          </motion.div>
        </main>
      </div>
    </motion.section>
  );
};

export default ResetPassword;
