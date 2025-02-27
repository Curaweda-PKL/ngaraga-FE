import React, { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils"; // Import centralized server URL

export const EventsForm: React.FC = () => {
  const [title, setTitle] = useState(""); // initial state is empty
  const [description, setDescription] = useState(""); // initial state is empty
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCancel = () => {
    // Reset to empty values so placeholders reappear
    setTitle("");
    setDescription("");
    setError("");
    setSuccess("");
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/page-content/browsevent`,
        { title, description }
      );
      if (response.status === 200) {
        setSuccess("Events content updated successfully!");
      }
    } catch (error) {
      setError("Failed to update events content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Events</h1>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              placeholder="Browse Events"
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
              placeholder="Explore a wide variety of events in our Event Directory."
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
            className="px-6 py-2 border border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
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
