import React from "react";
import CheckoutFormExisting from "./components/existCust/CheckoutFormExisting";
import OrderSummary from "./components/OrderSummary";

const CheckoutExisting: React.FC = () => {
  return (
    <div className="checkout-container px-4 sm:px-8 lg:px-14 mt-5 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 mx-auto max-w-7xl">
      {/* Left Section */}
      <div className="lg:col-span-2">
        <CheckoutFormExisting />
      </div>
      {/* Right Section */}
      <div className="lg:col-span-1">
        <OrderSummary />
      </div>
    </div>
  );
};

export default CheckoutExisting;
