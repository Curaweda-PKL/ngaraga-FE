import React, {useState, useEffect} from "react";
import {Pencil, Trash2, Search, Eye} from "lucide-react";
import axios from "axios";
<<<<<<< HEAD
import {CategoryModal} from "./CategoryModal"; // adjust the import path as needed
=======
import { CategoryModal } from "./CategoryModal"; // adjust the import path as needed
import { SERVER_URL } from "@/middleware/utils"; // Import centralized server URL
>>>>>>> c91a9a81b14dd06e5413af88ea716cecb56287d7

export const Categories = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
    seriesId?: number;
    image?: string;
    series?: {master?: {name: string}};
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [series, setSeries] = useState<{id: number; name: string}[]>([]);
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

  // Extract fetchSeries to be used on mount and later if needed
  const fetchSeries = async () => {
    try {
      setLoadingSeries(true);
      const response = await fetch(`${SERVER_URL}/api/categories/series/all`);
      if (!response.ok) {
        throw new Error("Failed to fetch series data");
      }
      const data = await response.json();
      setSeries(data.series);
    } catch (err) {
      setErrorSeries((err as Error).message);
    } finally {
      setLoadingSeries(false);
    }
  };

  // Extract fetchCategories so it can be re-used after mutations
  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await axios.get(`${SERVER_URL}/api/categories/all`);
      console.log("Categories API Response:", response.data);
      const categories = response.data.categories || response.data.data || [];
      // Map category image URL to use SERVER_URL
      const mappedCategories = categories.map((cat: any) => ({
        ...cat,
        image: cat.image ? `${SERVER_URL}/${cat.image.replace(/\\/g, "/")}` : null,
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

  const handleAddCategory = async (name: string, seriesId: number) => {
    if (!seriesId || !selectedImage) {
      console.error("Series and image must be selected");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("seriesId", seriesId.toString());
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(
        `${SERVER_URL}/api/categories/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        // Re-fetch categories to get full nested info (including master)
        await fetchCategories();
        setIsAddModalOpen(false);
        setSelectedImage(null);
        setSuccessMessage("Category added successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleEditCategory = async (
    id: number,
    name: string,
    seriesId: number,
    imageFile?: File
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("seriesId", seriesId.toString());

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch(
        `${SERVER_URL}/api/categories/edit/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      // Re-fetch categories to get updated data
      await fetchCategories();

      setIsEditModalOpen(false);
      setSuccessMessage("Category updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating category:", error);
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

      // After deletion, re-fetch categories to update the view.
      await fetchCategories();
      setSuccessMessage("Category deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting category:", error);
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

      {/* Success Message */}
      {successMessage && (
        <div className="text-green-500 mb-4 p-2 border border-green-500 bg-green-100 rounded-lg">
          {successMessage}
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
                Series Name
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                Category Name
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loadingCategories ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-sm"
                >
                  Loading categories...
                </td>
              </tr>
            ) : errorCategories ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-red-500 text-sm"
                >
                  {errorCategories}
                </td>
              </tr>
            ) : (
              visibleCategories.map((category) => (
                <tr
                  key={category.id}
                  className="hover:bg-gray-50 leading-relaxed"
                >
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {category.series?.master?.name || "No Master"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {series.find((s) => s.id === category.seriesId)?.name ||
                      "Unknown Series"}
                  </td>
                  <td
                    className="px-6 py-4 text-sm text-gray-600"
                    style={{textAlign: "justify"}}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {category.image ? (
                          <img
                            src={`${SERVER_URL}/${category.image}`}
                            alt={category.name}
                            className="w-8 h-8 object-contain rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-gray-400">N/A</span>
                          </div>
                        )}
                      </div>
                      {category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
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

      {/* Render the modal */}
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
            ? handleAddCategory
            : (name: string, seriesId: number) =>
                handleEditCategory(selectedCategory?.id || 0, name, seriesId)
        }
        defaultValue={
          isEditModalOpen && selectedCategory ? selectedCategory.name : ""
        }
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
