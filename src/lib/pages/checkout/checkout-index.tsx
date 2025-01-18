import React, {  } from "react";
import CheckoutForm from "./components/CheckoutForm";
import OrderSummary from "./components/OrderSummary";

const Checkout: React.FC = () => {

  return (
    <div className="checkout-container px-14 mt-5 grid grid-cols-3 gap-10">
      {/* Left Section */}
      <CheckoutForm/>
      {/* Right Section */}
    <OrderSummary/>
    </div>
  );
};

export default Checkout;
