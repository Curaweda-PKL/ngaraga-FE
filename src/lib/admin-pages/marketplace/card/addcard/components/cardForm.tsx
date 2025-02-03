import React, { ChangeEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Upload } from "lucide-react";

interface CardFormProps {
  formData: any;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const CardForm: React.FC<CardFormProps> = ({
  formData,
  handleInputChange,
  handleImageUpload,
  handleDragOver,
  handleDrop,
  setFormData,
}) => {
  return (
    <div className="space-y-6">
      {/* Card Image */}
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
              className="w-full h-48 object-cover rounded-lg"
            />
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg flex items-center gap-2">
                  <Upload size={20} /> Browse
                </button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
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

      {/* Card Name */}
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

      {/* SKU */}
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

      {/* Price */}
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
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:bg-blue-600"></div>
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

      {/* Stock */}
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

      {/* Card Details using ReactQuill */}
      <div>
        <label className="block mb-2 text-sm">Card Details</label>
        <div className="border rounded-lg">
          <ReactQuill
            value={formData.cardDetails}
            onChange={(value) =>
              setFormData((prev: any) => ({ ...prev, cardDetails: value }))
            }
            placeholder="Write your card details..."
          />
        </div>
      </div>
    </div>
  );
};

export default CardForm;
