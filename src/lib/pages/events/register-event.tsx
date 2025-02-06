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

interface RouteParams extends Record<string, string | undefined> {
  eventId: string;
}

const EventRegistration: React.FC = () => {
  const { eventId } = useParams<RouteParams>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+62", // Default country code
    phoneNumber: "",
  });

  const [registrationStatus, setRegistrationStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({ loading: false, success: false, error: null });

  // Fetch user profile on component mount
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

  // Input handler (fields remain read-only)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (countryCode: string, phoneNumber: string) => {
    setFormData((prev) => ({ ...prev, countryCode, phoneNumber }));
  };

  // Local submission handler if needed for form state
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  // Registration endpoint handler with enhanced error handling and redirection on success
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
      console.log("Submitting registration for event:", eventId);
      const response = await axios.post(
        `http://localhost:3000/api/event/${eventId}`,
        {}, // Additional data can be added here if needed
        { withCredentials: true }
      );
      console.log("Registration success:", response.data);
      setRegistrationStatus({ loading: false, success: true, error: null });
      // Redirect to success page after registration
      navigate("/success/registered/event");
    } catch (error: any) {
      console.error("Registration failed:", error);
      let errorMessage = "Registration failed. Please try again.";
  
      if (error.response) {
        // If the HTTP status is 409, or the error message contains the unique constraint failure text,
        // then show a user-friendly error.
        if (error.response.status === 409) {
          errorMessage = "You are already registered for this event.";
        } else if (error.response.data && error.response.data.message) {
          if (
            error.response.data.message.includes("Unique constraint failed") ||
            error.response.data.message.includes("already exists")
          ) {
            errorMessage = "You are already registered for this event.";
          } else {
            errorMessage = error.response.data.message;
          }
        }
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = error.message;
      }
  
      setRegistrationStatus({
        loading: false,
        success: false,
        error: errorMessage,
      });
    }
  };
  

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Heading */}
      <h1 className="text-4xl text-[#171717] font-bold mb-8 ml-8">Register</h1>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Registration Form */}
        <div className="lg:col-span-2 -mt-4">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg">
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                readOnly
                className="w-full px-4 py-3 border rounded-lg text-gray-700 bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                readOnly
                className="w-full px-4 py-3 border rounded-lg text-gray-700 bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="flex items-center">
              <PhoneInput
                countryCode={formData.countryCode}
                phoneNumber={formData.phoneNumber}
                onChange={handlePhoneChange}
                disabled={true} // Prevent editing of phone number and country code
              />
            </div>
          </form>
        </div>

        {/* Event Summary */}
        <div className="bg-gray-50 border p-6 rounded-lg shadow-md lg:mt-0 lg:ml-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Summary Event</h2>
          <div className="bg-gray-100 border-t rounded-lg flex items-center p-4 mb-4">
            <img
              src="/src/assets/img/dall-e.png"
              alt="Event Thumbnail"
              className="w-32 h-24 object-cover rounded-lg mr-4"
            />
            <div className="flex-col">
              <h3 className="text-gray-800 text-left font-semibold mb-2">
                A Special Evening Celebration
              </h3>
              <p className="text-gray-500 text-left text-sm mb-2">
                <span>08:00 - 20:00</span> | <span>07 Dec 2024</span>
              </p>
              <p className="text-gray-500 text-left text-sm">Zoom Meeting</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRegistration}
            className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
            disabled={registrationStatus.loading}
          >
            {registrationStatus.loading ? "Registering..." : "Register"}
          </button>
          {registrationStatus.error && (
            <p className="text-red-500 mt-2">{registrationStatus.error}</p>
          )}
          {registrationStatus.success && (
            <p className="text-green-500 mt-2">Registration successful! Redirecting...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventRegistration;
