import React, {useState, ChangeEvent} from "react";
import {X} from "lucide-react";

export const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    fullName: "Animakid",
    username: "animakid123",
    email: "animakid@example.com",
    phoneNumber: "813 4567 8901",
    countryCode: "+62",
    profileImage: null as string | ArrayBuffer | null,
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const {name, value} = e.target;
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
    const {name, value} = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="card shadow-lg bg-white border-2 p-6">
        <h1 className="text-2xl font-bold mb-6">{formData.fullName}</h1>
        <div className="space-y-6">
          {/* Upload Area */}
          <div>
            <label className="block mb-2 font-medium">Member Image *</label>
            <div
              className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {formData.profileImage ? (
                <div className="relative">
                  <img
                    src={formData.profileImage.toString()}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="profileImage"
                    onChange={handleImageUpload}
                  />
                  <label
                    htmlFor="profileImage"
                    className="cursor-pointer"
                  >
                    <button className="btn btn-warning text-white">
                      Browse
                    </button>
                    <p className="mt-2 text-sm text-red-500">
                      Click to Upload or Drag & Drop
                    </p>
                  </label>
                </>
              )}
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
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Username *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Phone Number</label>
              <div className="flex">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="select select-bordered w-20"
                >
                  <option value="+62">+62</option>
                </select>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
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

        <div className="flex justify-end mt-6 space-x-4">
          <button className="btn btn-outline">Cancel</button>
          <button className="btn btn-warning text-white">Update</button>
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
              <button className="btn btn-warning text-white">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
