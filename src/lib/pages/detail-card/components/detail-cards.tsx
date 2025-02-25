import React from "react";
import { CiShoppingCart } from "react-icons/ci";

export const DetailCards: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Banner Section: Occupies 40% of the viewport height with margin top and border bottom */}
      <section
        className="relative w-full h-[40vh] mt-4 border-b  border-gray-300"
        aria-label="Product Banner"
      >
        {/* Center the image without stretching */}
        <img
          src="https://i.ibb.co.com/f8ZDQzh/DAENDELS-LEGEND.jpg"
          alt="Product Banner"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain max-w-full max-h-full pb-4"
        />
      </section>

      {/* Product Details Section (Shadow Removed) */}
      <div className="relative bg-white p-8 m-8 rounded-lg sm:p-4 sm:m-4">
        {/* Product Name */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:text-2xl">
          Product Name
        </h1>
        <div className="flex items-center mb-6 sm:mb-4">
          <h2 className="text-xl text-gray-700 sm:text-lg">
            Minted on: December 25, 2024
          </h2>
        </div>

        {/* Action Buttons (Desktop View) */}
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

        {/* Detail Content */}
        <div className="mt-6">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-6">
            <img
              src="https://picsum.photos/id/237/200/300"
              alt="Orbitian Logo"
              className="w-12 h-12 rounded-full object-cover sm:w-10 sm:h-10"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800 sm:text-lg">
                Created By
              </h2>
              <p className="text-gray-600 sm:text-base">Orbitian</p>
            </div>
          </div>

          {/* Description */}
          <h3 className="text-2xl text-gray-900 mb-4 sm:text-xl">
            Description
          </h3>
          <p className="text-gray-700 text-base leading-relaxed mb-4 break-words sm:text-sm">
            The Orbitians is a collection of 10,000 unique NFTs on the Ethereum blockchain.
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-4 break-words sm:text-sm">
            There are all sorts of beings in the NFT Universe. The most advanced and friendly of the bunch are Orbitians.
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-4 break-words sm:text-sm">
            They live in metal space machines, high up in the sky and only have one foot on Earth. These Orbitians are a peaceful race, but they have been at war with a group of invaders for many generations. The invaders are called Upside-Downs, because of their inverted bodies that live on the ground, yet do not know any other way to be. Upside-Downs believe that they will be able to win this war if they could only get an eye into Orbitian territory, so they’ve taken to make human beings their target.
          </p>

          {/* Details */}
          <div className="mt-6">
            <h4 className="text-gray-800 font-semibold mb-2 text-base sm:text-sm">
              Details
            </h4>
            <ul className="list-none space-y-2">
              <li>
                <a
                  href="https://etherscan.io"
                  className="text-blue-500 hover:underline text-base sm:text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Etherscan
                </a>
              </li>
              <li>
                <a
                  href="https://original-link.com"
                  className="text-blue-500 hover:underline text-base sm:text-sm"
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
            <h4 className="text-gray-800 font-semibold mb-2 text-base sm:text-sm">
              Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="text-base text-call-to-action border border-call-to-action px-3 py-1 rounded-full mb-2 sm:text-sm">
                Animation
              </span>
              <span className="text-base text-call-to-action border border-call-to-action px-3 py-1 rounded-full mb-2 sm:text-sm">
                Illustration
              </span>
              <span className="text-base text-call-to-action border border-call-to-action px-3 py-1 rounded-full mb-2 sm:text-sm">
                Moon
              </span>
            </div>
          </div>

          {/* Action Buttons (Mobile View) */}
          <div className="flex flex-row sm:hidden mt-6 space-x-4">
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
        </div>
      </div>
    </div>
  );
};
