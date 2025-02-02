import React, {useState, useEffect} from "react";
import {
  Pencil,
  Trash2,
  Search,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitText: string;
  onSubmit: (name: string, masterId: number) => void;
  defaultValue?: string;
}

export const Series = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState<{ id: number; name: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [masters, setMasters] = useState<{id: number; name: string}[]>([]);
  const [seriesList, setSeriesList] = useState<
    {id: number; name: string; masterId: number}[]
  >([]);
  const [loadingMasters, setLoadingMasters] = useState(true);
  const [errorMasters, setErrorMasters] = useState<string | null>(null);
  const [loadingSeries, setLoadingSeries] = useState(true);
  const [errorSeries, setErrorSeries] = useState<string | null>(null);
  const [selectedMaster, setSelectedMaster] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/series/masters/all");
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
        const response = await fetch("http://localhost:3000/api/series/all");
        if (!response.ok) {
          throw new Error("Failed to fetch series data");
        }
        const data = await response.json();
        setSeriesList(data.series);
      } catch (err) {
        setErrorSeries((err as Error).message);
      } finally {
        setLoadingSeries(false);
      }
    };

    fetchSeries();
  }, []);

  const handleAddSeries = async (name: string, masterId: number) => {
    try {
      const response = await fetch("http://localhost:3000/api/series/create", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, masterId}),
      });

      if (!response.ok) {
        throw new Error("Failed to add series");
      }

      const newSeries = await response.json();
      setSeriesList((prev) => [...prev, newSeries.series]);
      setSuccessMessage("Series added successfully!");
    } catch (error) {
      console.error("Error adding series:", error);
    } finally {
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleEditSeries = async (id: number, name: string, masterId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/series/edit/${id}`,
        {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({name, masterId}),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update series");
      }
      window.location.reload();
      const updatedSeries = await response.json();
      setSeriesList((prev) =>
        prev.map((series) =>
          series.id === id
            ? {
                ...series,
                name: updatedSeries.name,
                masterId: updatedSeries.masterId,
              }
            : series
        )
      );
      setSuccessMessage("Series updated successfully!");
    } catch (error) {
      console.error("Error updating series:", error);
    } finally {
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleDeleteSeries = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/series/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete series");
      }

      setSeriesList((prev) => prev.filter((series) => series.id !== id));
      setSuccessMessage("Series deleted successfully!");
    } catch (error) {
      console.error("Error deleting series:", error);
    } finally {
      setTimeout(() => setSuccessMessage(null), 3000);
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
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Master*</label>
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
                  <option key={master.id} value={master.id}>
                    {master.name}
                  </option>
                ))}
              </select>
            )}

            <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Series Name*</label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="flex justify-end gap-2 p-4 border-t">
            <button onClick={onClose} className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedMaster !== null) {
                  onSubmit(inputValue, selectedMaster);
                  onClose();
                }
              }}
              className="px-4 py-2 bg-call-to-actions-900 text-white rounded-lg hover:bg-call-to-actions-800"
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
  const visibleSeries = filteredSeries.slice(
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
          <span className="text-yellow-500">Series</span>
        </nav>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">Series</h1>

      {/* Success Message */}
      {successMessage && (
        <div className="text-green-500 mb-4 p-2 border border-green-500 bg-green-100 rounded-lg">
          {successMessage}
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
        <th className="px-4 py-2 border-b text-center w-32">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {loadingSeries ? (
        <tr>
          <td colSpan={3} className="px-6 py-4 text-center">
            Loading series...
          </td>
        </tr>
      ) : errorSeries ? (
        <tr>
          <td colSpan={3} className="px-6 py-4 text-center text-red-500">
            {errorSeries}
          </td>
        </tr>
      ) : (
        visibleSeries.map((series) => (
          <tr key={series.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-600">
              {series.name}
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">
              {masters.find((master) => master.id === series.masterId)?.name ||
                "Unknown Master"}
            </td>
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
                  <Pencil className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <Eye className="w-5 h-5" />
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
        ))
      )}
    </tbody>
  </table>
</div>


      {/* Add/Edit Modal */}
      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          setSelectedSeries(null);
        }}
        title={isAddModalOpen ? "Add Series" : "Edit Series"}
        submitText={isAddModalOpen ? "Add" : "Save Changes"}
        onSubmit={
          isAddModalOpen
            ? handleAddSeries
            : (name, masterId) =>
                handleEditSeries(selectedSeries?.id || 0, name, masterId)
        }
        defaultValue={
          isEditModalOpen && selectedSeries ? selectedSeries.name : ""
        }
      />
    </div>
  );
};
