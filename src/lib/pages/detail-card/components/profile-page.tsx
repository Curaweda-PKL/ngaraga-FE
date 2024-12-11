import React from "react";

export const ProfilePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] text-[#212529]">
      {/* Header Section */}
      <header
        className="relative w-full h-96 bg-center bg-cover"
        style={{
          backgroundImage: "url('/src/assets/img/astroheropng.png')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </header>

      {/* Content Section */}
      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold">The Orbitians</h1>
                <p className="text-lg">Minted on Sep 30, 2022</p>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Orbitians is a collection of 10,000 unique NFTs on the
              Ethereum blockchain. There are all sorts of beings in the NFT
              Universe. The most advanced and friendly of the bunch are
              Orbitians.
            </p>
            <p className="text-gray-700 leading-relaxed">
              They live in a metal space machine, high up in the sky and only
              have one foot on Earth. These Orbitians are a peaceful race but
              have been at war with a group of invaders for many generations.
            </p>

            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">Tags</h3>
              <div className="flex gap-2">
                <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm">
                  Animation
                </span>
                <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm">
                  Illustration
                </span>
                <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm">
                  Moon
                </span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-row items-start gap-4">
            <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition">
              Add to Cart
            </button>
            <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition">
              Checkout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
