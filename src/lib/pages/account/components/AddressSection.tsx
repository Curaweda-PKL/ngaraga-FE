import React, { useState } from "react";
import { IoRadioButtonOn } from "react-icons/io5";
import { HomeIcon } from "./homeIcon";
import AddAddressModal from "./addModal";
import EditAddressModal from "./editModal";
import DeleteAddressModal from "./deleteModal"; // Import the delete modal

interface AddressSectionProps {
  selectedAddress: number | null;
  handleAddressClick: (index: number) => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  selectedAddress,
  handleAddressClick,
}) => {
  // State for controlling modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAddressIndex, setEditingAddressIndex] = useState<number | null>(null);
  const [deletingAddressIndex, setDeletingAddressIndex] = useState<number | null>(null);

  // Example delete logic (you can replace this with your actual deletion function)
  const handleDeleteConfirm = () => {
    if (deletingAddressIndex !== null) {
      console.log("Deleting address at index:", deletingAddressIndex);
      // Add your deletion logic here
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      {/* Address Cards */}
      {[...Array(3)].map((_, index) => (
        <div key={index} className="grid grid-cols-1 gap-4">
          <div
            className={`p-4 border rounded-lg shadow-md mt-4 ${
              selectedAddress === index
                ? "bg-white-100 border-call-to-actions-900"
                : "bg-white border-gray-300"
            }`}
            onClick={() => handleAddressClick(index)}
          >
            <div className="flex items-center mb-3">
              {selectedAddress === index && (
                <IoRadioButtonOn className="text-call-to-actions-900 mr-3" />
              )}
              <span className="material-icons text-gray-500 mr-3">
                <HomeIcon />
              </span>
              <h3 className="text-lg font-semibold text-gray-800">
                Address {index + 1}
              </h3>
            </div>
            <p className="text-gray-700 text-sm mb-2">+62 854 5565 6745</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Jl. Medan Merdeka Barat No.12, Gambir, Kecamatan Gambir,
              Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110
            </p>
            <div className="flex mt-4 space-x-4">
              <button
                className="text-call-to-actions-900 text-sm font-medium hover:underline"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  setEditingAddressIndex(index);
                  setIsEditModalOpen(true);
                }}
              >
                Edit
              </button>
              <button
                className="text-call-to-actions-900 text-sm font-medium hover:underline"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  setDeletingAddressIndex(index);
                  setIsDeleteModalOpen(true);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* "Add New Address" Button */}
      <div className="flex justify-end mt-4">
        <button
          className="bg-call-to-actions-100 border border-call-to-actions-900 text-call-to-actions-900 py-2 px-4 rounded-lg hover:bg-opacity-80"
          onClick={() => setIsAddModalOpen(true)}
        >
          + Add New Address
        </button>
      </div>

      {/* Render the Add Address modal */}
      {isAddModalOpen && (
        <AddAddressModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {/* Render the Edit Address modal */}
      {isEditModalOpen && (
        <EditAddressModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          // Optionally, pass the index or address details if needed:
          // addressIndex={editingAddressIndex}
        />
      )}

      {/* Render the Delete Address modal */}
      {isDeleteModalOpen && (
        <DeleteAddressModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
};

export default AddressSection;
