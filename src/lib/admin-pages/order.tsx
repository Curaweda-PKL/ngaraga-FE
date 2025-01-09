import {useState} from "react";
import {MdEdit, MdDelete, MdPrint} from "react-icons/md";
import {GrView} from "react-icons/gr";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Order {
  date: string;
  orderId: string;
  customer: string;
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
    date: "30 Dec 2024 11:00",
    orderId: "ORD654321987",
    customer: "Emma Wilson",
    total: "Rp 850.000",
    payment: "BNI",
    shipping: "Ninja Express",
    status: "Packaging",
  },
  {
    date: "18 Dec 2024 13:00",
    orderId: "ORD987123456",
    customer: "Charlotte Davis",
    total: "Rp 700.000",
    payment: "BSI",
    shipping: "JNE Express",
    status: "Shipping",
  },
  {
    date: "5 Dec 2024 16:00",
    orderId: "ORD321987654",
    customer: "Aiden Clark",
    total: "Rp 600.000",
    payment: "BRIS",
    shipping: "ID Express",
    status: "Packaging",
  },
  {
    date: "10 Dec 2024 18:00",
    orderId: "ORD654987321",
    customer: "Sofia Martinez",
    total: "Rp 800.000",
    payment: "BRI",
    shipping: "JNE Express",
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
  {
    date: "12 Oct 2024 15:00",
    orderId: "ORD456123789",
    customer: "Grace Johnson",
    total: "Rp 300.000",
    payment: "BRIS",
    shipping: "JNE Express",
    status: "Delivered",
  },
];

const statusColors: Record<OrderStatus, string> = {
  Payment: "bg-red-100 text-red-700",
  Packaging: "bg-yellow-100 text-yellow-700",
  Shipping: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
};

export const OrderDetail = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedOrders(selectAll ? [] : orders.map((_, index) => index));
  };

  const handleDateChange = (date: Date | null, dateType: "start" | "end") => {
    if (dateType === "start") {
      setStartDate(date || undefined);
    } else {
      setEndDate(date || undefined);
    }
  };

  const handleCheckboxChange = (index: number) => {
    if (selectedOrders.includes(index)) {
      setSelectedOrders(selectedOrders.filter((i) => i !== index));
    } else {
      setSelectedOrders([...selectedOrders, index]);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.date);

    const isWithinDateRange =
      (!startDate || orderDate >= startDate) &&
      (!endDate || orderDate <= endDate);

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      order.orderId.toLowerCase().includes(query) ||
      order.customer.toLowerCase().includes(query) ||
      order.total.toLowerCase().includes(query) ||
      order.payment.toLowerCase().includes(query) ||
      order.shipping.toLowerCase().includes(query) ||
      order.status.toLowerCase().includes(query);

    return isWithinDateRange && matchesSearch;
  });

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

      {/* Status Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {(Object.keys(statusColors) as OrderStatus[]).map((status) => (
          <div
            key={status}
            className={`p-4 shadow rounded-lg text-center border ${
              status === "Payment"
                ? "bg-red-300"
                : status === "Packaging"
                ? "bg-yellow-300"
                : status === "Shipping"
                ? "bg-blue-300"
                : "bg-green-300"
            }`}
          >
            <h3
              className={`text-sm mb-2 flex justify-between gap-2 ${
                status === "Payment"
                  ? "text-red-500"
                  : status === "Packaging"
                  ? "text-yellow-500"
                  : status === "Shipping"
                  ? "text-blue-500"
                  : "text-green-500"
              }`}
            >
              <span>{status}</span>
              <span className="text-2xl font-bold">
                {status === "Payment"
                  ? "20"
                  : status === "Packaging"
                  ? "8"
                  : status === "Shipping"
                  ? "3"
                  : "100"}
              </span>
            </h3>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex items-center mb-6">
        {/* Left Section: Action Buttons */}
        <div className="flex-grow">
          {selectedOrders.length > 0 && (
            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                <MdPrint className="text-xl" />
                Print Receipt
              </button>
              <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                <MdDelete className="text-xl" />
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Right Section: Search Bar and Calendar */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Search Bar */}
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Date Pickers */}
          <div className="flex items-center gap-2">
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => handleDateChange(date, "start")}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="From"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5"
            />
            <span className="text-gray-500">-</span>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => handleDateChange(date, "end")}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="To"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 border">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm font-medium text-gray-700 bg-gray-100">
              <th className="p-4">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
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
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 text-sm"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedOrders.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
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
                  <span className={`badge ${statusColors[order.status]}`}>
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
