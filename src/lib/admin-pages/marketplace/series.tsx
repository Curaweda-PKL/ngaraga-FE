import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Search, X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitText: string;
  onSubmit: (value: string, masterId: number) => void;
  defaultValue?: string;
}

export const Series = () => {
  const [seriesList, setSeriesList] = useState<any[]>([]);
  const [masterList, setMasterList] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState<{ id: number; name: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMasterId, setSelectedMasterId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Series List from API
  const fetchSeriesList = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/series/all");
      if (!response.ok) {
        throw new Error("Failed to fetch series");
      }
      const data = await response.json();
      console.log("Fetched series:", data); // Check fetched data
      setSeriesList(data.series || []);
    } catch (error) {
      setErrorMessage("Failed to load series list.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Master List from API
  const fetchMasterList = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/series/masters/all");
      if (!response.ok) {
        throw new Error("Failed to fetch master");
      }
      const data = await response.json();
      console.log("Fetched master:", data); // Check fetched data
      setMasterList(data.master || []);
    } catch (error) {
      setErrorMessage("Failed to load master list.");
    }
  };

  useEffect(() => {
    fetchSeriesList();
    fetchMasterList();
  }, []);

  // Add Series Handler
  const handleAddSeries = async (name: string, masterId: number) => {
    try {
      const response = await fetch("http://localhost:3000/api/series/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, masterId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add series");
      }

      const newSeries = await response.json();
      setSeriesList((prev) => [...prev, newSeries.series]);
    } catch (error: any) {
      setErrorMessage(error?.message || "Failed to add series.");
    }
  };

  // Edit Series Handler
  const handleEditSeries = async (id: number, name: string, masterId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/series/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, masterId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update series");
      }

      const updatedSeries = await response.json();
      setSeriesList((prev) =>
        prev.map((series) => (series.id === id ? updatedSeries.updatedSeries : series))
      );
    } catch (error: any) {
      setErrorMessage(error?.message || "Failed to update series.");
    }
  };

  // Delete Series Handler
  const handleDeleteSeries = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/series/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete series");
      }

      setSeriesList((prev) => prev.filter((series) => series.id !== id));
    } catch (error: any) {
      setErrorMessage(error?.message || "Failed to delete series.");
    }
  };

  // Modal Component for Add/Edit Series
  const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    submitText,
    onSubmit,
    defaultValue = "",
  }) => {
    const [inputValue, setInputValue] = useState(defaultValue);
    const [selectedMaster, setSelectedMaster] = useState<number | null>(selectedMasterId);

    useEffect(() => {
      setInputValue(defaultValue);
      setSelectedMaster(selectedMasterId);
    }, [defaultValue, selectedMasterId]);

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
            {/* Dropdown untuk memilih Master */}
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Master*</label>
            <select
              value={selectedMaster || ""}
              onChange={(e) => setSelectedMaster(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Select Master</option>
              {masterList.map((master: { id: number; name: string }) => (
                <option key={master.id} value={master.id}>
                  {master.name}
                </option>
              ))}
            </select>

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
                } else {
                  setErrorMessage("Please select a master.");
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

  return (
    <div className="p-6">
      {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}

      {/* Breadcrumb */}
      <div className="mb-4">
        <nav className="text-sm text-gray-500">
          <a href="/marketplace" className="hover:text-yellow-500">Marketplace</a>
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

      {/* Loading Indicator */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          {/* Series Table */}
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">Series Name</th>
                <th className="px-4 py-2 border-b text-left">Master Name</th>
                <th className="px-4 py-2 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {seriesList
                .filter((series) =>
                  series.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((series: { id: number; name: string, masterName: string }) => (
                  <tr key={series.id}>
                    <td className="px-4 py-2 border-b">{series.name}</td>
                    <td className="px-4 py-2 border-b">{series.masterName}</td>
                    <td className="px-4 py-2 border-b flex gap-4">
                      <button
                        onClick={() => {
                          setSelectedSeries(series);
                          setIsEditModalOpen(true);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSeries(series.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

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
          onSubmit={(name: string, masterId: number) => handleEditSeries(selectedSeries.id, name, masterId)}
          defaultValue={selectedSeries.name}
        />
      )}
    </div>
  );
};
