import React from "react";

const ProfilePage: React.FC = () => {
  return (
    <div className="w-screen  ">
      {/* Background Section */}
      <section className="relative block w-full h-64">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
          }}
        >
          <span className="w-full h-full absolute opacity-50 bg-purple-700"></span>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-16 bg-gray-900 ">
        <div className="container mx-auto ">
          {/* Profile Card */}
          <div className="relative flex flex-col md:flex-row items-center bg-gray-800 text-white w-full mb-6 shadow-xl rounded-lg -mt-40 p-6">
            {/* Profile Image */}
            <div className="flex-shrink-0 md:mr-8">
              <img
                src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                alt="Profile Image"
                className="shadow-xl rounded-full w-32 h-32 border-4 border-gray-900"
              />
            </div>

            {/* Profile Details */}
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl font-bold">Animakid</h2>
              <div className="flex justify-center md:justify-start space-x-8 mt-4">
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
              {/* Buttons */}
              <div className="flex justify-center md:justify-start space-x-4 mt-6">
                <button className="bg-purple-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-600">
                  + Scan QR
                </button>
                <button className="bg-purple-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-600">
                  + Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
