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

type ModalState = "initial" | "confirming" | "processing" | "success";

const FusionModal = ({isOpen, onClose, products}: FusionModalProps) => {
  const [modalState, setModalState] = useState<ModalState>("initial");
  const [progress, setProgress] = useState(0);

  if (!isOpen) return null;

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
    setModalState("confirming");
  };

  const handleConfirm = () => {
    setModalState("processing");
    // Simulate processing
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 20;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => setModalState("success"), 500);
      }
    }, 1000);
  };

  const handleClose = () => {
    setModalState("initial");
    setProgress(0);
    onClose();
  };

  if (modalState === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
        <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
          <div className="w-24 h-24 mx-auto mb-4 bg-blue-500 rounded-lg flex items-center justify-center">
            <img
              src="/placeholder.svg?height=64&width=64"
              alt="Success"
              className="w-16 h-16"
            />
          </div>
          <p className="text-gray-600 mb-6">You got NEW Super Evolution!</p>
          <div className="text-xs text-gray-500 mb-6">
            Transaction
            <br />
            0x890CD30...601D
          </div>
          <div className="flex gap-2 justify-center">
            <a href="/account">
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-[#DDB11F] text-white rounded-md hover:bg-yellow-600"
              >
                View Item
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (modalState === "confirming") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
        <div className="bg-white rounded-lg p-6 max-w-lg w-full">
          <h2 className="text-xl font-bold mb-4">
            Confirm Fusion of selected heroes
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            {products.slice(0, 4).map((product, index) => (
              <div
                key={index}
                className="w-20 h-20 relative"
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 text-center">
                  #{product.id}
                </div>
              </div>
            ))}
            <div className="text-2xl font-bold">&gt;</div>
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-medium mb-2">Proceed to your wallet</h3>
            <p className="text-sm text-gray-600 mb-4">
              You will need to confirm the transaction within your wallet.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalState("initial")}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-[#DDB11F] text-white rounded-md hover:bg-yellow-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (modalState === "processing") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
        <div className="bg-white rounded-lg p-6 max-w-lg w-full">
          <h2 className="text-xl font-bold mb-4">Creating a Mystery Box</h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            {products.slice(0, 4).map((product, index) => (
              <div
                key={index}
                className="w-20 h-20 relative"
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 text-center">
                  #{product.id}
                </div>
              </div>
            ))}
            <div className="text-2xl font-bold">&gt;</div>
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Your Fusion is currently in progress.
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Confirmation on the blockchain will follow shortly.
          </p>
          <div className="text-xs text-gray-500 mb-4">
            Transaction
            <br />
            0x890CD30...601D
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{width: `${progress}%`}}
            ></div>
          </div>
          <div className="text-center text-sm text-gray-600">Processing...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
      <div className="relative w-full max-w-3xl bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
        {/* Header with gradient */}
        <div className="relative bg-[#DDB11F] py-3 px-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white tracking-wider drop-shadow-md">
            FUSION
          </h2>
          <button
            onClick={handleClose}
            className="bg-red-600 rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-red-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Description */}
        <div className="px-4 py-2 text-[#171717] bg-white text-sm">
          <p>Evolving a unit will consume materials in requirements.</p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row p-4 gap-4 bg-white">
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
                className="py-2 px-4 bg-[#DDB11F] hover:from-yellow-600 hover:to-yellow-700 text-white font-bold rounded-md shadow-md"
              >
                Fusion
              </button>
              <button className="py-2 px-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-md shadow-md">
                Preview
              </button>
            </div>
          </div>

          {/* Right Side - Requirements */}
          <div className="flex-1">
            <div className="bg-neutral-200 rounded-lg p-3 border border-gray-200">
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
