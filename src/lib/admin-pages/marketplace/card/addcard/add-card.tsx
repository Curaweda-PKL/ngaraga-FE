import axios from "axios";
import { Upload } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const AddCard = () => {
  // Categories state
  const [apiCategories, setApiCategories] = useState<
    { name: string; image: string | null }[]
  >([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  // Creators state (fetched from API)
  const [apiCreators, setApiCreators] = useState<
    { name: string; image: string | null }[]
  >([]);
  const [creatorsLoading, setCreatorsLoading] = useState(true);
  const [creatorsError, setCreatorsError] = useState<string | null>(null);

  // Tags state (fetched from API)
  const [apiTags, setApiTags] = useState<{ id: number; name: string }[]>([]);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [tagsError, setTagsError] = useState<string | null>(null);

  // Form data state
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
    selectedCreator: "", // new field for selected creator
    tag: false,
    tags: [] as string[], // selected tags (will hold tag names)
    source: false,
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/categories/all"
        );
        const categoriesData = response.data.categories.map((cat: any) => ({
          name: cat.name,
          image: cat.image
            ? `http://localhost:3000/${cat.image.replace(/\\/g, "/")}`
            : null,
        }));
        setApiCategories(categoriesData);
        setCategoriesError(null);
      } catch (err) {
        setCategoriesError("Failed to load categories");
        setApiCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch creators (only name and image)
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/creator/all"
        );
        const creatorsData = response.data.creators.map((creator: any) => ({
          name: creator.name,
          image: creator.image
            ? `http://localhost:3000/uploads/creator/${encodeURIComponent(
                creator.image
              )}`
            : null,
        }));
        setApiCreators(creatorsData);
        setCreatorsError(null);
      } catch (error) {
        console.error("Error fetching creators:", error);
        setCreatorsError("Failed to load creators");
        setApiCreators([]);
      } finally {
        setCreatorsLoading(false);
      }
    };

    fetchCreators();
  }, []);

  // Fetch tags (only take the name)
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tags/all");
        // Assuming the API returns { tags: [{ id, name, ... }, ...] }
        setApiTags(response.data.tags);
        setTagsError(null);
      } catch (error) {
        console.error("Error fetching tags:", error);
        setTagsError("Failed to load tags");
        setApiTags([]);
      } finally {
        setTagsLoading(false);
      }
    };

    fetchTags();
  }, []);

  // Input change handler
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Image upload handler
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

  // Drag over and drop handlers for image upload
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
                  setFormData((prev) => ({ ...prev, cardDetails: value }))
                }
                placeholder="Write your card details..."
              />
            </div>
          </div>
        </div>

        {/* Right Column - Categories and Settings */}
        <div className="space-y-6 ">
          {/* Categories Section */}
          <div>
            <label className="block mb-2 text-sm">Categories *</label>
            <div className="space-y-2 bg-white p-4 rounded-lg border">
              {categoriesLoading ? (
                <div className="text-gray-500">Loading categories...</div>
              ) : categoriesError ? (
                <div className="text-red-500">{categoriesError}</div>
              ) : (
                apiCategories.map((category) => {
                  const id = `category-${category.name}`;
                  return (
                    <div
                      key={category.name}
                      className="category-checkbox flex items-center gap-y-2 mb-2"
                    >
                      <input
                        type="checkbox"
                        id={id}
                        className="hidden"
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
                      <label htmlFor={id} className="flex items-center gap-2">
                        {category.image && (
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-4 h-4 object-contain inline-block"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        )}
                        <span className="inline-block ml-2">
                          {category.name}
                        </span>
                      </label>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Creator Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">Creator</label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="creator"
                  checked={formData.creator}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>
            </div>
            {formData.creator && (
              <div className="space-y-2 bg-white p-4 rounded-lg border">
                {creatorsLoading ? (
                  <div className="text-gray-500">Loading creators...</div>
                ) : creatorsError ? (
                  <div className="text-red-500">{creatorsError}</div>
                ) : (
                  apiCreators.map((creator) => (
                    <label
                      key={creator.name}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="selectedCreator"
                        value={creator.name}
                        checked={formData.selectedCreator === creator.name}
                        onChange={handleInputChange}
                        className="form-radio"
                      />
                      {creator.image && (
                        <img
                          src={creator.image}
                          alt={creator.name}
                          className="w-8 h-8 rounded-full object-contain"
                        />
                      )}
                      <span>{creator.name}</span>
                    </label>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Tag Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">Tag</label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="tag"
                  checked={formData.tag}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>
            </div>
            {formData.tag && (
              <div className="space-y-2 bg-white p-4 rounded-lg border">
                {tagsLoading ? (
                  <div className="text-gray-500">Loading tags...</div>
                ) : tagsError ? (
                  <div className="text-red-500">{tagsError}</div>
                ) : (
                  apiTags.map((tag) => {
                    const id = `tag-${tag.id}`;
                    return (
                      <div key={tag.id} className="tag-checkbox">
                        <input
                          type="checkbox"
                          id={id}
                          className="hidden"
                          checked={formData.tags.includes(tag.name)}
                          onChange={(e) => {
                            const newTags = e.target.checked
                              ? [...formData.tags, tag.name]
                              : formData.tags.filter((t) => t !== tag.name);
                            setFormData((prev) => ({
                              ...prev,
                              tags: newTags,
                            }));
                          }}
                        />
                        <label htmlFor={id}>{tag.name}</label>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Source Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">Source</label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="source"
                  checked={formData.source}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>
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
