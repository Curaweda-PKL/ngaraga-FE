import React, {ChangeEvent, useEffect, useState} from "react";

interface CardSettingsProps {
  formData: {
    categories: string[]; // storing category IDs as strings
    creator: boolean;
    selectedCreator: string; // storing creator ID as string
    tag: boolean;
    tags: string[]; // storing tag IDs as strings
    source: boolean;
    // other fields in formData are not needed here
  };
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setFormData: React.Dispatch<
    React.SetStateAction<{
      cardImage: string | ArrayBuffer | null;
      cardName: string;
      sku: string;
      price: string;
      salePrice: boolean;
      stock: string;
      cardDetails: string;
      categories: string[];
      creator: boolean;
      selectedCreator: string;
      tag: boolean;
      tags: string[];
      source: boolean;
    }>
  >;
  apiCategories: {id: number; name: string; image: string | null}[];
  categoriesLoading: boolean;
  categoriesError: string | null;
  apiCreators: {id: number; name: string; image: string | null}[];
  creatorsLoading: boolean;
  creatorsError: string | null;
  apiTags: {id: number; name: string}[];
  tagsLoading: boolean;
  tagsError: string | null;
}

const CardSettings: React.FC<CardSettingsProps> = ({
  formData,
  handleInputChange,
  setFormData,
  apiCategories,
  categoriesLoading,
  categoriesError,
  apiCreators,
  creatorsLoading,
  creatorsError,
  apiTags,
  tagsLoading,
  tagsError,
}) => {
  // Local state to trigger a skeleton placeholder on opening the creator panel.
  const [showCreatorSkeleton, setShowCreatorSkeleton] = useState(false);

  useEffect(() => {
    if (formData.creator) {
      setShowCreatorSkeleton(true);
      const timer = setTimeout(() => {
        setShowCreatorSkeleton(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [formData.creator]);

  return (
    <div className="space-y-6">
      {/* Categories Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 border">
        <label className="block mb-2 text-sm font-semibold">Categories *</label>
        <div className="space-y-2">
          {categoriesLoading ? (
            <div className="text-gray-500">Loading categories...</div>
          ) : categoriesError ? (
            <div className="text-red-500">{categoriesError}</div>
          ) : (
            apiCategories.map((category) => {
              const id = `category-${category.id}`;
              return (
                <div
                  key={category.id}
                  className="flex items-center gap-y-2 mb-2"
                >
                  <input
                    type="checkbox"
                    id={id}
                    className="hidden"
                    checked={formData.categories.includes(
                      category.id.toString()
                    )}
                    onChange={(e) => {
                      const newCategories = e.target.checked
                        ? [...formData.categories, category.id.toString()]
                        : formData.categories.filter(
                            (c) => c !== category.id.toString()
                          );
                      setFormData((prev) => ({
                        ...prev,
                        categories: newCategories,
                      }));
                    }}
                  />
                  <label
                    htmlFor={id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    {category.image && (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-6 h-6 object-contain"
                      />
                    )}
                    <span>{category.name}</span>
                  </label>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Creator Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 border">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold">Creator</label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="creator"
              checked={formData.creator}
              onChange={handleInputChange}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>
        {formData.creator && (
          <div className="overflow-auto whitespace-nowrap flex gap-4 p-2">
            {apiCreators.map((creator) => (
              <div
                key={creator.id}
                className="bg-gray-100 p-2 rounded-lg flex items-center"
              >
                <img
                  src={creator.image}
                  alt={creator.name}
                  className="w-8 h-8 rounded-full object-contain"
                />
                <span className="ml-2">{creator.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tag Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 border">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold">Tag</label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="tag"
              checked={formData.tag}
              onChange={handleInputChange}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>
        {formData.tag && (
          <div className="overflow-auto whitespace-nowrap flex gap-4 p-2">
            {apiTags.map((tag) => (
              <div
                key={tag.id}
                className="bg-gray-100 p-2 rounded-lg"
              >
                {tag.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Source Section */}
      <div className="bg-white shadow-md rounded-lg p-4 border">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold">Source</label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="source"
              checked={formData.source}
              onChange={handleInputChange}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>
        {formData.source && (
          <div className="space-y-2">
            <div>
              <label className="text-sm">View on Etherscan</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="https://example.com/"
              />
            </div>
            <div>
              <label className="text-sm">View Original</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="https://example.com/"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardSettings;
