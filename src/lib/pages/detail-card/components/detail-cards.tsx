import React, { memo, useCallback, useMemo } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { CiShoppingCart } from "react-icons/ci";
import { useParams, useNavigate } from "react-router-dom";
import { SERVER_URL, IS_DEV } from "@/middleware/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";

// -------------------
// Data Interfaces
// -------------------
interface Product {
  cardImage?: string;
  name?: string;
  cardDetail?: string;
  price?: number;
}

interface Creator {
  image?: string;
  name?: string;
}

interface Tag {
  id: string;
  name: string;
}

interface CardType {
  id: string;
  sourceImage?: string;
  product?: Product;
  characterName?: string;
  createdAt?: string;
  creators?: Creator[];
  tags?: Tag[];
}

// -------------------
// Skeleton Loader
// -------------------
const DetailCardSkeleton = memo(() => (
  <div className="flex flex-col relative">
    <div className="relative w-full h-[40vh] mt-4 border-b border-gray-300 bg-gray-200 animate-pulse" />
    <div className="relative bg-white p-4 m-4 rounded-lg sm:p-10 sm:m-8 space-y-6">
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2" />
        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
        <div className="space-y-2">
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
        <div className="flex space-x-2">
          <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  </div>
));

// -------------------
// Subcomponents
// -------------------
const BannerImage = memo(({ src, alt }: { src: string; alt: string }) => (
  <section className="relative w-full h-[40vh] mt-4 border-b border-gray-300" aria-label="Product Banner">
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain max-w-full max-h-full pb-4"
    />
  </section>
));

const ActionButtons = memo(({ onAddToCart, cartMutating }: { onAddToCart: () => void; cartMutating: boolean }) => (
  <>
    <div className="hidden sm:flex absolute top-4 right-4 space-x-2">
      <button
        onClick={onAddToCart}
        className="flex items-center bg-call-to-action text-white px-4 py-2 rounded-full hover:bg-call-to-actions-800 transition text-base"
        aria-label="Add to Cart"
        disabled={cartMutating}
      >
        <CiShoppingCart className="mr-2 text-2xl" />
        {cartMutating ? "Adding..." : "Add to Cart"}
      </button>
      <button className="border border-call-to-actions-900 text-call-to-action px-4 py-2 rounded-full transition text-base" aria-label="Checkout">
        <a href="/checkout">Checkout</a>
      </button>
    </div>
    <div className="flex justify-between sm:hidden mt-4 mb-2">
      <button
        onClick={onAddToCart}
        className="flex items-center justify-center bg-call-to-action text-white px-3 py-2 rounded-full hover:bg-call-to-actions-800 transition text-xs font-medium flex-1 mr-2"
        aria-label="Add to Cart"
        disabled={cartMutating}
      >
        <CiShoppingCart className="mr-1 text-lg" />
        {cartMutating ? "Adding..." : "Add to Cart"}
      </button>
      <button className="border border-call-to-actions-900 text-call-to-action px-3 py-2 rounded-full transition text-xs font-medium flex-1" aria-label="Checkout">
        <a href="/checkout" className="block text-center">Checkout</a>
      </button>
    </div>
  </>
));

const TagList = memo(({ tags }: { tags?: Tag[] }) => (
  <div className="mt-6">
    <h4 className="text-gray-800 font-semibold mb-3 text-sm sm:text-base">Tags</h4>
    <div className="flex flex-wrap gap-2">
      {tags && tags.length > 0 ? (
        tags.map((tag) => (
          <span key={tag.id} className="text-xs text-call-to-action border border-call-to-action px-3 py-1.5 rounded-full sm:text-base">
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
));

const Sidebar = memo(
  ({
    showSidebar,
    onClose,
    product,
    cartError,
    cartSuccess,
  }: {
    showSidebar: boolean;
    onClose: () => void;
    product?: Product;
    cartError: string;
    cartSuccess: string;
  }) => (
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
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
              Close
            </button>
          </div>
          {product && (
            <div className="flex items-center border p-4 rounded-md mb-4">
              <img
                src={product.cardImage ? product.cardImage : "https://via.placeholder.com/100"}
                alt={product.name}
                loading="lazy"
                className="w-16 h-16 object-cover rounded"
              />
              <div className="ml-4">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-600">Rp. {Number(product.price).toFixed(2)}</p>
              </div>
            </div>
          )}
          {cartError && <div className="text-red-500 text-sm mb-4">{cartError}</div>}
          {cartSuccess && <div className="text-green-500 text-sm mb-4">{cartSuccess}</div>}
          <div className="mt-8">
            <a href="/cart" className="block bg-call-to-action text-white py-2 rounded-md text-center mb-4">
              View Cart
            </a>
            <a href="/checkout" className="block border border-call-to-action text-call-to-action py-2 rounded-md text-center">
              Checkout
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
);

// -------------------
// Fetcher Function
// -------------------
const fetchCardDetail = async (id: string): Promise<CardType> => {
  const { data } = await axios.get(`${SERVER_URL}/api/detail-cards/cards/${id}`);
  return (data as { card: CardType }).card;
};

// -------------------
// Helper to Build Image URLs
// -------------------
const getImageUrl = (img?: string, directory?: string): string => {
  if (!img) return "";
  
  let imageUrl = img;
  
  // If the image string might be a JSON string, try to parse it.
  try {
    const parsed = JSON.parse(img);
    if (parsed && parsed.url) {
      imageUrl = parsed.url;
    }
  } catch (e) {
    // If parsing fails, assume it's a normal string.
  }
  
  // If imageUrl is already an absolute URL, return it directly.
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  
  const dirPath = directory ? `/${directory}` : "";
  
  // In development, return a relative URL.
  if (IS_DEV) {
    return `${dirPath}/${imageUrl}`;
  }
  
  // In production, prefix with the SERVER_URL.
  return `${SERVER_URL}${dirPath}/${imageUrl}`;
};

// -------------------
// Main Component
// -------------------
export const DetailCards: React.FC = memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: card, isLoading, error } = useQuery<CardType, Error>({
    queryKey: ["cardDetail", id],
    queryFn: () => fetchCardDetail(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  const addToCartMutation = useMutation({
    mutationFn: async (): Promise<any> => {
      if (!card) throw new Error("Card data is not available.");
      const response = await axios.post(
        `${SERVER_URL}/api/cart/add`,
        { cardId: card.id, quantity: 1 },
        { withCredentials: true }
      );
      return response.data;
    },
    onError: (err: any) => {
      if (err.response && err.response.status === 401) {
        navigate("/login");
      }
    },
  });

  const isMutating = addToCartMutation.status === "pending";

  const handleAddToCart = useCallback(() => {
    addToCartMutation.mutate();
  }, [addToCartMutation]);

  const bannerImage = useMemo(() => {
    return (
      getImageUrl(card?.sourceImage) ||
      getImageUrl(card?.product?.cardImage) ||
      "https://i.ibb.co/f8ZDQzh/DAENDELS-LEGEND.jpg"
    );
  }, [card]);

  const titleText = useMemo(() => {
    return card?.product?.name || card?.characterName || "Product Name";
  }, [card]);

  const formattedDate = useMemo(() => {
    return card?.createdAt ? new Date(card.createdAt).toLocaleDateString() : "N/A";
  }, [card]);

  if (isLoading) return <DetailCardSkeleton />;

  if (error || !card)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">{error ? error.message : "No card data available."}</p>
      </div>
    );

  const { product, creators, tags } = card;
  const description =
    card?.product?.cardDetail ||
    "<p>The Orbitians is a collection of 10,000 unique NFTs on the Ethereum blockchain.</p>";
  const creator = creators && creators.length > 0 ? creators[0] : null;

  return (
    <div className="flex flex-col relative">
      <BannerImage src={bannerImage} alt="Product Banner" />
      <div className="relative bg-white p-4 m-4 rounded-lg sm:p-10 sm:m-8">
        <div className="px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:text-3xl">{titleText}</h1>
          <h2 className="text-lg text-gray-700 sm:text-xl">Minted on: {formattedDate}</h2>
        </div>
        <ActionButtons onAddToCart={handleAddToCart} cartMutating={isMutating} />
        <div className="mt-6 px-4">
          <div className="flex items-center space-x-4 mb-6">
            {creator ? (
              <>
                <img
                  src={getImageUrl(creator.image, "src/uploads/creator") || "https://via.placeholder.com/150"}
                  alt={creator.name}
                  loading="lazy"
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
          <TagList tags={tags} />
        </div>
      </div>
      <Sidebar
        showSidebar={addToCartMutation.isSuccess || addToCartMutation.isError}
        onClose={() => addToCartMutation.reset()}
        product={product}
        cartError={addToCartMutation.isError ? "Failed to add card to cart. Please try again." : ""}
        cartSuccess={addToCartMutation.isSuccess ? "Card added to cart successfully." : ""}
      />
    </div>
  );
});
