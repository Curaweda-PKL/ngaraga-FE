import React, { useEffect } from "react";
import PhoneInput from "@/lib/pages/checkout/components/PhoneInput";
import { AiOutlineUser, AiOutlineDiscord, AiOutlineYoutube } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import { CiGlobe, CiTwitter } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";

// Define and export SocialLinks type
export type SocialLinks = {
  website: string;
  discord: string;
  youtube: string;
  twitter: string;
  instagram: string;
};

export interface FormData {
  userName: string;
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  bio: string;
}

export interface Column {
  enabled: boolean;
  value: string;
}

interface BasicInformationProps {
  formData: FormData;
  handleFormChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  columns: Column[];
  handleInputChange: (index: number, value: string) => void;
  toggleColumn: (index: number) => void;
  onPhoneChange: (countryCode: string, phoneNumber: string) => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({
  formData,
  handleFormChange,
  columns,
  handleInputChange,
  toggleColumn,
  onPhoneChange,
}) => {
  const placeholders = [
    "website",
    "discord",
    "youtube",
    "twitter",
    "instagram",
  ];

  // Ensure that all social link toggles are closed on first mount
  useEffect(() => {
    if (!columns || !toggleColumn) return;
    try {
      columns.forEach((column, index) => {
        if (column.enabled) {
          toggleColumn(index);
        }
      });
    } catch (error) {
      console.error("Error resetting social links toggles: ", error);
    }
    // Only run on initial mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Username Field */}
      <div className="relative w-full mt-4 mb-4">
        <AiOutlineUser
          className="absolute text-neutral-colors-500 left-3 top-1/2 transform -translate-y-1/2"
          size={23}
        />
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleFormChange}
          placeholder="Username"
          className="w-full border border-neutral-colors-500 rounded-lg p-3 pl-11"
        />
      </div>

      {/* Full Name Field */}
      <div className="relative w-full mt-4 mb-4">
        <AiOutlineUser
          className="absolute text-neutral-colors-500 left-3 top-1/2 transform -translate-y-1/2"
          size={23}
        />
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleFormChange}
          placeholder="Full Name"
          className="w-full border border-neutral-colors-500 rounded-lg p-3 pl-11"
        />
      </div>

      {/* Email Field */}
      <div className="relative w-full mb-4">
        <MdOutlineMail
          className="absolute text-neutral-colors-500 left-3 top-1/2 transform -translate-y-1/2"
          size={23}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleFormChange}
          placeholder="Email"
          className="w-full border border-neutral-colors-500 rounded-lg p-3 pl-11"
        />
      </div>

      {/* Phone Field */}
      <PhoneInput
        className="w-full"
        countryCode={formData.countryCode}
        phoneNumber={formData.phoneNumber}
        onChange={onPhoneChange}
      />

      {/* Bio */}
      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleFormChange}
        className="mt-4 w-full border border-gray-300 rounded-lg p-4 shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
        placeholder="Bio"
      ></textarea>

      {/* Social Links Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Social Links (Optional)</h3>
        {columns.map((column, index) => (
          <div key={index} className="flex flex-col mt-4 space-y-2">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={column.enabled ?? false}
                onChange={() => toggleColumn(index)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            </label>
            <div className="relative flex items-center w-full mt-2">
              {index === 0 && (
                <CiGlobe
                  size={24}
                  className={`absolute left-3 ${
                    !column.enabled ? "text-gray-400" : "text-black"
                  }`}
                />
              )}
              {index === 1 && (
                <AiOutlineDiscord
                  size={24}
                  className={`absolute left-3 ${
                    !column.enabled ? "text-gray-400" : "text-black"
                  }`}
                />
              )}
              {index === 2 && (
                <AiOutlineYoutube
                  size={24}
                  className={`absolute left-3 ${
                    !column.enabled ? "text-gray-400" : "text-black"
                  }`}
                />
              )}
              {index === 3 && (
                <CiTwitter
                  size={24}
                  className={`absolute left-3 ${
                    !column.enabled ? "text-gray-400" : "text-black"
                  }`}
                />
              )}
              {index === 4 && (
                <IoLogoInstagram
                  size={24}
                  className={`absolute left-3 ${
                    !column.enabled ? "text-gray-400" : "text-black"
                  }`}
                />
              )}
              <input
                type="text"
                value={column.enabled ? column.value : placeholders[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                disabled={!column.enabled}
                className={`block w-full pl-12 border rounded-lg shadow-sm p-4 text-lg ${
                  column.enabled
                    ? "border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                    : "bg-gray-100 border-gray-200 text-gray-400"
                }`}
                title={
                  placeholders[index].charAt(0).toUpperCase() +
                  placeholders[index].slice(1)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BasicInformation;
