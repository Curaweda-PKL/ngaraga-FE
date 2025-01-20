import React, {useEffect, useState} from "react";
import {
  Pencil,
  Eye,
  Trash2,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Interfaces
interface Series {
  id: number;
  name: string;
  masterName: string;
}

interface Master {
  id: number;
  name: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitText: string;
  onSubmit: (value: string, masterId: number) => void;
  defaultValue?: string;
}

export const Series = () => {
  // State management
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [masters, setMasters] = useState<Master[]>([]);
  const [loadingMasters, setLoadingMasters] = useState(true);
  const [errorMasters, setErrorMasters] = useState<string | null>(null);

  // Mock data for demonstration
  const seriesList: Series[] = Array.from({length: 100}, (_, index) => ({
    id: index + 1,
    name: `Series ${index + 1}`,
    masterName: `Master ${Math.floor(index / 10) + 1}`,
  }));

  const itemsPerPage = 10;
  const totalPages = Math.ceil(seriesList.length / itemsPerPage);

  // Fetch masters data
  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/series/masters/all"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch master data");
        }
        const data = await response.json();
        setMasters(data);
      } catch (err) {
        setErrorMasters((err as Error).message);
      } finally {
        setLoadingMasters(false);
      }
    };

    fetchMasters();
  }, []);

  // Handlers
  const handleAddSeries = async (name: string, masterId: number) => {
    try {
      const response = await fetch("http://localhost:3000/api/series", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, masterId}),
      });

      if (!response.ok) {
        throw new Error("Failed to add series");
      }

      // Refresh data or update local state
      // Implementation depends on your requirements
    } catch (error) {
      console.error("Error adding series:", error);
    }
  };

  const handleEditSeries = async (
    id: number,
    name: string,
    masterId: number
  ) => {
    try {
      const response = await fetch(`http://localhost:3000/api/series/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, masterId}),
      });

      if (!response.ok) {
        throw new Error("Failed to update series");
      }

      // Refresh data or update local state
      // Implementation depends on your requirements
    } catch (error) {
      console.error("Error updating series:", error);
    }
  };

  const handleDeleteSeries = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this series?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/series/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete series");
        }

        // Refresh data or update local state
        // Implementation depends on your requirements
      } catch (error) {
        console.error("Error deleting series:", error);
      }
    }
  };

  // Get current page items
  const getCurrentItems = () => {
    const filteredItems = seriesList.filter((series) =>
      series.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  };

  // Modal Component
  const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    submitText,
    onSubmit,
    defaultValue = "",
  }) => {
    const [inputValue, setInputValue] = useState(defaultValue);
    const [selectedMaster, setSelectedMaster] = useState<number | null>(null);

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
              Select Master*
            </label>
            {loadingMasters ? (
              <p>Loading Masters...</p>
            ) : errorMasters ? (
              <p className="text-red-500">{errorMasters}</p>
            ) : (
              <select
                value={selectedMaster || ""}
                onChange={(e) => setSelectedMaster(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Select Master</option>
                {masters.map((master) => (
                  <option
                    key={master.id}
                    value={master.id}
                  >
                    {master.name}
                  </option>
                ))}
              </select>
            )}

            <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
              Series Name*
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
                if (selectedMaster !== null) {
                  onSubmit(inputValue, selectedMaster);
                  onClose();
                }
              }}
              disabled={!selectedMaster || !inputValue.trim()}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitText}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="mb-4">
        <nav className="text-sm text-gray-500">
          <a
            href="/marketplace"
            className="hover:text-yellow-500"
          >
            Marketplace
          </a>
          <span className="mx-2">/</span>
          <span className="text-yellow-500">Series</span>
        </nav>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">Series</h1>

      {/* Add Series & Search */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <span className="text-xl">+</span> Add Series
        </button>
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Series"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Master
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Series
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {getCurrentItems().map((series) => (
              <tr
                key={series.id}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-sm text-gray-600">
                  {series.masterName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {series.name}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => {
                        setSelectedSeries(series);
                        setIsEditModalOpen(true);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSeries(series.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-3 border-t">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {Array.from({length: totalPages}, (_, i) => i + 1)
              .filter((page) => {
                if (page === 1 || page === totalPages) return true;
                return Math.abs(currentPage - page) <= 2;
              })
              .map((page, index, array) => {
                if (index > 0 && array[index - 1] !== page - 1) {
                  return (
                    <React.Fragment key={`ellipsis-${page}`}>
                      <span className="px-3 py-1 text-gray-400">...</span>
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded ${
                          currentPage === page
                            ? "bg-yellow-500 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  );
                }
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? "bg-yellow-500 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Series"
        submitText="Save"
        onSubmit={handleAddSeries}
      />

      {selectedSeries && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Series"
          submitText="Update"
          onSubmit={(name, masterId) =>
            handleEditSeries(selectedSeries.id, name, masterId)
          }
          defaultValue={selectedSeries.name}
        />
      )}
    </div>
  );
};
