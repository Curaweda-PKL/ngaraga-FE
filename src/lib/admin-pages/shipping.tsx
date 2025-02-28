import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";

interface ShippingCarrier {
  id: number;
  name: string;
  logo: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ShippingProps {
  onStatusChange?: (id: number, status: boolean) => void;
}

export const Shipping: React.FC<ShippingProps> = ({ onStatusChange }) => {
  const [carriers, setCarriers] = useState<ShippingCarrier[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch shipping carriers from backend
  const fetchCarriers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${SERVER_URL}/api/courier`);
      // Map API data to match ShippingCarrier interface:
      const mappedCarriers = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        logo: item.courierImage, // using courierImage as logo
        isActive: item.isActive,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));
      setCarriers(mappedCarriers);
    } catch (err: any) {
      console.error("Error fetching carriers:", err);
      setError("Failed to load shipping carriers.");
      // Fallback data if backend request fails
      setCarriers([
        {
          id: 1,
          name: "Anteraja",
          logo: "https://static.vecteezy.com/system/resources/thumbnails/002/206/240/small_2x/fast-delivery-icon-free-vector.jpg",
          isActive: true,
        },
        {
          id: 2,
          name: "J&T Cargo",
          logo: "https://static.vecteezy.com/system/resources/thumbnails/002/206/240/small_2x/fast-delivery-icon-free-vector.jpg",
          isActive: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarriers();
  }, []);

  // Update carrier status on the server
  const updateCarrierStatusOnServer = async (id: number, isActive: boolean) => {
    try {
      await axios.put(`${SERVER_URL}/api/courier/${id}`, { isActive });
    } catch (err) {
      console.error("Error updating carrier status:", err);
      throw err;
    }
  };

  // Toggle handler with optimistic update, success and error notifications
  const handleToggle = async (id: number): Promise<void> => {
    try {
      // Optimistically update state
      const updatedCarriers = carriers.map((carrier) =>
        carrier.id === id ? { ...carrier, isActive: !carrier.isActive } : carrier
      );
      setCarriers(updatedCarriers);
      const updatedCarrier = updatedCarriers.find((carrier) => carrier.id === id);
      if (updatedCarrier && onStatusChange) {
        onStatusChange(id, updatedCarrier.isActive);
      }
      // Update server
      await updateCarrierStatusOnServer(id, updatedCarrier?.isActive ?? false);
      setNotification("Carrier updated successfully.");
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setError("Failed to update carrier status.");
      // Rollback optimistic update on failure
      setCarriers((prev) =>
        prev.map((carrier) =>
          carrier.id === id ? { ...carrier, isActive: !carrier.isActive } : carrier
        )
      );
    }
  };

  if (loading) {
    return <div>Loading shipping carriers...</div>;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">Shipping / Shipping List</div>

        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Shipping</h1>

        {/* Notification and Error Messages */}
        {notification && (
          <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
            {notification}
          </div>
        )}
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
            {error}
          </div>
        )}

        {/* Shipping Carriers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {carriers.map((carrier) => (
            <div
              key={carrier.id}
              className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Icon and Name */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
                  <img
                    src={carrier.logo}
                    alt={`${carrier.name} logo`}
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/path/to/fallback-image.png"; // Adjust fallback image path
                      target.onerror = null;
                    }}
                  />
                </div>
                <span className="text-gray-700 font-medium">{carrier.name}</span>
              </div>

              {/* Toggle Button */}
              <div
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                  carrier.isActive ? "bg-call-to-action" : "bg-gray-200"
                }`}
                onClick={() => handleToggle(carrier.id)}
                role="switch"
                aria-checked={carrier.isActive}
                tabIndex={0}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                    carrier.isActive ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shipping;
