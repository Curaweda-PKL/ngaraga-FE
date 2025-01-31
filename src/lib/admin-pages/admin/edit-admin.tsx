import React, { useState, ChangeEvent } from "react";
import { X } from "lucide-react";
import PhoneInput from "../../pages/checkout/components/PhoneInput";
import { AccessComponents } from "./components/accessComponents";

export const EditProfileAdmin = () => {
  const [formData, setFormData] = useState({
    fullName: "Animakid",
    username: "animakid123",
    email: "animakid@example.com",
    phoneNumber: "813 4567 8901",
    countryCode: "+62",
    profileImage: null as string | ArrayBuffer | null,
  });

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handlePermissionChange = (
    permissionKey: string,
    isChecked: boolean
  ) => {
    setSelectedPermissions((prev) =>
      isChecked
        ? [...prev, permissionKey]
        : prev.filter((key) => key !== permissionKey)
    );
  };

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

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
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

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{formData.fullName}</h1>
      <div className="card shadow-lg bg-white border-2 p-6">
        <div className="space-y-6">
          {/* Upload Area */}
          <div>
  <label className="block mb-2 font-medium">Member Image *</label>
  <div className="flex items-center space-x-4">
    {/* Left Section: Upload Area */}
    <div
      className="border-2 border-dashed border-gray-300 p-6 w-[18vw] h-[10vw] rounded-lg flex flex-col items-center justify-center"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {formData.profileImage ? (
        <div className="relative">
          <img
            src={formData.profileImage.toString()}
            alt="Profile Preview"
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
              id="profileImage"
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
      {/* Display Existing Image or Updated Preview */}
      <img
        src={
          formData.existingProfileImagePreview
            ? formData.existingProfileImagePreview.toString()
            : "https://via.placeholder.com/150" // Replace with actual existing image URL
        }
        alt="Existing Profile"
        className="w-full h-full rounded-2xl object-contain"
      />
      <div className="absolute bottom-0 right-0 m-2 bg-black bg-opacity-50 rounded-full p-1 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => {
            const input = document.getElementById("editProfileImage");
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
      {/* Hidden Input for Edit Icon */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="editProfileImage"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setFormData((prev) => ({
                ...prev,
                existingProfileImagePreview: reader.result, // Update only the existing image preview
              }));
            };
            reader.readAsDataURL(file);
          }
        }}
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
                name="username"
                value={formData.username}
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
              <PhoneInput className="" />
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

        <AccessComponents
          selectedPermissions={selectedPermissions}
          onPermissionChange={handlePermissionChange}
        />
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
              <button className="btn btn-warning text-white">Update</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end mt-6 space-x-4">
        <button className="btn btn-outline">Cancel</button>
        <button className="btn btn-warning text-white">Update</button>
      </div>
    </div>
  );
};
