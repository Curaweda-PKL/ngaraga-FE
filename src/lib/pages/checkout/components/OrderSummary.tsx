import React from "react";

interface Item {
  title: string;
  image: string;
  quantity: number;
  price: number;
  author: string;
}

interface OrderSummaryProps {
  items: Item[];
  subtotal: number;
  shippingCost: number;
  vat: number;
  total: number;
  formatCurrency: (value: number) => string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shippingCost,
  vat,
  total,
  formatCurrency,
}) => {
  return (
    <div className="flex flex-col p-6 rounded-lg max-h-fit border border-neutral-colors-400 bg-neutral-colors-200 lg:mt-20">
      <h2 className="font-bold text-lg mb-2">Summary Order</h2>
      <div className="border-b border-neutral-colors-400 mb-5"></div>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between border pb-4 bg-neutral-colors-100 border-neutral-colors-300 rounded-lg mb-4"
        >
          <div className="flex items-center p-2 rounded-lg">
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-contain rounded-lg mr-4 -mb-2"
            />
            <div>
              <h3 className="font-bold">{item.title}</h3>
              <p>{item.author}</p>
              <p>
                Qty: {item.quantity}{" "}
                <span className="ml-4 font-bold">
                  {formatCurrency(item.price)}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-6 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{formatCurrency(shippingCost)}</span>
        </div>
        <div className="flex justify-between border-b border-neutral-colors-400 pb-2">
          <span>VAT 11%</span>
          <span>{formatCurrency(vat)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
      <button className="w-full bg-call-to-actions-900 text-white rounded-lg py-3 mt-6 font-bold hover:bg-call-to-actions-800">
        <a href="/payment">Pay Now</a>
      </button>
    </div>
  );
};

export default OrderSummary;
