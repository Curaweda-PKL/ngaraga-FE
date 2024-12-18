import heroImage from "@/assets/img/astroheropng.png";
import {RiRocketFill} from "react-icons/ri";

export const HeroFrame = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="flex flex-col lg:flex-row font-[Nunito Sans] items-center bg-transparent border border-transparent gap-6 sm:gap-8 max-w-6xl w-full rounded-2xl overflow-hidden">
        {/* Left Section (Hero Section) */}
        <div className="flex flex-col items-center lg:items-start gap-6 sm:gap-8 w-full lg:w-1/2 p-4 sm:p-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#171717] text-center lg:text-left">
            Discover Digital Art & Collect NFTs
          </h1>
          <p className="text-xl sm:text-2xl text-[#404040] leading-relaxed text-center lg:text-left">
            NFT Marketplace UI Created With Anima For Figma. Collect, Buy, and
            Sell Art From More Than 20k NFT Artists.
          </p>
          <button className="bg-call-to-action text-white py-3 px-8 sm:px-10 rounded-2xl text-lg font-medium flex items-center gap-3 sm:gap-4 hover:opacity-90">
            <RiRocketFill className="text-3xl sm:text-4xl" />
            Get Started
          </button>
          <div className="flex gap-6 sm:gap-8 justify-center font-[Nunito Sans] lg:justify-start">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold ">
                <span className="text-[#404040] ">240k+</span>
              </h3>
              <p className="text-[#404040] ">Cards</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold ">
                <span className="text-[#404040] ">100k+</span>
              </h3>
              <p className="text-[#404040] ">Collectors</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold ">
                <span className="text-[#404040] ">240k+</span>
              </h3>
              <p className="text-[#404040] ">Categories</p>
            </div>
          </div>
        </div>

        {/* Right Section (Card) */}
        <div className="card bg-background-secondary w-full max-w-[470px] sm:max-w-[500px] lg:max-w-[570px] lg:h-[570px] sm:h-auto sm:w-auto shadow-xl flex flex-col items-start justify-start flex-1 p-0 overflow-hidden">
          <figure className="w-full h-full mb-0 relative">
            <img
              src={heroImage}
              alt="a futuristic image"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="flex flex-col items-start gap-4 p-4 sm:p-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#171717] font-[Poppins]">
              Space Walking
            </h2>
            <span className="text-[#171717] font-[Nunito]">Animakid</span>
          </div>
        </div>
      </div>
    </div>
  );
};
