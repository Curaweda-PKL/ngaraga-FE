import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiShoppingCart } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "@/middleware/utils";

export const DetailCards: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCardDetail = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/detail-cards/cards/${id}`);
        setCard(response.data.card);
      } catch (err: any) {
        console.error("Error fetching card detail:", err);
        setError(
          err.response?.data?.error ||
          "Failed to fetch card detail. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCardDetail();
    } else {
      setError("No card ID provided in the URL.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  const { product, characterName, createdAt, sourceImage, creators, tags } = card;
  const bannerImage =
    sourceImage || product?.cardImage || "https://i.ibb.co/f8ZDQzh/DAENDELS-LEGEND.jpg";
  const title = product?.name || characterName || "Product Name";

  // Get the raw cardDetail value.
  const rawCardDetail = product?.cardDetail || "<p>The Orbitians is a collection of 10,000 unique NFTs on the Ethereum blockchain.</p>";

  // Check if it's an object or a string.
  let description = "";
  if (typeof rawCardDetail === "string") {
    description = rawCardDetail;
  } else if (typeof rawCardDetail === "object" && rawCardDetail !== null) {
    // If it's an object, try to extract the HTML string (adjust the key if needed).
    description = rawCardDetail.__html || JSON.stringify(rawCardDetail);
  }

  const creator = creators && creators.length > 0 ? creators[0] : null;

  return (
    <div className="flex flex-col">
      <section
        className="relative w-full h-[40vh] mt-4 border-b border-gray-300"
        aria-label="Product Banner"
      >
        <img
          src={bannerImage}
          alt="Product Banner"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain max-w-full max-h-full pb-4"
        />
      </section>

      <div className="relative bg-white p-4 m-4 rounded-lg sm:p-10 sm:m-8">
        <div className="px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:text-3xl">{title}</h1>
          <h2 className="text-lg text-gray-700 sm:text-xl">
            Minted on: {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
          </h2>
        </div>

        <div className="hidden sm:flex absolute top-4 right-4 space-x-2">
          <button
            className="flex items-center bg-call-to-action text-white px-4 py-2 rounded-full hover:bg-call-to-actions-800 transition text-base"
            aria-label="Add to Cart"
          >
            <CiShoppingCart className="mr-2 text-2xl" />
            Add to Cart
          </button>
          <button
            className="border border-call-to-actions-900 text-call-to-action px-4 py-2 rounded-full transition text-base"
            aria-label="Checkout"
          >
            <a href="/checkout">Checkout</a>
          </button>
        </div>

        <div className="mt-6 px-4">
          <div className="flex items-center space-x-4 mb-6">
            {creator ? (
              <>
                <img
                  src={creator.image || "https://via.placeholder.com/150"}
                  alt={creator.name}
                  className="w-12 h-12 rounded-full object-cover sm:w-10 sm:h-10"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">Created By</h2>
                  <p className="text-gray-600 sm:text-base">{creator.name}</p>
                </div>
              </>
            ) : (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">Created By</h2>
                <p className="text-gray-600 sm:text-base">Unknown</p>
              </div>
            )}
          </div>

          <h3 className="text-xl text-gray-900 mb-4 sm:text-2xl">Description</h3>
          <div
            className="text-gray-700 text-sm leading-relaxed mb-4 sm:text-base"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <div className="mt-6">
            <h4 className="text-gray-800 font-semibold mb-2 text-sm sm:text-base">Details</h4>
            <ul className="list-none space-y-2">
              <li>
                <a
                  href="https://etherscan.io"
                  className="text-blue-500 hover:underline text-sm sm:text-base"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Etherscan
                </a>
              </li>
              <li>
                <a
                  href="https://original-link.com"
                  className="text-blue-500 hover:underline text-sm sm:text-base"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Original
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <h4 className="text-gray-800 font-semibold mb-3 text-sm sm:text-base">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {tags && tags.length > 0 ? (
                tags.map((tag: any) => (
                  <span
                    key={tag.id}
                    className="text-xs text-call-to-action border border-call-to-action px-3 py-1.5 rounded-full sm:text-base"
                  >
                    {tag.name}
                  </span>
                ))
              ) : (
                <span className="text-xs text-call-to-action border border-call-to-action px-3 py-1.5 rounded-full sm:text-base">
                  No Tags
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between sm:hidden mt-4 mb-2">
            <button
              className="flex items-center justify-center bg-call-to-action text-white px-3 py-2 rounded-full hover:bg-call-to-actions-800 transition text-xs font-medium flex-1 mr-2"
              aria-label="Add to Cart"
            >
              <CiShoppingCart className="mr-1 text-lg" />
              Add to Cart
            </button>
            <button
              className="border border-call-to-actions-900 text-call-to-action px-3 py-2 rounded-full transition text-xs font-medium flex-1"
              aria-label="Checkout"
            >
              <a href="/checkout" className="block text-center">
                Checkout
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
