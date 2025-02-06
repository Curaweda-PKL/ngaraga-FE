import React, {ChangeEvent, useRef} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Upload} from "lucide-react";

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div>
        <label className="block mb-2 text-sm font-medium">Card Image *</label>
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

      <div>
        <label className="block mb-2 text-sm font-medium">Price *</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Sale Price</label>
          <label className="inline-flex items-center cursor-pointer">
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
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600">
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform transform ${
                  formData.isSaleActive ? "translate-x-5" : ""
                }`}
              ></div>
            </div>
          </label>
        </div>
        <input
          type="text"
          name="salePrice"
          value={formData.salePrice}
          onChange={handleInputChange}
          className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 ${
            formData.isSaleActive ? "line-through text-red-500" : ""
          }`}
          disabled={!formData.isSaleActive}
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Stock *</label>
        <input
          type="text"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Card Details</label>
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
