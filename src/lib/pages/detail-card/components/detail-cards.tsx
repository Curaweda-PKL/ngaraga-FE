import React from "react";
import { CiShoppingCart } from "react-icons/ci";

export const DetailCards: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Background Section (Banner) */}
      <section className="relative h-48 sm:h-40">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            background:
              "linear-gradient(180deg, rgba(221, 177, 31, 0) 0%, rgba(221, 177, 31, 0.5) 100%), url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="w-full h-full absolute opacity-60 bg-purple-700" />
        </div>
      </section>

      {/* Product Name and Action Buttons */}
      <div className="relative bg-white ml-[4rem] mb-[2rem] mt-[2rem] pr-[3rem] sm:ml-4 sm:pr-4 sm:mb-4 sm:mt-4">
        {/* Product Name */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:text-xl">
          Product Name
        </h1>
        <div className="flex items-center mb-6 sm:mb-4">
          <h2 className="text-lg text-gray-700 sm:text-sm">
            Minted on: December 25, 2024
          </h2>
        </div>

        {/* Action Buttons (positioned for desktop only) */}
        <div className="absolute top-2 right-2 flex space-x-2 mr-5 sm:mr-3 hidden sm:flex">
          <button className="flex items-center bg-call-to-action text-white px-4 py-2 rounded-full hover:bg-call-to-actions-800 transition text-sm">
            <CiShoppingCart className="mr-2 text-xl" />
            Add to Cart
          </button>
          <button className="border border-call-to-actions-900 text-call-to-action px-4 py-2 rounded-full transition text-sm">
            <a href="/checkout">Checkout</a>
          </button>
        </div>

        {/* DetailBio Content */}
        <div>
          {/* Header */}
          <div className="flex items-center space-x-4 mb-6 sm:mb-4">
            <img
              src="https://picsum.photos/id/237/200/300"
              alt="Orbitian Logo"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800 sm:text-base">
                Created By
              </h2>
              <p className="text-gray-500 sm:text-sm">Orbitian</p>
            </div>
          </div>

          {/* Description */}
          <h3 className="text-xl text-gray-900 mb-4 sm:text-lg sm:mb-2">
            Description
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed mb-4 break-words sm:text-xs sm:mb-2">
            The Orbitians is a collection of 10,000 unique NFTs on the Ethereum
            blockchain.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mb-4 break-words sm:text-xs sm:mb-2">
            There are all sorts of beings in the NFT Universe. The most advanced
            and friendly of the bunch are Orbitians.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mb-4 break-words sm:text-xs sm:mb-2">
            They live in metal space machines, high up in the sky and only have
            one foot on Earth. These Orbitians are a peaceful race, but they
            have been at war with a group of invaders for many generations. The
            invaders are called Upside-Downs, because of their inverted bodies
            that live on the ground, yet do not know any other way to be.
            Upside-Downs believe that they will be able to win this war if they
            could only get an eye into Orbitian territory, so they’ve taken to
            make human beings their target.
          </p>

          {/* Details */}
          <div className="mt-4 sm:mt-2">
            <h4 className="text-gray-800 font-semibold mb-2 sm:text-sm">
              Details
            </h4>
            <ul className="list-none space-y-2">
              <li>
                <a
                  href="https://etherscan.io"
                  className="text-blue-500 hover:underline text-sm sm:text-xs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Etherscan
                </a>
              </li>
              <li>
                <a
                  href="https://original-link.com"
                  className="text-blue-500 hover:underline text-sm sm:text-xs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Original
                </a>
              </li>
            </ul>
          </div>

          {/* Tags */}
          <div className="mt-6 sm:mt-4">
            <h4 className="text-gray-800 font-semibold mb-2 sm:text-sm">
              Tags
            </h4>
            <div className="flex flex-wrap space-x-2">
              <span className="text-sm text-call-to-action border border-call-to-action px-3 py-1 rounded-full mb-2 sm:text-xs sm:px-2 sm:py-1">
                Animation
              </span>
              <span className="text-sm text-call-to-action border border-call-to-action px-3 py-1 rounded-full mb-2 sm:text-xs sm:px-2 sm:py-1">
                Illustration
              </span>
              <span className="text-sm text-call-to-action border border-call-to-action px-3 py-1 rounded-full mb-2 sm:text-xs sm:px-2 sm:py-1">
                Moon
              </span>
            </div>
          </div>

          {/* Action Buttons (positioned for mobile view) */}
          <div className="flex flex-row sm:hidden mt-6 space-x-4">
            <button className="flex items-center bg-call-to-action text-white px-4 py-2 rounded-full hover:bg-call-to-actions-800 transition text-sm">
              <CiShoppingCart className="mr-2 text-xl" />
              Add to Cart
            </button>
            <button className="border border-call-to-actions-900 text-call-to-action px-4 py-2 rounded-full transition text-sm">
              <a href="/checkout">Checkout</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
