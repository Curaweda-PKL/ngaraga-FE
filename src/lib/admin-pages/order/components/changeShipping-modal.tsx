import { useState } from "react";

interface ShippingOption {
    id: string;
    name: string;
    logo: string;
    estimatedDelivery: string;
    price: number;
  }

interface ChangeShippingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (option: ShippingOption) => void;
  selectedOptionId: string;
  shippingOptions: ShippingOption[];
}

const [selectedShipping, setSelectedShipping] = useState<ShippingOption>({
    id: "anteraja",
    name: "Anter Aja",
    logo: "/api/placeholder/40/40",
    estimatedDelivery: "3-4 Days",
    price: 15000,
  });

  const shippingOptions: ShippingOption[] = [
    {
      id: "anteraja",
      name: "Anter Aja",
      logo: "/api/placeholder/40/40",
      estimatedDelivery: "3-4 Days",
      price: 15000,
    },
    {
      id: "idexpress",
      name: "ID Express",
      logo: "/api/placeholder/40/40",
      estimatedDelivery: "3-4 Days",
      price: 15000,
    },
    {
      id: "jne",
      name: "JNE",
      logo: "/api/placeholder/40/40",
      estimatedDelivery: "3-4 Days",
      price: 15000,
    },
    {
      id: "jt",
      name: "J&T",
      logo: "/api/placeholder/40/40",
      estimatedDelivery: "3-4 Days",
      price: 15000,
    },
  ];

export const ChangeShippingModal: React.FC<ChangeShippingModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedOptionId,
  shippingOptions,
}) => {
  const [selectedId, setSelectedId] = useState(selectedOptionId);

  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);


  const handleConfirm = () => {
    const selectedOption = shippingOptions.find(
      (option) => option.id === selectedId
    );
    if (selectedOption) {
      onConfirm(selectedOption);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    // shipping modal
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Change Shipping</h2>
        <ul className="space-y-4">
          {shippingOptions.map((option) => (
            <li
              key={option.id}
              className={`flex items-center p-2 border rounded-lg cursor-pointer ${
                selectedId === option.id ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setSelectedId(option.id)}
            >
              <img
                src={option.logo}
                alt={option.name}
                className="w-10 h-10 mr-4"
              />
              <div>
                <h3 className="font-semibold">{option.name}</h3>
                <p className="text-sm text-gray-500">
                  {option.estimatedDelivery}
                </p>
                <p className="text-sm text-gray-700">
                  Rp {option.price.toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>

    
  );
};

// {isShippingModalOpen && (
//     <ChangeShippingModal
//       isOpen={isShippingModalOpen}
//       onClose={() => setIsShippingModalOpen(false)}
//       onConfirm={setSelectedShipping}
//       selectedOptionId={selectedShipping.id}
//       shippingOptions={shippingOptions}
//     />
//   )}