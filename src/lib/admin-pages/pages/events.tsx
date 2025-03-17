import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";

export const EventsForm: React.FC = () => {
  const [title, setTitle] = useState(""); // State untuk title
  const [description, setDescription] = useState(""); // State untuk description
  const [loading, setLoading] = useState(false); // State untuk loading
  const [error, setError] = useState(""); // State untuk error
  const [success, setSuccess] = useState(""); // State untuk success
  const [existingData, setExistingData] = useState<{
    title: string;
    description: string;
  } | null>(null); // State untuk menyimpan data yang sudah ada

  // Fetch existing data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${SERVER_URL}/api/page-content/events`);
        console.log("Response data:", response.data); // Debugging
        if (response.data && response.data.title && response.data.description) {
          setExistingData({
            title: response.data.title,
            description: response.data.description,
          });
          setTitle(response.data.title);
          setDescription(response.data.description);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCancel = () => {
    if (existingData) {
      // Jika ada data yang sudah ada, kembalikan ke nilai tersebut
      setTitle(existingData.title);
      setDescription(existingData.description);
    } else {
      // Jika tidak ada data yang sudah ada, reset ke nilai default
      setTitle("");
      setDescription("");
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/page-content/events`,
        { title, description }
      );
      if (response.status === 200) {
        setSuccess("Events content updated successfully!");
        // Fetch updated data from the server
        const fetchResponse = await axios.get(
          `${SERVER_URL}/api/page-content/events`
        );
        setExistingData(fetchResponse.data.data); // Perbarui existingData dengan data terbaru
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setError("Failed to update events content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Tampilkan loading indicator
  }

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

export default React.memo(EventsForm);