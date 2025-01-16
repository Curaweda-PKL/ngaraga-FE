import {useState} from "react";
import {
  FaCreditCard,
  FaBox,
  FaTruck,
  FaCheck,
  FaEdit,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimes,
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

interface EditShippingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: ShippingInfo) => void;
}

const EditShippingModal: React.FC<EditShippingModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<ShippingInfo>({
    fullName: "Animakid",
    email: "animakid@gmail.com",
    phoneNumber: "854 5565 6745",
    countryCode: "+62",
    country: "Indonesia",
    state: "",
    city: "",
  });

  const handleSubmit = (e: {preventDefault: () => void}) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Edit Shipping Information</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({...formData, fullName: e.target.value})
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({...formData, email: e.target.value})
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.countryCode}
                  onChange={(e) =>
                    setFormData({...formData, countryCode: e.target.value})
                  }
                  className="px-3 py-2 border rounded-lg focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                >
                  <option value="+62">🇮🇩 +62</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({...formData, phoneNumber: e.target.value})
                  }
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                  required
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country *
              </label>
              <select
                value={formData.country}
                onChange={(e) =>
                  setFormData({...formData, country: e.target.value})
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                required
              >
                <option value="Indonesia">🇮🇩 Indonesia</option>
                <option value="United States">🇺🇸 United States</option>
                <option value="United Kingdom">🇬🇧 United Kingdom</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const DetailsOrder = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "Animakid",
    email: "animakid@gmail.com",
    phoneNumber: "854 5565 6745",
    countryCode: "+62",
  });

  const handleUpdateShipping = (newInfo: ShippingInfo) => {
    setShippingInfo(newInfo);
  };

  // Rest of the existing code remains the same until the Shipping Information section
  const orderStages = [
    {icon: <FaCreditCard size={20} />, label: "Payment", active: true},
    {icon: <FaBox size={20} />, label: "Packaging", active: false},
    {icon: <FaTruck size={20} />, label: "Shipping", active: false},
    {icon: <FaCheck size={20} />, label: "Delivered", active: false},
  ];

  const orderItems = [
    {id: 1, name: "Dancing Robot 0512", type: "Orbilum", price: 200000, qty: 1},
    {id: 2, name: "Dancing Robot 0512", type: "Orbilum", price: 200000, qty: 1},
    {id: 3, name: "Dancing Robot 0512", type: "Orbilum", price: 200000, qty: 1},
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Order Stages */}
      <div className="mb-8">
        <div className="flex justify-between items-center relative">
          {orderStages.map((stage, index) => (
            <div
              key={index}
              className="flex flex-col items-center z-10"
            >
              <div
                className={`rounded-full p-4 ${
                  stage.active ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {stage.icon}
              </div>
              <span className="mt-2 text-sm">{stage.label}</span>
            </div>
          ))}
          <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-200" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Section - Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="font-semibold mb-4">Summary Order</h2>
            <div className="text-sm text-gray-600 mb-2">
              Order ID: ORD123456789
            </div>

            {orderItems.map((item) => (
              <div
                key={item.id}
                className="mb-4 border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg" />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">{item.type}</div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2">
                        <span>Qty: {item.qty}</span>
                      </div>
                      <div>Rp {item.price.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

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
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Total</span>
                <span>Rp 460,650</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
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
            <div className="text-sm text-gray-600">
              Receipt: BDG123456789JKT
            </div>
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
                    Jl. Medan Merdeka Barat No.12, Gambir, Kecamatan Gambir,
                    Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110
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
                    {date: "09 Dec 2024 16:00", status: "Preparing to ship"},
                    {
                      date: "09 Dec 2024 13:07",
                      status: "Courier assigned to pick up the order",
                    },
                    {date: "09 Dec 2024 12:54", status: "Order placed"},
                  ].map((event, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4"
                    >
                      {/* Date on the left */}
                      <div className="text-sm text-gray-500 w-32">
                        {event.date}
                      </div>

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
      </div>

      {/* Edit Shipping Modal */}
      <EditShippingModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateShipping}
      />
    </div>
  );
};
