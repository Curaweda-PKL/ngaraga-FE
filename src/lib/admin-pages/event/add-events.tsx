import React, { useState, ChangeEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
import { Upload } from "lucide-react";

export const AddEvents = () => {
  const [formData, setFormData] = useState({
    eventImage: null as string | ArrayBuffer | null,
    eventName: "",
    eventTime: "",
    eventDate: "",
    eventBenefit: false,
    eventType: "",
    linkZoom: "",
    offlineLocation: "",
    specialGuest: false,
    guestName: "",
    guestOccupation: "",
    guestAvatar: null as string | ArrayBuffer | null,
    eventDetails: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, eventImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGuestAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, guestAvatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, eventImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler for React Quill editor change
  const handleEventDetailsChange = (value: string) => {
    setFormData((prev) => ({ ...prev, eventDetails: value }));
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
          {/* Event Image */}
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
                  <label
                    htmlFor="upload-image"
                    className="cursor-pointer px-4 py-2 bg-call-to-actions-900 text-white rounded-lg flex items-center gap-2"
                  >
                    <Upload size={20} />
                    Browse
                  </label>
                  <input
                    id="upload-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
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

          {/* Event Name */}
          <div>
            <label className="block mb-2 text-sm">Event Name *</label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Event Time & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm">Event Time *</label>
              <input
                type="time"
                name="eventTime"
                value={formData.eventTime}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Event Date *</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* Event Benefit Toggle */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">Event Benefit *</label>
              <label htmlFor="eventBenefit" className="relative inline-block w-10 h-6">
                <input
                  type="checkbox"
                  id="eventBenefit"
                  name="eventBenefit"
                  checked={formData.eventBenefit}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-full h-full bg-gray-200 rounded-full peer peer-checked:bg-yellow-500 transition-colors"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-4" />
              </label>
            </div>
            <select
              disabled={!formData.eventBenefit}
              className="w-full p-2 border rounded-lg bg-white disabled:bg-gray-100"
            >
              <option>Choose a Card</option>
            </select>
          </div>

          {/* Event Details with React Quill */}
          <div>
            <label className="block mb-2 text-sm">Event Details</label>
            <ReactQuill
              value={formData.eventDetails}
              onChange={handleEventDetailsChange}
              placeholder="Write your event details..."
              className="min-h-[150px]"
              // Optionally, you can customize the toolbar:
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Event Type */}
          <div>
            <label className="block mb-2 text-sm">Event Type *</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="eventType"
                  value="zoom"
                  checked={formData.eventType === "zoom"}
                  onChange={handleInputChange}
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
                />
                <span>Offline Event</span>
              </label>
            </div>
          </div>

          {/* Zoom Link */}
          {formData.eventType === "zoom" && (
            <div>
              <label className="block mb-2 text-sm">Zoom Meeting Link</label>
              <input
                type="text"
                name="linkZoom"
                value={formData.linkZoom}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter Zoom meeting link"
              />
            </div>
          )}

          {/* Offline Location */}
          {formData.eventType === "offline" && (
            <div>
              <label className="block mb-2 text-sm mt-2">Event Location</label>
              <input
                type="text"
                name="offlineLocation"
                value={formData.offlineLocation}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter event location"
              />
            </div>
          )}

          {/* Special Guest Toggle */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">Special Guest</label>
              <label htmlFor="specialGuest" className="relative inline-block w-10 h-6">
                <input
                  type="checkbox"
                  id="specialGuest"
                  name="specialGuest"
                  checked={formData.specialGuest}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-full h-full bg-gray-200 rounded-full peer peer-checked:bg-yellow-500 transition-colors"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-4" />
              </label>
            </div>
            {formData.specialGuest && (
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm">Guest Name</label>
                  <input
                    type="text"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter guest name"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Guest Occupation</label>
                  <input
                    type="text"
                    name="guestOccupation"
                    value={formData.guestOccupation}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter guest occupation"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Guest Avatar</label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    {formData.guestAvatar ? (
                      <img
                        src={formData.guestAvatar.toString()}
                        alt="Guest Avatar"
                        className="w-24 h-24 object-cover rounded-full mx-auto"
                      />
                    ) : (
                      <div className="space-y-4">
                        <label
                          htmlFor="upload-avatar"
                          className="cursor-pointer px-4 py-2 bg-call-to-actions-900 text-white rounded-lg flex items-center gap-2"
                        >
                          <Upload size={20} />
                          Browse
                        </label>
                        <input
                          id="upload-avatar"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleGuestAvatarUpload}
                        />
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
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">
          Cancel
        </button>
        <button className="px-6 py-2 bg-call-to-actions-900 text-white rounded-lg hover:bg-yellow-600">
          Save
        </button>
      </div>
    </div>
  );
};
