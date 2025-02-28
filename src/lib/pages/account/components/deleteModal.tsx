import React from "react";
import { DeleteTrashIcon } from "./trashDeleteIcon";

interface DeleteAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteAddressModal: React.FC<DeleteAddressModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Modal Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-10">
        {/* X Icon at Top Right */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Header with Bottom Border */}
        <div className="mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Delete Address
          </h2>
        </div>

        {/* Icon and Message */}
        <div className="flex flex-col items-center space-y-4">
          <DeleteTrashIcon />
          <p className="text-gray-700 text-center">
            Are you sure you want to remove this address? Once deleted, it’s gone
            for good. Don’t worry—you can always add it again later if needed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-2">
          <button
            className="bg-white border border-call-to-actions-900 text-call-to-actions-900 py-2 px-4 rounded-lg hover:bg-gray-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-call-to-actions-900 border border-call-to-actions-900 text-white py-2 px-4 rounded-lg hover:bg-call-to-actions-800"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAddressModal;
