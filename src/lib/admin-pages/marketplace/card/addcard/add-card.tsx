import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "@/middleware/utils";

export const AddCard = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    couponName: "",
    couponCode: "",
    userType: "", // "guest", "member", "newMember"
    applyTo: "ALL_PRODUCTS", // ALL_PRODUCTS, PRODUCT_CATEGORIES, PRODUCT_LIST
    dateType: "unlimited", // "range" or "unlimited"
    startDate: "",
    endDate: "",
    condition: "FIXED", // FIXED, PERCENT, MIN_SPENT_FIXED, MIN_SPENT_PERCENT
    discountValue: "",
    minimumSpent: "",
    couponTotal: "unlimited", // "setQuantity" or "unlimited"
    totalQuantity: "",
  });

  const generateCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setFormData((prev) => ({ ...prev, couponCode: code }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  // Determine if the Save button should be enabled.
  const isSaveDisabled =
    !formData.couponName.trim() ||
    !formData.couponCode.trim() ||
    !formData.userType.trim() ||
    !formData.applyTo.trim() ||
    !formData.condition.trim() ||
    !formData.discountValue.trim() ||
    (formData.dateType === "range" && (!formData.startDate || !formData.endDate)) ||
    (formData.couponTotal === "setQuantity" && !formData.totalQuantity);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Additional validations already done via isSaveDisabled.

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
        formData.couponTotal === "setQuantity" ? parseInt(formData.totalQuantity, 10) : null,
      minimumSpent:
        formData.condition === "MIN_SPENT_FIXED" || formData.condition === "MIN_SPENT_PERCENT"
          ? parseFloat(formData.minimumSpent)
          : null,
    };

    try {
      const response = await axios.post(`${SERVER_URL}/api/coupons`, payload, {
        withCredentials: true,
      });
      setMessage({ type: "success", text: "Coupon created successfully." });
      console.log("Coupon response:", response.data);
      // Optionally reset the form.
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
      setTimeout(() => {
        navigate("/admin/coupons");
      }, 1500);
    } catch (err: any) {
      console.error("Error creating coupon:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Failed to create coupon. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-sm text-gray-500 mb-4">
        Coupon / Coupon List / Add Coupon
      </div>

      <h1 className="text-2xl font-semibold mb-6">Add Coupon</h1>

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
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="applyTo"
                  className="form-radio"
                  value="PRODUCT_CATEGORIES"
                  checked={formData.applyTo === "PRODUCT_CATEGORIES"}
                  onChange={handleInputChange}
                />
                <span className="ml-2">Product Categories</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="applyTo"
                  className="form-radio"
                  value="PRODUCT_LIST"
                  checked={formData.applyTo === "PRODUCT_LIST"}
                  onChange={handleInputChange}
                />
                <span className="ml-2">Product List</span>
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
      </form>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={() => navigate("/admin/coupons")}
          className="px-6 py-2 border rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isSaveDisabled}
          className={`px-6 py-2 rounded-lg text-white ${
            !isSaveDisabled
              ? "bg-call-to-actions-900 hover:bg-call-to-actions-800"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Save
        </button>
      </div>
    </div>
  );
};
