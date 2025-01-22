import React from "react";
import CheckoutForm from "./components/CheckoutFormLogin";
import OrderSummary from "./components/OrderSummary";

const CheckoutLogin: React.FC = () => {
  return (
    <div className="checkout-container px-14 mt-5 grid grid-cols-3 gap-10">
      {/* Left Section */}
      <CheckoutForm />
      {/* Right Section */}
      <OrderSummary />
    </div>
  );
};

export default CheckoutLogin;
