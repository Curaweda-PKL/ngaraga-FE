import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";

export const AddCouponForm = () => {
  const [formData, setFormData] = useState({
    couponName: "",
    couponCode: "",
    userType: "", // "guest", "member", "newMember" // later on
    applyTo: "ALL_PRODUCTS", // default: ALL_PRODUCTS, PRODUCT_CATEGORIES, PRODUCT_LIST
    dateType: "unlimited", // "range" or "unlimited"
    startDate: "",
    endDate: "",
    condition: "FIXED", // "FIXED", "PERCENT", "MIN_SPENT_FIXED", "MIN_SPENT_PERCENT"
    discountValue: "",
    minimumSpent: "",
    couponTotal: "unlimited", // "setQuantity" or "unlimited"
    totalQuantity: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const generateCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setFormData({ ...formData, couponCode: code });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate required fields
    if (
      !formData.couponName ||
      !formData.couponCode ||
      !formData.applyTo ||
      !formData.condition ||
      !formData.discountValue ||
      !formData.userType
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (formData.dateType === "range" && (!formData.startDate || !formData.endDate)) {
      setError("Please provide both start and end dates.");
      return;
    }
    if (formData.couponTotal === "setQuantity" && !formData.totalQuantity) {
      setError("Please set the total quantity for the coupon.");
      return;
    }

    const payload = {
      name: formData.couponName,
      discountType:
        formData.condition === "FIXED" || formData.condition === "MIN_SPENT_FIXED"
          ? "FIXED"
          : "PERCENT",
      discountValue: parseFloat(formData.discountValue),
      applyTo: formData.applyTo,
      startDate: formData.dateType === "range" ? formData.startDate : null,
      endDate: formData.dateType === "range" ? formData.endDate : null,
      unlimitedUsage: formData.couponTotal === "unlimited",
      totalQuantity:
        formData.couponTotal === "setQuantity" ? parseInt(formData.totalQuantity, 10) : null,
      minimumSpent:
        formData.condition === "MIN_SPENT_FIXED" || formData.condition === "MIN_SPENT_PERCENT"
          ? parseFloat(formData.minimumSpent)
          : null,
    };

    try {
      const response = await axios.post(`${SERVER_URL}/api/coupons`, payload, { withCredentials: true });
      setSuccess("Coupon created successfully.");
      console.log("Coupon response:", response.data);
      setFormData({
        couponName: "",
        couponCode: "",
        userType: "",
        applyTo: "ALL_PRODUCTS",
        dateType: "unlimited",
        startDate: "",
        endDate: "",
        condition: "FIXED",
        discountValue: "",
        minimumSpent: "",
        couponTotal: "unlimited",
        totalQuantity: "",
      });
    } catch (err) {
      console.error("Error creating coupon:", err);
      setError(err.response?.data?.error || "Failed to create coupon. Please try again.");
    }
  };

  // Compute form validity; if any required field is missing, the form is not valid.
  const isFormValid =
    formData.couponName &&
    formData.couponCode &&
    formData.applyTo &&
    formData.condition &&
    formData.discountValue &&
    formData.userType &&
    (formData.dateType === "unlimited" || (formData.dateType === "range" && formData.startDate && formData.endDate)) &&
    (formData.couponTotal === "unlimited" || (formData.couponTotal === "setQuantity" && formData.totalQuantity));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-sm text-gray-500 mb-4">
        Coupon / Coupon List / Add Coupon
      </div>

      <h1 className="text-2xl font-semibold mb-6">Add Coupon</h1>

      {error && <div className="mb-4 text-red-500">{error}</div>}
      {success && <div className="mb-4 text-green-500">{success}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="space-y-4 p-6 bg-white rounded-lg shadow">
          <div>
            <label className="block mb-2">
              Coupon Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formData.couponName}
              onChange={(e) => setFormData({ ...formData, couponName: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-2">
              Coupon Code <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-2 border rounded-lg"
                value={formData.couponCode}
                onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
              />
              <button
                type="button"
                onClick={generateCode}
                className="px-4 py-2 bg-yellow-400 text-yellow-800 rounded-lg hover:bg-yellow-500"
              >
                Generate Code
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-2">
              Apply Discount To <span className="text-red-500">*</span>
            </label>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="applyTo"
                  className="form-radio"
                  value="ALL_PRODUCTS"
                  checked={formData.applyTo === "ALL_PRODUCTS"}
                  onChange={(e) => setFormData({ ...formData, applyTo: e.target.value })}
                />
                <span className="ml-2">All Product</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-2">
              Date Type <span className="text-red-500">*</span>
            </label>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="dateType"
                  className="form-radio"
                  value="range"
                  checked={formData.dateType === "range"}
                  onChange={(e) => setFormData({ ...formData, dateType: e.target.value })}
                />
                <span className="ml-2">Start and End Date</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="dateType"
                  className="form-radio"
                  value="unlimited"
                  checked={formData.dateType === "unlimited"}
                  onChange={(e) => setFormData({ ...formData, dateType: e.target.value })}
                />
                <span className="ml-2">Unlimited</span>
              </label>
            </div>
            {formData.dateType === "range" && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-lg"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-lg"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2">
              Condition <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="condition"
                  className="form-radio"
                  value="FIXED"
                  checked={formData.condition === "FIXED"}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                />
                <span className="ml-2">Discount Rp</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="condition"
                  className="form-radio"
                  value="PERCENT"
                  checked={formData.condition === "PERCENT"}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                />
                <span className="ml-2">Discount %</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="condition"
                  className="form-radio"
                  value="MIN_SPENT_FIXED"
                  checked={formData.condition === "MIN_SPENT_FIXED"}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                />
                <span className="ml-2">Minimum Spent, Discount Rp</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="condition"
                  className="form-radio"
                  value="MIN_SPENT_PERCENT"
                  checked={formData.condition === "MIN_SPENT_PERCENT"}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                />
                <span className="ml-2">Minimum Spent, Discount %</span>
              </label>
            </div>
            {(formData.condition === "MIN_SPENT_FIXED" ||
              formData.condition === "MIN_SPENT_PERCENT") && (
              <div className="mt-4">
                <label className="block mb-2">Minimum Spent</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg"
                  value={formData.minimumSpent}
                  onChange={(e) => setFormData({ ...formData, minimumSpent: e.target.value })}
                />
              </div>
            )}
            <div className="mt-4">
              <label className="block mb-2">Discount Value</label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                value={formData.discountValue}
                onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4">
          <div className="p-6 bg-white rounded-lg shadow">
            <label className="block mb-2">
              User <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  className="form-radio"
                  value="guest"
                  checked={formData.userType === "guest"}
                  onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                />
                <span className="ml-2">User</span>
              </label>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <label className="block mb-2">
              Coupon Total <span className="text-red-500">*</span>
            </label>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="couponTotal"
                  className="form-radio"
                  value="setQuantity"
                  checked={formData.couponTotal === "setQuantity"}
                  onChange={(e) => setFormData({ ...formData, couponTotal: e.target.value })}
                />
                <span className="ml-2">Set Quantity</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="couponTotal"
                  className="form-radio"
                  value="unlimited"
                  checked={formData.couponTotal === "unlimited"}
                  onChange={(e) => setFormData({ ...formData, couponTotal: e.target.value })}
                />
                <span className="ml-2">Unlimited</span>
              </label>
            </div>
            {formData.couponTotal === "setQuantity" && (
              <div className="mt-4">
                <label className="block mb-2">Total Quantity</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg"
                  value={formData.totalQuantity}
                  onChange={(e) => setFormData({ ...formData, totalQuantity: e.target.value })}
                />
              </div>
            )}
          </div>
        </div>
      </form>

      <div className="flex justify-end gap-4 mt-6">
        <button type="button" className="px-6 py-2 border rounded-lg hover:bg-gray-50">
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`px-6 py-2 rounded-lg ${
            isFormValid
              ? "bg-yellow-500 text-white hover:bg-yellow-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Save
        </button>
      </div>
    </div>
  );
};
