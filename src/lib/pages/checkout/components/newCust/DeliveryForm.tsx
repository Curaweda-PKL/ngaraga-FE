import React, { useState } from "react";
import { FormData, Province, City, Subdistrict } from "./CheckoutForm";
import { AiOutlineUser} from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import PhoneInput from "../PhoneInput";
import { IoRadioButtonOn } from "react-icons/io5";

interface DeliveryFormProps {
  formData: FormData;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  provinces: Province[];
  cities: City[];
  subdistricts: Subdistrict[];
  loading: boolean;
  error: string | null;
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({
  formData,
  handleFormChange,
  provinces,
  cities,
  subdistricts,
  loading,
  error,
}) => {
  const [selectedDeliveryService, setSelectedDeliveryService] = useState("Anter Aja");

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <div className="relative w-full mt-4 mb-4">
          <AiOutlineUser className="absolute text-neutral-colors-500 left-3 top-1/2 transform -translate-y-1/2" size={23} />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleFormChange}
            placeholder="Full Name"
            className="w-full border border-neutral-colors-500 rounded-lg p-3 pl-11"
          />
        </div>

        <div className="relative w-full mb-4">
          <MdOutlineMail className="absolute text-neutral-colors-500 left-3 top-1/2 transform -translate-y-1/2" size={23} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            placeholder="Email"
            className="w-full border border-neutral-colors-500 rounded-lg p-3 pl-11"
          />
        </div>

        <PhoneInput />

        <div className="grid grid-cols-2 gap-4">
          <div>
            {loading ? (
              <p>Loading provinces...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              <select
                name="state"
                value={formData.state}
                onChange={handleFormChange}
                className="border border-neutral-colors-500 rounded-lg p-3 w-full"
              >
                <option value="">State/Province</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            {loading ? (
              <p>Loading City...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              <select
                name="city"
                value={formData.city}
                onChange={handleFormChange}
                className="border border-neutral-colors-500 rounded-lg p-3 w-full"
              >
                <option value="">City/Regency</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            {loading ? (
              <p>Loading Subdistrict...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              <select
                name="subdistrict"
                value={formData.subdistrict}
                onChange={handleFormChange}
                className="border border-neutral-colors-500 rounded-lg p-3 w-full"
              >
                <option value="">Subdistrict</option>
                {subdistricts.map((subdistrict) => (
                  <option key={subdistrict.id} value={subdistrict.id}>
                    {subdistrict.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleFormChange}
              placeholder="Postal Code"
              className="border border-neutral-colors-500 rounded-lg p-3 w-full"
            />
          </div>
        </div>

        <textarea
          name="addressDetails"
          value={formData.addressDetails}
          onChange={handleFormChange}
          placeholder="Address Details"
          className="w-full border border-neutral-colors-500 rounded-lg p-3 mt-4"
        ></textarea>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleFormChange}
          placeholder="Notes (Optional)"
          className="w-full border border-neutral-colors-500 rounded-lg p-3 mt-4"
        ></textarea>
      </div>

      <div className="mt-8">
        <h2 className="font-bold text-lg mb-4">Delivery Options</h2>
        <div className="space-y-4 mb-10">
          {["Anter Aja", "ID Express", "JNE"].map((option) => (
            <label
              key={option}
              className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer mt-4 h-20 ${
                selectedDeliveryService === option ? "border-call-to-actions-900" : ""
              }`}
            >
              <img
                src="https://assets.kompasiana.com/items/album/2024/06/28/jne-reg-667e8e2fed64153ad268a362.png?t=o&v=300"
                alt={option}
                className="w-16 h-16 mr-4 object-cover"
              />
              <span className="flex-grow">{option}</span>
              <div className="flex flex-col items-end">
                {selectedDeliveryService === option && (
                  <IoRadioButtonOn className="text-xl mb-1" />
                )}
                <span>Rp 15.000</span>
              </div>
              <input
                type="radio"
                name="delivery"
                value={option}
                checked={selectedDeliveryService === option}
                onChange={() => setSelectedDeliveryService(option)}
                className="hidden"
              />
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default DeliveryForm;