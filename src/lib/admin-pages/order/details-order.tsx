import {useState} from "react";
import {FaBox, FaTruck, FaCheckCircle} from "react-icons/fa";
import {BiMoney} from "react-icons/bi";
import {MdEdit, MdContentCopy, MdLocationOn} from "react-icons/md";

export const DetailsOrder = () => {
  const [isEditingShipment, setIsEditingShipment] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Order Stages */}
      <div className="mb-8">
        <div className="relative flex justify-between mb-2">
          <div className="flex items-center">
            <div className="bg-yellow-400 rounded-full p-3">
              <BiMoney className="text-white text-xl" />
            </div>
            <span className="ml-2 font-medium">Payment</span>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full p-3">
              <FaBox className="text-gray-500 text-xl" />
            </div>
            <span className="ml-2 font-medium">Packaging</span>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full p-3">
              <FaTruck className="text-gray-500 text-xl" />
            </div>
            <span className="ml-2 font-medium">Shipping</span>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full p-3">
              <FaCheckCircle className="text-gray-500 text-xl" />
            </div>
            <span className="ml-2 font-medium">Delivered</span>
          </div>
        </div>
        <div className="relative w-full h-2 bg-gray-200 rounded-full">
          <div className="absolute left-0 w-1/4 h-full bg-yellow-400 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column - Order Summary */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Summary Order</h2>
          <div className="text-sm text-gray-600 mb-4">
            Order ID: ORD123456789
          </div>

          {/* Order Items */}
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center mb-4 border-b pb-4"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-4"></div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Dancing Robot 0512</h3>
                    <p className="text-sm text-gray-600">Oxidium</p>
                  </div>
                  <span className="font-medium">Rp 200,000</span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-sm">Qty: 1</span>
                </div>
              </div>
            </div>
          ))}

          {/* Order Summary */}
          <div className="space-y-2 text-sm">
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
              <span className="text-red-500">-Rp 100,000</span>
            </div>
            <div className="flex justify-between">
              <span>VAT 11%</span>
              <span>Rp 45,650</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t">
              <span>Total</span>
              <span>Rp 460,650</span>
            </div>
          </div>
        </div>

        {/* Right Column - Shipping Details */}
        <div className="space-y-6">
          {/* Payment Section */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold mb-4">Payment</h2>
            <div className="flex items-center">
              <img
                src="/api/placeholder/40/40"
                alt="BCA Bank"
                className="mr-3"
              />
              <span>Bank BCA</span>
            </div>
          </div>

          {/* Shipment Section */}
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Shipment</h2>
              <button
                onClick={() => setIsEditingShipment(!isEditingShipment)}
                className="text-blue-500 hover:text-blue-600"
              >
                <MdEdit size={20} />
              </button>
            </div>
            {isEditingShipment ? (
              <div className="space-y-4">
                <select className="w-full border rounded-lg p-2">
                  <option>Anter Aja</option>
                  <option>JNE</option>
                  <option>SiCepat</option>
                </select>
                <button
                  onClick={() => setIsEditingShipment(false)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <img
                  src="/api/placeholder/40/40"
                  alt="Anter Aja"
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Anter Aja</div>
                  <div className="text-sm text-gray-600">
                    Estimated Delivery: 3-4 Days
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Shipping Information</h2>
              <button
                onClick={() => setIsEditingAddress(!isEditingAddress)}
                className="text-blue-500 hover:text-blue-600"
              >
                <MdEdit size={20} />
              </button>
            </div>
            {isEditingAddress ? (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border rounded-lg p-2"
                  defaultValue="Animakid"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded-lg p-2"
                  defaultValue="animakid@gmail.com"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full border rounded-lg p-2"
                  defaultValue="+62 854 5565 6745"
                />
                <textarea
                  placeholder="Address"
                  className="w-full border rounded-lg p-2"
                  defaultValue="Jl. Medan Merdeka Barat No.12, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110"
                  rows={3}
                />
                <button
                  onClick={() => setIsEditingAddress(false)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium">Animakid</span>
                  <button className="ml-2 text-gray-500">
                    <MdContentCopy size={16} />
                  </button>
                </div>
                <div className="flex items-center text-gray-600">
                  <span>animakid@gmail.com</span>
                  <button className="ml-2 text-gray-500">
                    <MdContentCopy size={16} />
                  </button>
                </div>
                <div className="flex items-center text-gray-600">
                  <span>+62 854 5565 6745</span>
                  <button className="ml-2 text-gray-500">
                    <MdContentCopy size={16} />
                  </button>
                </div>
                <div className="flex items-start text-gray-600">
                  <MdLocationOn
                    size={20}
                    className="mr-2 mt-1 flex-shrink-0"
                  />
                  <span>
                    Jl. Medan Merdeka Barat No.12, Gambir, Kecamatan Gambir,
                    Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Order Tracking */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold mb-4">Order Tracking</h2>
            <div className="space-y-4">
              {[
                {
                  date: "10 Dec 2024 17:20",
                  status: "Delivered",
                  icon: <FaCheckCircle />,
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
                {date: "09 Dec 2024 16:00", status: "Preparing to ship"},
                {
                  date: "09 Dec 2024 13:07",
                  status: "Courier assigned to pick up the order",
                },
                {date: "09 Dec 2024 12:54", status: "Order placed"},
              ].map((event, index) => (
                <div
                  key={index}
                  className="flex"
                >
                  <div className="mr-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {index !== 7 && (
                      <div className="w-0.5 h-full bg-gray-200 mx-auto"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">{event.date}</div>
                    <div className="font-medium">{event.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
