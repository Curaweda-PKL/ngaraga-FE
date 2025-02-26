import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "@/middleware/utils";

export const Coupon = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [coupons, setCoupons] = useState<any[]>([]);
  const [selectedCoupons, setSelectedCoupons] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const couponsPerPage = 5; // adjust as needed

  // Fetch coupons from the backend.
  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/coupons`, {
        withCredentials: true,
      });
      setCoupons(response.data.coupons);
    } catch (err) {
      console.error("Error fetching coupons:", err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Reset page when search query changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Filter coupons based on search query.
  const filteredCoupons = coupons.filter((coupon) =>
    coupon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coupon.couponCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculations.
  const totalPages = Math.ceil(filteredCoupons.length / couponsPerPage);
  const indexOfLastCoupon = currentPage * couponsPerPage;
  const indexOfFirstCoupon = indexOfLastCoupon - couponsPerPage;
  const currentCoupons = filteredCoupons.slice(indexOfFirstCoupon, indexOfLastCoupon);

  // Bulk actions.
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

  const bulkDelete = async () => {
    try {
      for (const id of selectedCoupons) {
        await axios.delete(`${SERVER_URL}/api/coupons/${id}`, {
          withCredentials: true,
        });
      }
      await fetchCoupons();
      setSelectedCoupons([]);
    } catch (err) {
      console.error("Bulk delete error:", err);
    }
  };

  const bulkSuspend = async () => {
    try {
      for (const id of selectedCoupons) {
        const coupon = coupons.find((c: any) => c.id === id);
        if (coupon && !coupon.isSuspended) {
          await axios.patch(
            `${SERVER_URL}/api/coupons/${id}/suspend`,
            {},
            { withCredentials: true }
          );
        }
      }
      await fetchCoupons();
      setSelectedCoupons([]);
    } catch (err) {
      console.error("Bulk suspend error:", err);
    }
  };

  // Single coupon actions.
  const handleDeleteCoupon = async (id: string) => {
    try {
      await axios.delete(`${SERVER_URL}/api/coupons/${id}`, {
        withCredentials: true,
      });
      await fetchCoupons();
      setSelectedCoupons((prev) => prev.filter((cid) => cid !== id));
    } catch (err) {
      console.error("Error deleting coupon:", err);
    }
  };

  const handleSuspendCoupon = async (id: string) => {
    try {
      const coupon = coupons.find((c: any) => c.id === id);
      if (coupon && coupon.isSuspended) return;
      await axios.patch(
        `${SERVER_URL}/api/coupons/${id}/suspend`,
        {},
        { withCredentials: true }
      );
      await fetchCoupons();
    } catch (err) {
      console.error("Error suspending coupon:", err);
    }
  };

  // Helper to format coupon validity.
  const formatValidity = (startDate: string | null, endDate: string | null) => {
    if (!startDate || !endDate) return "Unlimited";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const options = { day: "numeric", month: "short", year: "numeric" } as const;
    return `${start.toLocaleDateString(undefined, options)} - ${end.toLocaleDateString(undefined, options)}`;
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>Coupon</span>
        <span className="mx-2">/</span>
        <span>Coupon List</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Coupon</h1>

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/admin/add-coupon")}
          className="bg-call-to-actions-900 hover:bg-call-to-actions-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
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

      {/* Bulk Actions Bar */}
      {selectedCoupons.length > 0 && (
        <div className="flex justify-end mb-4 space-x-4">
          <button
            onClick={bulkDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete Selected
          </button>
          <button
            onClick={bulkSuspend}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
          >
            Suspend Selected
          </button>
        </div>
      )}

      {/* Coupon Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={
                    selectedCoupons.length === coupons.length && coupons.length > 0
                  }
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
            {currentCoupons.map((coupon) => (
              <tr key={coupon.id} className="border-b">
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedCoupons.includes(coupon.id)}
                    onChange={(e) => handleSelectCoupon(coupon.id, e.target.checked)}
                  />
                </td>
                <td className="p-4">{coupon.name}</td>
                <td className="p-4">{coupon.couponCode}</td>
                <td className="p-4">
                  {formatValidity(coupon.startDate, coupon.endDate)}
                </td>
                <td className="p-4">
                  {coupon.unlimitedUsage ||
                  coupon.totalQuantity == null ||
                  coupon.totalQuantity < 0
                    ? "Unlimited"
                    : coupon.totalQuantity}
                </td>
                <td className="p-4">{coupon.usage != null ? coupon.usage : 0}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/edit-coupon/${coupon.id}`)}
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleSuspendCoupon(coupon.id)}
                      className={`p-2 hover:bg-gray-100 rounded-lg ${
                        coupon.isSuspended
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-600"
                      }`}
                      title={coupon.isSuspended ? "Coupon suspended" : "Suspend Coupon"}
                    >
                      {coupon.isSuspended ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteCoupon(coupon.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-1">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-yellow-500 text-white"
                : "text-gray-600"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
