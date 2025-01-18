import { useEffect } from "react";
import { RiRocketFill } from "react-icons/ri";
import "./style.css";
import "./style.js";
import { useNavigate } from "react-router-dom";

export const HeroFrame = () => {
  const navigate = useNavigate();
  const getStartedHandleClick = () => {
    navigate("/marketplace");
  };

  useEffect(() => {
    // Dynamically load external JS
    const script = document.createElement("script");
    script.type = "module";

    script.src = "/src/lib/pages/home/components/style.js";
    // script.src = "/js/style.js"; 

    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="flex flex-col lg:flex-row font-[Nunito Sans] items-center bg-transparent border border-transparent gap-6 sm:gap-8 max-w-6xl w-full rounded-2xl overflow-hidden">
        {/* Left Section */}
        <div className="flex flex-col items-center lg:items-start gap-6 sm:gap-8 w-full lg:w-1/2 p-4 sm:p-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#171717] text-center lg:text-left break-words">
            Discover Dolanan Yuk Cards!
          </h1>
          <p className="text-xl sm:text-2xl text-[#404040] leading-relaxed text-center lg:text-left font-mono">
            A new way to collect and gift cards with other collectors.
          </p>
          <button 
            onClick={getStartedHandleClick}
            className="bg-call-to-action text-white py-3 px-8 sm:px-10 rounded-2xl text-lg font-medium flex items-center gap-3 sm:gap-4 hover:opacity-90">
            <RiRocketFill className="text-3xl sm:text-4xl" />
            Get Started
          </button>
          <div className="flex gap-6 sm:gap-8 justify-center font-[Nunito Sans] lg:justify-start">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold">
                <span className="text-[#404040]">240k+</span>
              </h3>
              <p className="text-[#404040]">Cards</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold">
                <span className="text-[#404040]">100k+</span>
              </h3>
              <p className="text-[#404040]">Collectors</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold">
                <span className="text-[#404040]">240k+</span>
              </h3>
              <p className="text-[#404040]">Categories</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center lg:items-start gap-6 sm:gap-8 w-full lg:w-1/2 p-4 sm:p-6">
          <div className="card-container pika animated p-0"></div>

          {/* Content Below the Card */}
          <div className="flex flex-col items-start gap-4 p-4 sm:p-6">
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#171717] font-mono ml-[-10px] lg:text-2xl lg:ml-0">
              Space Walking
            </h2>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-8 h-8 rounded-full">
                  <img src="https://placeimg.com/64/64/people" alt="Avatar" />
                </div>
              </div>
              <span className="text-[#171717] font-mono">Animakid</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
