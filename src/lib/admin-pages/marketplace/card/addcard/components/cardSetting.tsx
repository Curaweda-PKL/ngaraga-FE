import React, { ChangeEvent } from "react";

interface CardSettingsProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  categories: { name: string; icon: JSX.Element }[];
  creators: { name: string; avatar: string }[];
  tags: string[];
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CardSettings: React.FC<CardSettingsProps> = ({
  formData,
  setFormData,
  categories,
  creators,
  tags,
  handleInputChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Categories Section */}
      <div>
        <label className="block mb-2 text-sm">Categories *</label>
        <div className="space-y-2 bg-white p-4 rounded-lg border">
          {categories.map((category) => {
            const id = `category-${category.name}`;
            return (
              <div key={category.name} className="category-checkbox flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  id={id}
                  className="hidden"
                  checked={formData.categories.includes(category.name)}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...formData.categories, category.name]
                      : formData.categories.filter((c: string) => c !== category.name);
                    setFormData((prev: any) => ({ ...prev, categories: newCategories }));
                  }}
                />
                <label htmlFor={id}>
                  <span className="flex items-center gap-2">
                    {category.icon}
                    {category.name}
                  </span>
                </label>
              </div>
            );
          })}
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
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        {formData.creator && (
          <div className="space-y-2 bg-white p-4 rounded-lg border">
            {creators.map((creator) => (
              <label
                key={creator.name}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <input type="radio" name="creator" className="form-radio" />
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
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        {formData.tag && (
          <div className="space-y-2 bg-white p-4 rounded-lg border">
            {tags.map((tag) => {
              const id = `tag-${tag}`;
              return (
                <div key={tag} className="tag-checkbox">
                  <input
                    type="checkbox"
                    id={id}
                    className="hidden"
                    checked={formData.tags.includes(tag)}
                    onChange={(e) => {
                      const newTags = e.target.checked
                        ? [...formData.tags, tag]
                        : formData.tags.filter((t: string) => t !== tag);
                      setFormData((prev: any) => ({ ...prev, tags: newTags }));
                    }}
                  />
                  <label htmlFor={id}>{tag}</label>
                </div>
              );
            })}
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
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:bg-blue-600"></div>
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
  );
};

export default CardSettings;
