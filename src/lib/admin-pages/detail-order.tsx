import {MdEdit, MdDelete} from "react-icons/md";
import {GrView} from "react-icons/gr";

const orders = [
  {
    date: "25 Oct 2024 14:30",
    orderId: "ORD456789123",
    customer: "Lily Anderson",
    total: "Rp 750.000",
    payment: "BCA",
    shipping: "JNE Express",
    status: "Payment",
  },
  {
    date: "15 Nov 2024 08:00",
    orderId: "ORD321654987",
    customer: "Noah Brown",
    total: "Rp 900.000",
    payment: "BCA",
    shipping: "ID Express",
    status: "Packaging",
  },
  {
    date: "22 Nov 2024 09:00",
    orderId: "ORD789123456",
    customer: "Lucas Taylor",
    total: "Rp 950.000",
    payment: "BRI",
    shipping: "JNE",
    status: "Shipping",
  },
  {
    date: "28 Nov 2024 19:00",
    orderId: "ORD123789456",
    customer: "Jackson Lee",
    total: "Rp 500.000",
    payment: "BCA",
    shipping: "JNE Express",
    status: "Delivered",
  },
];

const statusColors = {
  Payment: "bg-red-100 text-red-700",
  Packaging: "bg-yellow-100 text-yellow-700",
  Shipping: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
};

export const OrderDetail = () => {
  return (
    <div className="w-full min-h-screen p-6">
      {/* Header Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded-lg text-center border">
          <h3 className="text-sm text-gray-500 mb-2">Revenue Today</h3>
          <p className="text-2xl font-bold">Rp 2.000.000</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg text-center border">
          <h3 className="text-sm text-gray-500 mb-2">Orders Today</h3>
          <p className="text-2xl font-bold">18</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg text-center border">
          <h3 className="text-sm text-gray-500 mb-2">Total Revenue</h3>
          <p className="text-2xl font-bold">Rp 5.000.000</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg text-center border">
          <h3 className="text-sm text-gray-500 mb-2">Total Orders</h3>
          <p className="text-2xl font-bold">131</p>
        </div>
      </div>

      {/* Payment, Packaging, Shipping, Delivered */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-red-300 shadow rounded-lg text-center border">
          <h3 className="text-sm text-red-500 mb-2 flex justify-between gap-2">
            <span>Payment</span>
            <span className="text-2xl font-bold text-red-500">20</span>
          </h3>
        </div>
        <div className="p-4 bg-yellow-300 shadow rounded-lg text-center border">
          <h3 className="text-sm text-yellow-500 mb-2 flex justify-between gap-2">
            <span>Packaging</span>
            <span className="text-2xl font-bold text-yellow-500">8</span>
          </h3>
        </div>
        <div className="p-4 bg-blue-300 shadow rounded-lg text-center border">
          <h3 className="text-sm text-blue-500 mb-2 flex justify-between gap-2">
            <span>Shipping</span>
            <span className="text-2xl font-bold text-blue-500">3</span>
          </h3>
        </div>
        <div className="p-4 bg-green-300 shadow rounded-lg text-center border">
          <h3 className="text-sm text-green-500 mb-2 flex justify-between gap-2">
            <span>Delivered</span>
            <span className="text-2xl font-bold text-green-500">100</span>
          </h3>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 border">
        <table className="w-full text-left border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="text-sm font-medium text-gray-700 bg-gray-100">
              <th className="p-4">
                <input
                  type="checkbox"
                  className="checkbox"
                />
              </th>
              <th className="p-4">Date</th>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Shipping</th>
              <th className="p-4">Order Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 text-sm"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="checkbox"
                  />
                </td>
                <td className="p-4">{order.date}</td>
                <td className="p-4">{order.orderId}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.total}</td>
                <td className="p-4">
                  <span className="badge badge-outline">{order.payment}</span>
                </td>
                <td className="p-4">
                  <span className="badge badge-info">{order.shipping}</span>
                </td>
                <td className="p-4">
                  <span
                    className={`badge ${
                      statusColors[order.status as keyof typeof statusColors]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button className="btn btn-xs btn-circle btn-ghost">
                    <MdEdit />
                  </button>
                  <button className="btn btn-xs btn-circle btn-ghost">
                    <GrView />
                  </button>
                  <button className="btn btn-xs btn-circle btn-ghost text-red-600">
                    <MdDelete />
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
