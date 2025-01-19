import React, {useState} from "react";
import {Pencil, Eye, Trash2, X} from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  submitText: string;
}

export const Master = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSeries, setEditingSeries] = useState("");
  const [newSeries, setNewSeries] = useState("");

  const seriesList = [
    "Master 1",
    "Master 2",
    "Master 3",
    "Master 4",
    "Master 5",
    "Master 6",
    "Master 7",
    "Master 8",
  ];

  const handleEdit = (series: string) => {
    setEditingSeries(series);
    setIsEditModalOpen(true);
  };

  const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    value,
    onChange,
    onSubmit,
    submitText,
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg w-full max-w-md">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-medium">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Series Name*
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-2 p-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
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
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Marketplace</span>
        <span>/</span>
        <span className="text-gray-700">Series</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Series</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add Series
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Series Grid */}
      <div className="grid grid-cols-2 gap-4">
        {seriesList.map((series, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 flex items-center justify-between border border-gray-100"
          >
            <div className="flex items-center">
              <span className="font-medium text-gray-700">{series}</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleEdit(series)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <Eye className="w-5 h-5" />
              </button>
              <button className="text-red-400 hover:text-red-600">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Series Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Series"
        value={newSeries}
        onChange={setNewSeries}
        onSubmit={() => {
          // Handle add series logic here
          setIsAddModalOpen(false);
          setNewSeries("");
        }}
        submitText="Save"
      />

      {/* Edit Series Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Series"
        value={editingSeries}
        onChange={setEditingSeries}
        onSubmit={() => {
          // Handle edit series logic here
          setIsEditModalOpen(false);
          setEditingSeries("");
        }}
        submitText="Update"
      />
    </div>
  );
};