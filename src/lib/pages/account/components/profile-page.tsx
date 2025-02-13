import React, { useEffect, useState } from "react";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import {
  FaDiscord,
  FaGlobe,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { SERVER_URL } from "@/middleware/utils"; // Import centralized server URL

export const ProfilePage: React.FC = () => {
  // Local state for profile data, loading, and errors.
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the user profile when the component mounts.
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/account/profile`,
          { withCredentials: true }
        );
        setProfile(response.data);
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Show a loading state or error message if necessary.
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        {error}
      </div>
    );
  }

  // Normalize and compute the avatar URL.
  let avatarUrl = "https://www.gravatar.com/avatar/abc123"; // default avatar
  if (profile && profile.image) {
    let normalizedPath = profile.image
      .replace(/\\/g, "/")
      .replace(/^src\//, "");
    normalizedPath = normalizedPath.replace("uploadsprofile", "uploads/profile");
    avatarUrl = `${SERVER_URL}/${normalizedPath}`;
  }

  // Fallback for display name: if fullName is missing, use name.
  const displayName = profile.fullName || profile.name || "User";

  // Use the length of ownedCards as the Cards count.
  const cardsCount = profile.ownedCards ? profile.ownedCards.length : 0;

  // Use provided socialLinks if available; otherwise, fallback to default links.
  const socialLinks = profile.socialLinks || {
    website: "https://example.com",
    discord: "https://discord.com",
    youtube: "https://youtube.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  };

  // Use the profile bio if available; otherwise a default text.
  const bio = profile.bio || "The Internet's Friendliest Designer Kid.";

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
            {/* Profile Image */}
            <div className="relative mb-8 lg:mb-12 order-1 lg:order-none">
              <div className="relative w-24 h-24 mx-auto lg:mx-0 -mt-12 lg:-mt-16">
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="absolute w-full h-full shadow-xl rounded-2xl border-4 border-gray-800 object-cover"
                />
              </div>
            </div>

            {/* Buttons (for smaller screens) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 lg:hidden">
              <button className="transition duration-300 text-white bg-call-to-actions-900 transform border-2 border-call-to-action font-bold py-2 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-call-to-actions-800 hover:text-white">
                <CgProfile />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Profile Name */}
            <h2 className="text-4xl font-bold text-[#171717] mb-4 lg:mb-8 text-center lg:text-left">
              {displayName}
            </h2>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start space-x-8 mb-6">
              <div>
                <span className="text-xl font-bold text-[#262626]">
                  {cardsCount}
                </span>
                <p className="text-base text-[#525252]">Cards</p>
              </div>
              <div>
                <span className="text-xl font-bold text-[#262626]">50+</span>
                <p className="text-base text-[#525252]">Special Cards</p>
              </div>
              <div>
                <span className="text-xl font-bold text-[#262626]">3000+</span>
                <p className="text-base text-[#525252]">Followers</p>
              </div>
            </div>

            {/* Bio */}
            <div className="text-left mb-8">
              <h3 className="text-xl font-bold text-[#525252] mb-2">Bio</h3>
              <p className="text-base text-[#525252]">{bio}</p>
            </div>

            {/* Links */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#525252] mb-2">Links</h3>
              <div className="flex justify-center lg:justify-start space-x-6 text-3xl">
                <a
                  href={socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition transform duration-300 text-[#858584] hover:text-[#ff9800]"
                >
                  <FaGlobe />
                </a>
                <a
                  href={socialLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition transform duration-300 text-[#858584] hover:text-[#5865F2]"
                >
                  <FaDiscord />
                </a>
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition transform duration-300 text-[#858584] hover:text-[#FF0000]"
                >
                  <FaYoutube />
                </a>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition transform duration-300 text-[#858584] hover:text-[#1DA1F2]"
                >
                  <FaTwitter />
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition transform duration-300 text-[#858584] hover:text-[#E1306C]"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>

          {/* Buttons for larger screens */}
          <div className="hidden lg:flex mt-6 lg:mt-0 justify-end space-x-4 order-2 lg:order-none">
            <button className="transition duration-300 bg-call-to-actions-900 text-white transform border-2 border-call-to-action font-bold py-2 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-call-to-actions-800 hover:text-white shadow-md">
              <CgProfile />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
