import React from "react";
import { Purchase } from "./types";

type PurchasesProps = {
  data: Purchase[];
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Payment":
      return "bg-red-100 text-red-600";
    case "Shipping":
      return "bg-blue-100 text-blue-600";
    case "Packaging":
      return "bg-orange-100 text-orange-600";
    case "Delivered":
      return "bg-green-100 text-green-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const getActionButtons = (status: string) => {
  switch (status) {
    case "Payment":
      return (
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="px-4 py-2 text-call-to-action border border-call-to-action rounded-lg hover:bg-yellow-50 text-sm">
            Change Payment
          </button>
          <a href="/payments" className="w-full sm:w-auto">
            <button className="w-full px-4 py-2 text-white bg-call-to-action rounded-lg hover:bg-yellow-700 text-sm">
              Payment
            </button>
          </a>
        </div>
      );
    case "Delivered":
      return (
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="px-4 py-2 text-call-to-action border border-call-to-action rounded-lg hover:bg-yellow-50 text-sm">
            Delivered
          </button>
          <a href="/view-detail" className="w-full sm:w-auto">
            <button className="w-full px-4 py-2 text-white bg-call-to-action rounded-lg hover:bg-yellow-700 text-sm">
              View Details
            </button>
          </a>
        </div>
      );
    default:
      return (
        <button className="w-full sm:w-auto px-4 py-2 text-white bg-call-to-action rounded-lg hover:bg-yellow-700 text-sm">
          View Details
        </button>
      );
  }
};

const Purchases: React.FC<PurchasesProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4">
      {data.map((item) => (
        <div
          key={item.orderId}
          className="w-full bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
            <span
              className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-medium mb-2 sm:mb-0 ${getStatusColor(
                item.status
              )}`}
            >
              {item.status}
            </span>
            <span className="text-xs sm:text-sm text-gray-500">
              Order ID: {item.orderId}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <figure className="w-full sm:w-[120px] h-[120px] rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={item.thumbnail || "/placeholder.svg"}
                alt={item.productName}
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="flex-grow">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                {item.productName}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-2">
                {item.creator}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm sm:text-base text-gray-600">
                  Qty: {item.quantity}
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-sm sm:text-base text-gray-600">
                  {item.price}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="mb-4 sm:mb-0">
                  <p className="text-xs sm:text-sm text-gray-500">
                    {item.otherProducts} other products
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-gray-900">
                    Purchase Total {item.totalPrice}
                  </p>
                </div>
                {getActionButtons(item.status)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Purchases;
