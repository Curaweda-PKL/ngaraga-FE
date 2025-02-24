import React, { useState, useEffect } from "react";
import { Pencil, Eye, EyeOff, Trash2, Search, X } from "lucide-react";
import { SERVER_URL } from "@/middleware/utils"; // Import centralized server URL

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitText: string;
  onSubmit: (name: string, code: string) => void;
  defaultValue?: string;
  defaultCode?: string; // For default code value
}

export const Master = () => {
  const [masterList, setMasterList] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMaster, setSelectedMaster] = useState<{
    id: number;
    name: string;
    code: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMasterList = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/masters/all`);
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

  // Validate code format if provided (must be exactly three digits)
  const isValidCode = (code: string) => {
    return /^\d{3}$/.test(code);
  };

  const handleAddMaster = async (name: string, code: string) => {
    // If a code is provided, validate its format.
    if (code && !isValidCode(code)) {
      setErrorMessage("Input harus mengikuti format xxx");
      return;
    }
    try {
      const bodyData: any = { name };
      if (code) {
        bodyData.code = code; // Hanya tambahkan jika code ada
      }

      const response = await fetch(`${SERVER_URL}/api/master/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add master");
      }

      const newMaster = await response.json();
      setMasterList((prev) => [...prev, newMaster.master]);
      setSuccessMessage("Master successfully added.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error: any) {
      console.error("Error adding master:", error);
      setErrorMessage(error?.message || "Failed to add master.");
    }
  };

  const handleEditMaster = async (id: number, name: string, code: string) => {
    // Validate code if provided
    if (code && !isValidCode(code)) {
      setErrorMessage("Input harus mengikuti format xxx");
      return;
    }
    try {
      const bodyData: any = { name };
      if (code) {
        bodyData.code = code; // Hanya tambahkan jika ada
      }

      const response = await fetch(`${SERVER_URL}/api/master/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

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
      setSuccessMessage("Master successfully updated.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error: any) {
      console.error("Error updating master:", error);
      setErrorMessage(error?.message || "Failed to update master.");
    }
  };

  const handleDeleteMaster = async (id: number) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/master/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete master");
      }

      setMasterList((prev) => prev.filter((master) => master.id !== id));
      setSuccessMessage("Master successfully deleted.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error: any) {
      console.error("Error deleting master:", error);
      setErrorMessage(error?.message || "Failed to delete master.");
    }
  };

  // New: Toggle suspend/unsuspend for a master
  const handleToggleSuspend = async (id: number, currentStatus: boolean) => {
    try {
      const endpoint = currentStatus
        ? `${SERVER_URL}/api/masters/${id}/unsuspend`
        : `${SERVER_URL}/api/masters/${id}/suspend`;
      const response = await fetch(endpoint, {
        method: "PATCH",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Failed to ${currentStatus ? "unsuspend" : "suspend"} master`
        );
      }
      const result = await response.json();
      // Expecting result.master to contain the updated master
      setMasterList((prev) =>
        prev.map((master) =>
          master.id === result.master.id ? result.master : master
        )
      );
      setSuccessMessage(
        `Master successfully ${currentStatus ? "unsuspended" : "suspended"}.`
      );
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error: any) {
      console.error("Error toggling suspension:", error);
      setErrorMessage(
        error?.message ||
          `Failed to ${currentStatus ? "unsuspend" : "suspend"} master.`
      );
    }
  };

  const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    submitText,
    onSubmit,
    defaultValue = "",
    defaultCode = "", // Tambahkan defaultCode
  }) => {
    const [inputValue, setInputValue] = useState(defaultValue);
    const [inputCode, setInputCode] = useState(defaultCode); // Untuk input code

    useEffect(() => {
      setInputValue(defaultValue);
      setInputCode(defaultCode); // Set defaultCode
    }, [defaultValue, defaultCode]);

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
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
              Master Code (format: xxx; Number)
            </label>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="input master code"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {inputCode && !isValidCode(inputCode) && (
              <p className="text-red-500 text-sm mt-1">
                Input harus mengikuti format xxx
              </p>
            )}
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
                // Only submit if code is empty or valid
                if (inputCode && !isValidCode(inputCode)) {
                  setErrorMessage("Input harus mengikuti format xxx");
                  return;
                }
                onSubmit(inputValue, inputCode.trim() !== "" ? inputCode : "");
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
      {successMessage && (
        <div className="text-green-500 mb-4 p-2 border border-green-500 bg-green-100 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Breadcrumb */}
      <div className="mb-4">
        <nav className="text-sm text-gray-500">
          <a href="/admin/marketplace" className="hover:text-yellow-500">
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
          className="bg-call-to-actions-900 hover:bg-call-to-actions-900 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <span className="text-xl">+</span> Add Master
        </button>
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search and tap Enter"
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
          .map((master: { id: number; name: string; isSuspended: boolean; code: string }) => (
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
                <button
                  onClick={() =>
                    handleToggleSuspend(master.id, master.isSuspended)
                  }
                  className="text-gray-400 hover:text-gray-600"
                >
                  {master.isSuspended ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
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
        onSubmit={(name, code) =>
          selectedMaster && handleEditMaster(selectedMaster.id, name, code)
        }
        defaultValue={selectedMaster?.name || ""}
        defaultCode={selectedMaster?.code || ""}
      />
    </div>
  );
};
