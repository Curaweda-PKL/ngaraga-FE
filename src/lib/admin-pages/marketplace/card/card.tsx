import { useEffect, useState } from "react";
import { Edit3, Eye, Trash2, Plus } from "lucide-react";

// Definisikan tipe data untuk Card
interface CardType {
  image: string;
  sku: string;
  characterName: string;
  categoryName: string;
  stock: number;
  price: number;
}

export const Card = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseURL = "http://localhost:3000/"; // Sesuaikan URL server Anda

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cards/all");
        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }
        const data = await response.json();

        // Tambahkan URL dasar ke setiap gambar
        const processedCards = data.cards.map((card: CardType) => ({
          ...card,
          image: baseURL + card.image.replace(/\\/g, "/"), // Ubah "\" menjadi "/"
        }));

        setCards(processedCards || []);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Cards</h1>
        <a
          href="/admin/add-card"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Card</span>
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">SKU</th>
              <th className="border border-gray-300 px-4 py-2">Character Name</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Stock</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {cards.length > 0 ? (
              cards.map((card, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 flex items-center gap-2">
                    <img
                      src={card.image}
                      alt={card.characterName}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span>{card.sku || "N/A"}</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{card.characterName || "Unknown"}</td>
                  <td className="border border-gray-300 px-4 py-2">{card.categoryName || "No Category"}</td>
                  <td className="border border-gray-300 px-4 py-2">{card.stock ?? "0"}</td>
                  <td className="border border-gray-300 px-4 py-2">Rp {card.price ? card.price.toLocaleString() : "0"}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <a
                        href={`/admin/edit-card/${card.sku}`}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      >
                        <Edit3 className="w-4 h-4" />
                      </a>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
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