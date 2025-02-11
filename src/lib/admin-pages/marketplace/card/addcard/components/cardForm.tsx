import React, {ChangeEvent, useRef} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Upload, Trash} from "lucide-react";

interface CardFormProps {
  formData: {
    cardImage: string | ArrayBuffer | null;
    cardName: string;
    sku: string;
    price: string;
    salePrice: string;
    isSaleActive: boolean;
    stock: string;
    cardDetails: string;
    categories?: string[];
    creator?: boolean;
    selectedCreator?: string;
    tag?: boolean;
    tags?: string[];
    source?: boolean;
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
      salePrice: string;
      isSaleActive: boolean;
      stock: string;
      cardDetails: string;
      categories?: string[];
      creator?: boolean;
      selectedCreator?: string;
      tag?: boolean;
      tags?: string[];
      source?: boolean;
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image removal
  const handleRemoveImage = () => {
    setFormData((prev) => ({...prev, cardImage: null}));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      {/* Image Upload Section */}
      <div>
        <label className="block mb-2 text-sm font-medium">Card Image *</label>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 relative"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {formData.cardImage ? (
            <div className="relative">
              <img
                src={formData.cardImage.toString()}
                alt="Card"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                onClick={handleRemoveImage}
              >
                <Trash size={16} />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg flex items-center gap-2"
              >
                <Upload size={20} /> Browse
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              <p className="text-sm text-gray-500">
                Click to Upload or Drag & Drop
              </p>
              <p className="text-xs text-gray-400">jpeg, jpg, png, max 4MB</p>
            </div>
          )}
        </div>
      </div>

      {/* Form Inputs */}
      <div>
        <label className="block mb-2 text-sm font-medium">Card Name *</label>
        <input
          type="text"
          name="cardName"
          value={formData.cardName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      {/* SKU Input */}
      <div>
        <label className="block mb-2 text-sm font-medium">SKU *</label>
        <input
          type="text"
          name="sku"
          value={formData.sku}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      {/* Price Input */}
      <div>
        <label className="block mb-2 text-sm font-medium">Price *</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          min="0"
        />
      </div>

      {/* Sale Price */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Sale Price</label>
          <input
            type="checkbox"
            name="isSaleActive"
            checked={formData.isSaleActive}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isSaleActive: e.target.checked,
              }))
            }
          />
        </div>
        <input
          type="number"
          name="salePrice"
          value={formData.salePrice}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          disabled={!formData.isSaleActive}
          min="0"
        />
      </div>

      {/* Stock Input */}
      <div>
        <label className="block mb-2 text-sm font-medium">Stock *</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          min="1"
        />
      </div>

      {/* Card Details */}
      <div>
        <label className="block mb-2 text-sm font-medium">Card Details</label>
        <ReactQuill
          value={formData.cardDetails}
          onChange={(value) =>
            setFormData((prev) => ({...prev, cardDetails: value}))
          }
          placeholder="Write your card details..."
        />
      </div>
    </div>
  );
};

export default CardForm;
