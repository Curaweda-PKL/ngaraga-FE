import React, {useState} from "react";
import {IoRadioButtonOn} from "react-icons/io5";

const DeliveryTab: React.FC = () => {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
    useState<string>("Anter Aja");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState<boolean>(false);

  const handleAddNewAddress = () => setIsAddModalOpen(true);
  const handleEditAddress = () => setIsEditModalOpen(true);
  const handleDeleteAddress = () => setIsDeleteModalOpen(true);
  const handleChangeAddress = () => setIsChangeModalOpen(true);

  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsChangeModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg shadow-sm mt-4">
        <div className="flex items-center mb-4">
          <span className="material-icons text-gray-600 mr-2">home</span>
          <h3 className="text-lg font-semibold">Animakid</h3>
        </div>
        <p className="text-gray-700 text-sm mb-2">+62 854 5565 6745</p>
        <p className="text-gray-600 text-sm">
          Jl. Medan Merdeka Barat No.12, Gambir, Kecamatan Gambir, Kota Jakarta
          Pusat, Daerah Khusus Ibukota Jakarta 10110
        </p>
        <div className="flex mt-4 space-x-4">
          <button
            className="text-[#DDB11F] text-sm font-medium"
            onClick={handleEditAddress}
          >
            Edit
          </button>
          <button
            className="text-[#DDB11F] text-sm font-medium"
            onClick={handleDeleteAddress}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex justify-between mt-4 mb-2">
        <button
          className="px-4 py-2 border-2 border-[#DDB11F] text-[#DDB11F] text-sm font-medium rounded-lg shadow hover:bg-[#DDB11F] hover:text-white transition"
          onClick={handleChangeAddress}
        >
          Change Address
        </button>
        <button
          className="px-4 py-2 bg-[#DDB11F] text-white text-sm font-medium rounded-lg shadow hover:bg-[#c5991a] transition"
          onClick={handleAddNewAddress}
        >
          + Add New Address
        </button>
      </div>

      <div className="mt-8">
        <h2 className="font-bold text-lg mb-4">Delivery Options</h2>
        <div className="space-y-4 mb-10">
          {["Anter Aja", "ID Express", "JNE"].map((option) => (
            <label
              key={option}
              className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer mt-4 h-20 ${
                selectedDeliveryMethod === option
                  ? "border-call-to-actions-900"
                  : ""
              }`}
            >
              <img
                src="https://assets.kompasiana.com/items/album/2024/06/28/jne-reg-667e8e2fed64153ad268a362.png?t=o&v=300"
                alt={option}
                className="w-16 h-16 mr-4 object-cover"
              />
              <span className="flex-grow">{option}</span>
              <div className="flex flex-col items-end">
                {selectedDeliveryMethod === option && (
                  <IoRadioButtonOn className="text-xl mb-1" />
                )}
                <span>Rp 15.000</span>
              </div>
              <input
                type="radio"
                name="delivery"
                value={option}
                checked={selectedDeliveryMethod === option}
                onChange={() => setSelectedDeliveryMethod(option)}
                className="hidden"
              />
            </label>
          ))}
        </div>
      </div>

      {isAddModalOpen && (
        <Modal
          title="Add New Address"
          onClose={closeModal}
        >
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your address"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#DDB11F] text-white rounded-lg shadow"
            >
              Save Address
            </button>
          </form>
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal
          title="Edit Address"
          onClose={closeModal}
        >
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Update your address"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#DDB11F] text-white rounded-lg shadow"
            >
              Update Address
            </button>
          </form>
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal
          title="Delete Address"
          onClose={closeModal}
        >
          <p>Are you sure you want to delete this address?</p>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              className="px-4 py-2 text-gray-600 border rounded-lg"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow">
              Delete
            </button>
          </div>
        </Modal>
      )}

      {isChangeModalOpen && (
        <Modal
          title="Change Address"
          onClose={closeModal}
        >
          <p>
            Please select a new address from your saved addresses or add a new
            one.
          </p>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              className="px-4 py-2 text-gray-600 border rounded-lg"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-[#DDB11F] text-white rounded-lg shadow">
              Confirm
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({title, children, onClose}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DeliveryTab;
