import {Edit3, Eye, Trash2, Plus} from "lucide-react";

export const SpecialCard = () => {
  const cards = [
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
    {
      sku: "XYZ404",
      name: "Lunar Rover",
      category: "Starlight Cruiser",
      card: 4,
      stock: 65,
    },
    {
      sku: "ABC505",
      name: "Quantum Shuttle",
      category: "Interstellar Voyager",
      card: 2,
      stock: 70,
    },
    {
      sku: "DEF606",
      name: "Warp Speed Cruiser",
      category: "Celestial Navigator",
      card: 3,
      stock: 75,
    },
    {
      sku: "GHI707",
      name: "Astro Explorer",
      category: "Galactic Voyager",
      card: 1,
      stock: 80,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Card</h1>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>
            <a href="/admin/add-special">Add Card</a>
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
                />
              </th>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Categories</th>
              <th>Card</th>
              <th>Stock</th>
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
                  />
                </td>
                <td>{card.sku}</td>
                <td>{card.name}</td>
                <td>{card.category}</td>
                <td>{card.card}</td>
                <td>{card.stock}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <a href="/admin/edit-special">
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
