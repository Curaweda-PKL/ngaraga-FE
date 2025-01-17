import {CheckCircle2, ShoppingCart} from "lucide-react";

const OrderComplete = () => {
  const steps = [
    {label: "Information", completed: true},
    {label: "Payment", completed: true},
    {label: "Complete Order", completed: true},
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>

      {/* Progress Steps */}
      <div className="flex justify-between mb-12">
        {steps.map((step, index) => (
          <div
            key={step.label}
            className="flex items-center"
          >
            <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center text-white">
              <CheckCircle2 size={20} />
            </div>
            <span className="ml-2">{step.label}</span>
            {index < steps.length - 1 && (
              <div className="mx-4 h-[2px] w-16 bg-green-500"></div>
            )}
          </div>
        ))}
      </div>

      {/* Success Icon */}
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 text-green-500">
          <ShoppingCart
            size={96}
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Success Message */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Order Is Complete</h2>
        <p className="text-gray-600 mb-2">
          Thank you for your order! Your Order ID is{" "}
          <span className="text-yellow-500 font-semibold">ORD123456789</span>.
        </p>
        <p className="text-gray-600">
          The details have been sent to your email.
        </p>
      </div>

      {/* View Details Button */}
      <div className="flex justify-center">
        <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default OrderComplete;
