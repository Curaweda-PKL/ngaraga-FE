import  { ChangeEvent, useState } from "react";
import { Edit3, Eye, Trash2, Plus } from "lucide-react";

export const Card = () => {
  // Initialize state with an added `selected` property for each card
  const [cards, setCards] = useState([
    {
      sku: "ABC123",
      name: "Galactic Explorer",
      category: "Stellar Voyager",
      stock: 75,
      price: 250000,
      selected: false,
    },
    // You can add more card objects here...
  ]);

  // Handler for the "select all" checkbox
  const handleSelectAll = (e: { target: { checked: any; }; }) => {
    const { checked } = e.target;
    const updatedCards = cards.map((card) => ({ ...card, selected: checked }));
    setCards(updatedCards);
  };

  // Handler for individual row checkbox
  const handleSelectRow = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const updatedCards = [...cards];
    updatedCards[index].selected = checked;
    setCards(updatedCards);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Card</h1>
        <button className="bg-call-to-actions-900 hover:bg-call-to-actions-800 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>
            <a href="/admin/add-card">Add Card</a>
          </span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className="checkbox"
                  // The header checkbox is checked if every card is selected
                  checked={cards.every((card) => card.selected)}
                  onChange={handleSelectAll}
                />
              </th>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Categories</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={card.selected}
                    onChange={(e) => handleSelectRow(index, e)}
                  />
                </td>
                <td>{card.sku}</td>
                <td>{card.name}</td>
                <td>{card.category}</td>
                <td>{card.stock}</td>
                <td>Rp {card.price.toLocaleString()}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <a href="/admin/edit-card">
                        <Edit3 className="w-4 h-4" />
                      </a>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
