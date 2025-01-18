import {useState} from "react";

export const SectionThreeFrom = () => {
  const [title, setTitle] = useState("Browse Events");
  const [description, setDescription] = useState(
    "Explore a wide variety of events in our Event Directory."
  );

  const handleCancel = () => {
    // Reset to initial values or handle cancellation logic
    setTitle("Browse Events");
    setDescription("Explore a wide variety of events in our Event Directory.");
  };

  const handleUpdate = () => {
    // Logic to handle update (e.g., API call or form submission)
    alert("Updated: " + title + " - " + description);
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
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
