import {BiPackage} from "react-icons/bi";
import {
  FaMoneyBill,
  FaTruck,
  FaCheckCircle,
  FaCopy,
  FaTrash,
} from "react-icons/fa";
import {MdLocationOn} from "react-icons/md";
import {HiMail} from "react-icons/hi";
import {BsTelephone} from "react-icons/bs";

export const DetailsOrder = () => {
  const orderStages = [
    {label: "Payment", icon: <FaMoneyBill />, active: true},
    {label: "Packaging", icon: <BiPackage />, active: false},
    {label: "Shipping", icon: <FaTruck />, active: false},
    {label: "Delivered", icon: <FaCheckCircle />, active: false},
  ];

  const orderItems = [
    {
      id: 1,
      name: "Dancing Robot 0512",
      price: 200000,
      quantity: 1,
      image: "/robot-image.jpg",
    },
    {
      id: 2,
      name: "Dancing Robot 0512",
      price: 200000,
      quantity: 1,
      image: "/robot-image.jpg",
    },
    {
      id: 3,
      name: "Dancing Robot 0512",
      price: 200000,
      quantity: 1,
      image: "/robot-image.jpg",
    },
  ];

  const trackingHistory = [
    {date: "10 Dec 2024 17:20", status: "Delivered"},
    {date: "10 Dec 2024 13:53", status: "The order is in transit for delivery"},
    {
      date: "10 Dec 2024 06:24",
      status: "Pesanan dipindai di lokasi transit JAKARTA",
    },
    {
      date: "09 Dec 2024 20:51",
      status: "The order was dispatched from the sorting facility in JAKARTA",
    },
    {
      date: "09 Dec 2024 20:51",
      status: "The order was received by the JAKARTA agent for processing",
    },
    {date: "12 Dec 2024 18:00", status: "Preparing to ship"},
    {
      date: "09 Dec 2024 13:07",
      status: "Courier assigned to pick up the order",
    },
    {date: "09 Dec 2024 12:54", status: "Order placed"},
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <div className="space-x-2">
          <button className="px-4 py-2 border rounded">Cancel Order</button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded">
            Print Receipt
          </button>
        </div>
        <button className="px-4 py-2 bg-yellow-500 text-white rounded">
          To Shipping
        </button>
      </div>

      {/* Order Stages */}
      <div className="mb-8">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10" />
          {orderStages.map((stage, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  stage.active ? "bg-yellow-500 text-white" : "bg-gray-200"
                }`}
              >
                {stage.icon}
              </div>
              <span className="mt-2 text-sm">{stage.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-4">Summary Order</h2>
            <div className="text-sm mb-2">Order ID: ORD123456789</div>

            {/* Order Items */}
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 mb-4 border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <button className="text-gray-500">-</button>
                    <span>{item.quantity}</span>
                    <button className="text-gray-500">+</button>
                    <span className="ml-auto">
                      Rp {item.price.toLocaleString()}
                    </span>
                  </div>
                </div>
                <button className="text-red-500">
                  <FaTrash />
                </button>
              </div>
            ))}

            {/* Order Summary */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rp 500,000</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Rp 15,000</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>-Rp 100,000</span>
              </div>
              <div className="flex justify-between">
                <span>VAT 11%</span>
                <span>Rp 45,650</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total</span>
                <span>Rp 460,650</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Payment Info */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-4">Payment</h2>
            <div className="flex items-center gap-2">
              <img
                src="/bca-logo.png"
                alt="BCA"
                className="w-12 h-12"
              />
              <span>Bank BCA</span>
            </div>
          </div>

          {/* Shipment Info */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-4">Shipment</h2>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/anteraja-logo.png"
                alt="Anter Aja"
                className="w-12 h-12"
              />
              <div>
                <div>Anter Aja</div>
                <div className="text-sm text-gray-500">
                  Estimated Delivery: 3-4 Days
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Receipt Number</div>
              <div className="flex items-center gap-2">
                <span>BDG123456789UKT</span>
                <button className="text-gray-500">
                  <FaCopy />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Shipping Information</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MdLocationOn className="mt-1" />
                  <div>
                    <div className="font-medium">Aminudin</div>
                    <div className="text-sm">
                      Medan Merdeka Barat No.12, Gambir, Kecamatan Gambir, Kota
                      Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <HiMail />
                  <span>aminudin@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <BsTelephone />
                  <span>+62 854 5555 6745</span>
                </div>
              </div>
            </div>

            {/* Order Tracking */}
            <div>
              <h3 className="font-medium mb-4">Order Tracking</h3>
              <div className="space-y-4">
                {trackingHistory.map((event, index) => (
                  <div
                    key={index}
                    className="flex gap-4"
                  >
                    <div className="w-32 text-sm text-gray-500">
                      {event.date}
                    </div>
                    <div className="flex-1">{event.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
