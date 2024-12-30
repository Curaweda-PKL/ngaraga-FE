import {Edit3, Eye, Trash2, Plus} from "lucide-react";

export const Card = () => {
  const cards = [
    {
      sku: "ABC123",
      name: "Galactic Explorer",
      category: "Stellar Voyager",
      stock: 75,
      price: 250000,
    },
    {
      sku: "XYZ456",
      name: "Cosmic Navigator",
      category: "Astro Cruiser",
      stock: 90,
      price: 275000,
    },
    {
      sku: "LMN789",
      name: "Nebula Explorer",
      category: "Planet Hopper",
      stock: 60,
      price: 300000,
    },
    {
      sku: "OPQ101",
      name: "Starship Commander",
      category: "Galaxy Traveler",
      stock: 85,
      price: 150000,
    },
    {
      sku: "RST202",
      name: "Asteroid Hunter",
      category: "Comet Chaser",
      stock: 70,
      price: 225000,
    },
    {
      sku: "UVW303",
      name: "Meteor Explorer",
      category: "Solar Voyager",
      stock: 95,
      price: 180000,
    },
    {
      sku: "XYZ404",
      name: "Lunar Rover",
      category: "Starlight Cruiser",
      stock: 65,
      price: 210000,
    },
    {
      sku: "ABC505",
      name: "Quantum Shuttle",
      category: "Interstellar Voyager",
      stock: 80,
      price: 230000,
    },
    {
      sku: "DEF606",
      name: "Warp Speed Cruiser",
      category: "Celestial Navigator",
      stock: 75,
      price: 260000,
    },
    {
      sku: "GHI707",
      name: "Astro Explorer",
      category: "Galactic Voyager",
      stock: 85,
      price: 290000,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Card</h1>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};
