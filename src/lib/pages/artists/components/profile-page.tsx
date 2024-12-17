import React from "react";
import { FaDiscord, FaGlobe, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export const ProfilePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Background Section (Banner) */}
      <section className="relative h-48">
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

      {/* Profile Section */}
      <div className="relative w-full lg:p-8">
        <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
          {/* Profile Content */}
          <div className="flex-grow order-3 lg:order-none lg:mr-8 ml-4 lg:ml-8">
            {/* Profile Image - Centered on sm and md */}
            <div className="relative mb-8 lg:mb-12 order-1 lg:order-none">
              <div className="relative w-24 h-24 mx-auto lg:mx-0 -mt-12 lg:-mt-16">
                <img
                  src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                  alt="Profile"
                  className="absolute w-full h-full shadow-xl rounded-2xl border-4 border-gray-800 object-cover"
                />
              </div>
            </div>

            {/* Buttons - 2-column grid layout for sm and md */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 lg:hidden">
              <button className="bg-transparent border-2 border-call-to-action font-bold py-2 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#858584] hover:text-white">
                <span>+</span>
                <span>Scan QR</span>
              </button>
              <button className="bg-transparent border-2 border-call-to-action font-bold py-2 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#858584] hover:text-white">
                <span>+</span>
                <span>Follow</span>
              </button>
            </div>

            {/* Profile Name */}
            <h2 className="text-2xl font-bold text-[#171717] mb-4 lg:mb-6 text-center lg:text-left">
              Animakid
            </h2>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start space-x-8 mb-6">
              <div>
                <span className="text-xl font-bold text-[#262626]">250k+</span>
                <p className="text-sm text-[#525252]">Cards</p>
              </div>
              <div>
                <span className="text-xl font-bold text-[#262626]">50+</span>
                <p className="text-sm text-[#525252]">Special Cards</p>
              </div>
              <div>
                <span className="text-xl font-bold text-[#262626]">3000+</span>
                <p className="text-sm text-[#525252]">Followers</p>
              </div>
            </div>

            {/* Bio */}
            <div className="text-left mb-8">
              <h3 className="text-lg font-bold text-[#171717] mb-2">Bio</h3>
              <p className="text-[#525252]">The Internet's Friendliest Designer Kid.</p>
            </div>

            {/* Links */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#525252] mb-2">Links</h3>
              <div className="flex justify-center lg:justify-start space-x-6 text-2xl">
                <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                  <FaGlobe className="text-[#858584] hover:text-white" />
                </a>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                  <FaDiscord className="text-[#858584] hover:text-white" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <FaYoutube className="text-[#858584] hover:text-white" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-[#858584] hover:text-white" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-[#858584] hover:text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Buttons - Shown only on lg */}
          <div className="hidden lg:flex mt-6 lg:mt-0 justify-end space-x-4 order-2 lg:order-none">
            <button className="bg-transparent border-2 border-call-to-action font-bold py-2 px-6 rounded-lg flex items-center space-x-2 hover:bg-[#858584] hover:text-white">
              <span>+</span>
              <span>Scan QR</span>
            </button>
            <button className="bg-transparent border-2 border-call-to-action font-bold py-2 px-6 rounded-lg flex items-center space-x-2 hover:bg-[#858584] hover:text-white">
              <span>+</span>
              <span>Follow</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
