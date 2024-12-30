import React from "react";

export const DetailBio: React.FC = () => {
  return (
    <div className="bg-white ml-[4rem] mb-[2rem] mt-[2rem] pr-[3rem]">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src="/path-to-image/orbitian-logo.png" 
          alt="Orbitian Logo"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Created By</h2>
          <p className="text-gray-500">Orbitian</p>
        </div>
      </div>

      {/* Description */}
      <h3 className="text-xl font-bold text-gray-900 mb-4">The Orbitians</h3>
      <p className="text-gray-700 text-sm leading-relaxed mb-4 break-words">
        The Orbitians is a collection of 10,000 unique NFTs on the Ethereum
        blockchain.
      </p>
      <p className="text-gray-700 text-sm leading-relaxed mb-4 break-words">
        There are all sorts of beings in the NFT Universe. The most advanced
        and friendly of the bunch are Orbitians.
      </p>
      <p className="text-gray-700 text-sm leading-relaxed mb-4 break-words">
        They live in metal space machines, high up in the sky and only have one
        foot on Earth. These Orbitians are a peaceful race, but they have been
        at war with a group of invaders for many generations. The invaders are
        called Upside-Downs, because of their inverted bodies that live on the
        ground, yet do not know any other way to be. Upside-Downs believe that
        they will be able to win this war if they could only get an eye into
        Orbitian territory, so they’ve taken to make human beings their target.
      </p>

      {/* Details */}
      <div className="mt-4">
        <h4 className="text-gray-800 font-semibold mb-2">Details</h4>
        <ul className="list-none space-y-2">
          <li>
            <a
              href="https://etherscan.io" // Replace with the correct link
              className="text-blue-500 hover:underline text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Etherscan
            </a>
          </li>
          <li>
            <a
              href="https://original-link.com" // Replace with the correct link
              className="text-blue-500 hover:underline text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Original
            </a>
          </li>
        </ul>
      </div>

      {/* Tags */}
      <div className="mt-6">
        <h4 className="text-gray-800 font-semibold mb-2">Tags</h4>
        <div className="flex flex-wrap space-x-2">
          <span className="text-sm  text-call-to-action border border-call-to-action px-3 py-1 rounded-full mb-2">
            Animation
          </span>
          <span className="text-sm  text-call-to-action border border-call-to-action px-3 py-1 rounded-full mb-2">
            Illustration
          </span>
          <span className="text-sm  text-call-to-action border border-call-to-action px-3 py-1 rounded-full mb-2">
            Moon
          </span>
        </div>
      </div>
    </div>
  );
};
