import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";

interface OrderSummaryItem {
  id: number;
  title: string;
  image: string;
  quantity: number;
  price: number;
  author: string;
}

const OrderSummary: React.FC = () => {
  const [items, setItems] = useState<OrderSummaryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Helper to build full image URL.
  const getImageUrl = (img?: string): string => {
    if (!img) return "";
    return img.startsWith("http") ? img : `${SERVER_URL}/${img}`;
  };

  // Fetch the latest checkout items from backend
  const fetchCheckoutItems = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/get/checkout`,
        { withCredentials: true }
      );
      const checkouts = response.data.checkouts;
      if (Array.isArray(checkouts) && checkouts.length > 0) {
        // take the most recent checkout
        const latest = checkouts[0];
        const parsed: OrderSummaryItem[] = latest.items.map((item: any) => ({
          id: item.id,
          title: item.card.product.name,
          image:
            getImageUrl(item.card.product.image) ||
            getImageUrl(item.card.product.cardImage),
          quantity: item.quantity,
          price: item.price,
          author:
            item.card.creators && item.card.creators.length > 0
              ? item.card.creators[0].name
              : "Unknown",
        }));
        setItems(parsed);
      } else {
        setItems([]);
      }
    } catch (err: any) {
      console.error("Failed to fetch checkout items:", err);
      setError("Could not load order summary.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckoutItems();
  }, []);

  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);

  if (loading) {
    return <p className="text-center py-4">Loading order summary...</p>;
  }
  if (error) {
    return <p className="text-center py-4 text-red-500">{error}</p>;
  }

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCost = 15000;
  const discount = 0; // integrate coupon discount if needed
  const vat = subtotal * 0.11;
  const total = subtotal + shippingCost + vat - discount;

  return (
    <div className="flex flex-col p-6 rounded-lg max-h-fit border border-neutral-colors-400 bg-neutral-colors-200 lg:mt-20 mx-auto sm:max-w-md">
      <h2 className="font-bold text-lg mb-2 text-center">Summary Order</h2>
      <div className="border-b border-neutral-colors-400 mb-5" />

      {/* Product List */}
      {items.map((item) => (
        <div
          key={item.id}
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
              <p className="text-sm text-gray-600">{item.author}</p>
              <p className="mt-1">
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
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{formatCurrency(shippingCost)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>{formatCurrency(discount)}</span>
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

      <a href="/payments">
        <button className="w-full bg-call-to-actions-900 text-white rounded-lg py-3 mt-6 font-bold hover:bg-call-to-actions-800">
          Pay Now
        </button>
      </a>
    </div>
  );
};

export default OrderSummary;
