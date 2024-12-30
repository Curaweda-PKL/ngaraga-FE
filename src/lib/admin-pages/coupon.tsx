import {useState} from "react";
import {Plus, Search, MessageSquare, Edit, Eye, Trash2} from "lucide-react";

export const Coupon = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCoupons, setSelectedCoupons] = useState<string[]>([]);

  const coupons = [
    {
      id: "1",
      name: "Holiday Discount",
      code: "SAVEBIG2024",
      validity: "15 Nov 2024 - 30 Dec 2024",
      total: 15,
      usage: 5,
    },
    {
      id: "2",
      name: "Seasonal Offer",
      code: "WINTER2024",
      validity: "01 Jan 2025 - 15 Feb 2025",
      total: 20,
      usage: 12,
    },
    {
      id: "3",
      name: "Flash Sale",
      code: "SUMMER2024",
      validity: "10 Mar 2025 - 25 Apr 2025",
      total: 30,
      usage: 15,
    },
    {
      id: "4",
      name: "Weekend Special",
      code: "SPRING2024",
      validity: "05 Apr 2025 - 20 May 2025",
      total: 25,
      usage: 10,
    },
    {
      id: "5",
      name: "Exclusive Deal",
      code: "FALL2024",
      validity: "12 Aug 2025 - 30 Sep 2025",
      total: 40,
      usage: 20,
    },
    {
      id: "6",
      name: "Limited Time Offer",
      code: "CLEARANCE2024",
      validity: "01 Jun 2025 - 15 Jul 2025",
      total: 50,
      usage: 25,
    },
    {
      id: "7",
      name: "Spring Savings",
      code: "SPRINGSALE2024",
      validity: "10 Apr 2025 - 25 May 2025",
      total: 55,
      usage: 28,
    },
    {
      id: "8",
      name: "New Year Promo",
      code: "NEWYEAR2025",
      validity: "01 Jan 2025 - 31 Jan 2025",
      total: 35,
      usage: 18,
    },
    {
      id: "9",
      name: "Holiday Extravaganza",
      code: "HOLIDAY2024",
      validity: "01 Dec 2025 - 15 Jan 2026",
      total: 80,
      usage: 40,
    },
    {
      id: "10",
      name: "Special Event",
      code: "OFFER2024",
      validity: "20 Feb 2025 - 10 Mar 2025",
      total: 45,
      usage: 22,
    },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCoupons(coupons.map((coupon) => coupon.id));
    } else {
      setSelectedCoupons([]);
    }
  };

  const handleSelectCoupon = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCoupons((prev) => [...prev, id]);
    } else {
      setSelectedCoupons((prev) => prev.filter((couponId) => couponId !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>Coupon</span>
        <span className="mx-2">/</span>
        <span>Coupon List</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Coupon</h1>

      <div className="flex justify-between items-center mb-6">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Add Coupon</span>
        </button>

        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedCoupons.length === coupons.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="p-4 text-left font-medium">Coupon Name</th>
              <th className="p-4 text-left font-medium">Coupon Code</th>
              <th className="p-4 text-left font-medium">Coupon Validity</th>
              <th className="p-4 text-left font-medium">Coupon Total</th>
              <th className="p-4 text-left font-medium">Coupon Usage</th>
              <th className="p-4 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr
                key={coupon.id}
                className="border-b"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedCoupons.includes(coupon.id)}
                    onChange={(e) =>
                      handleSelectCoupon(coupon.id, e.target.checked)
                    }
                  />
                </td>
                <td className="p-4">{coupon.name}</td>
                <td className="p-4">{coupon.code}</td>
                <td className="p-4">{coupon.validity}</td>
                <td className="p-4">{coupon.total}</td>
                <td className="p-4">{coupon.usage}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 gap-1">
        <button className="px-3 py-1 rounded bg-yellow-500 text-white">
          1
        </button>
        <button className="px-3 py-1 rounded text-gray-600">2</button>
        <button className="px-3 py-1 rounded text-gray-600">3</button>
        <button className="px-3 py-1 rounded text-gray-600">...</button>
        <button className="px-3 py-1 rounded text-gray-600">10</button>
      </div>
    </div>
  );
};
