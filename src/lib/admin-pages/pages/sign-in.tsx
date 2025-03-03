import React, { useState, useRef } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils"; // Import centralized server URL

export const SignInPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState(""); // Changed to empty string
  const [description, setDescription] = useState(""); // Changed to empty string

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpdate = async () => {
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await axios.post(
        `${SERVER_URL}/api/auththumb/sign-in`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message === "Thumbnail uploaded successfully") {
        alert("Details updated successfully!");
      } else {
        alert("Failed to upload thumbnail.");
      }
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      alert("An error occurred while updating details.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>

      {/* Image Upload Section */}
      <div className="grid grid-cols-2 gap-4 items-start mb-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Sign In Image <span className="text-red-500">*</span>
          </label>
          <div
            className="border-dashed border-2 border-call-to-action rounded-lg p-4 text-center bg-yellow-50 cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? (
              <div className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  className="w-full h-48 object-cover rounded"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={handleRemoveImage}
                    className="p-2 bg-red-500 text-white rounded-full"
                  >
                    <span role="img" aria-label="delete">
                      🗑️
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer px-4 py-2 bg-call-to-action text-white rounded"
                >
                  Browse
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Click to Upload or Drag & Drop
                  <br />
                  jpeg, jpg, png max 4mb
                </p>
              </>
            )}
          </div>
        </div>

        {/* Preview Section */}
        <div className="flex justify-center items-center">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-48 h-48 object-cover rounded-md shadow"
            />
          ) : (
            <div className="text-gray-500 text-sm">
              Image preview will appear here.
            </div>
          )}
        </div>
      </div>

      {/* Title and Description Section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Sign Up Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Welcome back!"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Sign Up Description <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Enter your details to access your account and continue your journey of creating and collecting Cards."
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded text-gray-700"
          onClick={() => console.log("Cancel clicked")}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-call-to-action text-white rounded"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
};
