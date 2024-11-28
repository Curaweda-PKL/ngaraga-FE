import {BsFolderPlus} from "react-icons/bs";
import {BiScan} from "react-icons/bi";
import {AiOutlineShoppingCart} from "react-icons/ai";

export const HowItWorks = () => {
  const steps = [
    {
      title: "Find Your Card",
      description:
        "Set up your wallet of choice. Connect it to the Animalket by clicking the wallet icon in the top right corner.",
      icon: (
        <BsFolderPlus
          size={50}
          className="text-white transition-transform duration-300 group-hover:rotate-6"
        />
      ),
    },
    {
      title: "Scan Your Card",
      description:
        "Upload your work and setup your collection. Add a description, social links and floor price.",
      icon: (
        <BiScan
          size={50}
          className="text-white transition-transform duration-300 group-hover:scale-125"
        />
      ),
    },
    {
      title: "It's Work",
      description:
        "Choose between auctions and fixed-price listings. Start earning by selling your NFTs or trading others.",
      icon: (
        <AiOutlineShoppingCart
          size={50}
          className="text-white transition-transform duration-300 group-hover:-translate-y-2"
        />
      ),
    },
  ];

  return (
    <div className="bg-[#2B2B2B] text-white py-20 sm:px-16 md:px-32">
      <div className="mx-auto space-y-12">
        {/* Title Section with Left Alignment */}
        <div className="relative">
          <h1 className="text-4xl font-bold text-white mb-4">How It Works</h1>
          <p className="text-2xl text-gray-400">Find Out How To Get Started</p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-[#3B3B3B] rounded-2xl p-10 flex flex-col items-center text-center"
            >
              {/* Gradient Circle with Icon */}
              <div className="w-24 h-24 bg-gradient-to-br from-[#FF6250] via-[#A259FF] to-[#3B3B3B] rounded-full flex items-center justify-center mb-8 relative overflow-hidden">
                {step.icon}
                {/* Enhanced Decorative Elements */}
                <div className="absolute w-full h-full flex flex-wrap justify-center items-center -z-10">
                  <span className="w-3 h-3 bg-white rounded-full opacity-30 m-1 transition-all duration-500 group-hover:scale-150"></span>
                  <span className="w-4 h-4 bg-white rounded-full opacity-20 m-1 transition-all duration-500 group-hover:scale-125"></span>
                </div>
              </div>

              {/* Card Content */}
              <h3 className="text-2xl font-semibold mb-4 text-white">
                {step.title}
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
