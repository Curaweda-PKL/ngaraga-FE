import React from "react";

export const MarketHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-10 bg-background-color w-full max-w-[1280px] px-5 py-20 mx-auto">
      {/* Title and Subtitle */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#171717]">
          Browse Marketplace
        </h1>
        <p className="mt-2 text-lg text-[#404040]">
          Browse through more than 50k Cards on the Card Marketplace.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative w-full max-w-[600px]">
        <input
          type="text"
          placeholder="Search your favourite NFTs"
          className="w-full rounded-full bg-white text-[#404040] border-2 py-3 px-5 pl-5 pr-14 outline-none placeholder-gray-500"
        />
        <button
          type="button"
          className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
