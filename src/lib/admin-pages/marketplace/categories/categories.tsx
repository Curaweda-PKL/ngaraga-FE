import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Search, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import {CategoryModal} from "./CategoryModal"; // adjust the import path as needed
import {SERVER_URL} from "@/middleware/utils"; // Import centralized server URL

export const Categories = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
    code?: string; // category code
    seriesId?: number;
    image?: string;

    isSuspended?: boolean;
    series?: { master?: { name: string; code?: string } };
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  // Updated type to include isSuspended property.
  const [series, setSeries] = useState<
    { id: number; name: string; code: string; isSuspended: boolean }[]
  >([]);

  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [loadingSeries, setLoadingSeries] = useState(true);
  const [errorSeries, setErrorSeries] = useState<string | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [actionErrorMessage, setActionErrorMessage] = useState<string>("");

  // Fetch series data for dropdowns.
  const fetchSeries = async () => {
    try {
      setLoadingSeries(true);
      const response = await fetch(`${SERVER_URL}/api/categories/series/all`);
      if (!response.ok) {
        throw new Error("Failed to fetch series data");
      }
      const data = await response.json();
      // Ensure each series object includes isSuspended.
      const mappedSeries = data.series.map((s: any) => ({
        ...s,
        isSuspended: s.isSuspended ?? false,
      }));
      setSeries(mappedSeries); // series should be an array of { id, name, code, isSuspended }
    } catch (err) {
      setErrorSeries((err as Error).message);
    } finally {
      setLoadingSeries(false);
    }
  };

  // Fetch categories list
  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await axios.get(`${SERVER_URL}/api/categories/all`);
      const categories = response.data.categories || response.data.data || [];
      // Map category image URL to use SERVER_URL
      const mappedCategories = categories.map((cat: any) => ({
        ...cat,
        image: cat.image
          ? `${SERVER_URL}/${cat.image.replace(/\\/g, "/")}`
          : null,
      }));
      setCategoriesList(mappedCategories);
    } catch (err) {
      setErrorCategories((err as Error).message);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (
    name: string,
    seriesId: number,
    image: File,
    code?: string
  ) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("seriesId", seriesId.toString());
    formData.append("image", image);
    if (code) {
      formData.append("code", code);
    }

    try {
      const response = await axios.post(
        `${SERVER_URL}/api/categories/create`,
        formData
      );
      if (response.status === 201) {
        await fetchCategories();
        setIsAddModalOpen(false);
        setSuccessMessage("Category added successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      setActionErrorMessage(
        (error as any).message || "Error adding category"
      );
      setTimeout(() => setActionErrorMessage(""), 3000);
    }
  };

  const handleEditCategory = async (
    id: number,
    name: string,
    seriesId: number,
    image: File,
    code?: string
  ) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("seriesId", seriesId.toString());
    formData.append("image", image);
    if (code) {
      formData.append("code", code);
    }

    try {

      const response = await axios.put(
        `${SERVER_URL}/api/categories/edit/${id}`,
        formData
      );
      if (response.status === 200) {
        await fetchCategories();
        setIsEditModalOpen(false);
        setSuccessMessage("Category updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }

    } catch (error) {
      console.error("Error updating category:", error);
      setActionErrorMessage(
        (error as any).message || "Error updating category"
      );
      setTimeout(() => setActionErrorMessage(""), 3000);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/api/categories/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
      await fetchCategories();
      setSuccessMessage("Category deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting category:", error);
      setActionErrorMessage(
        (error as any).message || "Error deleting category"
      );
      setTimeout(() => setActionErrorMessage(""), 3000);
    }
  };

  // Toggle suspend/unsuspend for a category using controller-only logic
  const handleToggleSuspendCategory = async (
    id: number,
    isSuspended: boolean | undefined
  ) => {
    try {
      const endpoint = isSuspended
        ? `${SERVER_URL}/api/categories/unsuspend/${id}`
        : `${SERVER_URL}/api/categories/suspend/${id}`;
      const response = await axios.put(endpoint);
      if (response.status === 200) {
        const updatedCategory = response.data.category;
        setCategoriesList((prev) =>
          prev.map((cat) => (cat.id === id ? updatedCategory : cat))
        );
        setSuccessMessage(response.data.message);
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error toggling suspension:", error);
      setActionErrorMessage(
        (error as any).message || "Error toggling suspension"
      );
      setTimeout(() => setActionErrorMessage(""), 3000);
    }
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
      {/* Breadcrumb */}
      <div className="mb-4">
        <nav className="text-sm text-gray-500">
          <a
            href="/admin/marketplace"
            className="hover:text-yellow-500"
          >
            Marketplace
          </a>
          <span className="mx-2">/</span>
          <span className="text-yellow-500">Categories</span>
        </nav>
      </div>

      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      {/* Success & Error Messages */}
      {successMessage && (
        <div className="text-green-500 mb-4 p-2 border border-green-500 bg-green-100 rounded-lg">
          {successMessage}
        </div>
      )}
      {actionErrorMessage && (
        <div className="text-red-500 mb-4 p-2 border border-red-500 bg-red-100 rounded-lg">
          {actionErrorMessage}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-call-to-actions-900 hover:bg-call-to-actions-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
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
            <tr className="leading-6">
              <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                Master Name
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                Master Code
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                Series Name
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                Series Code
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                Category (Name & Image)
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                Category Code
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loadingCategories ? (
              <tr>

                <td colSpan={7} className="px-6 py-4 text-center text-sm">

                  Loading categories...
                </td>
              </tr>
            ) : errorCategories ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-red-500 text-sm">
                  {errorCategories}
                </td>
              </tr>
            ) : (

              visibleCategories.map((category) => {
                // Use the nested series data if available, otherwise fall back to lookup
                const seriesObj = category.series || series.find((s) => s.id === category.seriesId);
                // Get master info from the category's series, if available.
                const master = category.series?.master;
                return (
                  <tr key={category.id} className="hover:bg-gray-50 leading-relaxed">
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {master?.name || "No Master"}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {master?.code || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {seriesObj?.name || "Unknown Series"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {seriesObj?.code || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-3">

                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-8 h-8 object-contain rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-gray-400">N/A</span>
                          </div>
                        )}
                        {category.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {category.code || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-start gap-4 -ml-2">
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
                        {/* Suspend/Unsuspend Button */}
                        <button
                          onClick={() =>
                            handleToggleSuspendCategory(
                              category.id,
                              category.isSuspended
                            )
                          }
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {category.isSuspended ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
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
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="p-2 border rounded-lg hover:bg-gray-50"
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="p-2 border rounded-lg hover:bg-gray-50"
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}

      <CategoryModal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          setSelectedCategory(null);
          setSelectedImage(null);
        }}
        title={isAddModalOpen ? "Add Category" : "Edit Category"}
        submitText={isAddModalOpen ? "Add" : "Save Changes"}
        onSubmit={
          isAddModalOpen
            ? (name, seriesId, image, code) =>
                handleAddCategory(name, seriesId, image, code)
            : (name, seriesId, image, code) =>
                handleEditCategory(
                  selectedCategory?.id || 0,
                  name,
                  seriesId,
                  image,
                  code
                )
        }
        defaultValue={isEditModalOpen && selectedCategory ? selectedCategory.name : ""}
        defaultCode={isEditModalOpen && selectedCategory ? selectedCategory.code : ""}
        loadingSeries={loadingSeries}
        errorSeries={errorSeries}
        series={series}
        selectedSeries={selectedSeries}
        setSelectedSeries={setSelectedSeries}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
};
