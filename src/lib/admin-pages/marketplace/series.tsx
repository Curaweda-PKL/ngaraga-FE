import React, { useState, useEffect } from "react";
import {
  Pencil,
  Trash2,
  Search,
  Eye,
  EyeOff,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SERVER_URL } from "@/middleware/utils"; // Import centralized server URL

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitText: string;
  onSubmit: (name: string, masterId: number, code: string) => void;
  defaultValue?: string;
  defaultCode?: string;
}

export const Series = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState<{
    id: number;
    name: string;
    code: string;
    masterId: number;
    isSuspended: boolean;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  // Updated master type to include code property.
  const [masters, setMasters] = useState<
    { id: number; name: string; code: string; isSuspended: boolean }[]
  >([]);
  const [seriesList, setSeriesList] = useState<
    {
      id: number;
      name: string;
      masterId: number;
      code: string;
      isSuspended: boolean;
    }[]
  >([]);
  const [loadingMasters, setLoadingMasters] = useState(true);
  const [errorMasters, setErrorMasters] = useState<string | null>(null);
  const [loadingSeries, setLoadingSeries] = useState(true);
  const [errorSeries, setErrorSeries] = useState<string | null>(null);
  const [selectedMaster, setSelectedMaster] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/series/masters/all`);
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

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/series/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch series data");
        }
        const data = await response.json();
        // Expecting data.series to include isSuspended field
        setSeriesList(data.series);
      } catch (err) {
        setErrorSeries((err as Error).message);
      } finally {
        setLoadingSeries(false);
      }
    };

    fetchSeries();
  }, []);

  const generateCode = () => {
    return `CODE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const handleAddSeries = async (name: string, masterId: number, code: string) => {
    // Check if the selected master is suspended
    const selectedMasterObj = masters.find((master) => master.id === masterId);
    if (selectedMasterObj?.isSuspended) {
      setActionErrorMessage("Cannot create series: The selected master is suspended.");
      setTimeout(() => {
        setActionErrorMessage(null);
      }, 3000);
      return;
    }
    
    try {
      const response = await fetch(`${SERVER_URL}/api/series/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, masterId, code: code || generateCode() }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add series");
      }
  
      const newSeries = await response.json();
      setSeriesList((prev) => [...prev, newSeries.series]);
      setSuccessMessage("Series added successfully!");
    } catch (error) {
      console.error("Error adding series:", error);
      setActionErrorMessage((error as Error).message || "Error adding series");
    } finally {
      setTimeout(() => {
        setSuccessMessage(null);
        setActionErrorMessage(null);
      }, 3000);
    }
  };

  const handleEditSeries = async (
    id: number,
    name: string,
    masterId: number,
    code: string
  ) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/series/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, masterId, code: code || generateCode() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update series");
      }

      const updatedSeries = await response.json();

      // Update state directly without page refresh
      setSeriesList((prev) =>
        prev.map((series) =>
          series.id === id
            ? {
                ...series,
                name: updatedSeries.updatedSeries.name,
                masterId: updatedSeries.updatedSeries.masterId,
                code: updatedSeries.updatedSeries.code,
              }
            : series
        )
      );
      setSuccessMessage("Series updated successfully!");
    } catch (error) {
      console.error("Error updating series:", error);
      setActionErrorMessage((error as Error).message || "Error updating series");
    } finally {
      setTimeout(() => {
        setSuccessMessage(null);
        setActionErrorMessage(null);
      }, 3000);
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteSeries = async (id: number) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/series/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete series");
      }

      setSeriesList((prev) => prev.filter((series) => series.id !== id));
      setSuccessMessage("Series deleted successfully!");
    } catch (error) {
      console.error("Error deleting series:", error);
      setActionErrorMessage((error as Error).message || "Error deleting series");
    } finally {
      setTimeout(() => {
        setSuccessMessage(null);
        setActionErrorMessage(null);
      }, 3000);
    }
  };

  const toggleSuspendSeries = async (series: { id: number; isSuspended: boolean; }) => {
    try {
      const endpoint = series.isSuspended
        ? `${SERVER_URL}/api/series/${series.id}/unsuspend`
        : `${SERVER_URL}/api/series/${series.id}/suspend`;
  
      const response = await fetch(endpoint, {
        method: "PATCH",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update suspension status");
      }
  
      const result = await response.json();
      // Use the updated series data from the response to update state.
      setSeriesList((prev) =>
        prev.map((s) =>
          s.id === series.id ? { ...s, isSuspended: result.series.isSuspended } : s
        )
      );
      setSuccessMessage(
        result.series.isSuspended
          ? "Series suspended successfully!"
          : "Series unsuspended successfully!"
      );
    } catch (error) {
      console.error("Error toggling suspension:", error);
      setActionErrorMessage((error as Error).message || "Error toggling suspension");
    } finally {
      setTimeout(() => {
        setSuccessMessage(null);
        setActionErrorMessage(null);
      }, 3000);
    }
  };

  const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    submitText,
    onSubmit,
    defaultValue = "",
    defaultCode = "",
  }) => {
    const [inputValue, setInputValue] = useState(defaultValue);
    const [inputCode, setInputCode] = useState(defaultCode);
    const [codeError, setCodeError] = useState<string | null>(null);

    useEffect(() => setInputValue(defaultValue), [defaultValue]);
    useEffect(() => setInputCode(defaultCode), [defaultCode]);

    const validateCode = (code: string) => {
      // Regex for exactly three digits.
      if (!/^\d{3}$/.test(code)) {
        return "Input harus mengikuti format xxx (number) contoh: 123";
      }
      return null;
    };

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newCode = e.target.value;
      setInputCode(newCode);
      const error = validateCode(newCode);
      setCodeError(error);
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-medium">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
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
                {masters
                  .filter((master) => !master.isSuspended) // Only show active masters
                  .map((master) => (
                    <option key={master.id} value={master.id}>
                      {master.name} ({master.code})
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

            <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
              Series Code*
            </label>
            <input
              type="text"
              value={inputCode}
              onChange={handleCodeChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {codeError && <p className="text-red-500 text-sm mt-1">{codeError}</p>}
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
                // Check the series code format before submitting.
                if (codeError || !/^\d{3}$/.test(inputCode)) {
                  setCodeError("Input harus mengikuti format xxx (number) contoh: 123");
                  return;
                }
                if (selectedMaster !== null) {
                  onSubmit(inputValue, selectedMaster, inputCode);
                  onClose();
                }
              }}
              disabled={!!codeError || !/^\d{3}$/.test(inputCode)}
              className={`px-4 py-2 rounded-lg text-white ${
                (!!codeError || !/^\d{3}$/.test(inputCode))
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-call-to-actions-900 hover:bg-call-to-actions-800"
              }`}
            >
              {submitText}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Calculate pagination
  const filteredSeries = seriesList.filter((series) =>
    series.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredSeries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleSeries = filteredSeries.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="mb-4">
        <nav className="text-sm text-gray-500">
          <a href="/admin/marketplace" className="hover:text-yellow-500">
            Marketplace
          </a>
          <span className="mx-2">/</span>
          <span className="text-yellow-500">Series</span>
        </nav>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">Series</h1>

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

      {/* Add Series & Search */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-call-to-actions-900 hover:bg-call-to-actions-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
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

      {/* Series Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Series Name</th>
              <th className="px-4 py-2 border-b text-left">Master Name</th>
              {/* New column for Master Code */}
              <th className="px-4 py-2 border-b text-left">Master Code</th>
              <th className="px-4 py-2 border-b text-left">Series Code</th>
              <th className="px-4 py-2 border-b text-center w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loadingSeries ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  Loading series...
                </td>
              </tr>
            ) : errorSeries ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-red-500">
                  {errorSeries}
                </td>
              </tr>
            ) : visibleSeries.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  No series found.
                </td>
              </tr>
            ) : (
              visibleSeries.map((series) => {
                const master = masters.find((m) => m.id === series.masterId);
                return (
                  <tr key={series.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">{series.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {master?.name || "Unknown Master"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {master?.code || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{series.code}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => {
                            setSelectedSeries(series);
                            setSelectedMaster(series.masterId);
                            setIsEditModalOpen(true);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => toggleSuspendSeries(series)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {series.isSuspended ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteSeries(series.id)}
                          className="text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
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

      {/* Pagination (optional) */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-4 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="p-2 border rounded-lg hover:bg-gray-50"
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="p-2 border rounded-lg hover:bg-gray-50"
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </button>
        </div>
      )}

      {/* Modal Add */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Series"
        submitText="Add"
        onSubmit={(name, masterId, code) => handleAddSeries(name, masterId, code)}
      />

      {/* Modal Edit */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Series"
        submitText="Update"
        defaultValue={selectedSeries?.name || ""}
        defaultCode={selectedSeries?.code || ""}
        onSubmit={(name, masterId, code) =>
          handleEditSeries(selectedSeries?.id || 0, name, masterId, code)
        }
      />
    </div>
  );
};
