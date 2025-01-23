import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Search, Eye, X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitText: string;
  onSubmit: (name: string, seriesId: number) => void;
  defaultValue?: string;
}

export const Categories = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [series, setSeries] = useState<{ id: number; name: string }[]>([]); // Menyimpan list series
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [loadingSeries, setLoadingSeries] = useState(true);
  const [errorSeries, setErrorSeries] = useState<string | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch Series
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/categories/series/all"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch series data");
        }
        const data = await response.json();
        setSeries(data.series); // Menyimpan data series ke state
      } catch (err) {
        setErrorSeries((err as Error).message);
      } finally {
        setLoadingSeries(false);
      }
    };

    fetchSeries();
  }, []);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/categories/all"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories data");
        }
        const data = await response.json();
        setCategoriesList(data.categories);
      } catch (err) {
        setErrorCategories((err as Error).message);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async (name: string, seriesId: number) => {
    if (!seriesId) {
      console.error("Series is not selected.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/categories/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, seriesId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add category");
      }
      window.location.reload();
      const newCategory = await response.json();
      setCategoriesList((prev) => [...prev, newCategory.category]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleEditCategory = async (
    id: number,
    name: string,
    seriesId: number
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/categories/edit/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, seriesId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update category");
      }
      window.location.reload();
      const updatedCategory = await response.json();
      setCategoriesList((prev) =>
        prev.map((category) =>
          category.id === id
            ? {
                ...category,
                name: updatedCategory.name,
                seriesId: updatedCategory.seriesId,
              }
            : category
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/categories/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      setCategoriesList((prev) =>
        prev.filter((category) => category.id !== id)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    submitText,
    onSubmit,
    defaultValue = "",
  }) => {
    const [inputValue, setInputValue] = useState(defaultValue);

    useEffect(() => setInputValue(defaultValue), [defaultValue]);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-medium">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Series*
            </label>
            {loadingSeries ? (
              <p>Loading Series...</p>
            ) : errorSeries ? (
              <p className="text-red-500">{errorSeries}</p>
            ) : (
              <select
                value={selectedSeries || ""}
                onChange={(e) => setSelectedSeries(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Select Series</option>
                {series.map((serie) => (
                  <option key={serie.id} value={serie.id}>
                    {serie.name}
                  </option>
                ))}
              </select>
            )}

            <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
              Category Name*
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="flex justify-end gap-2 p-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedSeries !== null) {
                  onSubmit(inputValue, selectedSeries);
                  onClose();
                }
              }}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              {submitText}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const filteredCategories = categoriesList.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleCategories = filteredCategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="mb-4">
        <nav className="text-sm text-gray-500">
          <a href="/admin/marketplace" className="hover:text-yellow-500">
            Marketplace
          </a>
          <span className="mx-2">/</span>
          <span className="text-yellow-500">Categories</span>
        </nav>
      </div>

      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <span className="text-xl">+</span> Add Category
        </button>
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Categories"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Category Name</th>
              <th className="px-4 py-2 border-b text-left">Master Name</th>
              <th className="px-4 py-2 border-b text-left">Series Name</th>
              <th className="px-4 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loadingCategories ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">
                  Loading categories...
                </td>
              </tr>
            ) : errorCategories ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-red-500">
                  {errorCategories}
                </td>
              </tr>
            ) : (
              visibleCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {category.series?.master?.name || "No Master"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {series.find((series) => series.id === category.seriesId)
                      ?.name || "Unknown Series"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setSelectedSeries(category.seriesId);
                          setIsEditModalOpen(true);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          setSelectedCategory(null);
        }}
        title={isAddModalOpen ? "Add Category" : "Edit Category"}
        submitText={isAddModalOpen ? "Add" : "Save Changes"}
        onSubmit={
          isAddModalOpen
            ? handleAddCategory
            : (name: string, seriesId: number) =>
                handleEditCategory(selectedCategory?.id || 0, name, seriesId)
        }
        defaultValue={
          isEditModalOpen && selectedCategory ? selectedCategory.name : ""
        }
      />
    </div>
  );
};
