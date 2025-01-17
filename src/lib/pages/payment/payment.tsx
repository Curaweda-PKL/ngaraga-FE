import React from 'react';

type paymentProps = {
  // Add any props if needed in the future
};

const PaymentUser: React.FC<paymentProps> = () => {
  return (
    <div className="checkout-container px-14 mt-5 grid grid-cols-3 gap-10">
      {/* Left Section */}
      <div className="col-span-2">
        {/* Header */}
        <div className="checkout-header">
          <h1 className="font-bold text-2xl mb-2">Checkout</h1>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-call-to-actions-900 rounded-lg text-white flex items-center justify-center mt-2">
              <span className="text-white font-bold">1</span>
            </div>
            <span className="text-yellow-500 text-md text-center mx-4">
              Information
            </span>

            <div className="w-8 h-8 border border-gray-500 rounded-lg flex items-center justify-center mt-2 mx-4">
              <span className="text-gray-500 font-bold">2</span>
            </div>
            <span className="text-gray-500 text-md text-center mx-1">
              Payment
            </span>

            <div className="w-8 h-8 border border-gray-500 rounded-lg flex items-center justify-center mt-2 mx-4">
              <span className="text-gray-500 font-bold">3</span>
            </div>
            <span className="text-gray-500 text-md text-center mx-2">
              Complete Orders
            </span>
          </div>
        </div>
      </div>


      {/* Right Section (if needed) */}
      <div className="col-span-1">


      </div>
    </div>
  );
};

export default PaymentUser;
