import React, { useState } from "react";
import {
  FaEdit,
  FaBox,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";

interface ShippingInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  country: string;
  state: string;
  city: string;
}

const RightSectionOrderSummary: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "Animakid",
    email: "animakid@gmail.com",
    phoneNumber: "854 5565 6745",
    countryCode: "+62",
    country: "Indonesia",
    state: "",
    city: "",
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Payment Section */}
      <div className="bg-white rounded-lg mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Payment</h2>
          <FaEdit className="w-4 h-4 text-gray-500 cursor-pointer" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
            <span className="text-blue-600 font-bold">B</span>
          </div>
          <span>Bank BCA</span>
        </div>
      </div>

      {/* Shipment Section */}
      <div className="bg-white rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Shipment</h2>
          <FaEdit className="w-4 h-4 text-gray-500 cursor-pointer" />
        </div>
        <div className="flex items-center gap-2 mb-4">
          <FaBox className="w-5 h-5 text-pink-500" />
          <div>
            <div>Anter Aja</div>
            <div className="text-sm text-gray-600">
              Estimated Delivery: 3-4 Days
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-600">Receipt: BDG123456789JKT</div>
      </div>

      {/* Shipping Information */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold">Shipping Information</h2>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaEdit className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <div className="font-medium">{shippingInfo.fullName}</div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
              <FaEnvelope className="w-4 h-4" />
              <span>{shippingInfo.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
              <FaPhone className="w-4 h-4" />
              <span>
                {shippingInfo.countryCode} {shippingInfo.phoneNumber}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Jl. Medan Merdeka Barat No.12, Gambir, Kecamatan Gambir, Kota
                Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Order Tracking</h3>
            <div className="space-y-4">
              {[
                {
                  date: "10 Dec 2024 17:20",
                  icon: <FaCheckCircle />,
                  status: "Delivered",
                },
                {
                  date: "10 Dec 2024 15:53",
                  status: "The order is in transit for delivery",
                },
                {
                  date: "10 Dec 2024 06:24",
                  status: "Pesanan dipindai di lokal transit JAKARTA",
                },
                {
                  date: "09 Dec 2024 20:51",
                  status:
                    "The order was dispatched from the sorting facility in JAKARTA",
                },
                {
                  date: "09 Dec 2024 20:51",
                  status:
                    "The order was received by the JAKARTA agent for processing",
                },
                { date: "09 Dec 2024 16:00", status: "Preparing to ship" },
                {
                  date: "09 Dec 2024 13:07",
                  status: "Courier assigned to pick up the order",
                },
                { date: "09 Dec 2024 12:54", status: "Order placed" },
              ].map((event, index) => (
                <div key={index} className="flex items-start gap-4">
                  {/* Date on the left */}
                  <div className="text-sm text-gray-500 w-32">{event.date}</div>

                  {/* Circle and status */}
                  <div className="flex items-start">
                    <div className="relative">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {index !== 7 && (
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200"></div>
                      )}
                    </div>
                  </div>

                  {/* Status on the right */}
                  <div className="flex-1 font-medium">{event.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RightSectionOrderSummary;
