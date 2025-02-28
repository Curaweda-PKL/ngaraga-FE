import React, {useState} from "react";
import {IoRadioButtonOn} from "react-icons/io5";

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
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <div className="flex">
                <select className="border rounded-l-lg px-3 py-2 bg-gray-100 text-sm">
                  <option value="+62">+62</option>
                </select>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border-t border-b border-r rounded-r-lg"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Country</label>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option value="Indonesia">Indonesia</option>
              </select>
            </div>

            {/* Grid Layout for Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  State/Province
                </label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option>Select State/Province</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  City/Regency
                </label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option>Select City/Regency</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subdistrict
                </label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option>Select Subdistrict</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter postal code"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Address Details
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
                placeholder="Enter detailed address"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#DDB11F] text-white rounded-lg shadow hover:bg-[#c5991a]"
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
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <div className="flex">
                <select className="border rounded-l-lg px-3 py-2 bg-gray-100 text-sm">
                  <option value="+62">+62</option>
                </select>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border-t border-b border-r rounded-r-lg"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Country</label>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option value="Indonesia">Indonesia</option>
              </select>
            </div>

            {/* Grid Layout for Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  State/Province
                </label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option>Select State/Province</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  City/Regency
                </label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option>Select City/Regency</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subdistrict
                </label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option>Select Subdistrict</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter postal code"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Address Details
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
                placeholder="Enter detailed address"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#DDB11F] text-white rounded-lg shadow hover:bg-[#c5991a]"
            >
              Save Address
            </button>
          </form>
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal
          title="Delete Address"
          onClose={closeModal}
        >
          <div className="flex flex-col items-center justify-center py-8">
            <div className="bg-red-100 rounded-full p-4 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
            <p>Are you sure you want to delete this address?</p>
            <p className="text-gray-500 mt-2">
              Are you sure you want to remove this address? Once deleted, it's
              gone for good. Don't worry you can always add it again later if
              needed.
            </p>
            <div className="flex justify-end w-full space-x-2 mt-12">
              <button
                className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-100"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {isChangeModalOpen && (
        <Modal
          title="Change Address"
          onClose={closeModal}
        >
          <div className="flex flex-col items-start space-y-4">
            <p>
              Please select a new address from your saved addresses or add a new
              one.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg w-full">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-[#DDB11F] rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-800">Animakid</h3>
              </div>
              <p className="text-gray-600">+62 854 5565 6745</p>
              <p className="text-gray-600">
                Jl. Medan Merdeka Barat No.12, Gambir, Kecamatan Gambir, Kota
                Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110
              </p>
              <div className="flex justify-end space-x-2 mt-2">
                <button className="text-[#DDB11F] hover:underline">Edit</button>
                <button className="text-[#DDB11F] hover:underline">
                  Delete
                </button>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg w-full">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-[#DDB11F] rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-800">Animakid</h3>
              </div>
              <p className="text-gray-600">+62 854 5565 6745</p>
              <p className="text-gray-600">
                Jl. Medan Merdeka Barat No.12, Gambir, Kecamatan Gambir, Kota
                Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110
              </p>
              <div className="flex justify-end space-x-2 mt-2">
                <button className="text-[#DDB11F] hover:underline">Edit</button>
                <button className="text-[#DDB11F] hover:underline">
                  Delete
                </button>
              </div>
            </div>
            <div className="flex justify-end w-full space-x-2">
              <button className="bg-[#DDB11F] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#c9a217]">
                + Add New Address
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DeliveryTab;
