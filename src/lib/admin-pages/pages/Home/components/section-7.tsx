import React, {useState} from "react";
import {IoMdClose} from "react-icons/io";
import {IoImageOutline} from "react-icons/io5";

interface FormData {
  mainTitle: string;
  mainDescription: string;
  image1: File | null;
  image2: File | null;
  image3: File | null;
  findCardTitle: string;
  scanCardTitle: string;
  findCardDescription: string;
  scanCardDescription: string;
  lastTitle: string;
  lastDescription: string;
}

interface ImageUploadSectionProps {
  imageKey: keyof Pick<FormData, "image1" | "image2" | "image3">;
  currentImage: File | null;
  required?: boolean;
  onImageChange: (key: string, file: File | null) => void;
}

export const SectionSevenForm = () => {
  const [formData, setFormData] = useState<FormData>({
    mainTitle: "How it works",
    mainDescription: "Find out how to get started",
    image1: null,
    image2: null,
    image3: null,
    findCardTitle: "Find your Card",
    scanCardTitle: "Scan Your Card",
    findCardDescription:
      "Set up your wallet of choice. Connect it to the Animarket by clicking the wallet icon in the top right corner.",
    scanCardDescription:
      "Upload your work and setup your collection. Add a description, social links and floor price.",
    lastTitle: "Its work",
    lastDescription:
      "Choose between auctions and fixed-price listings. Start earning by selling your NFTs or trading others.",
  });

  const handleImageChange = (key: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      [key]: file,
    }));
  };

  const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
    imageKey,
    currentImage,
    onImageChange,
  }) => {
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      onImageChange(imageKey, file);
    };

    return (
      <div className="relative">
        <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 bg-yellow-50">
          {currentImage ? (
            <div className="relative">
              <img
                src={URL.createObjectURL(currentImage)}
                alt="Uploaded"
                className="w-full h-32 object-cover rounded"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => onImageChange(imageKey, null)}
                  className="p-1 bg-white rounded-full shadow hover:bg-gray-100"
                >
                  <IoImageOutline className="text-gray-600" />
                </button>
                <button
                  onClick={() => onImageChange(imageKey, null)}
                  className="p-1 bg-white rounded-full shadow hover:bg-gray-100"
                >
                  <IoMdClose className="text-gray-600" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <input
                type="file"
                id={`file-${imageKey}`}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
              <label
                htmlFor={`file-${imageKey}`}
                className="bg-call-to-action text-white px-4 py-1 rounded-md text-sm cursor-pointer inline-block"
              >
                Browse
              </label>
              <p className="text-red-500 text-xs mt-2">
                Click to Upload or Drag & Drop
              </p>
              <p className="text-gray-400 text-xs">jpeg, jpg, png max 4mb</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-medium mb-6">Section 7</h2>

      <div className="space-y-6">
        {/* First Row */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.mainTitle}
                onChange={(e) =>
                  setFormData((prev) => ({...prev, mainTitle: e.target.value}))
                }
                className="w-full border rounded-lg px-4 py-2.5 pr-10"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <IoMdClose className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.mainDescription}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    mainDescription: e.target.value,
                  }))
                }
                className="w-full border rounded-lg px-4 py-2.5 pr-10"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <IoMdClose className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Image Upload Row */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image *
            </label>
            <ImageUploadSection
              imageKey="image1"
              currentImage={formData.image1}
              required
              onImageChange={handleImageChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image *
            </label>
            <ImageUploadSection
              imageKey="image2"
              currentImage={formData.image2}
              required
              onImageChange={handleImageChange}
            />
          </div>
        </div>
        {/* Card Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Find Card */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.findCardTitle}
                  className="w-full border rounded-lg px-4 py-2.5 pr-10"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <IoMdClose className="text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.findCardDescription}
                  className="w-full border rounded-lg px-4 py-2.5 pr-10"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <IoMdClose className="text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image *
              </label>
              <ImageUploadSection
                imageKey="image3"
                currentImage={formData.image3}
                required
                onImageChange={function (
                  _key: string,
                  _file: File | null
                ): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </div>

          {/* Scan Card */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.scanCardTitle}
                  className="w-full border rounded-lg px-4 py-2.5 pr-10"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <IoMdClose className="text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.scanCardDescription}
                  className="w-full border rounded-lg px-4 py-2.5 pr-10"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <IoMdClose className="text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Last Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.lastTitle}
                className="w-full border rounded-lg px-4 py-2.5 pr-10"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <IoMdClose className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.lastDescription}
                className="w-full border rounded-lg px-4 py-2.5 pr-10"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <IoMdClose className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
