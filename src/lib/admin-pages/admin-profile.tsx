import React, { useState, ChangeEvent, useEffect } from "react";
import { X } from "lucide-react";
// Removed: import { useNavigate } from "react-router-dom";
import PhoneInput from "@/lib/pages/checkout/components/PhoneInput";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils"; // Import your server URL

export const ProfileSettings = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  // State to hold the file to send in FormData
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    name: "",
    email: "",
    phoneNumber: "",
    countryCode: "",
  });
  // To allow resetting changes on cancel, we store the initial data separately
  const [initialData, setInitialData] = useState(formData);

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/account/admin/profile`,
          { withCredentials: true }
        );
        const responseData = response.data;

        // Extract the nested data
        const userData = responseData.data.data;

        setExistingImage(
          userData.image
            ? `${SERVER_URL}/uploads/profile/${userData.image.split("\\").pop()}`
            : null
        );

        const fetchedData = {
          fullName: userData.fullName,
          name: userData.name,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          countryCode: userData.countryCode,
        };

        setFormData(fetchedData);
        setInitialData(fetchedData);

        const permissions =
          userData.permissions?.map((p: { permission: { key: string } }) => p.permission.key) || [];
        setSelectedPermissions(permissions);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    fetchUserData();
  }, []);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Image upload handler: store the file and show a preview
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update profile information (excluding password)
  const handleUpdate = async () => {
    try {
      // Create a FormData object to send file and text data
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("countryCode", formData.countryCode);

      // Append permissions as a JSON string
      formDataToSend.append("permissions", JSON.stringify(selectedPermissions));

      // Append the image file if a new one was selected.
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const response = await fetch(`${SERVER_URL}/api/account/admin/profile/update`, {
        method: "PUT",
        body: formDataToSend,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update failed");
      }

      const data = await response.json();
      console.log("Admin updated successfully", data);
      setSuccess("Profile updated successfully");
      setError(null);
    } catch (error) {
      console.error("Error updating admin:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
      setSuccess(null);
    }
  };

  // Handle password reset using Axios
  const handlePasswordUpdate = async () => {
    try {
      const response = await axios.patch(
        `${SERVER_URL}/api/general/account/reset-password`,
        {
          newPassword: passwordData.newPassword,
          confirmPassword: passwordData.confirmPassword,
        },
        { withCredentials: true }
      );
      console.log("Password reset successfully:", response.data);
      setSuccess("Password reset successfully");
      setError(null);
      // Close the modal and clear the password fields
      setShowPasswordModal(false);
      setPasswordData({ newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      console.error("Error resetting password:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Error resetting password");
      setSuccess(null);
    }
  };

  // Cancel action: reset the form to its initial values
  const handleCancel = () => {
    setFormData(initialData);
    setImageFile(null);
    setImagePreview(null);
    // Optionally reset permissions as needed:
    // setSelectedPermissions([]);
    setSuccess("Changes cancelled");
    setError(null);
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-300 rounded w-1/2"></div>
          <div className="card shadow-lg bg-white border-2 p-6">
            <div className="flex space-x-4">
              <div className="w-32 h-32 bg-gray-300 rounded-lg"></div>
              <div className="flex-1 space-y-4">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (initialLoad) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Display messages */}
      {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">{success}</div>}
      
      <h1 className="text-2xl font-bold mb-6">{formData.fullName}</h1>
      <div className="card shadow-lg bg-white border-2 p-6">
        <div className="space-y-6">
          {/* Upload Area */}
          <div>
            <label className="block mb-2 font-medium">New Image *</label>
            <div className="flex items-center space-x-4">
              {/* Left Section: Upload Area */}
              <div
                className="border-2 border-dashed border-gray-300 p-6 w-[18vw] h-[10vw] rounded-lg flex flex-col items-center justify-center"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview.toString()}
                      alt="Upload Preview"
                      className="w-32 h-32 rounded-2xl object-contain"
                    />
                  </div>
                ) : (
                  <>
                    <label className="btn cursor-pointer text-white bg-yellow-300 rounded-xl">
                      Browse
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="image"
                        onChange={handleImageUpload}
                      />
                    </label>
                    <p className="mt-4 text-sm text-red-500">
                      Click to Upload or Drag & Drop
                    </p>
                  </>
                )}
              </div>

              {/* Right Section: Existing Image with Edit Icon */}
              <div className="relative w-32 h-32">
                {existingImage && !imagePreview && (
                  <img
                    src={existingImage}
                    alt="Existing Profile"
                    className="w-full h-full rounded-2xl object-cover"
                  />
                )}
                <div className="absolute bottom-0 right-0 m-2 bg-black bg-opacity-50 rounded-full p-1 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => {
                      const input = document.getElementById("editimage");
                      if (input) {
                        input.click();
                      }
                    }}
                    className="text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="editimage"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>

          {/* Form Input */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="input input-bordered w-full bg-white"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Username *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input input-bordered w-full bg-white"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input input-bordered w-full bg-white"
              />
            </div>
            <div className="mt-9">
              <PhoneInput
                countryCode={formData.countryCode}
                phoneNumber={formData.phoneNumber}
                onChange={(countryCode, phoneNumber) => {
                  setFormData((prev) => ({
                    ...prev,
                    countryCode,
                    phoneNumber,
                  }));
                }}
              />
            </div>
          </div>

          {/* Reset Password Button */}
          <button
            onClick={() => setShowPasswordModal(true)}
            className="btn btn-warning text-white"
          >
            Reset Password
          </button>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="card bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Reset Password</h2>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">New Password *</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block mb-2">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button onClick={handlePasswordUpdate} className="btn btn-warning text-white">
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel & Update Buttons for Profile Update */}
      <div className="flex justify-end mt-6 space-x-4">
        <button className="btn btn-outline" onClick={handleCancel}>
          Cancel
        </button>
        <button onClick={handleUpdate} className="btn btn-warning text-white">
          Update
        </button>
      </div>
    </div>
  );
};
