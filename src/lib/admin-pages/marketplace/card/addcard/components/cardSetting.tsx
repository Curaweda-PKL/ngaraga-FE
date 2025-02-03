import React, { ChangeEvent, useEffect, useState } from "react";

interface CardSettingsProps {
  formData: {
    categories: string[];
    creator: boolean;
    selectedCreator: string;
    tag: boolean;
    tags: string[];
    source: boolean;
    // other fields are present in formData but not needed here
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
  apiCategories: { name: string; image: string | null }[];
  categoriesLoading: boolean;
  categoriesError: string | null;
  apiCreators: { name: string; image: string | null }[];
  creatorsLoading: boolean;
  creatorsError: string | null;
  apiTags: { id: number; name: string }[];
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
    // When the creator toggle is switched on, show a skeleton placeholder.
    if (formData.creator) {
      setShowCreatorSkeleton(true);
      // Simulate a delay (e.g., 1 second) for loading skeleton before showing actual data.
      const timer = setTimeout(() => {
        setShowCreatorSkeleton(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [formData.creator]);

  return (
    <div className="space-y-6">
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
                        : formData.categories.filter((c) => c !== category.name);
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
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    )}
                    <span className="inline-block ml-2">{category.name}</span>
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
        {/* Always render the creator panel but toggle visibility */}
        <div
          className={`space-y-2 bg-white p-4 rounded-lg border transition-all duration-150 overflow-hidden ${
            formData.creator ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {showCreatorSkeleton ? (
            // Skeleton placeholder UI
            <div className="space-y-2">
              <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
            </div>
          ) : creatorsLoading ? (
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
      </div>

      {/* Tag Section */}
      <div>
        <div className="flex items-center justify-between mb-2 mt-2">
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


    </div>
  );
};

export default CardSettings;
