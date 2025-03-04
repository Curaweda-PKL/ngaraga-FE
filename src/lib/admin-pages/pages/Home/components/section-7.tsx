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
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

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
    setMessage(null);
    setLoading(true);

    if (
      !formData.title ||
      !formData.findCardTitle ||
      !formData.scanCardTitle ||
      !formData.tradingTitle
    ) {
      setMessage({
        type: "error",
        text: "Harap isi semua field yang diperlukan.",
      });
      setLoading(false); // Kembalikan loading jika validasi gagal
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("slug", "flash-sale");
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("findCardTitle", formData.findCardTitle);
    formDataToSend.append("scanCardTitle", formData.scanCardTitle);
    formDataToSend.append("tradingTitle", formData.tradingTitle);
    formDataToSend.append("findCardDescription", formData.findCardDescription);
    formDataToSend.append("scanCardDescription", formData.scanCardDescription);
    formDataToSend.append("tradingDescription", formData.tradingDescription);

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
      setMessage({
        type: "success",
        text: result.message || "Data berhasil disimpan!",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Terjadi kesalahan saat menyimpan data.",
      });
    } finally {
      setLoading(false);
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
      <h2 className="text-lg font-medium mb-6">Section 7 - Find Card Scan Card Trading Card</h2>
      {message && (
        <div
          className={`mb-4 text-center ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

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
            disabled={loading}
            className="px-4 py-2 bg-[#E9B824] text-white rounded-md hover:bg-[#d6a820] disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};
