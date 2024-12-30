import React, {useState} from "react";

interface ShippingCarrier {
  id: number;
  name: string;
  logo: string;
  isActive: boolean;
}

interface ShippingProps {
  onStatusChange?: (id: number, status: boolean) => void;
}

export const Shipping: React.FC<ShippingProps> = ({onStatusChange}) => {
  const initialCarriers: ShippingCarrier[] = [
    {
      id: 1,
      name: "Anteraja",
      logo: "/path/to/anteraja-logo.png",
      isActive: true,
    },
    {
      id: 2,
      name: "J&T Cargo",
      logo: "/path/to/jt-cargo-logo.png",
      isActive: true,
    },
    {
      id: 3,
      name: "J&T Express",
      logo: "/path/to/jt-express-logo.png",
      isActive: true,
    },
    {
      id: 4,
      name: "JNE Express",
      logo: "/path/to/jne-logo.png",
      isActive: true,
    },
    {
      id: 5,
      name: "ID Express",
      logo: "/path/to/id-express-logo.png",
      isActive: true,
    },
    {
      id: 6,
      name: "Lalamove",
      logo: "/path/to/lalamove-logo.png",
      isActive: true,
    },
    {
      id: 7,
      name: "Lion Parcel",
      logo: "/path/to/lion-parcel-logo.png",
      isActive: true,
    },
    {
      id: 8,
      name: "Ninja Express",
      logo: "/path/to/ninja-express-logo.png",
      isActive: true,
    },
    {
      id: 9,
      name: "RPX",
      logo: "/path/to/rpx-logo.png",
      isActive: true,
    },
    {
      id: 10,
      name: "Sicepat Express",
      logo: "/path/to/sicepat-logo.png",
      isActive: true,
    },
    {
      id: 11,
      name: "Tiki",
      logo: "/path/to/tiki-logo.png",
      isActive: true,
    },
    {
      id: 12,
      name: "Wahana",
      logo: "/path/to/wahana-logo.png",
      isActive: false,
    },
    {
      id: 13,
      name: "Shopee Express",
      logo: "/path/to/shopee-express-logo.png",
      isActive: false,
    },
    {
      id: 14,
      name: "SAP Express",
      logo: "/path/to/sap-express-logo.png",
      isActive: false,
    },
  ];

  // State management using useState hook
  const [carriers, setCarriers] = useState<ShippingCarrier[]>(initialCarriers);

  // Toggle handler with proper error handling
  const handleToggle = (id: number): void => {
    try {
      setCarriers((prevCarriers) => {
        const updatedCarriers = prevCarriers.map((carrier) =>
          carrier.id === id
            ? {...carrier, isActive: !carrier.isActive}
            : carrier
        );
        // Invoke the callback if provided
        const updatedCarrier = updatedCarriers.find((c) => c.id === id);
        if (updatedCarrier && onStatusChange) {
          onStatusChange(id, updatedCarrier.isActive);
        }
        return updatedCarriers;
      });
    } catch (error) {
      console.error("Error toggling carrier status:", error);
      // Here you might want to add proper error handling UI feedback
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="text-sm text-gray-500 mb-4">
          Shipping / Shipping List
        </div>

        {/* Page Header */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Shipping</h1>

        {/* Carriers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {carriers.map((carrier) => (
            <div
              key={carrier.id}
              className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Logo and Name Container */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={carrier.logo}
                    alt={`${carrier.name} logo`}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/path/to/fallback-image.png"; // Replace with actual fallback image
                      target.onerror = null; // Prevent infinite loop
                    }}
                  />
                </div>
                <span className="text-gray-700 font-medium">
                  {carrier.name}
                </span>
              </div>

              {/* Toggle Switch */}
              <div
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                  carrier.isActive ? "bg-yellow-500" : "bg-gray-200"
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
