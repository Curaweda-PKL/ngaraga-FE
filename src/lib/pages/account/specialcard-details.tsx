import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";

type SpecialCardDetailProps = {
  specialCardId: number;
  onBack: () => void;
};

type RequirementStatus = {
  meetsRequirement: boolean;
  ownedIds: number[];
  missingIds: number[];
  requirement: {
    id: number;
    requiredNormalCards: number[];
    createdAt: string;
    updatedAt: string;
    specialCardId: number;
    // additional fields if needed
  };
};

type RequirementResponse = {
  specialCard: any; // Use your appropriate type if available
  requiredNormalCards: any[]; // Use your appropriate type if available
  meetsRequirement: boolean;
  ownedIds: number[];
  missingIds: number[];
};

const SpecialCardDetail: React.FC<SpecialCardDetailProps> = ({ specialCardId, onBack }) => {
  const [data, setData] = useState<RequirementResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch requirement status and special card details.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/special-cards/requirement/${specialCardId}`, {
          withCredentials: true,
        });
        setData(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [specialCardId]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!data) return null;

  const { specialCard, requiredNormalCards, ownedIds, missingIds, meetsRequirement } = data;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-gray-700 mb-4 sm:mb-6"
      >
        <span className="mr-2">←</span>
        Back
      </button>

      {/* Title Section */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
        {specialCard?.characterName || "Special Card"}
      </h1>
      <p className="text-gray-600 mb-6 sm:mb-8">
        Minted on {new Date(specialCard?.createdAt).toLocaleDateString()}
      </p>

      {/* Required Cards Section */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-lg sm:text-xl mb-4 sm:mb-6">
          Own the normal card(s) below for the special card
        </h2>
        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
          {requiredNormalCards.map((card: any) => (
            <div key={card.id} className="flex flex-col sm:flex-row bg-gray-50 rounded-2xl overflow-hidden">
              <div className="w-full sm:w-40 h-48 sm:h-40">
                <img
                  src={`${SERVER_URL}/${card.product?.image || "placeholder.svg"}`}
                  alt={card.characterName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-4">
                <h3 className="font-bold text-lg mb-1">{card.characterName || card.product?.name}</h3>
                <p className="text-gray-600 mb-2">{card.product?.name}</p>
                <p className="text-gray-600 mb-1">Price</p>
                <p className="font-bold mb-4">Rp {card.product?.price?.toLocaleString()}</p>
                <div className="flex gap-3">
                  <button className="flex-1 sm:flex-none bg-call-to-action text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                    Add to Cart
                  </button>
                  <button className="flex-1 sm:flex-none border border-call-to-action text-call-to-action px-4 py-2 rounded-lg">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Display requirement status details */}
        <div className="mt-4 text-sm text-gray-500">
          Required Normal Cards: {specialCard?.specialRequirement?.requiredNormalCards?.length || 0} | Owned: {ownedIds.length}
        </div>
      </div>


{/* Created By Section */}
<div className="mb-6 sm:mb-8">
  <h2 className="text-lg sm:text-xl font-bold mb-4">Created By</h2>
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 rounded-full bg-gray-200">
      <img
        src={
          specialCard?.creators?.[0]?.image 
            ? `${SERVER_URL}/uploads/creator/${specialCard.creators[0].image.replace(/\\/g, "/")}` 
            : "/placeholder.svg?height=48&width=48"
        }
        alt={specialCard?.creators?.[0]?.name || "Creator"}
        className="w-full h-full rounded-full object-cover"
      />
    </div>
    <span className="font-medium">
      {specialCard?.creators?.[0]?.name || "Unknown Creator"}
    </span>
  </div>
</div>

      {/* Description Section */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Description</h2>
        <div className="space-y-4 text-gray-600">
          <p>{specialCard?.product?.cardDetail ? specialCard.product.cardDetail.replace(/<[^>]+>/g, "") : "No description available."}</p>
        </div>
      </div>

      {/* Details Section */}
      {/* <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Details</h2>
        <div className="space-y-2">
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            <span className="mr-2">🌐</span>
            View on Etherscan
          </button>
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            <span className="mr-2">🌐</span>
            View Original
          </button>
        </div>
      </div> */}

      {/* Tags Section */}
      <div className="mb-10">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Tags</h2>
        <div className="flex flex-wrap gap-3">
          {specialCard?.tags?.map((tag: any) => (
            <span key={tag.id} className="px-4 py-2 border border-call-to-action rounded-full text-call-to-action">
              {tag.name}
            </span>
          )) || (
            <>
              <span className="px-4 py-2 border border-call-to-action rounded-full text-call-to-action">
                Animation
              </span>
              <span className="px-4 py-2 border border-call-to-action rounded-full text-call-to-action">
                Illustration
              </span>
              <span className="px-4 py-2 border border-call-to-action rounded-full text-call-to-action">
                Moon
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecialCardDetail;
