<<<<<<< HEAD
import {useEffect, useState} from "react";
import {Edit3, Eye, Trash2, Plus, Search, Filter} from "lucide-react";

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
  const [search, setSearch] = useState("");
  const baseURL = "http://localhost:3000/";
=======
import React, { useState, useEffect } from "react";
import { Edit3, Eye, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils"; // Import centralized server URL

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
>>>>>>> c91a9a81b14dd06e5413af88ea716cecb56287d7

  // Fetch cards from the API
  useEffect(() => {
    const fetchCards = async () => {
      try {
<<<<<<< HEAD
        const response = await fetch("http://localhost:3000/api/cards/all");
        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }
        const data = await response.json();
        const processedCards = data.cards.map((card: CardType) => ({
          ...card,
          image: baseURL + card.image.replace(/\\/g, "/"),
        }));
        setCards(processedCards || []);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
=======
        const response = await axios.get(`${SERVER_URL}/api/cards/all`);
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
>>>>>>> c91a9a81b14dd06e5413af88ea716cecb56287d7
      }
    };

    fetchCards();
  }, []);

<<<<<<< HEAD
  const filteredCards = cards.filter((card) =>
    card.characterName.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
=======
  // Handler for selecting all rows
  const handleSelectAll = (e: { target: { checked: boolean } }) => {
    const { checked } = e.target;
    const updatedCards = cards.map((card) => ({ ...card, selected: checked }));
    setCards(updatedCards);
  };

  // Handler for selecting an individual row
  const handleSelectRow = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const updatedCards = [...cards];
    updatedCards[index].selected = checked;
    setCards(updatedCards);
  };
>>>>>>> c91a9a81b14dd06e5413af88ea716cecb56287d7

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Card</h1>
      <div className="flex justify-between items-center mb-4">
<<<<<<< HEAD
        <a href="/admin/add-card">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Add Card</span>
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
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Price</th>
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
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img
                      src={card.image}
                      alt={card.characterName}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span>{card.sku}</span>
                  </td>
                  <td className="px-4 py-3">{card.characterName}</td>
                  <td className="px-4 py-3">{card.categoryName}</td>
                  <td className="px-4 py-3">{card.stock}</td>
                  <td className="px-4 py-3">
                    Rp {card.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <a
                      href={`/admin/edit-card/${card.sku}`}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <Edit3 className="w-4 h-4" />
                    </a>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-gray-100 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-4 text-gray-500"
                >
                  No cards available
=======
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
>>>>>>> c91a9a81b14dd06e5413af88ea716cecb56287d7
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
