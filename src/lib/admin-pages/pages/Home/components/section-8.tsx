import {useState} from "react";
import {IoMdClose} from "react-icons/io";

export const SectionEightForm = () => {
  const [formData, setFormData] = useState({
    title: "Join our weekly Update",
    description: "Get exclusive promotions & updates straight to your inbox.",
  });

  const handleClearField = (field: "title" | "description") => {
    setFormData((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-medium mb-6">Section 8</h2>

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
              onChange={(e) =>
                setFormData((prev) => ({...prev, title: e.target.value}))
              }
              className="w-full border rounded-lg px-4 py-2.5 pr-10"
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => handleClearField("title")}
            >
              <IoMdClose className="text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({...prev, description: e.target.value}))
              }
              className="w-full border rounded-lg px-4 py-2.5 pr-10"
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => handleClearField("description")}
            >
              <IoMdClose className="text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
