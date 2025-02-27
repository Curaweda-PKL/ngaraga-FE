import React, { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "@/middleware/utils";

export const EditCouponForm = () => {
  // Get coupon id from the URL
  const { id: couponId } = useParams();
  const navigate = useNavigate();

  // Local state for messages and loading
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state with initial values
  const [formData, setFormData] = useState({
    couponName: "",
    couponCode: "",
    userType: "", // e.g., "guest", "member", "newMember"
    applyTo: "ALL_PRODUCTS",
    dateType: "unlimited", // "range" or "unlimited"
    startDate: "",
    endDate: "",
    condition: "FIXED", // FIXED, PERCENT, MIN_SPENT_FIXED, MIN_SPENT_PERCENT
    discountValue: "",
    minimumSpent: "",
    couponTotal: "unlimited", // "setQuantity" or "unlimited"
    totalQuantity: "",
  });

  // Autofill the form by fetching coupon data
  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/coupons/${couponId}`,
          { withCredentials: true }
        );
        // Check for coupon data either directly or in an array.
        let couponData;
        if (response.data.coupon) {
          couponData = response.data.coupon;
        } else if (response.data.coupons && response.data.coupons.length > 0) {
          couponData = response.data.coupons[0];
        } else {
          throw new Error("Coupon data not found");
        }
        setFormData({
          couponName: couponData.name || "",
          couponCode: couponData.couponCode || "",
          userType: couponData.userType || "",
          applyTo: couponData.applyTo || "ALL_PRODUCTS",
          dateType:
            couponData.startDate && couponData.endDate ? "range" : "unlimited",
          startDate: couponData.startDate || "",
          endDate: couponData.endDate || "",
          condition:
            couponData.minimumSpent != null
              ? couponData.discountType === "FIXED"
                ? "MIN_SPENT_FIXED"
                : "MIN_SPENT_PERCENT"
              : couponData.discountType || "FIXED",
          discountValue: couponData.discountValue
            ? couponData.discountValue.toString()
            : "",
          minimumSpent: couponData.minimumSpent
            ? couponData.minimumSpent.toString()
            : "",
          couponTotal: couponData.unlimitedUsage ? "unlimited" : "setQuantity",
          totalQuantity:
            couponData.unlimitedUsage || !couponData.totalQuantity
              ? ""
              : couponData.totalQuantity.toString(),
        });
      } catch (err: any) {
        console.error("Error fetching coupon:", err);
        setMessage({ type: "error", text: "Failed to load coupon data." });
      } finally {
        setLoading(false);
      }
    };
  
    if (couponId) {
      fetchCoupon();
    }
  }, [couponId]);
  

  // Function to generate a random coupon code
  const generateCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setFormData((prev) => ({ ...prev, couponCode: code }));
  };

  // Handle input changes for all form fields
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  // Disable Save if required fields are missing
  const isSaveDisabled =
    !formData.couponName.trim() ||
    !formData.couponCode.trim() ||
    !formData.userType.trim() ||
    !formData.applyTo.trim() ||
    !formData.condition.trim() ||
    !formData.discountValue.trim() ||
    (formData.dateType === "range" && (!formData.startDate || !formData.endDate)) ||
    (formData.couponTotal === "setQuantity" && !formData.totalQuantity);

  // Handle form submission to update coupon
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validate date range
    if (formData.dateType === "range") {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (start > end) {
        setMessage({
          type: "error",
          text: "Start date cannot be later than end date.",
        });
        return;
      }
    }

    // Prepare payload to match backend expectations
    const payload = {
      couponCode: formData.couponCode,
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
        formData.couponTotal === "setQuantity"
          ? parseInt(formData.totalQuantity, 10)
          : null,
      minimumSpent:
        formData.condition === "MIN_SPENT_FIXED" ||
        formData.condition === "MIN_SPENT_PERCENT"
          ? parseFloat(formData.minimumSpent)
          : null,
    };

    try {
      const response = await axios.patch(
        `${SERVER_URL}/api/coupons/${couponId}`,
        payload,
        { withCredentials: true }
      );
      setMessage({ type: "success", text: "Coupon updated successfully." });
      console.log("Coupon update response:", response.data);
      setTimeout(() => {
        navigate("/admin/coupon");
      }, 1500);
    } catch (err: any) {
      console.error("Error updating coupon:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Failed to update coupon. Please try again.",
      });
    }
  };

  if (loading) {
    return <div>Loading coupon data...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-sm text-gray-500 mb-4">
        Coupon / Coupon List / Edit Coupon
      </div>

      <h1 className="text-2xl font-semibold mb-6">Edit Coupon</h1>

      {message && (
        <div
          className={`p-4 rounded-lg mb-4 ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="space-y-4 p-6 bg-white rounded-lg shadow">
          {/* Coupon Name */}
          <div>
            <label className="block mb-2">
              Coupon Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="couponName"
              className="w-full p-2 border rounded-lg"
              value={formData.couponName}
              onChange={handleInputChange}
            />
          </div>

          {/* Coupon Code */}
          <div>
            <label className="block mb-2">
              Coupon Code <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="couponCode"
                className="flex-1 p-2 border rounded-lg"
                value={formData.couponCode}
                onChange={handleInputChange}
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

          {/* Apply Discount To */}
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
                  onChange={handleInputChange}
                />
                <span className="ml-2">All Products</span>
              </label>
            </div>
          </div>

          {/* Date Type */}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                    name="startDate"
                    className="w-full p-2 border rounded-lg"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block mb-2">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    className="w-full p-2 border rounded-lg"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Condition */}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  name="minimumSpent"
                  className="w-full p-2 border rounded-lg"
                  value={formData.minimumSpent}
                  onChange={handleInputChange}
                />
              </div>
            )}
            <div className="mt-4">
              <label className="block mb-2">Discount Value</label>
              <input
                type="number"
                name="discountValue"
                className="w-full p-2 border rounded-lg"
                value={formData.discountValue}
                onChange={handleInputChange}
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
                  onChange={handleInputChange}
                />
                <span className="ml-2">User</span>
              </label>
              {/* Additional user types can be added here */}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                />
                <span className="ml-2">Unlimited</span>
              </label>
            </div>
            {formData.couponTotal === "setQuantity" && (
              <div className="mt-4">
                <label className="block mb-2">Total Quantity</label>
                <input
                  type="number"
                  name="totalQuantity"
                  className="w-full p-2 border rounded-lg"
                  value={formData.totalQuantity}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>
        </div>
                {/* Place the action buttons inside the form */}
                <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/coupon")}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaveDisabled}
            className={`px-6 py-2 rounded-lg text-white ${
              !isSaveDisabled ? "bg-call-to-actions-900 hover:bg-call-to-actions-800" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </div>
      </form>

    </div>
  );
};
