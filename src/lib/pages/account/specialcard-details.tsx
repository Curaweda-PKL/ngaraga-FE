import {useState} from "react";
import FusionModal from "./components/fusionModal";

const SpecialCardDetail = () => {
  const [showFusionModal, setShowFusionModal] = useState(false);

  const products = [
    {
      id: 1,
      name: "Magic Mushroom 0324",
      creator: "Shroomie",
      price: "Rp 200.000",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 2,
      name: "Happy Robot 032",
      creator: "BeKind2Robots",
      price: "Rp 200.000",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 3,
      name: "Happy Robot 024",
      creator: "BeKind2Robots",
      price: "Rp 200.000",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 4,
      name: "AstroFiction",
      creator: "Spaceone",
      price: "Rp 200.000",
      image: "/placeholder.svg?height=400&width=400",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      {/* Back Button */}
      <button className="flex items-center text-gray-500 hover:text-gray-700 mb-4 sm:mb-6">
        <a
          href="/account"
          className="flex items-center"
        >
          <span className="mr-2">←</span>
          Back
        </a>
      </button>

      {/* Title Section */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
        Distant Galaxy Special
      </h1>
      <p className="text-gray-600 mb-6 sm:mb-8">Minted on Sep 30, 2022</p>

      {/* Required Cards Section */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-lg sm:text-xl mb-4 sm:mb-6">
          Own the cards below for the special card
        </h2>
        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row bg-gray-50 rounded-2xl overflow-hidden"
            >
              <div className="w-full sm:w-40 h-48 sm:h-40">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-4">
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.creator}</p>
                <p className="text-gray-600 mb-1">Price</p>
                <p className="font-bold mb-4">{product.price}</p>
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
      </div>

      {/* Fusion Button */}
      <div className="flex justify-center mb-10">
        <button
          onClick={() => setShowFusionModal(true)}
          className="bg-[#DDB11F] hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300"
        >
          FUSION CHARACTER
        </button>
      </div>

      {/* Fusion Modal */}
      <FusionModal
        isOpen={showFusionModal}
        onClose={() => setShowFusionModal(false)}
        products={products}
      />

      {/* Created By Section */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Created By</h2>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200">
            <img
              src="/placeholder.svg?height=48&width=48"
              alt="Orbitian"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className="font-medium">Orbitian</span>
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Description</h2>
        <div className="space-y-4 text-gray-600">
          <p>The Orbitians</p>
          <p>
            is a collection of 10,000 unique NFTs on the Ethereum blockchain.
          </p>
          <p>
            There are all sorts of beings in the NFT Universe. The most advanced
            and friendly of the bunch are Orbitians.
          </p>
          <p>
            They live in a metal space machines, high up in the sky and only
            have one foot on Earth. These Orbitians are a peaceful race, but
            they have been at war with a group of invaders for many generations.
            The invaders are called Upside-Downs, because of their inverted
            bodies that live on the ground, yet do not know any other way to be.
            Upside-Downs believe that they will be able to win this war if they
            could only get an eye into Orbitian territory, so they've taken to
            make human beings their target.
          </p>
        </div>
      </div>

      {/* Details Section */}
      <div className="mb-6 sm:mb-8">
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
      </div>

      {/* Tags Section */}
      <div className="mb-10">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Tags</h2>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 border border-call-to-action rounded-full text-call-to-action">
            Animation
          </span>
          <span className="px-4 py-2 border border-call-to-action rounded-full text-call-to-action">
            illustration
          </span>
          <span className="px-4 py-2 border border-call-to-action rounded-full text-call-to-action">
            moon
          </span>
        </div>
      </div>
    </div>
  );
};

export default SpecialCardDetail;
