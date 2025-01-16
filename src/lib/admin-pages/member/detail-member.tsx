import {useState} from "react";
import {BsCreditCard} from "react-icons/bs";
import {FaBox, FaTruck, FaCheckCircle} from "react-icons/fa";
import {EyeIcon} from "lucide-react";

interface Order {
  date: string;
  orderId: string;
  total: string;
  payment: string;
  shipping: string;
  status: OrderStatus;
}

type OrderStatus = "Payment" | "Packaging" | "Shipping" | "Delivered";

const orders: Order[] = [
  {
    date: "25 Oct 2024 14:30",
    orderId: "ORD456789123",
    total: "Rp 750.000",
    payment: "BCA",
    shipping: "JNE Express",
    status: "Payment",
  },
  {
    date: "12 Oct 2024 15:00",
    orderId: "ORD456123789",
    total: "Rp 300.000",
    payment: "BRIS",
    shipping: "JNE Express",
    status: "Packaging",
  },
  {
    date: "12 Oct 2024 15:00",
    orderId: "ORD456123789",
    total: "Rp 300.000",
    payment: "BRIS",
    shipping: "JNE Express",
    status: "Packaging",
  },
  {
    date: "22 Nov 2024 09:00",
    orderId: "ORD789123456",
    total: "Rp 950.000",
    payment: "BRI",
    shipping: "JNE",
    status: "Shipping",
  },
  {
    date: "12 Oct 2024 15:00",
    orderId: "ORD456123789",
    total: "Rp 300.000",
    payment: "BRIS",
    shipping: "JNE Express",
    status: "Delivered",
  },
];

export const MemberDetails = () => {
  const [] = useState<number[]>([]);

  const statusCounts = {
    Payment: orders.filter((o) => o.status === "Payment").length,
    Packaging: orders.filter((o) => o.status === "Packaging").length,
    Shipping: orders.filter((o) => o.status === "Shipping").length,
    Delivered: orders.filter((o) => o.status === "Delivered").length,
  };

  const statusColors = {
    Payment: "bg-red-50 text-red-500",
    Packaging: "bg-yellow-50 text-yellow-500",
    Shipping: "bg-blue-50 text-blue-500",
    Delivered: "bg-green-50 text-green-500",
  };

  const statusIcons = {
    Payment: <BsCreditCard className="w-4 h-4" />,
    Packaging: <FaBox className="w-4 h-4" />,
    Shipping: <FaTruck className="w-4 h-4" />,
    Delivered: <FaCheckCircle className="w-4 h-4" />,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>Member</span>
        <span>/</span>
        <span>Member List</span>
        <span>/</span>
        <span className="text-gray-900">Details Member</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Details Member</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500 mb-2">Today</div>
          <div className="text-xl font-semibold">Rp 750.000</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500 mb-2">Orders Today</div>
          <div className="text-xl font-semibold">1</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500 mb-2">Total</div>
          <div className="text-xl font-semibold">Rp 2.600.000</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500 mb-2">Total Orders</div>
          <div className="text-xl font-semibold">5</div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {(Object.keys(statusColors) as OrderStatus[]).map((status) => (
          <div
            key={status}
            className={`flex items-center justify-between p-4 rounded-lg ${statusColors[status]}`}
          >
            <div className="flex items-center gap-2">
              {statusIcons[status]}
              <span>{status}</span>
            </div>
            <span className="font-semibold">{statusCounts[status]}</span>
          </div>
        ))}
      </div>

      {/* Member Info Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex gap-6">
          <div className="w-1/2">
            <div className="flex gap-4 mb-6">
              <img
                src="/api/placeholder/80/80"
                alt="Profile"
                className="w-20 h-20 rounded-lg"
              />
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Full Name</div>
                    <div>Animakid</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Username</div>
                    <div>Animakid123</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div>animakid@gmail.com</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Bio</div>
                    <div>The internet's friendliest designer kid.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Website</div>
                <div>https://www.dummy.com/</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Discord</div>
                <div>https://www.dummy.com/</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Youtube</div>
                <div>https://www.dummy.com/</div>
              </div>
            </div>
          </div>
          <div className="w-1/2 border-l pl-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold">Animakid</div>
              <button className="text-blue-500">
                <EyeIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="text-sm mb-4">+62 854 5565 6745</div>
            <div className="text-sm text-gray-500">
              Jl. Medan Merdeka Barat No.12, Gambir, Kecamatan Gambir, Kota
              Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-8 p-4">
                <input
                  type="checkbox"
                  className="rounded"
                />
              </th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Order ID</th>
              <th className="text-left p-4">Total</th>
              <th className="text-left p-4">Payment</th>
              <th className="text-left p-4">Shipping</th>
              <th className="text-left p-4">Order Status</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-t"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded"
                  />
                </td>
                <td className="p-4">{order.date}</td>
                <td className="p-4">{order.orderId}</td>
                <td className="p-4">{order.total}</td>
                <td className="p-4">
                  <img
                    src="/api/placeholder/60/20"
                    alt={order.payment}
                    className="h-5"
                  />
                </td>
                <td className="p-4">
                  <img
                    src="/api/placeholder/60/20"
                    alt={order.shipping}
                    className="h-5"
                  />
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                      statusColors[order.status]
                    }`}
                  >
                    {statusIcons[order.status]}
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-gray-500 hover:text-gray-700">
                    <EyeIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
