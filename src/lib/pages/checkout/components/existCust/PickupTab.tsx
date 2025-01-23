import React from "react";
import { PiPackageLight } from "react-icons/pi";

interface PickupTabProps {
  pickUpTime: string;
  onPickUpTimeChange: (time: string) => void;
}

const PickupTab: React.FC<PickupTabProps> = ({
  pickUpTime,
  onPickUpTimeChange,
}) => {
  const availablePickUpTimes = ["08:00", "10:00", "13:00", "14:00", "15:00"];

  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4 flex items-start gap-4 shadow-sm mt-4 mb-4">
        <div className="text-call-to-actions-100">
          <PiPackageLight size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Ngaraga by Dolanan</h3>
          <p className="text-sm text-neutral-colors-600">
            Jl. Medan Merdeka Barat No.12, Gambir, Kecamatan Gambir, Kota Jakarta
            Pusat, Daerah Khusus Ibukota Jakarta 10110
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-base font-medium">Pick a Pickup Time</p>
        <div className="max-w-sm grid grid-cols-5 gap-2">
          {availablePickUpTimes.map((time) => (
            <div
              key={time}
              className={`flex items-center justify-center border border-gray-300 rounded-md cursor-pointer px-3 py-2 ${
                pickUpTime === time
                  ? "bg-gray-200 text-gray-800"
                  : "bg-white text-gray-600"
              }`}
              onClick={() => onPickUpTimeChange(time)}
            >
              <p className="text-sm font-medium">{time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PickupTab;