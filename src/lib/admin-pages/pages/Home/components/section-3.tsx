import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";
import { IoMdClose } from "react-icons/io";

export const SectionThreeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleClearField = (field: "title" | "description") => {
    setFormData((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleSave = async () => {
    // Reset previous messages
    setMessage({ type: "", text: "" });

    // Validate that both fields have input
    if (!formData.title || !formData.description) {
      setMessage({ type: "error", text: "Please fill in all required fields." });
      return;
    }
    try {
      // Payload mapping to your backend's expected fields
      const payload = {
        slug: "top-collectors",
        topCollectorsTitle: formData.title,
        topCollectorsDescription: formData.description,
      };
      const response = await axios.post(`${SERVER_URL}/api/top-collectors`, payload);
      console.log(response.data);
      setMessage({ type: "success", text: "Saved successfully!" });
    } catch (error) {
      console.error("Error saving top collectors section:", error);
      setMessage({ type: "error", text: "Error saving section." });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-medium mb-6">Section 3 - Top Collectors</h2>

      {/* Message Display */}
      {message.text && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.title}
              placeholder="Top Collectors"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className={`w-full border rounded-lg px-4 py-2.5 pr-10 ${
                !formData.title ? "bg-gray-100" : ""
              }`}
            />
            {formData.title && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => handleClearField("title")}
              >
                <IoMdClose className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.description}
              placeholder="Top Collector Description"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              className={`w-full border rounded-lg px-4 py-2.5 pr-10 ${
                !formData.description ? "bg-gray-100" : ""
              }`}
            />
            {formData.description && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => handleClearField("description")}
              >
                <IoMdClose className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          className="w-full text-center bg-call-to-actions-900 text-white font-bold py-3 px-6 rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
};
