import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import PhoneInput from "../checkout/components/PhoneInput";

interface UserProfile {
  id: string;
  name: string;
  fullName: string;
  phoneNumber: string;
  countryCode: string;
  email: string;
  role: string;
  ownedCards: any[];
  createdAt: string;
  updatedAt: string;
  image: string;
  socialLinks: any;
}

interface EventData {
  id: string;
  eventName: string;
  eventTime: string;
  eventDate: string;
  eventImage: string;
  eventDescription: string;
  onlineZoomLink: string | null;
  offlineLocation: string | null;
  eventSpecialGuestName: string;
  eventSpecialGuestOccupation: string;
  eventSpecialGuestImage: string;
  eventType: string;
}

interface RouteParams extends Record<string, string | undefined> {
  eventId: string;
}

const EventRegistration: React.FC = () => {
  const { eventId } = useParams<RouteParams>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+62",
    phoneNumber: "",
  });

  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [errorEvent, setErrorEvent] = useState<string | null>(null);

  const [registrationStatus, setRegistrationStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({ loading: false, success: false, error: null });

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get<UserProfile>(
          "http://localhost:3000/api/account/profile",
          { withCredentials: true }
        );
        const user = response.data;
        setFormData({
          fullName: user.fullName || user.name,
          email: user.email,
          countryCode: user.countryCode || "+62",
          phoneNumber: user.phoneNumber,
        });
      } catch (error: any) {
        console.error("Failed to fetch user profile:", error.message);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch event data
  useEffect(() => {
    if (!eventId) return;

    const fetchEventData = async () => {
      try {
        const response = await axios.get<EventData>(
          `http://localhost:3000/api/events/${eventId}`
        );
        setEventData(response.data);
        setLoadingEvent(false);
      } catch (error: any) {
        console.error("Failed to fetch event data:", error.message);
        setErrorEvent("Failed to load event details.");
        setLoadingEvent(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  const handleRegistration = async () => {
    if (!eventId) {
      setRegistrationStatus({
        loading: false,
        success: false,
        error: "Missing event ID",
      });
      return;
    }

    setRegistrationStatus({ loading: true, success: false, error: null });

    try {
      const response = await axios.post(
        `http://localhost:3000/api/event/${eventId}/register`,
        {},
        { withCredentials: true }
      );

      setRegistrationStatus({ loading: false, success: true, error: null });
      navigate("/success/registered/event");
    } catch (error: any) {
      let errorMessage = "Registration failed. Please try again.";
      if (error.response?.status === 409) {
        errorMessage = "You are already registered for this event.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.request) {
        errorMessage = "No response from server. Check your connection.";
      } else {
        errorMessage = error.message;
      }
      setRegistrationStatus({ loading: false, success: false, error: errorMessage });
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-4xl text-[#171717] font-bold mb-8 ml-8">Register</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 -mt-4">
          <form className="space-y-6 bg-white p-6 rounded-lg">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              readOnly
              className="w-full px-4 py-3 border rounded-lg text-gray-700 bg-gray-100 cursor-not-allowed"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              readOnly
              className="w-full px-4 py-3 border rounded-lg text-gray-700 bg-gray-100 cursor-not-allowed"
            />
            <PhoneInput
              countryCode={formData.countryCode}
              phoneNumber={formData.phoneNumber}
              onChange={() => {}}
              className="mt-6"
              disabled
            />
          </form>
        </div>

        <div className="bg-gray-50 border p-6 rounded-lg shadow-md lg:mt-0 lg:ml-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Event Summary</h2>

          {loadingEvent ? (
            <p className="text-gray-500">Loading event details...</p>
          ) : errorEvent ? (
            <p className="text-red-500">{errorEvent}</p>
          ) : eventData ? (
            <div className="bg-gray-100 border-t rounded-lg flex items-center p-4 mb-4">
              <img
                      src={`http://localhost:3000/uploads/event/${eventData.eventImage}`}
                      alt="Event Thumbnail"
                className="w-32 h-24 object-cover rounded-lg mr-4"
              />
              <div className="flex-col">
                <h3 className="text-gray-800 text-left font-semibold mb-2">
                  {eventData.eventName}
                </h3>
                <p className="text-gray-500 text-left text-sm mb-2">
                  <span>{new Date(eventData.eventTime).toLocaleTimeString()}</span> |{" "}
                  <span>{new Date(eventData.eventDate).toLocaleDateString()}</span>
                </p>
                <p className="text-gray-500 text-left text-sm">
  {eventData.eventType === "ONLINE" ? (
    <>
      Zoom Link: <br />
      <a
        href={eventData.onlineZoomLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline hover:text-blue-700"
      >
        {eventData.onlineZoomLink}
      </a>
    </>
  ) : (
    <>
      Location: <br />
      <span className="font-semibold">{eventData.offlineLocation}</span>
    </>
  )}
</p>

              </div>
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleRegistration}
            className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
            disabled={registrationStatus.loading}
          >
            {registrationStatus.loading ? "Registering..." : "Register"}
          </button>

          {registrationStatus.error && <p className="text-red-500 mt-2">{registrationStatus.error}</p>}
          {registrationStatus.success && <p className="text-green-500 mt-2">Registration successful! Redirecting...</p>}
        </div>
      </div>
    </div>
  );
};

export default EventRegistration;
