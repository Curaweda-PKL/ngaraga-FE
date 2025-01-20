import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiSearch, FiPlusCircle, FiX } from "react-icons/fi";
import {
  FaPalette,
  FaMusic,
  FaVideo,
  FaRunning,
  FaBoxOpen,
  FaCamera,
  FaTools,
  FaGlobe,
  FaTshirt,
  FaMicrochip,
} from "react-icons/fa";

interface CategoryData {
  master: string;
  series: string;
  category: string;
  Icon: React.ComponentType;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CategoryData | null;
  isAddCategory: boolean; // New prop to distinguish between Add and Edit
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  data,
  isAddCategory,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleEyeClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">
            {isAddCategory ? "Add Categories" : "Edit Categories"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4">
          <div className="space-y-4">
            {/* Series Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Series*
              </label>
              <div className="relative">
                <select className="w-full border rounded-lg px-3 py-2 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  <option>Choose a Series</option>
                  <option selected>Series 3</option>
                  {/* Add other series options */}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {/* Selected Series Tag */}
              <div className="mt-2">
                <div className="inline-flex items-center bg-yellow-50 rounded-lg px-3 py-1">
                  <span className="text-sm text-yellow-800">Series 3</span>
                  <button className="ml-2 text-yellow-600 hover:text-yellow-800">
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Categories Icon */}
            <div>
              <div className="flex justify-between ">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categories Icon*
              </label>
              
              <label className="block text-sm font-medium text-gray-700 mb-1 mr-20">
                Preview
              </label>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-grow">
                  <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    <option value="Art.svg">Art.svg</option>
                    <option value="Music.svg">Music.svg</option>
                    <option value="Sports.svg">Sports.svg</option>
                    <option value="Fashion.svg">Fashion.svg</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                <div className="flex gap-2">
                  
                  <button className="p-2 text-gray-400 hover:text-gray-600 border rounded-lg">
                    <FaPalette className="w-5 h-5" />
                  </button>
                  {/* Edit icon to trigger file input */}
                  <button
                    onClick={handleEyeClick}
                    className="p-2 text-gray-400 hover:text-gray-600 border rounded-lg"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-red-400 hover:text-red-600 border rounded-lg">
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <p className="mt-1 text-sm text-gray-500">SVG Only</p>
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".svg"
                className="hidden"
                onChange={(e) => {
                  // Handle file change here
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log(file.name); // Just log the file name for now
                  }
                }}
              />
            </div>

            {/* Category Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name*
              </label>
              <input
                type="text"
                defaultValue={isAddCategory ? "" : "Art"}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
            {isAddCategory ? "Add" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const Categories = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false); // New state for Add Category modal
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(
    null
  );

  const handleEdit = (category: CategoryData) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  const handleAddCategory = () => {
    setIsAddCategoryModalOpen(true);
  };

  const tableData = [
    {
      master: "Master 1",
      series: "Series 1",
      category: "Art",
      Icon: FaPalette,
    },
    {
      master: "Master 2",
      series: "Series 2",
      category: "Collectibles",
      Icon: FaBoxOpen,
    },
    {
      master: "Master 3",
      series: "Series 3",
      category: "Music",
      Icon: FaMusic,
    },
    {
      master: "Master 4",
      series: "Series 4",
      category: "Video",
      Icon: FaVideo,
    },
    {
      master: "Master 5",
      series: "Series 5",
      category: "Sport",
      Icon: FaRunning,
    },
    {
      master: "Master 6",
      series: "Series 6",
      category: "Virtual Worlds",
      Icon: FaGlobe,
    },
    {
      master: "Master 7",
      series: "Series 7",
      category: "Photography",
      Icon: FaCamera,
    },
    {
      master: "Master 8",
      series: "Series 8",
      category: "Utility",
      Icon: FaTools,
    },
    {
      master: "Master 9",
      series: "Series 9",
      category: "Fashion",
      Icon: FaTshirt,
    },
    {
      master: "Master 10",
      series: "Series 10",
      category: "Technology",
      Icon: FaMicrochip,
    },
  ];

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <span>Marketplace</span>
        <span>/</span>
        <span className="text-gray-700">Categories</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleAddCategory}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FiPlusCircle /> Add Categories
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <FiSearch className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-medium">Master</th>
              <th className="text-left p-4 font-medium">Series</th>
              <th className="text-left p-4 font-medium">Categories</th>
              <th className="text-center p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr
                key={index}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="p-4">{item.master}</td>
                <td className="p-4">{item.series}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <item.Icon className="text-gray-600" />
                    <span>{item.category}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button className="text-red-400 hover:text-red-600">
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-end p-4 border-t">
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center bg-yellow-500 text-white rounded">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
              3
            </button>
            <span className="text-gray-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
              10
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal for Edit Category */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={editingCategory}
        isAddCategory={false} // It's an edit modal
      />

      {/* Edit Modal for Add Category */}
      <EditModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        data={null}
        isAddCategory={true} // It's an add modal
      />
    </div>
  );
};