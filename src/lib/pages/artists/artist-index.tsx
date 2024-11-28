import type React from 'react';
import { FaGlobe, FaDiscord, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";

const ProfilePage: React.FC = () => {
  return (
    <div className="w-screen">
      {/* Background Section */}
      <section className="relative block w-full h-64">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
          }}
        >
          <span className="w-full h-full absolute opacity-50 bg-purple-700" />
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto">
          {/* Profile Card */}
          <div className="relative flex flex-col lg:flex-row items-center bg-gray-800 text-white w-full mb-6 shadow-xl rounded-lg -mt-40 p-8 space-y-8 lg:space-y-0">
            {/* Profile Image */}
            <div className="absolute left-1/2 lg:left-8 -translate-x-1/2 lg:translate-x-0 -top-16">
              <img
                src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                alt="Profile Image"
                className="shadow-xl rounded-lg w-24 h-24 border-4 border-gray-900 object-cover"
              />
            </div>

            {/* Profile Details */}
            <div className="flex-grow text-center lg:text-left space-y-4">
              <h2 className="text-2xl font-bold">Animakid</h2>

              {/* Buttons (Below H2 for SM/MD, Top-Right for LG) */}
              <div className="flex justify-center lg:absolute lg:top-8 lg:right-8 space-x-4 mt-4 lg:mt-0">
                <button className="bg-purple-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-600">
                  + Scan QR
                </button>
                <button className="bg-purple-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-600">
                  + Follow
                </button>
              </div>

              <div className="flex justify-center lg:justify-start space-x-8 mt-4">
                <div className="text-center">
                  <span className="text-xl font-bold">250k+</span>
                  <p className="text-sm text-gray-400">Cards</p>
                </div>
                <div className="text-center">
                  <span className="text-xl font-bold">50+</span>
                  <p className="text-sm text-gray-400">Special Cards</p>
                </div>
                <div className="text-center">
                  <span className="text-xl font-bold">3000+</span>
                  <p className="text-sm text-gray-400">Followers</p>
                </div>
              </div>

              {/* Bio Section */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-200 mb-2">Bio</h3>
                <p className="text-gray-300">
                  Hi, I’m Animakid! I love creating unique and vibrant designs. Follow me for the latest updates on my
                  projects and creative journey.
                </p>
              </div>

              {/* Links Section */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-200 mb-2">Links</h3>
                <div className="flex space-x-6 text-2xl justify-center lg:justify-start">
                  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                    <FaGlobe className="hover:text-white" />
                  </a>
                  <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                    <FaDiscord className="hover:text-white" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <FaYoutube className="hover:text-white" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="hover:text-white" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="hover:text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
