import React, { useState } from "react";
import { IoRadioButtonOn } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";

interface DeliveryTabProps {
//   provinces: any[];
//   cities: any[];
//   subdistricts: any[];
}

const DeliveryTab: React.FC<DeliveryTabProps> = ({
//   provinces,
//   cities,
//   subdistricts,
}) => {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
    useState<string>("Anter Aja");

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg shadow-sm mt-4">
        <div className="flex items-center mb-4">
          <span className="material-icons text-gray-600 mr-2">home</span>
          <h3 className="text-lg font-semibold">Animakid</h3>
        </div>
        <p className="text-gray-700 text-sm mb-2">+62 854 5565 6745</p>
        <p className="text-gray-600 text-sm">
          Jl. Medan Merdeka Barat No.12, Gambir, Kecamatan Gambir, Kota Jakarta
          Pusat, Daerah Khusus Ibukota Jakarta 10110
        </p>
        <div className="flex mt-4 space-x-4">
          <button className="text-[#DDB11F] text-sm font-medium">Edit</button>
          <button className="text-[#DDB11F] text-sm font-medium">Delete</button>
        </div>
      </div>
      <div className="flex justify-between mt-4 mb-2">
        <button className="px-4 py-2 border-2 border-[#DDB11F] text-[#DDB11F] text-sm font-medium rounded-lg shadow hover:bg-[#DDB11F] hover:text-white transition">
          Change Address
        </button>
        <button className="px-4 py-2 bg-[#DDB11F] text-white text-sm font-medium rounded-lg shadow hover:bg-[#c5991a] transition">
          + Add New Address
        </button>
      </div>

      <div className="mt-8">
        <h2 className="font-bold text-lg mb-4">Delivery Options</h2>
        <div className="space-y-4 mb-10">
          {["Anter Aja", "ID Express", "JNE"].map((option) => (
            <label
              key={option}
              className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer mt-4 h-20 ${
                selectedDeliveryMethod === option
                  ? "border-call-to-actions-900"
                  : ""
              }`}
            >
              <img
                src="https://assets.kompasiana.com/items/album/2024/06/28/jne-reg-667e8e2fed64153ad268a362.png?t=o&v=300"
                alt={option}
                className="w-16 h-16 mr-4 object-cover"
              />
              <span className="flex-grow">{option}</span>
              <div className="flex flex-col items-end">
                {selectedDeliveryMethod === option && (
                  <IoRadioButtonOn className="text-xl mb-1" />
                )}
                <span>Rp 15.000</span>
              </div>
              <input
                type="radio"
                name="delivery"
                value={option}
                checked={selectedDeliveryMethod === option}
                onChange={() => setSelectedDeliveryMethod(option)}
                className="hidden"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryTab;