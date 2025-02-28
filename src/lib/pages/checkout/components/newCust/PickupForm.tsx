import React from "react";
import { FormData } from "./CheckoutForm";
import { AiOutlineUser} from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import PhoneInput from "../PhoneInput";

interface PickupFormProps {
  formData: FormData;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handlePickUpTimeChange: (time: string) => void;
  availablePickUpTimes: string[];
}

const PickupForm: React.FC<PickupFormProps> = ({
  formData,
  handleFormChange,
  handlePickUpTimeChange,
  availablePickUpTimes,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="border rounded-lg p-4 flex items-start gap-4 shadow-sm mt-4 mb-4">
        <div className="text-call-to-actions-100"></div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Ngaraga by Dolanan</h3>
          <p className="text-sm text-neutral-colors-600">
            Jl. Medan Merdeka Barat No.12, Gambir, Kecamatan Gambir, Kota
            Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110
          </p>
        </div>
      </div>

      <div className="relative w-full mb-4">
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

      <PhoneInput className="mb-4"/>

      <div className="space-y-3">
        <p className="text-base font-medium">Pick a Pickup Time</p>
        <div className="max-w-sm grid grid-cols-5 gap-2">
          {availablePickUpTimes.map((time) => (
            <div
              key={time}
              className={`flex items-center justify-center border rounded-md cursor-pointer px-3 py-2 ${
                formData.pickUpTime === time
                  ? "bg-gray-200 text-gray-800"
                  : "bg-white text-gray-600"
              }`}
              onClick={() => handlePickUpTimeChange(time)}
            >
              <p className="text-sm font-medium">{time}</p>
            </div>
          ))}
        </div>
      </div>

      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleFormChange}
        placeholder="Notes (Optional)"
        className="w-full border border-neutral-colors-500 rounded-lg p-3 mt-4"
      ></textarea>
    </div>
  );
};

export default PickupForm;