import React, { useState, useEffect } from "react";
import { Pencil, Eye, Trash2, X } from "lucide-react";
import axios from "axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  value: string;
  submitText: string;
  onSubmit: (tagName: string) => void;
}

export const Tag = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tagToEdit, setTagToEdit] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]); // Initialize with an empty array
  const [searchQuery, setSearchQuery] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tags/all");
        setTags(response.data.tags.map((tag: { name: string }) => tag.name));
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleEdit = (tag: string) => {
    setTagToEdit(tag);
    setIsEditModalOpen(true);
  };

  const handleAddTag = async (tagName: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/tag/create",
        {
          name: tagName,
        }
      );
      setTags((prevTags) => [...prevTags, response.data.tag.name]);
      setIsAddModalOpen(false);
      setSuccessMessage("Tag added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error creating tag:", error);
    }
  };

  const handleEditTag = async (tagName: string) => {
    if (tagToEdit) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/tag/${tagToEdit}`,
          {
            name: tagName,
          }
        );
        setTags((prevTags) =>
          prevTags.map((tag) =>
            tag === tagToEdit ? response.data.tag.name : tag
          )
        );
        setIsEditModalOpen(false);
        setTagToEdit(null);
        setSuccessMessage("Tag updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Error updating tag:", error);
      }
    }
  };

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    value,
    submitText,
    onSubmit,
  }) => {
    const [inputValue, setInputValue] = useState(value);

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
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tag Name*
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 p-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit(inputValue)}
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
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Marketplace</span>
        <span>/</span>
        <span className="text-gray-700">Tag</span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Tag</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add Tag
          </button>

          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

      {successMessage && (
        <div className="text-green-500 mb-4 p-2 border border-green-500 bg-green-100 rounded-lg">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {filteredTags.map((tag, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 flex items-center justify-between border border-gray-100"
          >
            <div className="flex items-center">
              <span className="font-medium text-gray-700">{tag}</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleEdit(tag)}
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

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Tag"
        value=""
        submitText="Save"
        onSubmit={handleAddTag}
      />

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Tag"
        value={tagToEdit || ""}
        submitText="Update"
        onSubmit={handleEditTag}
      />
    </div>
  );
};
