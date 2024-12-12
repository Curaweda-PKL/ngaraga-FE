import React, {useState} from "react";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState([
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
    {
      id: 3,
      name: "Dancing Robot 0512",
      price: 200000,
      quantity: 1,
      isSpecial: true,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 4,
      name: "Dancing Robot 0512",
      price: 200000,
      quantity: 5,
      isSpecial: false,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 5,
      name: "Dancing Robot 0512",
      price: 200000,
      quantity: 1,
      isSpecial: true,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 6,
      name: "Dancing Robot 0512",
      price: 100000,
      quantity: 1,
      isSpecial: false,
      image: "https://via.placeholder.com/100",
    },
  ]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

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
    setSelectedItems((prevSelected) =>
      prevSelected.filter((itemId) => itemId !== id)
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((itemId) => itemId !== id)
      );
    } else {
      setSelectedItems((prevSelected) => [...prevSelected, id]);
    }
  };

  const handleDeleteSelected = () => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !selectedItems.includes(item.id))
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
          <div className="flex items-center bg-[#D4D4D4] border-2 rounded-xl py-3 px-5 justify-between mb-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <label className="text-[#404040]">Select All</label>
            </div>
            <button
              className="btn bg-call-to-action border-transparent rounded-lg text-white items-center"
              onClick={handleDeleteSelected}
            >
              Delete
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
                  onChange={() => handleSelectItem(item.id)}
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-md"
                />
                <div>
                  {item.isSpecial && (
                    <span className="px-2 py-1 text-xs text-yellow-800 bg-yellow-200 rounded-md">
                      Special Card
                    </span>
                  )}
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
                    className="text-red-600"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    &#128465;
                  </button>
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
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 h-80 bg-[#D4D4D4] mr-24 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4 text-[#171717] ">
            Summary Order
          </h2>
          <div className="border-t border-b py-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#262626]">Subtotal</span>
              <span className="font-bold text-[#171717] text-lg">
                Rp {subtotal.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
          <input
            type="text"
            placeholder="Add discount code"
            className="w-full p-2 border bg-white border-gray-300 rounded-md mb-4"
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
