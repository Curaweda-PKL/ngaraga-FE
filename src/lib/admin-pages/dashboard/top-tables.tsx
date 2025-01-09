import {Calendar} from "lucide-react";

const topProducts = [
  {
    id: 1,
    name: "Galactic Explorer",
    soldOut: 100,
    revenue: "Rp 6.000.000",
    image: "https://via.placeholder.com/50", // Ganti dengan URL gambar Anda
  },
  {
    id: 2,
    name: "Cosmic Navigator",
    soldOut: 90,
    revenue: "Rp 4.000.000",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Nebula Explorer",
    soldOut: 80,
    revenue: "Rp 3.000.000",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "Starship Commander",
    soldOut: 70,
    revenue: "Rp 2.000.000",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 5,
    name: "Asteroid Hunter",
    soldOut: 50,
    revenue: "Rp 800.000",
    image: "https://via.placeholder.com/50",
  },
];

const topMembers = [
  {
    id: 1,
    collector: "Dish Studio",
    card: 2300,
    specialCard: 602,
    follower: "12k",
    image: "https://via.placeholder.com/50", // Ganti dengan URL gambar Anda
  },
  {
    id: 2,
    collector: "Dish Studio",
    card: 2300,
    specialCard: 602,
    follower: "12k",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    collector: "Dish Studio",
    card: 2300,
    specialCard: 602,
    follower: "12k",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    collector: "Dish Studio",
    card: 2300,
    specialCard: 602,
    follower: "12k",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 5,
    collector: "Dish Studio",
    card: 2300,
    specialCard: 602,
    follower: "12k",
    image: "https://via.placeholder.com/50",
  },
];

export default function TopTables() {
  return (
    <div className="grid grid-cols-2 gap-6 mt-6">
      {/* Top Product */}
      <div className="bg-white rounded-lg p-6 border">
        <h2 className="text-lg font-semibold mb-4">Top Product</h2>
        <div className="flex items-center gap-4 mb-4">
          <button className="px-3 py-1 text-white bg-yellow-500 rounded-md">
            7D
          </button>
          <button className="px-3 py-1 text-gray-500 bg-gray-200 rounded-md">
            30D
          </button>
          <button className="px-3 py-1 text-gray-500 bg-gray-200 rounded-md">
            12M
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <Calendar size={20} />
            <input
              type="date"
              className="border p-2 rounded-md text-gray-600"
            />
            <span>-</span>
            <input
              type="date"
              className="border p-2 rounded-md text-gray-600"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Sold Out</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b"
              >
                <td>{product.id}</td>
                <td className="flex items-center gap-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-md"
                  />
                  {product.name}
                </td>
                <td>{product.soldOut}</td>
                <td>{product.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Member */}
      <div className="bg-white rounded-lg p-6 border">
        <h2 className="text-lg font-semibold mb-4">Top Member</h2>
        <div className="flex items-center gap-4 mb-4">
          <button className="px-3 py-1 text-white bg-yellow-500 rounded-md">
            7D
          </button>
          <button className="px-3 py-1 text-gray-500 bg-gray-200 rounded-md">
            30D
          </button>
          <button className="px-3 py-1 text-gray-500 bg-gray-200 rounded-md">
            12M
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <Calendar size={20} />
            <input
              type="date"
              className="border p-2 rounded-md text-gray-600"
            />
            <span>-</span>
            <input
              type="date"
              className="border p-2 rounded-md text-gray-600"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th>#</th>
              <th>Collector</th>
              <th>Card</th>
              <th>Special Card</th>
              <th>Follower</th>
            </tr>
          </thead>
          <tbody>
            {topMembers.map((member) => (
              <tr
                key={member.id}
                className="border-b"
              >
                <td>{member.id}</td>
                <td className="flex items-center gap-2">
                  <img
                    src={member.image}
                    alt={member.collector}
                    className="w-10 h-10 rounded-full"
                  />
                  {member.collector}
                </td>
                <td>{member.card}</td>
                <td>{member.specialCard}</td>
                <td>{member.follower}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
