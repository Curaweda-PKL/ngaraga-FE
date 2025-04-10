import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils";
import BasicInformation from "./components/BasicInformation";
import type { FormData, Column } from "./components/BasicInformation";
import AddressSection from "./components/AddressSection";
import { FaTrash, FaPen } from "react-icons/fa";

// Define a type for social links.
type SocialLinks = {
  website: string;
  discord: string;
  youtube: string;
  twitter: string;
  instagram: string;
};

const EditProfilePage: React.FC = () => {
  // Form data state
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    fullName: "",
    email: "",
    countryCode: "+62",
    phoneNumber: "",
    bio: "",
  });

  // Social links state as columns (ordered: website, discord, youtube, twitter, instagram)
  // Set the initial toggle state to false
  const [columns, setColumns] = useState<Column[]>(
    [...Array(5)].map(() => ({
      enabled: false,
      value: "",
    }))
  );

  // State to store the original social links fetched from the API.
  const [originalSocialLinks, setOriginalSocialLinks] = useState<SocialLinks>({
    website: "",
    discord: "",
    youtube: "",
    twitter: "",
    instagram: "",
  });

  // States to hold file objects (if user selects a new image)
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  // Flags for removal actions
  const [profileImageRemoved, setProfileImageRemoved] =
    useState<boolean>(false);
  const [bannerImageRemoved, setBannerImageRemoved] = useState<boolean>(false);

  // Helper to normalize image URLs
  const normalizeImageUrl = (rawPath: string): string => {
    let normalizedPath = rawPath.replace(/\\/g, "/").replace(/^src\//, "");
    normalizedPath = normalizedPath.replace(
      "uploadsprofile",
      "uploads/profile"
    );
    return `${SERVER_URL}/${normalizedPath}`;
  };

  const [activeTab, setActiveTab] = useState<string>("basic");
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fallback images
  const fallbackProfileImage =
    "https://comickaze.in/wp-content/uploads/woocommerce-placeholder-600x600.png";
  const fallbackBannerImage =
    "https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80";

  // Profile & Banner image states with fallback values
  const [profileImage, setProfileImage] =
    useState<string>(fallbackProfileImage);
  const [bannerImage, setBannerImage] = useState<string>(fallbackBannerImage);

  // Refs for hidden file inputs
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  // For AddressSection
  const handleAddressClick = (index: number) => {
    setSelectedAddress(index);
  };

  // Update form field values
  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update individual social link value
  const handleInputChange = (index: number, value: string) => {
    setColumns((prev) =>
      prev.map((col, idx) => (idx === index ? { ...col, value } : col))
    );
  };

  // Toggle enabled status for a social link
  const toggleColumn = (index: number) => {
    setColumns((prev) =>
      prev.map((col, idx) =>
        idx === index ? { ...col, enabled: !col.enabled } : col
      )
    );
  };

  // Update phone input handler (using the correct key: countryCode)
  const handlePhoneInputChange = (countryCode: string, phoneNumber: string) => {
    setFormData((prev) => ({
      ...prev,
      countryCode,
      phoneNumber,
    }));
  };

  // --- File Input Handlers for Banner ---
  const handleBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file for banner.");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setBannerImage(previewUrl); // Set pratinjau gambar
      setBannerFile(file); // Simpan file untuk diunggah nanti
      setBannerImageRemoved(false); // Reset status penghapusan banner
    }
  };

  const handleBannerRemove = () => {
    setBannerImage(fallbackBannerImage);
    setBannerFile(null);
    setBannerImageRemoved(true);
  };

  // --- File Input Handlers for Profile ---
  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file for profile.");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setProfileImage(previewUrl);
      setProfileFile(file);
      setProfileImageRemoved(false);
    }
  };

  const handleProfileRemove = () => {
    setProfileImage(fallbackProfileImage);
    setProfileFile(null);
    setProfileImageRemoved(true);
  };

  // Fetch the logged‑in user’s profile on mount.
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/account/profile`, {
          withCredentials: true,
        });
        const data = response.data;

        // Update form fields
        setFormData({
          userName: data.name || "",
          fullName: data.fullName || "",
          email: data.email || "",
          countryCode: data.countryCode || "+62",
          phoneNumber: data.phoneNumber || "",
          bio: data.bio || "",
        });

        if (data.image) {
          const normalizedUrl = normalizeImageUrl(data.image);
          setProfileImage(normalizedUrl);
        }
        if (data.imageBanner) {
          const normalizedBannerUrl = normalizeImageUrl(data.imageBanner);
          setBannerImage(normalizedBannerUrl);
        }

        let socialLinksData =
          typeof data.socialLinks === "string"
            ? JSON.parse(data.socialLinks)
            : data.socialLinks || {};

        // Even if data exists, force toggles to be off by default.
        setColumns([
          { enabled: false, value: socialLinksData.website || "" },
          { enabled: false, value: socialLinksData.discord || "" },
          { enabled: false, value: socialLinksData.youtube || "" },
          { enabled: false, value: socialLinksData.twitter || "" },
          { enabled: false, value: socialLinksData.instagram || "" },
        ]);
        setOriginalSocialLinks(socialLinksData);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else {
          console.error("Error fetching profile:", err);
        }
      }
    };

    fetchProfile();
  }, []);

  // Submit updated profile data.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      const socialLinksPayload = {
        website: columns[0].enabled
          ? columns[0].value
          : originalSocialLinks.website,
        discord: columns[1].enabled
          ? columns[1].value
          : originalSocialLinks.discord,
        youtube: columns[2].enabled
          ? columns[2].value
          : originalSocialLinks.youtube,
        twitter: columns[3].enabled
          ? columns[3].value
          : originalSocialLinks.twitter,
        instagram: columns[4].enabled
          ? columns[4].value
          : originalSocialLinks.instagram,
      };

      const formPayload = new FormData();
      formPayload.append("name", formData.userName);
      formPayload.append("fullName", formData.fullName);
      formPayload.append("email", formData.email);
      formPayload.append("countryCode", formData.countryCode);
      formPayload.append("phoneNumber", formData.phoneNumber);
      formPayload.append("bio", formData.bio);
      formPayload.append("socialLinks", JSON.stringify(socialLinksPayload));

      formPayload.append(
        "removeProfileImage",
        profileImageRemoved ? "true" : "false"
      );
      formPayload.append(
        "removeBannerImage",
        bannerImageRemoved ? "true" : "false"
      );

      if (profileFile) {
        formPayload.append("profileImage", profileFile);
      }
      if (bannerFile) {
        formPayload.append("bannerImage", bannerFile);
      }

      await axios.put(`${SERVER_URL}/api/account/profile`, formPayload, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessage("Profil berhasil diperbarui!");

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err: any) {
      console.error("Error updating profile", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Gagal memperbarui profil. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Background Banner */}
      {successMessage && (
        <div className="mt-4 p-3 bg-green-500 text-white rounded-lg text-center">
          {successMessage}
        </div>
      )}
      <section className="relative h-48 sm:h-80">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{ backgroundImage: `url('${bannerImage}')` }}
        >
          {/* Input file untuk banner */}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={bannerInputRef}
            onChange={handleBannerFileChange}
          />
          {/* Tombol Edit dan Hapus Banner */}
          <div className="absolute bottom-4 left-4 flex space-x-4">
            <button
              type="button"
              onClick={() => bannerInputRef.current?.click()}
              className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-200"
            >
              <FaPen size={20} />
            </button>
            {bannerImage !== fallbackBannerImage && (
              <button
                type="button"
                onClick={handleBannerRemove}
                className="bg-white text-red-500 p-2 rounded-full hover:bg-gray-200"
              >
                <FaTrash size={20} />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl p-4 sm:p-10 flex flex-col sm:flex-row sm:space-x-10"
        >
          {/* Left Section: Tabs & Profile Picture */}
          <div className="flex flex-col sm:flex-row sm:w-1/3">
            <div className="flex flex-col items-center sm:items-start sm:pr-6 sm:border-r sm:border-gray-300 mt-4">
              <button
                type="button"
                onClick={() => setActiveTab("basic")}
                className={`${
                  activeTab === "basic"
                    ? "bg-call-to-actions-100 border border-call-to-actions-900 text-call-to-actions-900"
                    : "bg-neutral-colors-100 border border-neutral-colors-400"
                } px-6 py-2 mb-4 rounded-lg text-lg font-medium w-full text-center`}
              >
                Basic Information
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("address")}
                className={`${
                  activeTab === "address"
                    ? "bg-call-to-actions-100 border border-call-to-actions-900 text-call-to-actions-900"
                    : "bg-neutral-colors-100 border border-neutral-colors-400"
                } px-6 py-2 rounded-lg text-lg font-medium w-full text-center`}
              >
                Address
              </button>
            </div>

            <div className="flex flex-col items-center mt-6 sm:mt-0 sm:pl-6 relative">
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={profileInputRef}
                onChange={handleProfileFileChange}
              />
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 mt-4 mb-6">
                <img
                  src={profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full rounded-lg object-cover shadow-lg"
                />
                <div className="absolute bottom-2 left-2 flex space-x-2">
                  <button
                    type="button"
                    onClick={() => profileInputRef.current?.click()}
                    className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-200"
                  >
                    <FaPen size={16} />
                  </button>
                  {profileImage !== fallbackProfileImage && (
                    <button
                      type="button"
                      onClick={handleProfileRemove}
                      className="bg-white text-red-500 p-2 rounded-full hover:bg-gray-200"
                    >
                      <FaTrash size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Form Content */}
          <div className="flex-grow mt-6 sm:mt-0">
            {activeTab === "basic" ? (
              <BasicInformation
                formData={formData}
                handleFormChange={handleFormChange}
                columns={columns}
                handleInputChange={handleInputChange}
                toggleColumn={toggleColumn}
                onPhoneChange={handlePhoneInputChange}
              />
            ) : (
              <AddressSection
                selectedAddress={selectedAddress}
                handleAddressClick={handleAddressClick}
              />
            )}

            {error && (
              <div className="mt-4 text-red-500 text-center sm:text-left">
                {error}
              </div>
            )}

            {activeTab === "basic" && (
              <button
                type="submit"
                disabled={loading}
                className="mt-6 bg-call-to-actions-900 text-white py-3 px-5 rounded-md text-sm font-medium hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 w-full sm:w-auto"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
