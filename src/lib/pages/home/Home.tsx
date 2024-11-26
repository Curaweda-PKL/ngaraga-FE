import {Rocket} from "lucide-react";
import {TrendingCards} from "./TrendingCards";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#2B2B2B] px-4 md:px-8 overflow-hidden">
      {/* Main Content */}
      <div className="grid gap-8 py-12 md:grid-cols-2 md:gap-12">
        {/* Left Section */}
        <div className="flex flex-col gap-6 ml-16 mr-24">
          <div className="grid gap-4">
            <h1 className="font-bold text-white sm:text-3xl md:text-8xl">
              Lorem Ipsum Dolor Amet Zdzf
            </h1>
            <p className="text-[#FFFFFF] sm:text-md md:text-3xl">
              Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor
              amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum
              dolor
            </p>
          </div>

          <button className="flex w-fit items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-sm text-white transition hover:bg-purple-700">
            <Rocket size={20} />
            Get Started
          </button>

          <div className="grid grid-cols-3 gap-4 pt-6">
            {["Cards", "Collectors", "Kategory"].map((item, index) => (
              <div
                key={index}
                className="grid gap-1"
              >
                <span className="text-white text-2xl font-bold md:text-3xl">
                  {index === 1 ? "100k+" : "240k+"}
                </span>
                <span className="text-sm text-gray-400">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Card */}
        <div className="overflow-hidden rounded-xl bg-[#3B3B3B] mr-32 mb-20">
          <div className="aspect-w-16 aspect-h-12">
            <img
              src="/api/placeholder/800/600"
              alt="Space Walking"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-[#FFFFFF] text-xl font-bold text-transparent">
              Space Walking
            </h3>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-6 w-6 rounded-full text-[#FFFFFF]" />
              <span className="text-sm text-[#FFFFFF]">Animakid</span>
            </div>
          </div>
        </div>
      </div>

      {/* TrendingCards Component */}
      <TrendingCards />
    </div>
  );
};

export default Home;
