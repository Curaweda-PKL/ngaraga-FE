import React, {useState, ChangeEvent} from "react";
import {Upload} from "lucide-react";

export const AddEvents = () => {
  const [formData, setFormData] = useState({
    eventImage: null as string | ArrayBuffer | null,
    eventName: "",
    eventTime: "",
    eventDate: "",
    eventBenefit: false,
    eventType: "",
    linkZoom: "",
    specialGuest: false,
    eventDetails: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value, type} = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          eventImage: reader.result,
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
          eventImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>Events</span>
        <span>/</span>
        <span>Events List</span>
        <span>/</span>
        <span className="text-gray-900">Add Events</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Add Events</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm">Events Image *</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {formData.eventImage ? (
                <img
                  src={formData.eventImage.toString()}
                  alt="Event"
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg flex items-center gap-2">
                      <Upload size={20} />
                      Browse
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Click to Upload or Drag & Drop
                  </p>
                  <p className="text-xs text-gray-400">
                    jpeg, jpg, png, max 4mb
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm">Event Name *</label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm">Events Time *</label>
              <input
                type="time"
                name="eventTime"
                value={formData.eventTime}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Events Date *</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">Events Benefit *</label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="eventBenefit"
                  checked={formData.eventBenefit}
                  onChange={handleInputChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
            <select
              disabled={!formData.eventBenefit}
              className="w-full p-2 border rounded-lg bg-white disabled:bg-gray-100"
            >
              <option>Choose a Card</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm">Events Details</label>
            <div className="border rounded-lg">
              <div className="flex gap-2 p-2 border-b">
                {/* Rich Text Editor Controls */}
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M13 5h-2v6H5v2h6v6h2v-6h6v-2h-6z"
                    />
                  </svg>
                </button>
                {/* Add more editor controls as needed */}
              </div>
              <textarea
                name="eventDetails"
                value={formData.eventDetails}
                onChange={handleInputChange}
                className="w-full p-4 min-h-[200px] focus:outline-none"
                placeholder="Write your event details..."
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm">Events Type *</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="eventType"
                  value="zoom"
                  checked={formData.eventType === "zoom"}
                  onChange={handleInputChange}
                  className="form-radio"
                />
                <span>Zoom Meeting</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="eventType"
                  value="offline"
                  checked={formData.eventType === "offline"}
                  onChange={handleInputChange}
                  className="form-radio"
                />
                <span>Offline Events</span>
              </label>
            </div>
          </div>

          {formData.eventType === "zoom" && (
            <div>
              <label className="block mb-2 text-sm">Link Zoom Meeting</label>
              <input
                type="text"
                name="linkZoom"
                value={formData.linkZoom}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Enter zoom meeting link"
              />
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">Special Guest</label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="specialGuest"
                  checked={formData.specialGuest}
                  onChange={handleInputChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">
          Cancel
        </button>
        <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
          Save
        </button>
      </div>
    </div>
  );
};
