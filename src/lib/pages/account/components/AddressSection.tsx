// src/components/AddressSection.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoRadioButtonOn } from "react-icons/io5";
import { FaSadTear } from "react-icons/fa"; // Imported sad icon
import { HomeIcon } from "./homeIcon";
import AddAddressModal from "./addModal";
import EditAddressModal from "./editModal";
import DeleteAddressModal from "./deleteModal";
import { SERVER_URL } from "@/middleware/utils";

// Define the Address interface (adjust fields as needed)
interface Address {
  id: string;
  details: string;
  postalCode: string;
  province: string;
  provinceId: string;
  city: string;
  cityId: string;
  subdistrict: string;
  subdistrictId: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

interface AddressSectionProps {
  selectedAddress: number | null;
  handleAddressClick: (index: number) => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({ selectedAddress, handleAddressClick }) => {
  // States for controlling modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAddressIndex, setEditingAddressIndex] = useState<number | null>(null);
  const [deletingAddressIndex, setDeletingAddressIndex] = useState<number | null>(null);

  // State for storing fetched addresses
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [errorAddresses, setErrorAddresses] = useState("");

  // Fetch addresses on component mount
  useEffect(() => {
    const fetchAddresses = async () => {
      setLoadingAddresses(true);
      setErrorAddresses("");
      try {
        const response = await axios.get(`${SERVER_URL}/api/account/addresses`, {
          withCredentials: true,
        });
        setAddresses(response.data);
      } catch (error: any) {
        setErrorAddresses(error.response?.data?.message || "Failed to load addresses.");
      } finally {
        setLoadingAddresses(false);
      }
    };

    fetchAddresses();
  }, []);

  // After addresses are loaded, fetch the active address so it persists across refreshes
  useEffect(() => {
    const fetchActiveAddress = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/account/list/addresses/active`, {
          withCredentials: true,
        });
        const activeAddress = response.data;
        if (activeAddress) {
          const activeIndex = addresses.findIndex((addr) => addr.id === activeAddress.id);
          if (activeIndex !== -1 && activeIndex !== selectedAddress) {
            handleAddressClick(activeIndex);
          }
        }
      } catch (error) {
        console.error("Error fetching active address", error);
      }
    };

    if (addresses.length > 0) {
      fetchActiveAddress();
    }
  }, [addresses, selectedAddress, handleAddressClick]);

  // Save active address via API when the "Save Active Address" button is clicked
  const handleSaveActiveAddress = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedAddress === null) {
      alert("Please select an address to save as active.");
      return;
    }
    const addressId = addresses[selectedAddress].id;
    try {
      await axios.put(
        `${SERVER_URL}/api/account/addresses/active/${addressId}`,
        {},
        { withCredentials: true }
      );
      console.log("Active address saved successfully");
    } catch (error) {
      console.error("Error saving active address", error);
    }
  };

  // Example delete logic
  const handleDeleteConfirm = async () => {
    if (deletingAddressIndex !== null) {
      try {
        const addressId = addresses[deletingAddressIndex].id;
        await axios.delete(`${SERVER_URL}/api/account/addresses/${addressId}`, {
          withCredentials: true,
        });
        setAddresses(prev => prev.filter((_, index) => index !== deletingAddressIndex));
      } catch (error) {
        console.error("Error deleting address", error);
      }
    }
    setIsDeleteModalOpen(false);
  };

  // Format the address into a single string
  const formatAddress = (address: Address) => {
    return `${address.details}, ${address.subdistrict}, ${address.city}, ${address.province} ${address.postalCode}`;
  };

  return (
    <>
      {loadingAddresses ? (
        <p>Loading addresses...</p>
      ) : errorAddresses ? (
        <p className="text-red-500">{errorAddresses}</p>
      ) : addresses.length > 0 ? (
        addresses.map((address, index) => (
          <div key={address.id} className="grid grid-cols-1 gap-4">
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
              <p className="text-gray-600 text-sm leading-relaxed">
                {formatAddress(address)}
              </p>
              <div className="flex mt-4 space-x-4">
                <button
                  className="text-call-to-actions-900 text-sm font-medium hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingAddressIndex(index);
                    setIsEditModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-call-to-actions-900 text-sm font-medium hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletingAddressIndex(index);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        // Fallback display with sad icon when there are no addresses
        <div className="flex flex-col items-center justify-center mt-4">
          <FaSadTear className="text-gray-400 text-6xl" />
          <p className="mt-2 text-gray-600">No addresses found.</p>
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={handleSaveActiveAddress}
          className="bg-white border border-call-to-actions-900 text-call-to-actions-900 py-2 px-4 rounded-lg hover:bg-call-to-actions-100"
        >
          Save Active Address
        </button>

        <button
          className="bg-call-to-actions-100 border border-call-to-actions-900 text-call-to-actions-900 py-2 px-4 rounded-lg hover:bg-opacity-80"
          onClick={() => setIsAddModalOpen(true)}
        >
          + Add New Address
        </button>
      </div>

      {isAddModalOpen && (
        <AddAddressModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {isEditModalOpen && editingAddressIndex !== null && (
        <EditAddressModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          address={addresses[editingAddressIndex]}
          onAddressUpdated={(updatedAddress: Address) => {
            // Update the corresponding address in the state
            setAddresses((prev) =>
              prev.map((addr, idx) => (idx === editingAddressIndex ? updatedAddress : addr))
            );
          }}
        />
      )}

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
