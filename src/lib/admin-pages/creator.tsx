import { useEffect, useState, useRef } from "react";
import { X, Pencil, Eye, EyeOff, Trash2, Plus, Search } from "lucide-react";
import axios from "axios";
import { SERVER_URL } from "@/middleware/utils"; // Import your server URL

export const Creator = () => {
  // States for adding a creator
  const [image, setImage] = useState<File | null>(null);
  const [creatorName, setCreatorName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // States for editing a creator
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCreator, setEditingCreator] = useState<any>(null);
  const [editCreatorName, setEditCreatorName] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);

  // Common states
  const [creators, setCreators] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const editModalRef = useRef<HTMLDivElement | null>(null);
  const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB in bytes

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/creator/all`);
        setCreators(response.data.creators);
      } catch (error) {
        console.error("Error fetching creators:", error);
        setErrorMessage("Error fetching creators");
        setTimeout(() => setErrorMessage(null), 3000);
      }
    };

    fetchCreators();
  }, []);

  // Handlers for Add Creator
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage("Image size must be less than 4MB.");
        setTimeout(() => setErrorMessage(null), 3000);
        return;
      }
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImage(null);
    setImagePreview(null);
  };

  const handleSave = async () => {
    if (!image || !creatorName) {
      alert("Please upload an image and provide a creator name.");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", creatorName);

    try {
      const response = await axios.post(
        `${SERVER_URL}/api/creator/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message === "Creator created successfully") {
        setSuccessMessage("Creator created successfully!");
        setIsModalOpen(false);
        setCreatorName("");
        setImage(null);
        setImagePreview(null);
        setCreators((prev) => [...prev, response.data.creator]);
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        alert("Failed to create creator.");
      }
    } catch (error) {
      console.error("Error creating creator:", error);
      alert("An error occurred while creating the creator.");
    }
  };

  // Handlers for Edit Creator
  const openEditModal = (creator: any) => {
    setEditingCreator(creator);
    setEditCreatorName(creator.name);
    // Set preview using the existing image URL
    setEditImagePreview(`${SERVER_URL}/uploads/creator/${creator.image}`);
    setEditImage(null);
    setIsEditModalOpen(true);
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage("Image size must be less than 4MB.");
        setTimeout(() => setErrorMessage(null), 3000);
        return;
      }
      // Revoke previous preview if it was a blob URL
      if (editImagePreview && editImagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(editImagePreview);
      }
      setEditImage(file);
      setEditImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveEditImage = () => {
    if (editImagePreview && editImagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(editImagePreview);
    }
    setEditImage(null);
    setEditImagePreview(null);
  };

  const handleEditSave = async () => {
    if (!editCreatorName) {
      alert("Please provide a creator name.");
      return;
    }
    const formData = new FormData();
    formData.append("name", editCreatorName);
    if (editImage) {
      formData.append("image", editImage);
    }
    try {
      const response = await axios.put(
        `${SERVER_URL}/api/creator/edit/${editingCreator.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.message === "Creator updated successfully") {
        setSuccessMessage("Creator updated successfully!");
        setIsEditModalOpen(false);
        setCreators((prev) =>
          prev.map((c) =>
            c.id === editingCreator.id ? response.data.updatedCreator : c
          )
        );
        setEditingCreator(null);
        setEditCreatorName("");
        setEditImage(null);
        setEditImagePreview(null);
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        alert("Failed to update creator.");
      }
    } catch (error) {
      console.error("Error updating creator:", error);
      setErrorMessage("An error occurred while updating the creator.");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  // Toggle suspend/unsuspend for a creator
  const handleToggleSuspend = async (creator: any) => {
    try {
      let response;
      if (creator.isSuspended) {
        response = await axios.patch(
          `${SERVER_URL}/api/creator/unsuspend/${creator.id}`
        );
        setSuccessMessage("Creator unsuspended successfully!");
      } else {
        response = await axios.patch(
          `${SERVER_URL}/api/creator/suspend/${creator.id}`
        );
        setSuccessMessage("Creator suspended successfully!");
      }
      const updatedCreator =
        response.data.unsuspendedCreator || response.data.suspendedCreator;
      setCreators((prev) =>
        prev.map((c) => (c.id === creator.id ? updatedCreator : c))
      );
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Error toggling suspend state:", error);
      setErrorMessage("Error toggling suspend state.");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  // Delete a creator
  const handleDeleteCreator = async (creator: any) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the creator "${creator.name}"?`
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${SERVER_URL}/api/creator/delete/${creator.id}`);
      setCreators((prev) => prev.filter((c) => c.id !== creator.id));
      setSuccessMessage("Creator deleted successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Error deleting creator:", error);
      setErrorMessage("Error deleting creator.");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const closeModalOnClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };

  const closeEditModalOnClickOutside = (e: React.MouseEvent) => {
    if (editModalRef.current && !editModalRef.current.contains(e.target as Node)) {
      setIsEditModalOpen(false);
    }
  };

  // Filter creators based on search query
  const filteredCreators = creators.filter((creator) =>
    creator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Success Message */}
      {successMessage && (
        <div
          className="text-green-500 mb-4 p-2 border border-green-500 bg-green-100 rounded-lg"
          title="Success message"
        >
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div
          className="text-red-500 mb-4 p-2 border border-red-500 bg-red-100 rounded-lg"
          title="Error message"
        >
          {errorMessage}
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4" title="Breadcrumb">
        <span>Creator</span>
        <span>/</span>
        <span className="text-gray-700">Creator List</span>
      </div>

      {/* Header */}
      <h1 className="text-2xl font-semibold mb-4" title="Creator Page">Creator</h1>

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-call-to-actions-900 hover:bg-call-to-actions-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          title="Add Creator"
        >
          <Plus className="w-4 h-4" />
          <span>Add Creator</span>
        </button>

        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            title="Search creators"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" title="Search icon" />
        </div>
      </div>

      {/* Creator Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredCreators.map((creator, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 flex items-center justify-between"
            title={`Creator: ${creator.name}`}
          >
            <div className="flex items-center gap-3">
              <img
                src={`${SERVER_URL}/uploads/creator/${creator.image}`}
                alt={creator.name}
                className="w-10 h-10 rounded-lg"
                title="Creator Image"
              />
              <span className="font-medium">{creator.name}</span>
            </div>
            <div className="flex items-center gap-4">
              {/* Edit Button */}
              <button
                onClick={() => openEditModal(creator)}
                className="text-gray-400 hover:text-gray-600"
                title="Edit Creator"
              >
                <Pencil className="w-5 h-5" />
              </button>
              {/* Suspend / Unsuspend Button */}
              <button
                onClick={() => handleToggleSuspend(creator)}
                className="text-gray-400 hover:text-gray-600"
                title={creator.isSuspended ? "Unsuspend Creator" : "Suspend Creator"}
              >
                {creator.isSuspended ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              {/* Delete Button */}
              <button
                onClick={() => handleDeleteCreator(creator)}
                className="text-gray-400 hover:text-gray-600"
                title="Delete Creator"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Creator Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeModalOnClickOutside}
          title="Add Creator Modal Background"
        >
          <div
            ref={modalRef}
            className="bg-white rounded-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
            title="Add Creator Modal"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-medium" title="Modal Title">Add Creator</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
                title="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" title="Creator Image Label">
                    Creator Image*
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <div className="text-center">
                      {image ? (
                        <div className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Uploaded"
                            className="w-full h-48 object-cover rounded"
                            title="Uploaded Image Preview"
                          />
                          <div className="absolute top-2 right-2 flex space-x-2">
                            <button
                              onClick={handleRemoveImage}
                              className="p-2 bg-red-500 text-white rounded-full"
                              title="Remove Image"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleImageChange}
                            className="hidden"
                            id="image-upload"
                          />
                          <label
                            htmlFor="image-upload"
                            className="cursor-pointer px-4 py-2 bg-yellow-500 text-white rounded"
                            title="Browse Files"
                          >
                            Browse
                          </label>
                          <p className="mt-2 text-sm text-red-500" title="Upload Instruction">
                            Click to Upload
                          </p>
                          <p className="text-xs text-gray-500" title="File Requirements">
                            jpeg, jpg, png max 4mb
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" title="Creator Name Label">
                    Creator Name*
                  </label>
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    title="Enter Creator Name"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                title="Cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                title="Save Creator"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Creator Modal */}
      {isEditModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeEditModalOnClickOutside}
          title="Edit Creator Modal Background"
        >
          <div
            ref={editModalRef}
            className="bg-white rounded-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
            title="Edit Creator Modal"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-medium" title="Modal Title">Edit Creator</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
                title="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" title="Creator Image Label">
                    Creator Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <div className="text-center">
                      {editImagePreview ? (
                        <div className="relative">
                          <img
                            src={editImagePreview}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded"
                            title="Image Preview"
                          />
                          <div className="absolute top-2 right-2 flex space-x-2">
                            <button
                              onClick={handleRemoveEditImage}
                              className="p-2 bg-red-500 text-white rounded-full"
                              title="Remove Image"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleEditImageChange}
                            className="hidden"
                            id="edit-image-upload"
                          />
                          <label
                            htmlFor="edit-image-upload"
                            className="cursor-pointer px-4 py-2 bg-yellow-500 text-white rounded"
                            title="Browse Files"
                          >
                            Browse
                          </label>
                          <p className="mt-2 text-sm text-red-500" title="Upload Instruction">
                            Click to Upload
                          </p>
                          <p className="text-xs text-gray-500" title="File Requirements">
                            jpeg, jpg, png max 4mb
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" title="Creator Name Label">
                    Creator Name*
                  </label>
                  <input
                    type="text"
                    value={editCreatorName}
                    onChange={(e) => setEditCreatorName(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    title="Enter Creator Name"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                title="Cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                title="Save Changes"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
