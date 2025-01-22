import React, { useState } from "react";
import { IoRadioButtonOn } from "react-icons/io5";

export const PaymentOverlay: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      {/* Button to Open Modal */}
      {!showOverlay && (
        <button
          onClick={() => setShowOverlay(true)}
          className="text-[#DDB11F]"
        >
          Change Payment
        </button>
      )}

      {showOverlay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          style={{ opacity: 0.95 }}
        >
          {/* Overlay Content */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black">Change Payment</h2>
              <button
                className="text-black hover:text-red-500"
                onClick={() => setShowOverlay(false)}
              >
                ✕
              </button>
            </div>

            {/* Full-width divider */}
            <div className="mt-6 border-t-2 border-gray-300 my-4 w-full"></div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  method: "Bank BCA",
                  image:
                    "https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-bca-bank-logo-png-image_6472275.png",
                  icon: <IoRadioButtonOn />,
                },
                {
                  method: "Bank BNI",
                  image:
                    "https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-bca-bank-logo-png-image_6472275.png",
                  icon: <IoRadioButtonOn />,
                },
                {
                  method: "Bank BRI",
                  image:
                    "https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-bca-bank-logo-png-image_6472275.png",
                  icon: <IoRadioButtonOn />,
                },
                {
                  method: "Qris",
                  image:
                    "https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-bca-bank-logo-png-image_6472275.png",
                  icon: <IoRadioButtonOn />,
                },
              ].map(({ method, image, icon }) => (
                <label
                  key={method}
                  className={`flex justify-center items-center border rounded-lg p-3 cursor-pointer ${
                    paymentMethod === method
                      ? "border-[#DDB11F]"
                      : "border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod(method)}
                >
                  <img
                    src={image}
                    alt={method}
                    className="w-12 h-12 object-cover mr-4"
                  />
                  <span className="flex-grow text-black">{method}</span>
                  {paymentMethod === method && (
                    <div className="text-yellow-500">{icon}</div>
                  )}
                </label>
              ))}
            </div>
            <div className="flex justify-end mt-6 gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
                onClick={() => setShowOverlay(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-[#DDB11F] text-white rounded-md"
                onClick={() => {
                  console.log("Payment Confirmed:", paymentMethod);
                  setShowOverlay(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
