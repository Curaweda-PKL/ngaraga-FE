import React from "react";
import CheckoutFormExisting from "./components/existCust/CheckoutFormExisting";
import OrderSummary from "./components/OrderSummary";

const CheckoutExisting: React.FC = () => {
  return (
    <div className="checkout-container px-14 mt-5 grid grid-cols-3 gap-10">
      {/* Left Section */}
      <CheckoutFormExisting />
      {/* Right Section */}
      <OrderSummary />
    </div>
  );
};

export default CheckoutExisting;
