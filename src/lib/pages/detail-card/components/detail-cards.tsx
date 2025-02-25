import React from "react";
import { CiShoppingCart } from "react-icons/ci";

export const DetailCards: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Banner Section: Occupies 40% of the viewport height with margin top and border bottom */}
      <section
        className="relative w-full h-[40vh] mt-4 border-b border-gray-300"
        aria-label="Product Banner"
      >
        {/* Center the image without stretching */}
        <img
          src="https://i.ibb.co.com/f8ZDQzh/DAENDELS-LEGEND.jpg"
          alt="Product Banner"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain max-w-full max-h-full pb-4"
        />
      </section>

      {/* Product Details Section */}
      <div className="relative bg-white p-4 m-4 rounded-lg sm:p-10 sm:m-8">
        {/* Wrapper for Product Name & Minted Date */}
        <div className="px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:text-3xl">
            Product Name
          </h1>
          <h2 className="text-lg text-gray-700 sm:text-xl">
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
        <div className="mt-6 px-4">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-6">
            <img
              src="https://picsum.photos/id/237/200/300"
              alt="Orbitian Logo"
              className="w-12 h-12 rounded-full object-cover sm:w-10 sm:h-10"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
                Created By
              </h2>
              <p className="text-gray-600 sm:text-base">Orbitian</p>
            </div>
          </div>

          {/* Description */}
          <h3 className="text-xl text-gray-900 mb-4 sm:text-2xl">
            Description
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed mb-4 sm:text-base">
            The Orbitians is a collection of 10,000 unique NFTs on the Ethereum blockchain.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mb-4 sm:text-base">
            There are all sorts of beings in the NFT Universe. The most advanced and friendly of the bunch are Orbitians.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mb-4 sm:text-base">
            They live in metal space machines, high up in the sky and only have one foot on Earth. These Orbitians are a peaceful race, but they have been at war with a group of invaders for many generations. The invaders are called Upside-Downs, because of their inverted bodies that live on the ground, yet do not know any other way to be. Upside-Downs believe that they will be able to win this war if they could only get an eye into Orbitian territory, so they've taken to make human beings their target.
          </p>

          {/* Details */}
          <div className="mt-6">
            <h4 className="text-gray-800 font-semibold mb-2 text-sm sm:text-base">
              Details
            </h4>
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

          {/* Tags - Improved mobile spacing */}
          <div className="mt-6">
            <h4 className="text-gray-800 font-semibold mb-3 text-sm sm:text-base">
              Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-call-to-action border border-call-to-action px-3 py-1.5 rounded-full sm:text-base">
                Animation
              </span>
              <span className="text-xs text-call-to-action border border-call-to-action px-3 py-1.5 rounded-full sm:text-base">
                Illustration
              </span>
              <span className="text-xs text-call-to-action border border-call-to-action px-3 py-1.5 rounded-full sm:text-base">
                Moon
              </span>
            </div>
          </div>

          {/* Action Buttons (Mobile View) - Improved positioning and sizing */}
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
              <a href="/checkout" className="block text-center">Checkout</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};