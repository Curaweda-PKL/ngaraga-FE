import React, {useEffect, useState} from "react";
import axios from "axios";
import {CgProfile} from "react-icons/cg";
import {
  FaDiscord,
  FaGlobe,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import {useParams} from "react-router-dom";

const ProfileSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Skeleton Banner */}
      <section className="relative h-48 bg-gray-300 animate-pulse"></section>
      <div className="container mx-auto px-6 py-10 animate-pulse">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
          {/* Left Section: Profile Content Skeleton */}
          <div className="flex-grow space-y-4">
            {/* Skeleton Profile Image */}
            <div className="w-24 h-24 rounded-2xl bg-gray-300 mx-auto lg:mx-0"></div>
            {/* Skeleton Name */}
            <div className="w-1/2 h-8 bg-gray-300 rounded mx-auto lg:mx-0"></div>
            {/* Skeleton Stats */}
            <div className="flex justify-center lg:justify-start space-x-8">
              <div className="w-12 h-6 bg-gray-300 rounded"></div>
              <div className="w-12 h-6 bg-gray-300 rounded"></div>
              <div className="w-12 h-6 bg-gray-300 rounded"></div>
            </div>
            {/* Skeleton Bio */}
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-300 rounded"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            </div>
            {/* Skeleton Social Links */}
            <div className="flex justify-center lg:justify-start space-x-6">
              {Array.from({length: 5}).map((_, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 bg-gray-300 rounded-full"
                ></div>
              ))}
            </div>
          </div>

          {/* Right Section: Skeleton Button for Larger Screens */}
          <div className="hidden lg:flex">
            <div className="w-32 h-10 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfilePage: React.FC = () => {
  // Retrieve the dynamic "$name" parameter from the URL.
  const {name} = useParams<{name: string}>();

  // Local state for profile data, loading, and errors.
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the user profile when the component mounts or when "$name" changes.
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/account/${name}`,
          {withCredentials: true}
        );
        setProfile(response.data);
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchProfile();
    }
  }, [name]);

  // Render the skeleton if loading.
  if (loading) {
    return <ProfileSkeleton />;
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">{error}</div>
    );
  }

  // Normalize and compute the avatar URL.
  let avatarUrl =
    "https://comickaze.in/wp-content/uploads/woocommerce-placeholder-600x600.png"; // default avatar
  if (profile && profile.image) {
    let normalizedPath = profile.image
      .replace(/\\/g, "/")
      .replace(/^src\//, "");
    normalizedPath = normalizedPath.replace(
      "uploadsprofile",
      "uploads/profile"
    );
    avatarUrl = `http://localhost:3000/${normalizedPath}`;
  }

  // Normalize and compute the banner URL.
  let bannerUrl =
    "https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&auto=format&fit=crop&w=2710&q=80"; // default banner
  if (profile && profile.imageBanner) {
    let normalizedBannerPath = profile.imageBanner
      .replace(/\\/g, "/")
      .replace(/^src\//, "");
    normalizedBannerPath = normalizedBannerPath.replace(
      "uploadsprofile",
      "uploads/profile"
    );
    bannerUrl = `http://localhost:3000/${normalizedBannerPath}`;
  }

  // Fallback for display name: if fullName is missing, use name.
  const displayName = profile.fullName || profile.name || "User";

  // Compute stats using fallback values.
  const cardsCount = profile.ownedCards?.length ?? 0;
  const specialCardsCount = profile.specialCards?.length ?? 0;
  const followersCount = profile.followers?.length ?? 0;

  // For the bio, fallback to a default message.
  const bio =
    profile.bio && profile.bio.trim().length > 0
      ? profile.bio
      : "Welp, the user hasn't set a bio.";

  // Process socialLinks.
  let parsedSocialLinks: any = {};
  if (profile.socialLinks) {
    if (typeof profile.socialLinks === "string") {
      try {
        parsedSocialLinks = JSON.parse(profile.socialLinks);
      } catch (err) {
        console.error("Error parsing socialLinks:", err);
      }
    } else {
      parsedSocialLinks = profile.socialLinks;
    }
  }

  // Extract individual social links, using defaults if empty.
  const website =
    parsedSocialLinks.website && parsedSocialLinks.website.trim().length > 0
      ? parsedSocialLinks.website
      : "https://ncase.me/trust/";
  const discord =
    parsedSocialLinks.discord && parsedSocialLinks.discord.trim().length > 0
      ? parsedSocialLinks.discord
      : "https://discord.com";
  const youtube =
    parsedSocialLinks.youtube && parsedSocialLinks.youtube.trim().length > 0
      ? parsedSocialLinks.youtube
      : "https://youtube.com";
  const twitter =
    parsedSocialLinks.twitter && parsedSocialLinks.twitter.trim().length > 0
      ? parsedSocialLinks.twitter
      : "https://twitter.com";
  const instagram =
    parsedSocialLinks.instagram && parsedSocialLinks.instagram.trim().length > 0
      ? parsedSocialLinks.instagram
      : "https://instagram.com";

  return (
    <div className="flex flex-col">
      {/* Background Section (Banner) */}
      <section className="relative h-48">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            background: `linear-gradient(180deg, rgba(221, 177, 31, 0) 0%, rgba(221, 177, 31, 0.5) 100%), url('${bannerUrl}')`,
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
                <span className="text-xl font-bold text-[#262626]">
                  {specialCardsCount}
                </span>
                <p className="text-base text-[#525252]">Special Cards</p>
              </div>
              <div>
                <span className="text-xl font-bold text-[#262626]">
                  {followersCount}
                </span>
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
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition transform duration-300 text-[#858584] hover:text-[#ff9800]"
                >
                  <FaGlobe />
                </a>
                <a
                  href={discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition transform duration-300 text-[#858584] hover:text-[#5865F2]"
                >
                  <FaDiscord />
                </a>
                <a
                  href={youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition transform duration-300 text-[#858584] hover:text-[#FF0000]"
                >
                  <FaYoutube />
                </a>
                <a
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition transform duration-300 text-[#858584] hover:text-[#1DA1F2]"
                >
                  <FaTwitter />
                </a>
                <a
                  href={instagram}
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
            <button className="btn bg-call-to-actions-900 text-white hover:bg-call-to-actions-800">
              <span>+ Follow</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
