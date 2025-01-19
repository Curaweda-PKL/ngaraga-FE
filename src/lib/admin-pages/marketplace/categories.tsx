import React, {useState} from "react";
import {FiEdit2, FiTrash2, FiSearch, FiX} from "react-icons/fi";
import {
  FaPalette,
  FaEye,
  FaMusic,
  FaPlus,
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
  isAddCategory: boolean;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
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
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {isAddCategory ? "Add Categories" : "Edit Categories"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Series *
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
              <option>Choose a Series</option>
              <option>Series 3</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Categories Icon *
            </label>
            <div className="flex items-center space-x-4">
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option value="Art.svg">Art.svg</option>
                <option value="Music.svg">Music.svg</option>
                <option value="Sports.svg">Sports.svg</option>
                <option value="Fashion.svg">Fashion.svg</option>
              </select>
              <button className="p-2 border border-gray-300 rounded-lg text-gray-500 hover:text-gray-700">
                <FaPalette className="w-6 h-6" />
              </button>
              <button
                onClick={handleEyeClick}
                className="p-2 border border-gray-300 rounded-lg text-gray-500 hover:text-gray-700"
              >
                <FiEdit2 className="w-6 h-6" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg text-red-500 hover:text-red-700">
                <FiTrash2 className="w-6 h-6" />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">SVG Only</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".svg"
              className="hidden"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Category Name *
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
            {isAddCategory ? "Add" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const Categories = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
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
    <div className="p-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        Marketplace / <span className="text-gray-700">Categories</span>
      </div>

      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6">Categories</h1>
      <div className="flex justify-between items-center">
        <button
          onClick={handleAddCategory}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 mb-6"
        >
          <FaPlus /> Add Categories
        </button>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <FiSearch className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Master</th>
              <th className="p-4 text-left">Series</th>
              <th className="p-4 text-left">Categories</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr
                key={index}
                className="border-b last:border-0"
              >
                <td className="p-4">{item.master}</td>
                <td className="p-4">{item.series}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <item.Icon className="text-gray-500" />
                    {item.category}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <FaEye className="w-5 h-5" />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end p-4">
          <div className="space-x-2">
            <button className="px-3 py-1 bg-yellow-500 text-white rounded">
              1
            </button>
            <button className="px-3 py-1 border rounded">2</button>
            <button className="px-3 py-1 border rounded">3</button>
            <span>...</span>
            <button className="px-3 py-1 border rounded">10</button>
          </div>
        </div>
      </div>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={editingCategory}
        isAddCategory={false}
      />
      <EditModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        data={null}
        isAddCategory={true}
      />
    </div>
  );
};
