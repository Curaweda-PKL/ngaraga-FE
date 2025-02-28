import {useState} from "react";
import {X} from "lucide-react";

interface Product {
  id: number;
  name: string;
  creator: string;
  price: string;
  image: string;
}

interface FusionModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

const FusionModal = ({isOpen, onClose, products}: FusionModalProps) => {
  const [modalState, setModalState] = useState<
    "initial" | "confirm" | "processing"
  >("initial");
  const [transactionId, setTransactionId] = useState<string>("");

  if (!isOpen) return null;

  // Materials required for evolution
  const materials = [
    {
      name: "Golden Sword",
      color: "bg-red-600",
      border: "border-yellow-500",
      quantity: "10/10",
      collected: true,
    },
    {
      name: "Magic Essence",
      color: "bg-purple-600",
      border: "border-pink-500",
      quantity: "10/10",
      collected: true,
    },
    {
      name: "Blue Essence",
      color: "bg-blue-500",
      border: "border-blue-300",
      quantity: "10/10",
      collected: true,
    },
    {
      name: "Yellow Essence",
      color: "bg-yellow-500",
      border: "border-yellow-300",
      quantity: "10/10",
      collected: true,
    },
    {
      name: "Pink Essence",
      color: "bg-pink-500",
      border: "border-pink-300",
      quantity: "10/10",
      collected: true,
    },
    {
      name: "Red Essence",
      color: "bg-red-500",
      border: "border-red-300",
      quantity: "10/10",
      collected: true,
    },
    {
      name: "Rainbow Essence",
      color: "bg-purple-600",
      border: "border-pink-400",
      quantity: "10/10",
      collected: true,
    },
  ];

  const handleEvolve = () => {
    setModalState("confirm");
  };

  const handleConfirm = () => {
    setModalState("processing");
    setTransactionId("0x380C8D...601D");
    // Simulate processing time
    setTimeout(() => {
      onClose();
      setModalState("initial");
    }, 3000);
  };

  const handleReject = () => {
    setModalState("initial");
  };

  if (modalState === "confirm") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
        <div className="relative w-full max-w-2xl bg-white rounded-lg overflow-hidden shadow-2xl">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">
              Confirm Fusion of selected heroes
            </h2>

            {/* Character Cards */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {products.slice(0, 4).map((product, index) => (
                <div
                  key={index}
                  className="w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-200"
                >
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="text-xs text-center text-gray-600 mt-1">
                    #{1670 + index}
                  </div>
                </div>
              ))}
              <div className="text-2xl text-blue-500 mx-2">&gt;</div>
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg"></div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-bold mb-2">Proceed to your wallet</h3>
              <p className="text-gray-600 text-sm mb-4">
                You will need to confirm the transaction within your wallet.
              </p>

              {/* Transaction Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Estimated fee</span>
                  <span className="font-medium">0.00233778 BNB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span className="font-medium">0.00233778 BNB</span>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleReject}
                  className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
                >
                  Reject
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (modalState === "processing") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
        <div className="relative w-full max-w-2xl bg-white rounded-lg overflow-hidden shadow-2xl">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Creating a Mystery Box</h2>

            {/* Character Cards */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {products.slice(0, 4).map((product, index) => (
                <div
                  key={index}
                  className="w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-200"
                >
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="text-xs text-center text-gray-600 mt-1">
                    #{1670 + index}
                  </div>
                </div>
              ))}
              <div className="text-2xl text-blue-500 mx-2">&gt;</div>
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg"></div>
            </div>

            <div className="text-center text-gray-600 mb-4">
              <p>Your Fusion is currently in progress.</p>
              <p>Confirmation on the blockchain will follow shortly.</p>
            </div>

            <div className="text-center text-sm text-gray-500 mb-4">
              Transaction
              <br />
              <span className="font-mono">{transactionId}</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-blue-500 h-2 rounded-full animate-[progress_2s_ease-in-out_infinite]"
                style={{width: "70%"}}
              ></div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
      <div className="relative w-full max-w-3xl bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-r from-orange-500 via-yellow-500 to-yellow-400 py-3 px-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white tracking-wider drop-shadow-md">
            EVOLVE
          </h2>
          <button
            onClick={onClose}
            className="bg-red-600 rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-red-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Description */}
        <div className="px-4 py-2 text-gray-300 text-sm">
          <p>Evolving a unit will consume materials in requirements.</p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row p-4 gap-4">
          {/* Left Side - Character Evolution */}
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center justify-center gap-4">
              {/* Before Character */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-b from-red-600 to-purple-700 rounded-lg overflow-hidden border-2 border-red-400">
                  <img
                    src={
                      products[0]?.image ||
                      "/placeholder.svg?height=128&width=128"
                    }
                    alt="Character Before"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-red-600 to-purple-700 py-1 px-2 text-white text-center text-sm font-bold">
                    {products[0]?.name.split(" ")[0] || "Hunter"}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="text-white text-3xl font-bold">&gt;</div>

              {/* After Character */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-b from-blue-600 to-purple-700 rounded-lg overflow-hidden border-2 border-blue-400">
                  <img
                    src={
                      products[0]?.image ||
                      "/placeholder.svg?height=128&width=128"
                    }
                    alt="Character After"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-700 py-1 px-2 text-white text-center text-sm font-bold">
                    {products[0]?.name.split(" ")[0] || "Hunter"} (Divinity)
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-2 w-full max-w-xs">
              <button
                onClick={handleEvolve}
                className="py-2 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold rounded-md shadow-md"
              >
                Evolve
              </button>
              <button className="py-2 px-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-md shadow-md">
                Preview
              </button>
            </div>
          </div>

          {/* Right Side - Requirements */}
          <div className="flex-1">
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <h3 className="text-white font-bold mb-2">Requirements:</h3>

              {/* Materials Grid */}
              <div className="grid grid-cols-3 gap-2">
                {materials.map((material, index) => (
                  <div
                    key={index}
                    className="relative"
                  >
                    <div
                      className={`aspect-square ${material.color} rounded-md border-2 ${material.border} flex items-center justify-center p-1`}
                    >
                      <div className="w-full h-full bg-black bg-opacity-20 rounded flex items-center justify-center">
                        <div className="w-8 h-8 transform rotate-45 bg-gradient-to-br from-white to-transparent opacity-50"></div>
                      </div>
                    </div>
                    <div className="absolute bottom-1 right-1 text-xs font-bold text-white bg-black bg-opacity-50 px-1 rounded">
                      {material.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FusionModal;
