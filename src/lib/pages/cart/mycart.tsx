import React, {useState} from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  isSpecial: boolean;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Dancing Robot 0512",
      price: 200000,
      quantity: 1,
      isSpecial: true,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Dancing Robot 0512",
      price: 200000,
      quantity: 3,
      isSpecial: false,
      image: "https://via.placeholder.com/100",
    },
    // Tambahkan item lainnya jika diperlukan
  ]);

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {...item, quantity: Math.max(1, item.quantity + delta)}
          : item
      )
    );
  };

  const handleDeleteItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">My Cart</h1>
      <p className="text-gray-600 mb-6">
        Review your selected items, adjust quantities, and proceed to checkout
        seamlessly.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4"
              />
              <label className="text-gray-700">Select All</label>
            </div>
            <button className="text-red-600">Delete</button>
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
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-md"
                />
                <div>
                  <h2 className="font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-500 text-sm">Orbitian</p>
                  {item.isSpecial && (
                    <span className="px-2 py-1 text-xs text-yellow-800 bg-yellow-200 rounded-md">
                      Special Card
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <p className="text-gray-700 font-semibold">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-2 py-1 text-gray-700 bg-gray-200 rounded-md"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 py-1 text-gray-700 bg-gray-200 rounded-md"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-red-600"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  &#128465;
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Summary Order</h2>
          <div className="flex items-center justify-between mb-4">
            <span>Subtotal</span>
            <span className="font-semibold">
              Rp {subtotal.toLocaleString("id-ID")}
            </span>
          </div>
          <input
            type="text"
            placeholder="Add discount code"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <button className="w-full py-2 text-white bg-yellow-500 rounded-md mb-4">
            Apply
          </button>
          <button className="w-full py-2 text-white bg-yellow-600 rounded-md">
            Checkout Now ({cartItems.length} items)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
