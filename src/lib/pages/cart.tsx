import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaTag } from "react-icons/fa";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Dancing Robot 0512",
      price: 200000,
      quantity: 1,
      image:
        "https://sillyrobotcards.ams3.cdn.digitaloceanspaces.com/generated-cards/798bb4b5-4e1f-4d6b-bf4d-63969a2ccb07/3778c5d0-99f1-4e22-9f22-e50af27b4b5b",
    },
  ]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleDeleteItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    setSelectedItems((items) => items.filter((itemId) => itemId !== id));
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(!selectAll ? cartItems.map((item) => item.id) : []);
  };

  const toggleSelectItem = (id: number) => {
    setSelectedItems((items) =>
      items.includes(id)
        ? items.filter((itemId) => itemId !== id)
        : [...items, id]
    );
  };

  const deleteSelected = () => {
    setCartItems((items) =>
      items.filter((item) => !selectedItems.includes(item.id))
    );
    setSelectedItems([]);
    setSelectAll(false);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="ml-16 p-4 md:p-8 min-h-screen">
      <h1 className="text-2xl text-[#171717] font-bold mb-2">My Cart</h1>
      <p className="text-[#404040] mb-6">
        Review your selected items, adjust quantities, and proceed to checkout
        seamlessly.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="flex items-center border border-#D4D4D4 border-2 rounded-xl py-3 px-5 justify-between mb-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
              <label className="text-[#404040]">Select All</label>
            </div>
            <button
              className="btn bg-call-to-action border-transparent rounded-lg text-white flex items-center space-x-2"
              onClick={deleteSelected}
            >
              <FaTrash />
              <span>Delete</span>
            </button>
          </div>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelectItem(item.id)}
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-md"
                />
                <div>
                  <h2 className="font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-500 text-sm">Orbitian</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <p className="text-gray-700 font-semibold">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    className="text-gray-300 flex items-center space-x-1"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <FaTrash className="mr-2" />
                  </button>
                  <div className="flex items-center bg-gray-200 border border-gray-300 rounded-md">
                    <button
                      className="px-2 py-1 text-gray-700"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-8 text-center py-1 px-1 border-none bg-gray-200 appereance-none -webkit-appearance-none -moz-appearance-none"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10);

                        if (!isNaN(newQuantity) && newQuantity > 0) {
                          handleQuantityChange(
                            item.id,
                            newQuantity - item.quantity
                          );
                        }
                      }}
                    />
                    <button
                      className="px-2 py-1 text-gray-700"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border border-#D4D4D4 mr-24 rounded-lg shadow-md">
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
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Add discount code"
                className="pl-10 h-10 p-2 border bg-white border-gray-300 rounded-md"
              />
            </div>
            <button className="h-10 px-4 text-gray-400 bg-gray-200 rounded-md text-sm">
              Apply
            </button>
          </div>
          <button className="w-full py-2 text-white bg-call-to-action rounded-md flex items-center justify-center space-x-2">
            <FaTrash />
            <span>Checkout Now ({cartItems.length} items)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
