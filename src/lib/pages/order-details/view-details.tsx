import React from "react";
import {FaBox, FaCheck, FaCopy, FaCreditCard, FaTruck} from "react-icons/fa";

const ViewDetail: React.FC = () => {
  const orderStages = [
    {
      icon: <FaCreditCard size={20} />,
      label: "Payment",
      active: true,
      completed: true,
    },
    {
      icon: <FaBox size={20} />,
      label: "Packaging",
      active: true,
      completed: true,
    },
    {
      icon: <FaTruck size={20} />,
      label: "Shipping",
      active: false,
      completed: false,
    },
    {
      icon: <FaCheck size={20} />,
      label: "Delivered",
      active: false,
      completed: false,
    },
  ];

  const orderItems = [
    {
      id: 1,
      name: "Dancing Robot 0512",
      type: "Orbitian",
      price: 200000,
      qty: 1,
      image: "/api/placeholder/150/150",
    },
    {
      id: 2,
      name: "Dancing Robot 0512",
      type: "Orbitian",
      price: 200000,
      qty: 1,
      image: "/api/placeholder/150/150",
    },
    {
      id: 3,
      name: "Dancing Robot 0512",
      type: "Orbitian",
      price: 100000,
      qty: 1,
      image: "/api/placeholder/150/150",
    },
  ];

  return (
    <div className="p-6">
      <div className="detail-header flex items-center ml-[1rem] mb-6 font-bold text-2xl">
        <h1>Order Details</h1>
      </div>

      {/* Order Stages */}
      <div className="bg-neutral-colors-200 border border-neutral-colors-400 rounded-2xl p-4 mb-6">
        <h2 className="text-lg font-semibold mb-6">Order Stages</h2>
        <div className="flex justify-between items-center relative">
          {orderStages.map((stage, index) => (
            <div
              key={index}
              className="flex flex-col items-center z-10"
            >
              <div
                className={`rounded-lg p-3 ${
                  stage.completed
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {stage.icon}
              </div>
              <span
                className={`mt-2 text-sm ${
                  stage.completed ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {stage.label}
              </span>
            </div>
          ))}
          {/* Progress Line */}
          <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-200">
            <div className="w-1/3 h-full bg-yellow-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section - Order Summary */}
        <div className="bg-neutral-colors-200 border border-neutral-colors-400 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold border-b border-neutral-colors-400">
              Summary Order
            </h2>
            <span className="text-gray-500">Order ID: ORD123456789</span>
          </div>

          <div className="space-y-4 mb-6">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-500">{item.type}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-500">Qty: {item.qty}</span>
                    <span>Rp {item.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>Rp 500,000</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span>Rp 15,000</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Discount</span>
              <span className="text-red-500">-Rp 100,000</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>VAT 11%</span>
              <span>Rp 45,650</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total</span>
              <span>Rp 460,650</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-neutral-colors-200 border border-neutral-colors-400 rounded-2xl p-6">
          {/* Payment Info */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Payment</h2>
            <div className="flex items-center gap-3">
              <img
                src="/api/placeholder/40/40"
                alt="BCA"
                className="w-10 h-10 rounded"
              />
              <span>Bank BCA</span>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Shipping</h2>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/api/placeholder/40/40"
                alt="Antar Aja"
                className="w-10 h-10 rounded"
              />
              <div>
                <div>Antar Aja</div>
                <div className="text-gray-500 text-sm">
                  Estimated Delivery: 3-4 Days
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>Receipt</span>
                <div className="flex items-center gap-2">
                  <span>BDG12345678901KT</span>
                  <FaCopy className="cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Store Address</h3>
                <p className="text-sm text-gray-500">Ngaraga by Dolanan</p>
                <p className="text-sm text-gray-500">
                  Jl. Medan Merdeka Barat No.12, Gambir, Jakarta Pusat
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Delivery Address</h3>
                <p className="text-sm text-gray-500">Animakid</p>
                <p className="text-sm text-gray-500">+62 854 5565 6745</p>
                <p className="text-sm text-gray-500">
                  Jl. Medan Merdeka Barat No.12, Gambir, Jakarta Pusat
                </p>
              </div>
            </div>
          </div>

          {/* Order Tracking */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Order Tracking</h2>
            <div className="space-y-6">
              {[
                {
                  date: "10 Dec 2024 17:20",
                  status: "Delivered",
                  highlight: true,
                },
                {
                  date: "10 Dec 2024 13:53",
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
                {date: "12 Dec 2024 16:00", status: "Preparing to ship"},
                {
                  date: "09 Dec 2024 13:07",
                  status: "Courier assigned to pick up the order",
                },
                {date: "09 Dec 2024 12:54", status: "Order placed"},
              ].map((event, index) => (
                <div
                  key={index}
                  className="flex gap-4"
                >
                  <div className="w-32 text-sm text-gray-500">{event.date}</div>
                  <div className="relative">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        event.highlight ? "bg-yellow-500" : "bg-gray-300"
                      }`}
                    />
                    {index !== 7 && (
                      <div className="absolute top-3 left-1.5 w-px h-16 bg-gray-200" />
                    )}
                  </div>
                  <div className="flex-1 text-sm">{event.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;
