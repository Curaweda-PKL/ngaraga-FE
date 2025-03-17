import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";

export const RankingsForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch data saat komponen di-mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${SERVER_URL}/api/page-content/rankings`);
        if (response.data) {
          setTitle(response.data.title || "");
          setDescription(response.data.description || "");
        }
      } catch (error) {
        // Jangan tampilkan error saat fetch data pertama kali
        console.error("Failed to fetch rankings content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCancel = () => {
    setError("");
    setSuccess("");
    // Fetch data lagi untuk reset ke nilai awal
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/page-content/rankings`);
        if (response.data) {
          setTitle(response.data.title || "");
          setDescription(response.data.description || "");
        }
      } catch (error) {
        // Jangan tampilkan error saat reset
        console.error("Failed to reset rankings content:", error);
      }
    };

    fetchData();
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/page-content/rankings`,
        { title, description }
      );
      if (response.status === 200) {
        setSuccess("Rankings content updated successfully!");
      }
    } catch (error) {
      setError("Failed to update rankings content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Rankings</h1>

        {/* Loading Indicator */}
        {loading && <p className="text-gray-500">Loading...</p>}

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              placeholder="Top Collectors"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              placeholder="Check out top ranking Card Collectors on the Card Marketplace."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-call-to-action text-call-to-action rounded-lg hover:bg-yellow-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-call-to-action text-white rounded-lg hover:bg-yellow-600"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>

        {/* Feedback Messages */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </div>
    </div>
  );
};