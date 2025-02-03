import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: "suspend" | "unsuspend" | "delete";
  userName: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, action, userName }) => {
  if (!isOpen) return null;

  const actionText = action === "suspend" ? "Suspend" : action === "unsuspend" ? "Unsuspend" : "Delete";

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{`${actionText} User`}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 16a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM5.354 5.354a.5.5 0 0 1 .708 0L8 7.793l2.938-2.938a.5.5 0 1 1 .707.707L8.707 8.5l2.938 2.938a.5.5 0 1 1-.707.707L8 9.207l-2.938 2.938a.5.5 0 1 1-.707-.707L7.293 8.5 4.354 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>
        <p className="text-gray-700 mb-4">
          Are you sure you want to {actionText.toLowerCase()} {userName}?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="py-2 px-4 border rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`py-2 px-4 rounded-lg text-white ${action === "suspend" ? "bg-yellow-500 hover:bg-yellow-600" : action === "unsuspend" ? "bg-blue-500 hover:bg-blue-600" : "bg-red-500 hover:bg-red-600"}`}
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
