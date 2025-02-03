import { ChangeEvent, useEffect, useState } from "react";
import { Edit3, Eye, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Card = () => {
  const navigate = useNavigate();

  // State for cards; note that each card object now includes the fields we need:
  // sku, name, category, stock, price, and selected.
  const [cards, setCards] = useState<
    {
      sku: string;
      name: string;
      category: string;
      stock: number;
      price: number;
      selected: boolean;
    }[]
  >([]);

  // Fetch cards from the API
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cards/all");
        // Map the API response to match the table row fields.
        // Assuming your API returns a "cards" array and each card has:
        //   - sku (string)
        //   - characterName (as product name)
        //   - category (object with a name property)
        //   - price (as string or number)
        // For "stock" we assume each card represents one unit.
        const mappedCards = response.data.cards.map((card: any) => ({
          sku: card.sku,
          name: card.characterName,
          category: card.category ? card.category.name : "N/A",
          stock: 1, // If each card is a unique record, you can display 1 (or adjust logic as needed)
          price: Number(card.price),
          selected: false,
        }));
        setCards(mappedCards);
      } catch (error: any) {
        console.error("Error fetching cards:", error.response?.data || error.message);
      }
    };

    fetchCards();
  }, []);

  // Handler for selecting all rows
  const handleSelectAll = (e: { target: { checked: boolean } }) => {
    const { checked } = e.target;
    const updatedCards = cards.map((card) => ({ ...card, selected: checked }));
    setCards(updatedCards);
  };

  // Handler for selecting an individual row
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
        <button
          className="bg-call-to-actions-900 hover:bg-call-to-actions-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          onClick={() => navigate("/admin/add-card")}
        >
          <Plus className="w-4 h-4" />
          <span>Add Card</span>
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
                  checked={cards.length > 0 && cards.every((card) => card.selected)}
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
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      onClick={() => navigate("/admin/edit-card")}
                    >
                      <Edit3 className="w-4 h-4" />
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
            {cards.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No cards found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
