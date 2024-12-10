import type React from "react";
import {
  FaDiscord,
  FaGlobe,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export const ProfilePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Background Section (Banner) */}
      <section className="relative h-48">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
          }}
        >
          <span className="w-full h-full absolute opacity-60 bg-purple-700" />
        </div>
      </section>

      {/* Profile Section */}
      <div className="relative  w-full  p-8">
        <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
          {/* Profile Content */}
          <div className="flex-grow order-3 lg:order-none lg:mr-8">
            {/* Profile Image */}
            <div className="relative mb-4 lg:mb-0 order-1 lg:order-none">
              <div className="relative w-24 h-24 mx-auto lg:mx-0 -mt-12 lg:-mt-16">
                <img
                  src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                  alt="Profile"
                  className="absolute w-full h-full shadow-xl rounded-2xl border-4 border-gray-800 object-cover"
                />
              </div>
            </div>
            {/* Profile Name */}
            <h2 className="text-2xl font-bold text-[#171717] mb-4 lg:mb-6">
              Animakid
            </h2>

            {/* Stats */}
            <div className="flex justify-start space-x-8 mb-6">
              <div className="text-left">
                <span className="text-xl text-[#262626] font-bold">250k+</span>
                <p className="text-sm text-[#525252]">Cards</p>
              </div>
              <div className="text-left">
                <span className="text-xl text-[#262626] font-bold">50+</span>
                <p className="text-sm text-[#525252]">Special Cards</p>
              </div>
              <div className="text-left">
                <span className="text-xl text-[#262626] font-bold">3000+</span>
                <p className="text-sm text-[#525252]">Followers</p>
              </div>
            </div>

            {/* Bio */}
            <div className="text-left mb-6">
              <h3 className="text-lg font-bold text-[#171717] mb-2">Bio</h3>
              <p className="text-[#525252]">
                The Internet's Friendliest Designer Kid.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-lg font-bold text-[#525252] mb-2">Links</h3>
              <div className="flex justify-start space-x-6 text-2xl">
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGlobe className="text-[#858584] hover:text-white" />
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDiscord className="text-[#858584] hover:text-white" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube className="text-[#858584] hover:text-white" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="text-[#858584] hover:text-white" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-[#858584] hover:text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 lg:mt-0 flex justify-center lg:justify-end space-x-4 order-2 lg:order-none">
            <button className="bg-transparent border-2 border-call-to-action  font-bold py-2 px-6 rounded-lg flex items-center space-x-2 hover:bg-[#858584] hover:text-white">
              <span>+</span>
              <span>Scan QR</span>
            </button>
            <button className="bg-transparent border-2 border-call-to-action  font-bold py-2 px-6 rounded-lg flex items-center space-x-2 hover:bg-[#858584] hover:text-white">
              <span>+</span>
              <span>Follow</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
