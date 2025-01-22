import {
  MdPayment,
  MdInventory,
  MdLocalShipping,
  MdDoneAll,
} from "react-icons/md";

const OrderDetails = () => {
  const orderStages = [
    {
      label: "Payment",
      completed: true,
      icon: <MdPayment className="w-5 h-5" />,
    },
    {
      label: "Packaging",
      completed: true,
      icon: <MdInventory className="w-5 h-5" />,
    },
    {
      label: "Shipping",
      completed: false,
      icon: <MdLocalShipping className="w-5 h-5" />,
    },
    {
      label: "Delivered",
      completed: false,
      icon: <MdDoneAll className="w-5 h-5" />,
    },
  ];

  const orderItems = [
    {
      name: "Dancing Robot 0512",
      type: "Orbitian",
      price: 200000,
      qty: 1,
      image: "/api/placeholder/80/80",
    },
    {
      name: "Dancing Robot 0512",
      type: "Orbitian",
      price: 200000,
      qty: 1,
      image: "/api/placeholder/80/80",
    },
    {
      name: "Dancing Robot 0512",
      type: "Orbitian",
      price: 100000,
      qty: 1,
      image: "/api/placeholder/80/80",
    },
  ];

  const trackingEvents = [
    {date: "10 Dec 2024 17:20", status: "Delivered"},
    {date: "10 Dec 2024 13:53", status: "The order is in transit for delivery"},
    {
      date: "10 Dec 2024 06:24",
      status: "Pesanan dipindai di lokal transit JAKARTA",
    },
    {
      date: "09 Dec 2024 20:51",
      status: "The order was dispatched from the sorting facility in JAKARTA",
    },
    {
      date: "09 Dec 2024 20:51",
      status: "The order was received by the JAKARTA agent for processing",
    },
    {date: "12 Dec 2024 16:00", status: "Preparing to ship"},
    {
      date: "09 Dec 2024 13:07",
      status: "Courier assigned to pick up the order",
    },
    {date: "09 Dec 2024 12:54", status: "Order placed"},
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      {/* Order Stages */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-sm mb-6">Order Stages</h2>
        <div className="relative flex justify-between items-center px-8">
          {orderStages.map((stage, index) => (
            <div
              key={index}
              className="flex flex-col items-center z-10"
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stage.completed
                    ? "bg-yellow-50 text-yellow-500"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {stage.icon}
              </div>
              <span
                className={`mt-2 text-xs ${
                  stage.completed ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {stage.label}
              </span>
            </div>
          ))}
          {/* Progress Line */}
          <div className="absolute top-6 left-0 w-full h-[2px] bg-gray-200">
            <div className="w-1/3 h-full bg-yellow-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section - Order Summary */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm">Summary Order</h2>
            <span className="text-xs text-gray-500">
              Order ID: ORD123456789
            </span>
          </div>

          <div className="space-y-4 mb-6">
            {orderItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.type}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      Qty: {item.qty}
                    </span>
                    <span className="text-sm">
                      Rp {item.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-4 border-t text-sm">
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
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>Total</span>
              <span>Rp 460,650</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white rounded-lg p-6">
          <div className="mb-8">
            <h2 className="text-sm mb-4">Payment</h2>
            <div className="flex items-center gap-3">
              <img
                src="/api/placeholder/32/32"
                alt="BCA"
                className="w-8 h-8 rounded"
              />
              <span className="text-sm">Bank BCA</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-sm mb-4">Shipping</h2>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/api/placeholder/32/32"
                alt="Antar Aja"
                className="w-8 h-8 rounded"
              />
              <div>
                <div className="text-sm">Antar Aja</div>
                <div className="text-xs text-gray-500">
                  Estimated Delivery: 3-4 Days
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>Receipt</span>
                <div className="flex items-center gap-2">
                  <span>BDG12345678901KT</span>
                  <button className="text-gray-400 hover:text-gray-600">
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
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-medium mb-2">Store Address</h3>
                <p className="text-xs text-gray-500">Ngaraga by Dolanan</p>
                <p className="text-xs text-gray-500">
                  Jl. Medan Merdeka Barat No.12, Gambir, Jakarta Pusat
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Delivery Address</h3>
                <p className="text-xs text-gray-500">Animakid</p>
                <p className="text-xs text-gray-500">+62 854 5565 6745</p>
                <p className="text-xs text-gray-500">
                  Jl. Medan Merdeka Barat No.12, Gambir, Jakarta Pusat
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-sm mb-4">Order Tracking</h2>
            <div className="space-y-6">
              {trackingEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex gap-4"
                >
                  <div className="w-32 text-xs text-gray-500">{event.date}</div>
                  <div className="relative">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        index === 0 ? "bg-yellow-500" : "bg-gray-300"
                      }`}
                    />
                    {index !== trackingEvents.length - 1 && (
                      <div className="absolute top-2 left-1 w-[1px] h-16 bg-gray-200" />
                    )}
                  </div>
                  <div className="flex-1 text-xs">{event.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
