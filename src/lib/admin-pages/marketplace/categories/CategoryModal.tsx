import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitText: string;
  onSubmit: (name: string, seriesId: number, image: File, code?: string) => void; // Tambahkan code
  defaultValue?: string;
  defaultCode?: string; // Tambahkan defaultCode
  loadingSeries: boolean;
  errorSeries: string | null;
  series: { id: number; name: string }[];
  selectedSeries: number | null;
  setSelectedSeries: (value: number | null) => void;
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  title,
  submitText,
  onSubmit,
  defaultValue = "",
  defaultCode = "", // Tambahkan defaultCode
  loadingSeries,
  errorSeries,
  series,
  selectedSeries,
  setSelectedSeries,
  selectedImage,
  setSelectedImage,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [code, setCode] = useState(defaultCode); // Tambahkan state untuk code
  const [error, setError] = useState("");

  useEffect(() => setInputValue(defaultValue), [defaultValue]);
  useEffect(() => setCode(defaultCode), [defaultCode]); // Set defaultCode saat prop berubah

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!inputValue.trim()) {
      setError("Category name is required.");
      return;
    }
    if (selectedSeries === null) {
      setError("Please select a series.");
      return;
    }
    if (!selectedImage) {
      setError("Please upload an SVG image.");
      return;
    }

    onSubmit(inputValue, selectedSeries, selectedImage, code); // Sertakan code
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4">
          {/* Series Select */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Series*
          </label>
          {loadingSeries ? (
            <p>Loading Series...</p>
          ) : errorSeries ? (
            <p className="text-red-500">{errorSeries}</p>
          ) : (
            <select
              value={selectedSeries || ""}
              onChange={(e) => setSelectedSeries(e.target.value ? Number(e.target.value) : null)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Select Series</option>
              {series.map((serie) => (
                <option key={serie.id} value={serie.id}>
                  {serie.name}
                </option>
              ))}
            </select>
          )}

          {/* Image Upload Field */}
          <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
            Category Image*
          </label>
          <label
            htmlFor="imageUpload"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer flex justify-between items-center"
          >
            <span className="text-gray-500">{selectedImage ? selectedImage.name : "No file chosen"}</span>
            <span className="bg-gray-100 hover:bg-gray-200 px-4 py-1 rounded-md text-sm">Browse</span>
          </label>
          <input
            type="file"
            id="imageUpload"
            accept=".svg"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && file.type === "image/svg+xml") {
                setSelectedImage(file);
                setError("");
              } else {
                setError("Only SVG files are allowed.");
              }
            }}
          />
          {selectedImage && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="w-16 h-16 object-cover border rounded-md"
              />
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1 ml-2">SVG only *</p>

          {/* Category Name Input */}
          <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
            Category Name*
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError("");
            }}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {/* Code Input (Optional) */}
          <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
            Category Code (Optional)
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter category code"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 p-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!inputValue.trim() || selectedSeries === null || !selectedImage}
            className={`px-4 py-2 rounded-lg text-white ${
              !inputValue.trim() || selectedSeries === null || !selectedImage
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-call-to-actions-900 hover:bg-call-to-actions-800"
            }`}
          >
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
};