import React from 'react';
import {
    FaBox,
    FaCheck,
    FaCreditCard,
    FaTruck
} from "react-icons/fa";
  

const OrderStages:React.FC = () => {
    const orderStages = [
        {icon: <FaCreditCard size={20} />, label: "Payment", active: true},
        {icon: <FaBox size={20} />, label: "Packaging", active: false},
        {icon: <FaTruck size={20} />, label: "Shipping", active: false},
        {icon: <FaCheck size={20} />, label: "Delivered", active: false},
      ];
    return (
              <div className="mb-8">
                <div className="flex justify-between items-center relative">
                  {orderStages.map((stage, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center z-10"
                    >
                      <div
                        className={`rounded-full p-4 ${
                          stage.active ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                      >
                        {stage.icon}
                      </div>
                      <span className="mt-2 text-sm">{stage.label}</span>
                    </div>
                  ))}
                  <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-200" />
                </div>
              </div>
    )
}
export default OrderStages