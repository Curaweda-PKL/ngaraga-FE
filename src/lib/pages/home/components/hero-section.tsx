import type React from 'react';

export const HeroFrame: React.FC = () => {
  return (
    <div className="flex max-w-screen items-start gap-8 bg-[#2B2B2B] text-white p-8">
      {/* Left Section */}
      <div className="flex flex-col items-start gap-8 flex-[1_0_0]">
        <h1 className="text-4xl font-bold">Lorem Ipsum Dolor Amet Zdzf</h1>
        <p className="text-lg leading-relaxed">
          Lorem Ipsum Dolor Amet Lorem Ipsum Dolor Amet Lorem Ipsum Dolor Amet
          Lorem Ipsum Dolor Amet Lorem Ipsum Dolor Amet
        </p>
        <button className="bg-[#A259FF] text-white py-2 px-6 rounded-lg text-lg font-medium hover:opacity-90">
          Get Started
        </button>
        <div className="flex gap-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold">240k+</h3>
            <p className="text-gray-400">Cards</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">100k+</h3>
            <p className="text-gray-400">Collectors</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">240k+</h3>
            <p className="text-gray-400">Category</p>
          </div>
        </div>
      </div>
    </div>
  );
};
