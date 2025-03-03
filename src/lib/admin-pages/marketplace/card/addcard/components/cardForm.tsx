import React, { ChangeEvent, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Upload} from "lucide-react";

interface CardFormProps {
  formData: {
    cardImage: string | ArrayBuffer | null;
    cardName: string;
    sku: string;
    price: string;
    salePrice: boolean;
    discountedPrice: string; // NEW FIELD
    stock: string;
    cardDetails: string;
    categories: string[];
    creator: boolean;
    selectedCreator: string;
    tag: boolean;
    tags: string[];
    source: boolean;
    sourceImageWebsite: string;
    sourceImageAlt: string;
    cardType: string;
  };
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleImageUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  setFormData: React.Dispatch<
    React.SetStateAction<{
      cardImage: string | ArrayBuffer | null;
      cardName: string;
      sku: string;
      price: string;
      salePrice: boolean;
      discountedPrice: string;
      stock: string;
      cardDetails: string;
      categories: string[];
      creator: boolean;
      selectedCreator: string;
      tag: boolean;
      tags: string[];
      source: boolean;
      sourceImageWebsite: string;
      sourceImageAlt: string;
      cardType: string;
    }>
  >;
}

const CardForm: React.FC<CardFormProps> = ({
  formData,
  handleInputChange,
  handleImageUpload,
  handleDragOver,
  handleDrop,
  setFormData,
}) => {
  // Create a ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-2 text-sm">Card Image *</label>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {formData.cardImage ? (
            <img
              src={formData.cardImage.toString()}
              alt="Card"
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-call-to-actions-900 text-white rounded-lg flex items-center gap-2"
                >
                  <Upload size={20} />
                  Browse
                </button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
              </div>
              <p className="text-sm text-gray-500">
                Click to Upload or Drag & Drop
              </p>
              <p className="text-xs text-gray-400">jpeg, jpg, png, max 4mb</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm">Card Name *</label>
        <input
          type="text"
          name="cardName"
          value={formData.cardName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm">SKU *</label>
        <input
          type="text"
          name="sku"
          value={formData.sku}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm">Price *</label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="salePrice"
              checked={formData.salePrice}
              onChange={handleInputChange}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      {/* Conditionally render discounted price field if salePrice is true */}
      {formData.salePrice && (
        <div>
          <label className="block mb-2 text-sm mt-2">Discounted Price</label>
          <input
            type="text"
            name="discountedPrice"
            value={formData.discountedPrice}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
      )}

      <div>
        <label className="block mb-2 text-sm">Stock *</label>
        <input
          type="text"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm">Card Details</label>
        <div className="border rounded-lg">
          <ReactQuill
            value={formData.cardDetails}
            onChange={(value) =>
              setFormData((prev) => ({...prev, cardDetails: value}))
            }
            placeholder="Write your card details..."
          />
        </div>
      </div>
    </div>
  );
};

export default CardForm;
