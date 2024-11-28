// todo: benerin h2
// make it responsive

import { FolderPlus, Scan, ShoppingCart } from 'lucide-react';

export const OnboardingSteps = () => {
  const steps = [
    {
      title: 'Find Your Card',
      description:
        'Set up your wallet of choice. Connect it to the Animalket by clicking the wallet icon in the top right corner.',
      icon: <FolderPlus size={40} className="text-white" />,
    },
    {
      title: 'Scan Your Card',
      description:
        'Upload your work and setup your collection. Add a description, social links and floor price.',
      icon: <Scan size={40} className="text-white" />,
    },
    {
      title: "It's Work",
      description:
        'Choose between auctions and fixed-price listings. Start earning by selling your NFTs or trading others.',
      icon: <ShoppingCart size={40} className="text-white" />,
    },
  ];

  return (
    <div className="bg-[#2A2A2A] text-white py-12 md:py-16 px-4 sm:px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center md:text-left w-full md:w-auto mb-8 md:mb-0">
          Find Out <br className="hidden md:block" /> How To Get Started
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-[#3B3B3B] rounded-2xl p-6 flex flex-col items-center text-center shadow-lg transition-transform duration-300 hover:scale-105"
            >
              {/* Gradient Circle with Icon */}
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mb-4 relative overflow-hidden">
                {step.icon}
                {/* Decorative Elements */}
                <div className="absolute w-full h-full flex flex-wrap justify-center items-center -z-10">
                  <span className="w-2 h-2 bg-white rounded-full opacity-30 m-1" />
                  <span className="w-3 h-3 bg-white rounded-full opacity-20 m-1" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-400 text-sm md:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
