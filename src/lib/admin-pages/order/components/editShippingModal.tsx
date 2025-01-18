import React, { useState } from "react";

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
  onUpdate: (info: ShippingInfo) => void;
  shippingInfo: ShippingInfo;
}

export const EditShippingModal: React.FC<EditShippingModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  shippingInfo,
}) => {
  const [form, setForm] = useState<ShippingInfo>(shippingInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onUpdate(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Shipping Info</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
