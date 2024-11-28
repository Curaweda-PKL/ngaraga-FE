import heroImage from '@/assets/img/astroheropng.png';
import type React from 'react';
import { RiRocketFill } from 'react-icons/ri';
// todo :
//  -- make all necessary use type data
// clean up unnecesarry css
// resposnive image card
export const HeroFrame: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-white p-8 ">
      <div className="flex flex-col lg:flex-row items-center bg-transparent border border-transparent gap-8 max-w-6xl w-full  rounded-xl overflow-hidden">
        {/* Left Section (Hero Section) */}
        <div className="flex flex-col items-center lg:items-start gap-8 w-full lg:w-1/2 p-8">
          <h1 className="text-4xl font-bold text-center lg:text-left">
            Discover Digital Art & Collect NFTs
          </h1>
          <p className="text-lg leading-relaxed text-center lg:text-left">
            NFT Marketplace UI Created With Anima For Figma. Collect, Buy, and
            Sell Art From More Than 20k NFT Artists.
          </p>
          <button className="bg-[#A259FF] text-white py-2 px-6 rounded-lg text-lg font-medium flex items-center gap-2 hover:opacity-90">
            <RiRocketFill className="text-2xl" />
            Get Started
          </button>
          <div className="flex gap-8 justify-center lg:justify-start">
            <div className="text-center">
              <h3 className="text-2xl font-bold">
                <span className="font-mono">240k+</span>
              </h3>
              <p className="text-gray-400">Cards</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold">
                <span className="font-mono">100k+</span>
              </h3>
              <p className="text-gray-400">Collectors</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold">
                <span className="font-mono">240k+</span>
              </h3>
              <p className="text-gray-400">Categories</p>
            </div>
          </div>
        </div>

        {/* Right Section (Card) */}
        <div className="card bg-background-secondary w-96 shadow-xl flex flex-col items-start justify-start lg:h-[400px] flex-1 sm:h-auto sm:w-auto p-0">
          <figure className="w-full h-full mb-0 relative">
            <img
              src={heroImage}
              alt="an futuristic image"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="flex flex-col items-start gap-4 p-6">
            <h2 className="text-2xl font-semibold text-white">Space Walking</h2>
            <div className="flex items-center gap-4">
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="text-gray-400">Animakid</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
