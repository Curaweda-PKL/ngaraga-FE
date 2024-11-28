import {RiRocketFill} from "react-icons/ri";
import heroImage from "@/assets/img/astroheropng.png";

export const HeroFrame = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-white p-8">
      <div className="flex flex-col lg:flex-row items-center bg-transparent border border-transparent gap-8 max-w-6xl w-full rounded-2xl overflow-hidden">
        {/* Left Section (Hero Section) */}
        <div className="flex flex-col items-center lg:items-start gap-8 w-full lg:w-1/2 p-8">
          <h1 className="text-6xl font-bold text-center lg:text-left font-[Poppins]">
            Discover Digital Art & Collect NFTs
          </h1>
          <p className="text-2xl leading-relaxed text-center lg:text-left ">
            NFT Marketplace UI Created With Anima For Figma. Collect, Buy, and
            Sell Art From More Than 20k NFT Artists.
          </p>
          <button className="bg-[#A259FF] text-white py-3 px-10 rounded-2xl text-lg font-medium flex items-center gap-4 hover:opacity-90">
            <RiRocketFill className="text-4xl" />
            Get Started
          </button>
          <div className="flex gap-8 justify-center lg:justify-start">
            <div className="text-center">
              <h3 className="text-3xl font-bold font-[Poppins]">
                <span className="font-mono">240k+</span>
              </h3>
              <p className="text-[#808080] font-[Nunito]">Cards</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold font-[Poppins]">
                <span className="font-mono">100k+</span>
              </h3>
              <p className="text-[#808080] font-[Nunito]">Collectors</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold font-[Poppins]">
                <span className="font-mono">240k+</span>
              </h3>
              <p className="text-[#808080] font-[Nunito]">Categories</p>
            </div>
          </div>
        </div>

        {/* Right Section (Card) */}
        <div className="card bg-background-secondary w-full max-w-[570px] lg:h-[570px] shadow-xl flex flex-col items-start justify-start flex-1 sm:h-auto sm:w-auto p-0 overflow-hidden">
          <figure className="w-full h-full mb-0 relative">
            <img
              src={heroImage}
              alt="an futuristic image"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="flex flex-col items-start gap-4 p-6">
            <h2 className="text-3xl font-semibold text-white font-[Poppins]">
              Space Walking
            </h2>
            <span className="text-[#808080] font-[Nunito]">Animakid</span>
          </div>
        </div>
      </div>
    </div>
  );
};
