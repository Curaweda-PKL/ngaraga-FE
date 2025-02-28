import React from "react";

interface Item {
  title: string;
  image: string;
  quantity: number;
  price: number;
  author: string;
}

const items: Item[] = [
  {
    title: "Dancing Robot 0512",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqGUVku_G28P1qOvkCPizeyntIbBri9GMSVw&s",
    quantity: 1,
    price: 200000,
    author: "Orbitian",
  },
];

const OrderSummary: React.FC = () => {
  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCost = 15000;
  const vat = subtotal * 0.11;
  const total = subtotal + shippingCost + vat;

  return (
    <div className="flex flex-col p-6 rounded-lg max-h-fit border border-neutral-colors-400 bg-neutral-colors-200 lg:mt-20 mx-auto sm:max-w-md">
      <h2 className="font-bold text-lg mb-2 text-center">Summary Order</h2>
      <div className="border-b border-neutral-colors-400 mb-5"></div>
      {/* Product List */}
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between border pb-4 bg-neutral-colors-100 border-neutral-colors-300 rounded-lg mb-4"
        >
          <div className="flex items-center bg-neutral-colors-100 p-2 rounded-lg border-neutral-colors-300">
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-contain rounded-lg mr-4 -mb-2"
            />
            <div>
              <h3 className="font-bold">{item.title}</h3>
              <p>
                <span>{item.author}</span>
              </p>
              <p>
                <span>Qty: {item.quantity}</span>
                <span className="ml-4 font-bold">
                  {formatCurrency(item.price)}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-6 space-y-2">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex flex-col lg:flex-row justify-between lg:items-center">
          <span>Shipping</span>
          <span>{formatCurrency(shippingCost)}</span>
        </div>
        <div className="flex flex-col lg:flex-row justify-between lg:items-center">
          <span>Discount</span>
          <span>Rp 0</span>
        </div>
        <div className="flex flex-col lg:flex-row justify-between lg:items-center border-b border-neutral-colors-400 pb-2">
          <span>VAT 11%</span>
          <span>{formatCurrency(vat)}</span>
        </div>
        <div className="flex flex-col lg:flex-row justify-between lg:items-center font-bold text-lg mt-2">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
      <a href="/payments">
        <button className="w-full bg-call-to-actions-900 text-white rounded-lg py-3 mt-6 font-bold hover:bg-call-to-actions-800">
          Pay Now
        </button>
      </a>
    </div>
  );
};

export default OrderSummary;
