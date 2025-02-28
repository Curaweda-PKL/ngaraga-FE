import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import PhoneInput from "../checkout/components/PhoneInput";
import {SERVER_URL} from "@/middleware/utils";

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
  onlineZoomLink?: string | null;
  offlineLocation?: string | null;
  eventSpecialGuestName: string;
  eventSpecialGuestOccupation: string;
  eventSpecialGuestImage: string;
  eventType: string;
}

interface RouteParams extends Record<string, string | undefined> {
  eventId: string;
}

const EventRegistration: React.FC = () => {
  const {eventId} = useParams<RouteParams>();
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
  }>({loading: false, success: false, error: null});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get<UserProfile>(
          `${SERVER_URL}/api/account/profile`,
          {withCredentials: true}
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

  useEffect(() => {
    if (!eventId) return;

    const fetchEventData = async () => {
      try {
        const response = await axios.get<EventData>(
          `${SERVER_URL}/api/events/${eventId}`
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
      await axios.post(
        `${SERVER_URL}/api/event/${eventId}`,
        {},
        { withCredentials: true }
      );
  
      setRegistrationStatus({ loading: false, success: true, error: null });
      navigate("/success/registered/event");
    } catch (error: any) {
      // Log the error details internally for debugging.
      console.error("Registration error: ", error);
  
      // Set a generic error message for the user.
      let errorMessage = "Oops, something went wrong. Please try again later.";
      if (error.response?.status === 409) {
        errorMessage = "You are already registered for this event.";
      } else if (error.request) {
        errorMessage =
          "We couldn't connect to our servers. try few minutes later.";
      }
  
      setRegistrationStatus({
        loading: false,
        success: false,
        error: errorMessage,
      });
    }
  };
  
  const formatEventTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatEventDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header - Only visible on mobile */}
      <div className="md:hidden px-6 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-[#171717]">Register</h1>
      </div>

      {/* Desktop Header - Only visible on tablet and desktop */}
      <div className="hidden md:block p-8">
        <h1 className="text-4xl text-[#171717] font-bold mb-8">Register</h1>
      </div>

      <div className="md:grid md:grid-cols-1 lg:grid-cols-3 md:gap-8 md:p-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg space-y-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                readOnly
                className="w-full pl-12 pr-4 py-3 border rounded-lg text-gray-700 bg-gray-50"
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                readOnly
                className="w-full pl-12 pr-4 py-3 border rounded-lg text-gray-700 bg-gray-50"
              />
            </div>

            <PhoneInput
              countryCode={formData.countryCode}
              phoneNumber={formData.phoneNumber}
              onChange={() => {}}
              className="mt-6"
              disabled
            />
          </div>
        </div>

        <div className="mt-6 md:mt-0 px-4 md:px-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-medium p-4 border-b">Summary Event</h2>

            {loadingEvent ? (
              <p className="p-4 text-gray-500">Loading event details...</p>
            ) : errorEvent ? (
              <p className="p-4 text-red-500">{errorEvent}</p>
            ) : eventData ? (
              <div className="p-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex gap-4">
                    <img
                      src={`${SERVER_URL}/uploads/event/${eventData.eventImage}`}
                      alt="Event"
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">
                        {eventData.eventName}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {formatEventTime(eventData.eventTime)} -{" "}
                          {formatEventTime(eventData.eventTime)}
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {formatEventDate(eventData.eventDate)}
                        </div>
                        <div className="flex items-center gap-2">
                          {eventData.eventType === "ONLINE" ? (
                            <>
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                              Zoom Meeting
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              {eventData.offlineLocation}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="p-4">
              <button
                onClick={handleRegistration}
                disabled={registrationStatus.loading}
                className="w-full py-3 px-4 bg-call-to-action text-white font-medium rounded-xl hover:bg-yellow-600 transition-colors"
              >
                {registrationStatus.loading ? "Registering..." : "Register"}
              </button>

              {registrationStatus.error && (
                <p className="mt-3 text-sm text-red-500 text-center">
                  {registrationStatus.error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegistration;
