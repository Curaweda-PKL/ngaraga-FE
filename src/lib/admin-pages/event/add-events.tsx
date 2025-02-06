import React, { useState, useEffect, ChangeEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Upload } from "lucide-react";
import axios from "axios";
import Select, { components, OptionProps } from "react-select";

// Define a type for your card data
interface Card {
  id: number; // now using card id
  image: string;
  sku: string; // still available if needed elsewhere
  characterName: string;
  categoryName: string;
  price: string;
  stock: number;
}

interface CardOption {
  value: number; // now using card id instead of sku
  label: string; // card name
  image: string; // image URL
}

export const AddEvents = () => {
  // Existing form state, now with selectedCard as a CardOption or null
  const [formData, setFormData] = useState({
    eventImage: null as File | null,
    eventName: "",
    eventTime: "",
    eventDate: "",
    eventBenefit: false,
    selectedCard: null as CardOption | null,
    eventType: "",
    linkZoom: "",
    offlineLocation: "",
    specialGuest: false,
    guestName: "",
    guestOccupation: "",
    guestAvatar: null as File | null,
    eventDetails: "",
  });

  // States for preview URLs
  const [eventImagePreview, setEventImagePreview] = useState<string | null>(null);
  const [guestAvatarPreview, setGuestAvatarPreview] = useState<string | null>(null);

  // New states for fetching cards
  const [cards, setCards] = useState<Card[]>([]);
  const [cardsLoading, setCardsLoading] = useState<boolean>(false);
  const [cardsError, setCardsError] = useState<string>("");

  // Fetch cards on component mount
  useEffect(() => {
    const fetchCards = async () => {
      setCardsLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/cards/all");
        // Assumes API returns { cards: [ ... ] }
        setCards(response.data.cards);
      } catch (error) {
        console.error("Error fetching cards:", error);
        setCardsError("Failed to fetch cards.");
      } finally {
        setCardsLoading(false);
      }
    };

    fetchCards();
  }, []);

  // Create options for react-select from your cards using card id instead of sku
  const cardOptions: CardOption[] = cards.map((card) => ({
    value: card.id,
    label: card.characterName,
    image: `http://localhost:3000/${card.image.replace(/\\/g, "/")}`,
  }));

  // Custom option for react-select that shows the image and name
  const CustomOption = (props: OptionProps<CardOption, false>) => (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={props.data.image}
          alt={props.data.label}
          style={{ width: 30, height: 30, objectFit: "cover", marginRight: 10 }}
        />
        <span>{props.data.label}</span>
      </div>
    </components.Option>
  );

  // Handlers for form inputs and file uploads (existing code)
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
      setFormData((prev) => ({ ...prev, eventImage: file }));
      setEventImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGuestAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, guestAvatar: file }));
      setGuestAvatarPreview(URL.createObjectURL(file));
    }
  };

  // For drag and drop functionality
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, eventImage: file }));
      setEventImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGuestAvatarDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, guestAvatar: file }));
      setGuestAvatarPreview(URL.createObjectURL(file));
    }
  };

  // Handler for React Quill editor change
  const handleEventDetailsChange = (value: string) => {
    setFormData((prev) => ({ ...prev, eventDetails: value }));
  };

  // Submit handler for creating the event
  const handleSubmit = async () => {
    if (!formData.eventName || !formData.eventTime || !formData.eventDate) {
      alert("Please fill in all required fields.");
      return;
    }
    if (!formData.eventImage) {
      alert("Please upload an event image.");
      return;
    }
    const data = new FormData();
    data.append("eventName", formData.eventName);
    data.append("eventTime", formData.eventTime);
    data.append("eventDate", formData.eventDate);
    data.append("eventDescription", formData.eventDetails);
    data.append("eventType", formData.eventType);
    if (formData.eventImage) {
      data.append("eventImage", formData.eventImage);
    }
    // If event benefit is enabled and a card is selected, send its id instead of sku
    if (formData.eventBenefit && formData.selectedCard) {
      data.append("cardRewards", formData.selectedCard.value.toString());
    }
    if (formData.eventType === "ONLINE") {
      data.append("onlineZoomLink", formData.linkZoom);
    } else if (formData.eventType === "OFFLINE") {
      data.append("offlineLocation", formData.offlineLocation);
    }
    if (formData.specialGuest) {
      data.append("eventSpecialGuestName", formData.guestName);
      data.append("eventSpecialGuestOccupation", formData.guestOccupation);
      if (formData.guestAvatar) {
        data.append("eventSpecialGuestImage", formData.guestAvatar);
      }
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/events",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Event created:", response.data);
    } catch (error) {
      console.error("Error creating event:", error);
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
          {/* Event Image */}
          <div>
            <label className="block mb-2 text-sm">Events Image *</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50"
              onDragOver={handleDragOver}
              onDrop={handleImageDrop}
            >
              {eventImagePreview ? (
                <img
                  src={eventImagePreview}
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

          {/* Event Benefit Toggle & Card Select */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">Event Benefit *</label>
              <label
                htmlFor="eventBenefit"
                className="relative inline-block w-10 h-6"
              >
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
            {cardsLoading ? (
              <p>Loading Cards...</p>
            ) : cardsError ? (
              <p style={{ color: "red" }}>{cardsError}</p>
            ) : (
              <Select
                isDisabled={!formData.eventBenefit}
                options={cardOptions}
                value={formData.selectedCard}
                onChange={(selectedOption) =>
                  setFormData((prev) => ({
                    ...prev,
                    selectedCard: selectedOption,
                  }))
                }
                placeholder="Choose a Card"
                components={{ Option: CustomOption }}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    borderRadius: "0.5rem",
                  }),
                }}
              />
            )}
          </div>

          {/* Event Details with React Quill */}
          <div>
            <label className="block mb-2 text-sm">Event Details</label>
            <ReactQuill
              value={formData.eventDetails}
              onChange={handleEventDetailsChange}
              placeholder="Write your event details..."
              className="min-h-[150px]"
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
                  value="ONLINE"
                  checked={formData.eventType === "ONLINE"}
                  onChange={handleInputChange}
                />
                <span>Online Event</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="eventType"
                  value="OFFLINE"
                  checked={formData.eventType === "OFFLINE"}
                  onChange={handleInputChange}
                />
                <span>Offline Event</span>
              </label>
            </div>
          </div>

          {/* Online Event Link */}
          {formData.eventType === "ONLINE" && (
            <div>
              <label className="block mb-2 text-sm">
                Online Event Link
              </label>
              <input
                type="text"
                name="linkZoom"
                value={formData.linkZoom}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter online event link"
              />
            </div>
          )}

          {/* Offline Location */}
          {formData.eventType === "OFFLINE" && (
            <div>
              <label className="block mb-2 text-sm mt-2">
                Event Location
              </label>
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

          {/* Special Guest Toggle & Fields */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">Special Guest</label>
              <label
                htmlFor="specialGuest"
                className="relative inline-block w-10 h-6"
              >
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
                  <label className="block mb-2 text-sm">
                    Guest Occupation
                  </label>
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
                    onDrop={handleGuestAvatarDrop}
                  >
                    {guestAvatarPreview ? (
                      <img
                        src={guestAvatarPreview}
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
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-call-to-actions-900 text-white rounded-lg hover:bg-yellow-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};
