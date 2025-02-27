import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaTrash, FaTag } from "react-icons/fa";
import { SERVER_URL } from "@/middleware/utils";

// Helper function to build a full image URL.
const getImageUrl = (img?: string, directory?: string): string => {
  if (!img) return "";
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  const dirPath = directory ? `/${directory}` : "";
  return `${SERVER_URL}${dirPath}/${img}`;
};

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);

  // Function to map backend cart items to local state format.
  const mapCartItems = (cart: any) => {
    if (!cart || !cart.items) return [];
    return cart.items.map((item: any) => ({
      id: item.id,
      name: item.card.product.name,
      price: Number(item.card.product.price),
      quantity: item.quantity,
      image:
        getImageUrl(item.card.product.image) ||
        getImageUrl(item.card.product.cardImage) ||
        "https://via.placeholder.com/100",
    }));
  };

  // Fetch cart items from the backend.
  const fetchCartItems = useCallback(async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/cart`, {
        withCredentials: true,
      });
      if (response.data.cart) {
        setCartItems(mapCartItems(response.data.cart));
        setAppliedCoupon(response.data.cart.appliedCoupon || null);
      }
    } catch (err: any) {
      console.error("Error fetching cart items:", err);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  // Delete a single cart item.
  const handleDeleteItem = async (cartItemId: number) => {
    try {
      await axios.delete(`${SERVER_URL}/api/cart/item/${cartItemId}`, {
        withCredentials: true,
      });
      await fetchCartItems();
      setSelectedItems((prev) => prev.filter((id) => id !== cartItemId));
    } catch (err: any) {
      console.error("Error deleting cart item:", err);
    }
  };

  // Decrement cart item quantity.
  const handleSubtractQuantity = async (cartItemId: number) => {
    try {
      await axios.patch(
        `${SERVER_URL}/api/cart/item/${cartItemId}/subtract`,
        {},
        { withCredentials: true }
      );
      await fetchCartItems();
    } catch (err: any) {
      console.error("Error subtracting quantity:", err);
    }
  };

  // Increment cart item quantity.
  const handleAddQuantity = async (cartItemId: number) => {
    try {
      await axios.patch(
        `${SERVER_URL}/api/cart/item/${cartItemId}/add`,
        {},
        { withCredentials: true }
      );
      await fetchCartItems();
    } catch (err: any) {
      console.error("Error increasing quantity:", err);
    }
  };

  // Toggle selection for a single item.
  const toggleSelectItem = (id: number) => {
    setSelectedItems((items) =>
      items.includes(id)
        ? items.filter((itemId) => itemId !== id)
        : [...items, id]
    );
  };

  // Toggle select all items.
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(!selectAll ? cartItems.map((item) => item.id) : []);
  };

  // Delete all selected items.
  const deleteSelected = async () => {
    try {
      for (const id of selectedItems) {
        await axios.delete(`${SERVER_URL}/api/cart/item/${id}`, {
          withCredentials: true,
        });
      }
      await fetchCartItems();
      setSelectedItems([]);
      setSelectAll(false);
    } catch (err: any) {
      console.error("Error deleting selected items:", err);
    }
  };

  // Handler to apply coupon by calling the backend endpoint.
  const handleApplyCoupon = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/cart/apply-coupon`,
        { couponCode },
        { withCredentials: true }
      );
      console.log("Coupon applied:", response.data);
      // Refresh the cart to include applied coupon details.
      await fetchCartItems();
    } catch (err: any) {
      console.error("Error applying coupon:", err);
    }
  };

  // Calculate the subtotal.
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Function to calculate final price based on coupon details.
  const calculateFinalPrice = (subtotal: number, coupon: any) => {
    if (!coupon) return subtotal;
    let discountAmount = 0;
    // Ensure case-insensitive comparison.
    if (coupon.discountType.toLowerCase() === "percentage") {
      discountAmount = subtotal * (coupon.discountValue / 100);
    } else {
      // Fixed discount.
      discountAmount = Number(coupon.discountValue);
    }
    return subtotal - discountAmount;
  };

  const finalPrice = calculateFinalPrice(subtotal, appliedCoupon);
  const hasSelectedItems = selectedItems.length > 0;

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <h1 className="text-2xl text-[#171717] font-bold mb-2 text-center md:text-left">
        My Cart
      </h1>
      <p className="text-[#404040] mb-6 text-center md:text-left">
        Review your selected items, adjust quantities, and proceed to checkout seamlessly.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-1 lg:col-span-2">
          {/* Select All & Delete */}
          <div className="flex items-center border border-[#D4D4D4] rounded-xl py-3 px-5 justify-between mb-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
              <p className="text-[#404040] font-semibold text-lg select-none">
                Select All
              </p>
            </div>
            <button
              className="bg-call-to-action text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              onClick={deleteSelected}
            >
              <FaTrash />
              <span>Delete</span>
            </button>
          </div>

          {/* Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between p-4 mb-4 bg-white border rounded-lg"
            >
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelectItem(item.id)}
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h2 className="font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-500 text-sm">Orbitian</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2 w-full sm:w-auto">
                <p className="text-gray-700 font-semibold">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    className="text-gray-300"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <FaTrash />
                  </button>
                  <div className="flex items-center bg-gray-200 border border-gray-300 rounded-md">
                    <button
                      className="px-2 py-1 text-gray-700"
                      onClick={() => handleSubtractQuantity(item.id)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-10 text-center py-1 px-1 border-none bg-gray-200"
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      className="px-2 py-1 text-gray-700"
                      onClick={() => handleAddQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div
          className={`order-summary transition-transform ${
            hasSelectedItems
              ? "transform translate-y-0"
              : "transform translate-y-full"
          } lg:col-span-1 lg:static lg:translate-y-0 fixed bottom-0 left-0 w-full p-4 border border-[#D4D4D4] bg-white shadow-lg rounded-t-lg`}
        >
          <h2 className="text-lg font-bold mb-4 text-[#171717] border-b border-gray-300 pb-2">
            Summary Order
          </h2>
          <div className="py-4">
            <div className="flex items-center justify-between -mt-5">
              <span className="text-[#262626]">Subtotal</span>
              <span className="font-bold text-[#171717] text-lg">
                Rp {subtotal.toLocaleString("id-ID")}
              </span>
            </div>
            {appliedCoupon && (
              <div className="flex items-center justify-between mt-2">
                <span className="text-[#262626]">Discount</span>
                <span className="font-bold text-[#171717] text-lg">
                  {appliedCoupon.discountType.toLowerCase() === "percentage"
                    ? `- Rp ${(subtotal * appliedCoupon.discountValue / 100).toLocaleString("id-ID")}`
                    : `- Rp ${Number(appliedCoupon.discountValue).toLocaleString("id-ID")}`}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between mt-2">
              <span className="text-[#262626]">Total</span>
              <span className="font-bold text-[#171717] text-lg">
                Rp {finalPrice.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
          {/* Coupon Code Section */}
          {appliedCoupon ? (
            <div className="mb-4">
              <p className="text-green-500 font-bold">
                Coupon Applied: {appliedCoupon.couponCode} -{" "}
                {appliedCoupon.discountType.toLowerCase() === "percentage"
                  ? `${appliedCoupon.discountValue}% off`
                  : `Rp ${appliedCoupon.discountValue} off`}
              </p>
            </div>
          ) : (
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Add discount code"
                  className="pl-10 h-10 p-2 border bg-white border-gray-300 rounded-md"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </div>
              <button
                className="h-10 px-4 text-call-to-actions-100 bg-call-to-actions-900 rounded-md text-sm"
                onClick={handleApplyCoupon}
              >
                Apply
              </button>
            </div>
          )}
          <button className="w-full py-2 text-white bg-call-to-action rounded-md flex items-center justify-center space-x-2">
            <FaTrash />
            <a href="/checkout">
              <span>Checkout Now ({cartItems.length} items)</span>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
