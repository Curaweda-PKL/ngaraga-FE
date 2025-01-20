import React from "react";

const orderItems = [
  {
    id: 1,
    name: "Dancing Robot 0512",
    type: "Orbilum",
    price: 200000,
    qty: 1,
  },
  {
    id: 2,
    name: "Dancing Robot 0512",
    type: "Orbilum",
    price: 200000,
    qty: 1,
  },
  {
    id: 3,
    name: "Dancing Robot 0512",
    type: "Orbilum",
    price: 200000,
    qty: 1,
  },
];

const LeftSectionOrderSummary: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="font-semibold mb-4">Summary Order</h2>
        <div className="text-sm text-gray-600 mb-2">Order ID: ORD123456789</div>

        {orderItems.map((item) => (
          <div key={item.id} className="mb-4 border-b pb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg" />
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-600">{item.type}</div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <span>Qty: {item.qty}</span>
                  </div>
                  <div>Rp {item.price.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rp 500,000</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Rp 15,000</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>-Rp 100,000</span>
          </div>
          <div className="flex justify-between">
            <span>VAT 11%</span>
            <span>Rp 45,650</span>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t">
            <span>Total</span>
            <span>Rp 460,650</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LeftSectionOrderSummary;
