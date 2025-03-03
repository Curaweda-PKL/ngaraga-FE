import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
import { SERVER_URL } from "@/middleware/utils";

interface FormData {
  slug: string;
  title: string;
  description: string;
  findCardTitle: string;
  scanCardTitle: string;
  tradingTitle: string;
  findCardDescription: string;
  scanCardDescription: string;
  tradingDescription: string;
  findCardImage: File | null;
  scanCardImage: File | null;
  tradingImage: File | null;
}

interface ImageUploadSectionProps {
  imageKey: keyof Pick<
    FormData,
    "findCardImage" | "scanCardImage" | "tradingImage"
  >;
  currentImage: File | null;
  onImageChange: (key: keyof FormData, file: File | null) => void;
}

export const SectionSevenForm = () => {
  const [formData, setFormData] = useState<FormData>({
    slug: "",
    title: "",
    description: "",
    findCardTitle: "",
    scanCardTitle: "",
    tradingTitle: "",
    findCardDescription: "",
    scanCardDescription: "",
    tradingDescription: "",
    findCardImage: null,
    scanCardImage: null,
    tradingImage: null,
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleImageChange = (key: keyof FormData, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      [key]: file,
    }));
  };

  const handleInputChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    setSuccessMessage("");
    if (
      !formData.title ||
      !formData.findCardTitle ||
      !formData.scanCardTitle ||
      !formData.tradingTitle
    ) {
      setSuccessMessage("Harap isi semua field yang diperlukan.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("slug", "section-seven");
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("findCardTitle", formData.findCardTitle);
    formDataToSend.append("scanCardTitle", formData.scanCardTitle);
    formDataToSend.append("tradingTitle", formData.tradingTitle);
    formDataToSend.append("findCardDescription", formData.findCardDescription);
    formDataToSend.append("scanCardDescription", formData.scanCardDescription);
    formDataToSend.append("tradingDescription", formData.tradingDescription);

    // Append image files if they exist
    if (formData.findCardImage)
      formDataToSend.append("findCardImage", formData.findCardImage);
    if (formData.scanCardImage)
      formDataToSend.append("scanCardImage", formData.scanCardImage);
    if (formData.tradingImage)
      formDataToSend.append("tradingImage", formData.tradingImage);

    try {
      const response = await fetch(`${SERVER_URL}/api/findscan-trading`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan data.");
      }

      const result = await response.json();
      setSuccessMessage(result.message || "Data berhasil disimpan!");
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("Terjadi kesalahan saat menyimpan data.");
    }
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
    useEffect(() => {
      return () => {
        if (currentImage) {
          URL.revokeObjectURL(URL.createObjectURL(currentImage));
        }
      };
    }, [currentImage]);
    

    return (
      <div className="relative border-dashed border-2 border-gray-300 rounded-lg p-4 bg-yellow-50">
        {currentImage ? (
          <div className="relative">
            <img
              src={URL.createObjectURL(currentImage)}
              alt="Uploaded"
              className="w-full h-32 object-cover rounded"
            />
            <button
              onClick={() => onImageChange(imageKey, null)}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100"
            >
              <IoMdClose className="text-gray-600" />
            </button>
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
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-medium mb-6">Section 7</h2>

      <div className="space-y-6">
        {/* Title and Description */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter title"
              className="w-full border rounded-lg px-4 py-2.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter description"
              className="w-full border rounded-lg px-4 py-2.5"
            />
          </div>
        </div>

        {/* Image Upload Sections */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Find Card Image *
            </label>
            <ImageUploadSection
              imageKey="findCardImage"
              currentImage={formData.findCardImage}
              onImageChange={handleImageChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scan Card Image *
            </label>
            <ImageUploadSection
              imageKey="scanCardImage"
              currentImage={formData.scanCardImage}
              onImageChange={handleImageChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trading Image *
            </label>
            <ImageUploadSection
              imageKey="tradingImage"
              currentImage={formData.tradingImage}
              onImageChange={handleImageChange}
            />
          </div>
        </div>

        {/* Find Card, Scan Card, Trading Sections */}
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Find Card Title *
            </label>
            <input
              type="text"
              value={formData.findCardTitle}
              onChange={(e) =>
                handleInputChange("findCardTitle", e.target.value)
              }
              placeholder="Enter find card title"
              className="w-full border rounded-lg px-4 py-2.5"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Find Card Description *
            </label>
            <input
              type="text"
              value={formData.findCardDescription}
              onChange={(e) =>
                handleInputChange("findCardDescription", e.target.value)
              }
              placeholder="Enter find card description"
              className="w-full border rounded-lg px-4 py-2.5"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scan Card Title *
            </label>
            <input
              type="text"
              value={formData.scanCardTitle}
              onChange={(e) =>
                handleInputChange("scanCardTitle", e.target.value)
              }
              placeholder="Enter scan card title"
              className="w-full border rounded-lg px-4 py-2.5"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scan Card Description *
            </label>
            <input
              type="text"
              value={formData.scanCardDescription}
              onChange={(e) =>
                handleInputChange("scanCardDescription", e.target.value)
              }
              placeholder="Enter scan card description"
              className="w-full border rounded-lg px-4 py-2.5"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trading Title *
            </label>
            <input
              type="text"
              value={formData.tradingTitle}
              onChange={(e) =>
                handleInputChange("tradingTitle", e.target.value)
              }
              placeholder="Enter trading title"
              className="w-full border rounded-lg px-4 py-2.5"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trading Description *
            </label>
            <input
              type="text"
              value={formData.tradingDescription}
              onChange={(e) =>
                handleInputChange("tradingDescription", e.target.value)
              }
              placeholder="Enter trading description"
              className="w-full border rounded-lg px-4 py-2.5"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Save
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mt-4 text-center text-green-600">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};
