
import React, { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { CiShoppingCart } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "@/middleware/utils";
import { motion, AnimatePresence } from "framer-motion";



export const DetailCards: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // States for cart actions
  const [cartLoading, setCartLoading] = useState<boolean>(false);
  const [cartError, setCartError] = useState<string>("");
  const [cartSuccess, setCartSuccess] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  // Helper function: returns a full URL for an image.
  // Optionally accepts a directory (e.g., "src/uploads/creator").
  const getImageUrl = (img?: string, directory?: string): string => {
    if (!img) return "";
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    const dirPath = directory ? `/${directory}` : "";
    return `${SERVER_URL}${dirPath}/${img}`;
  };

  // Fetch card details.
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

  // Handler to add card to cart.
  const handleAddToCart = async () => {
    if (!card) {
      setCartError("Card data is not available.");
      setShowSidebar(true);
      return;
    }

    try {
      setCartLoading(true);
      setCartError("");
      setCartSuccess("");
      // POST request with credentials.
      const response = await axios.post(
        `${SERVER_URL}/api/cart/add`,
        {
          cardId: card.id,
          quantity: 1,
        },
        { withCredentials: true }
      );
      setCartSuccess("Card added to cart successfully.");
      console.log("Cart response:", response.data);
    } catch (err: any) {
      console.error("Error adding card to cart:", err);
      setCartError(
        err.response?.data?.error ||
          "Failed to add card to cart. Please try again."
      );
    } finally {
      setCartLoading(false);
      setShowSidebar(true);
    }
  };

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

  // Determine banner image.
  const bannerImage =
    getImageUrl(sourceImage) ||
    getImageUrl(product?.cardImage) ||
    "https://i.ibb.co/f8ZDQzh/DAENDELS-LEGEND.jpg";
  const titleText = product?.name || characterName || "Product Name";
  const description =
    product?.cardDetail ||
    "<p>The Orbitians is a collection of 10,000 unique NFTs on the Ethereum blockchain.</p>";

  // Use first creator if available.
  const creator = creators && creators.length > 0 ? creators[0] : null;

  return (
    <div className="flex flex-col relative">
      {/* Main Banner */}
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

      {/* Product Details */}
      <div className="relative bg-white p-4 m-4 rounded-lg sm:p-10 sm:m-8">
        <div className="px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:text-3xl">{titleText}</h1>
          <h2 className="text-lg text-gray-700 sm:text-xl">
            Minted on: {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
          </h2>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden sm:flex absolute top-4 right-4 space-x-2">
          <button
            onClick={handleAddToCart}
            className="flex items-center bg-call-to-action text-white px-4 py-2 rounded-full hover:bg-call-to-actions-800 transition text-base"
            aria-label="Add to Cart"
            disabled={cartLoading}
          >
            <CiShoppingCart className="mr-2 text-2xl" />
            {cartLoading ? "Adding..." : "Add to Cart"}

          </button>
          <button className="border border-call-to-actions-900 text-call-to-action px-4 py-2 rounded-full transition text-base" aria-label="Checkout">
            <a href="/checkout">Checkout</a>
          </button>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex justify-between sm:hidden mt-4 mb-2">
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center bg-call-to-action text-white px-3 py-2 rounded-full hover:bg-call-to-actions-800 transition text-xs font-medium flex-1 mr-2"
            aria-label="Add to Cart"
            disabled={cartLoading}
          >
            <CiShoppingCart className="mr-1 text-lg" />
            {cartLoading ? "Adding..." : "Add to Cart"}
          </button>
          <button className="border border-call-to-actions-900 text-call-to-action px-3 py-2 rounded-full transition text-xs font-medium flex-1" aria-label="Checkout">
            <a href="/checkout" className="block text-center">Checkout</a>
          </button>
        </div>

        {/* Additional Product Information */}
        <div className="mt-6 px-4">
          <div className="flex items-center space-x-4 mb-6">
            {creator ? (
              <>
                <img
                  src={getImageUrl(creator.image, "src/uploads/creator") || "https://via.placeholder.com/150"}
                  alt={creator.name}
                  className="w-12 h-12 rounded-full object-cover sm:w-10 sm:h-10"
                />
                <div>
                  <h2 className="ml-4 text-lg font-semibold text-gray-800 sm:text-xl">Created By</h2>
                  <p className="text-gray-600 sm:text-base ml-4">{creator.name}</p>
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
          <div className="text-gray-700 text-sm leading-relaxed mb-4 sm:text-base">
            {parse(description)}
          </div>

          <div className="mt-6">
            <h4 className="text-gray-800 font-semibold mb-2 text-sm sm:text-base">Details</h4>
            <ul className="list-none space-y-2">
              <li>
                <a
                  href="https://example.io"
                  className="text-blue-500 hover:underline text-sm sm:text-base"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Social
                </a>
              </li>
              <li>
                <a
                  href="https://example.com"
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
        </div>
      </div>

      {/* Sidebar Modal */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-80 md:w-96 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Cart Status</h2>
              <button onClick={() => setShowSidebar(false)} className="text-gray-600 hover:text-gray-800">
                Close
              </button>
            </div>
            {/* Display Product Card Summary */}
            {product && (
              <div className="flex items-center border p-4 rounded-md mb-4">
                <img
                  src={getImageUrl(product?.cardImage) || getImageUrl(product?.image) || "https://via.placeholder.com/100"}
                  alt={product?.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4">
                  <h3 className="font-bold text-lg">{product?.name}</h3>
                  <p className="text-gray-600">
                    Rp. {Number(product?.price).toFixed(2)}
                  </p>
                </div>
              </div>
            )}
            {cartError && <div className="text-red-500 text-sm mb-4">{cartError}</div>}
            {cartSuccess && <div className="text-green-500 text-sm mb-4">{cartSuccess}</div>}
            <div className="mt-8">
              <a
                href="/cart"
                className="block bg-call-to-action text-white py-2 rounded-md text-center mb-4"
              >
                View Cart
              </a>
              <a
                href="/checkout"
                className="block border border-call-to-action text-call-to-action py-2 rounded-md text-center"
              >
                Checkout
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
