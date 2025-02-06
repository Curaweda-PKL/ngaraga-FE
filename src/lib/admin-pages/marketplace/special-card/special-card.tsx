import {useState} from "react";
import {Edit3, Eye, Trash2, Plus, Search, Filter} from "lucide-react";

export const SpecialCard = () => {
  const initialCards = [
    {
      sku: "ABC123",
      name: "Galactic Explorer",
      category: "Stellar Voyager",
      card: 7,
      stock: 75,
    },
    {
      sku: "XYZ456",
      name: "Cosmic Navigator",
      category: "Astro Cruiser",
      card: 9,
      stock: 90,
    },
    {
      sku: "LMN789",
      name: "Nebula Explorer",
      category: "Planet Hopper",
      card: 6,
      stock: 60,
    },
    {
      sku: "OPQ101",
      name: "Starship Commander",
      category: "Galaxy Traveler",
      card: 8,
      stock: 85,
    },
    {
      sku: "RST202",
      name: "Asteroid Hunter",
      category: "Comet Chaser",
      card: 7,
      stock: 70,
    },
    {
      sku: "UVW303",
      name: "Meteor Explorer",
      category: "Solar Voyager",
      card: 5,
      stock: 95,
    },
  ];

  const [cards, setCards] = useState(initialCards);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleDelete = (sku) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kartu ini?")) {
      setCards(cards.filter((card) => card.sku !== sku));
    }
  };

  const filteredCards = cards.filter(
    (card) =>
      (card.sku.toLowerCase().includes(search.toLowerCase()) ||
        card.name.toLowerCase().includes(search.toLowerCase()) ||
        card.category.toLowerCase().includes(search.toLowerCase())) &&
      (selectedCategory === "" || card.category === selectedCategory)
  );

  const categories = [...new Set(cards.map((card) => card.category))];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Special Card</h1>
      <div className="flex justify-between items-center mb-4">
        <a href="/admin/add-card">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Add Special Card</span>
          </button>
        </a>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
            <Filter className="w-4 h-4" /> Categories
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="text-neutral-700">
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  className="checkbox"
                />
              </th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Categories</th>
              <th className="px-4 py-3">Card</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCards.length > 0 ? (
              filteredCards.map((card, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="checkbox"
                    />
                  </td>
                  <td className="px-4 py-3">{card.sku}</td>
                  <td className="px-4 py-3">{card.name}</td>
                  <td className="px-4 py-3">{card.category}</td>
                  <td className="px-4 py-3">{card.card}</td>
                  <td className="px-4 py-3">{card.stock}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <a
                      href={`/admin/edit-special/${card.sku}`}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <Edit3 className="w-4 h-4" />
                    </a>
                    <button
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      onClick={() => alert(`Viewing card ${card.sku}`)}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-red-500 hover:bg-gray-100 rounded-lg"
                      onClick={() => handleDelete(card.sku)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-4 text-gray-500"
                >
                  No cards available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
