import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ForgotPasswordImage from "@/assets/img/spacestarry.png";

type ResetPasswordFormData = {
  newPassword: string;
  confirmNewPassword: string;
};

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ResetPasswordFormData>({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

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

  const validateForm = () => {
    let valid = true;
    const newError: { [key: string]: string } = {};

    if (!formData.newPassword) {
      newError.newPassword = "New password cannot be empty!";
      valid = false;
    } else if (formData.newPassword.length < 8) {
      newError.newPassword = "Password must be at least 8 characters long.";
      valid = false;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      newError.confirmNewPassword = "Passwords do not match!";
      valid = false;
    }

    setError(newError);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/reset-password`,
        {
          token,
          newPassword: formData.newPassword,
        }
      );

      setMessage(response.data.message);
      const userRole = response.data.role;

      if (userRole === "ADMIN" || userRole === "SUPER_ADMIN") {
        navigate("/admin/login");
      } else {
        navigate("/login");
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section className="bg-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img alt="reset-password" src={ForgotPasswordImage} className="absolute inset-0 h-full w-full object-cover opacity-80" />
        </section>
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <motion.div className="max-w-xl lg:max-w-3xl">
            <motion.form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Reset your password</h2>
              </div>
              <div className="col-span-6 relative">
                <div className={`mt-1 flex items-center border rounded-md bg-white py-3 px-4 shadow-sm`}> 
                  <FaLock className="text-gray-500 mr-2 text-sm" />
                  <input type={showPassword ? "text" : "password"} name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="New Password" className="w-full border-none bg-transparent text-lg text-gray-500 focus:outline-none" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2 text-gray-500">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {error.newPassword && <p className="text-[#D22424] text-sm">{error.newPassword}</p>}
              </div>
              <div className="col-span-6 relative">
                <div className={`mt-1 flex items-center border rounded-md bg-white py-3 px-4 shadow-sm`}> 
                  <FaLock className="text-gray-500 mr-2 text-sm" />
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} placeholder="Confirm New Password" className="w-full border-none bg-transparent text-lg text-gray-500 focus:outline-none" required />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="ml-2 text-gray-500">
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {error.confirmNewPassword && <p className="text-[#D22424] text-sm">{error.confirmNewPassword}</p>}
              </div>
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button type="submit" className="w-full rounded-md bg-call-to-action px-12 py-3 text-lg font-semibold text-white hover:bg-orange-500" disabled={loading}>
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
              {message && <div className="col-span-6 text-center"><p className="text-lg font-semibold text-green-500">{message}</p></div>}
            </motion.form>
          </motion.div>
        </main>
      </div>
    </motion.section>
  );
};

export default ResetPassword;
