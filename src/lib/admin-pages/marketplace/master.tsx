import React, {useState, useEffect} from "react";
import {Pencil, Eye, Trash2, Search, X} from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitText: string;
  onSubmit: (value: string) => void;
  defaultValue?: string;
}

export const Master = () => {
  const [masterList, setMasterList] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMaster, setSelectedMaster] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMasterList = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/masters/all");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setMasterList(data.masters);
    } catch (error) {
      console.error("Error fetching master list:", error);
      setErrorMessage("Failed to load master list.");
    }
  };

  useEffect(() => {
    fetchMasterList();
  }, []);

  const handleAddMaster = async (name: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/master/create", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add master");
      }

      const newMaster = await response.json();
      setMasterList((prev) => [...prev, newMaster.master]);
    } catch (error: any) {
      console.error("Error adding master:", error);
      setErrorMessage(error?.message || "Failed to add master.");
    }
  };

  const handleEditMaster = async (id: number, name: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/master/edit/${id}`,
        {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({name}),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update master");
      }

      const updatedMaster = await response.json();
      setMasterList((prev) =>
        prev.map((master) =>
          master.id === id ? updatedMaster.updatedMaster : master
        )
      );
    } catch (error: any) {
      console.error("Error updating master:", error);
      setErrorMessage(error?.message || "Failed to update master.");
    }
  };

  const handleDeleteMaster = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/master/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete master");
      }

      setMasterList((prev) => prev.filter((master) => master.id !== id));
    } catch (error: any) {
      console.error("Error deleting master:", error);
      setErrorMessage(error?.message || "Failed to delete master.");
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
              Master Name*
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
                onSubmit(inputValue);
                onClose();
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
          <a
            href="/admin/marketplace"
            className="hover:text-yellow-500"
          >
            Marketplace
          </a>
          <span className="mx-2">/</span>
          <span className="text-yellow-500">Master</span>
        </nav>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">Master</h1>

      {/* Add Master & Search */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <span className="text-xl">+</span> Add Master
        </button>
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Master"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Master List */}
      <div className="grid grid-cols-2 gap-4">
        {masterList
          .filter((master) =>
            master.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((master: {id: number; name: string}) => (
            <div
              key={master.id}
              className="bg-white rounded-lg p-4 flex items-center justify-between border border-gray-100"
            >
              <span className="font-medium text-gray-700">{master.name}</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setSelectedMaster(master);
                    setIsEditModalOpen(true);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteMaster(master.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Modals */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Master"
        submitText="Save"
        onSubmit={handleAddMaster}
      />

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Master"
        submitText="Update"
        onSubmit={(name) =>
          selectedMaster && handleEditMaster(selectedMaster.id, name)
        }
        defaultValue={selectedMaster?.name || ""}
      />
    </div>
  );
};