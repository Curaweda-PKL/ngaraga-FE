import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";
import { ProfilePage } from "./components/profile-page";
import { CardSections } from "./components/card-sections/card-sections";

const Account: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [claimStatus, setClaimStatus] = useState<string | null>(null);

  useEffect(() => {
    // Extract token from the URL query parameters
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get("token");
    if (tokenParam) {
      setToken(tokenParam);
      setShowModal(true);
    }
  }, []);

  // Auto-clear the notification after 5 seconds
  useEffect(() => {
    if (claimStatus) {
      const timer = setTimeout(() => {
        setClaimStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [claimStatus]);

  const handleClaim = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/claim-card`,
        { token },
        { withCredentials: true }
      );
      setClaimStatus("Claim successful! Your card has been added to your collection.");
      console.log("Claimed card:", response.data.card);

      // Remove token param and reload page so the card section re-fetches data
      const params = new URLSearchParams(window.location.search);
      if (params.has("token")) {
        params.delete("token");
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, document.title, newUrl);
        window.location.reload();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      setClaimStatus(`Claim failed: ${errorMessage}`);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Notification */}
      {claimStatus && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg transition-opacity duration-300 ${
            claimStatus.startsWith("Claim successful!")
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {claimStatus}
        </div>
      )}

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4">Claim Your Reward</h2>
            <p className="mb-6">Do you want to claim your reward?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleClaim}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Yes, Claim It!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <ProfilePage />
      <CardSections />
    </div>
  );
};

export default Account;
