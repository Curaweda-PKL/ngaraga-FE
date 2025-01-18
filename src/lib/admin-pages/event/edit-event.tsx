import React, {useState, ChangeEvent} from "react";
import {Upload} from "lucide-react";
import {
  Palette,
  Shapes,
  Music,
  Camera,
  Video,
  Wrench,
  Trophy,
  Glasses,
} from "lucide-react";

export const EditEvent = () => {
  const [formData, setFormData] = useState({
    cardImage: null as string | ArrayBuffer | null,
    cardName: "",
    sku: "",
    price: "",
    salePrice: false,
    stock: "",
    cardDetails: "",
    categories: [] as string[],
    creator: false,
    tag: false,
    source: false,
  });

  const categories = [
    {name: "Art", icon: <Palette className="w-4 h-4" />},
    {name: "Collectibles", icon: <Shapes className="w-4 h-4" />},
    {name: "Music", icon: <Music className="w-4 h-4" />},
    {name: "Photography", icon: <Camera className="w-4 h-4" />},
    {name: "Video", icon: <Video className="w-4 h-4" />},
    {name: "Utility", icon: <Wrench className="w-4 h-4" />},
    {name: "Sport", icon: <Trophy className="w-4 h-4" />},
    {name: "Virtual Worlds", icon: <Glasses className="w-4 h-4" />},
  ];

  const creators = [
    {name: "Astrovia", avatar: "/api/placeholder/32/32"},
    {name: "Cosmara", avatar: "/api/placeholder/32/32"},
    {name: "Stellaris", avatar: "/api/placeholder/32/32"},
    {name: "Nebulion", avatar: "/api/placeholder/32/32"},
    {name: "Galactica", avatar: "/api/placeholder/32/32"},
  ];

  const tags = [
    "Animation Voyager",
    "Illustration Culture",
    "Moon Hopper",
    "Animation Traveler",
    "Comet Illustration",
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value, type} = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          cardImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          cardImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Add Card</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column - Form Fields */}
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
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg flex items-center gap-2">
                      <Upload size={20} />
                      Browse
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
                  <p className="text-xs text-gray-400">
                    jpeg, jpg, png, max 4mb
                  </p>
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
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="salePrice"
                  checked={formData.salePrice}
                  onChange={handleInputChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

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
              <div className="flex gap-2 p-2 border-b">
                {/* Rich Text Editor Controls */}
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M13 5h-2v6H5v2h6v6h2v-6h6v-2h-6z"
                    />
                  </svg>
                </button>
                {/* Add more editor controls as needed */}
              </div>
              <textarea
                name="cardDetails"
                value={formData.cardDetails}
                onChange={handleInputChange}
                className="w-full p-4 min-h-[200px] focus:outline-none"
                placeholder="Write your card details..."
              />
            </div>
          </div>
        </div>

        {/* Right Column - Categories and Settings */}
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm">Categories *</label>
            <div className="space-y-2 bg-white p-4 rounded-lg border">
              {categories.map((category) => (
                <label
                  key={category.name}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={formData.categories.includes(category.name)}
                    onChange={(e) => {
                      const newCategories = e.target.checked
                        ? [...formData.categories, category.name]
                        : formData.categories.filter(
                            (c) => c !== category.name
                          );
                      setFormData((prev) => ({
                        ...prev,
                        categories: newCategories,
                      }));
                    }}
                  />
                  <span className="flex items-center gap-2">
                    {category.icon}
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">Creator</label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="creator"
                  checked={formData.creator}
                  onChange={handleInputChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
            {formData.creator && (
              <div className="space-y-2 bg-white p-4 rounded-lg border">
                {creators.map((creator) => (
                  <label
                    key={creator.name}
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="creator"
                      className="form-radio"
                    />
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{creator.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">Tag</label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="tag"
                  checked={formData.tag}
                  onChange={handleInputChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
            {formData.tag && (
              <div className="space-y-2 bg-white p-4 rounded-lg border">
                {tags.map((tag) => (
                  <label
                    key={tag}
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox"
                    />
                    <span>{tag}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">Source</label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="source"
                  checked={formData.source}
                  onChange={handleInputChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
            {formData.source && (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="View on Etherscan"
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="View Original"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">
          Cancel
        </button>
        <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
          Save
        </button>
      </div>
    </div>
  );
};
