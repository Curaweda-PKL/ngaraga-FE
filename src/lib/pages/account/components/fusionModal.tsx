import {useState} from "react";
import {X, Square, Diamond} from "lucide-react";

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
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  if (!isOpen) return null;

  const toggleCardSelection = (id: number) => {
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter((cardId) => cardId !== id));
    } else if (selectedCards.length < 4) {
      setSelectedCards([...selectedCards, id]);
    }
  };

  const isCardSelected = (id: number) => selectedCards.includes(id);

  const getCardTypeIcon = (index: number) => {
    // Different icons for different card positions
    switch (index % 4) {
      case 0:
        return <Diamond className="w-8 h-8 text-blue-400 fill-blue-200" />;
      case 1:
        return <Diamond className="w-8 h-8 text-blue-500 fill-blue-300" />;
      case 2:
        return <Square className="w-8 h-8 text-blue-600 fill-blue-400" />;
      case 3:
        return <Diamond className="w-8 h-8 text-pink-400 fill-pink-200" />;
      default:
        return <Diamond className="w-8 h-8 text-blue-400 fill-blue-200" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-blue-50 to-gray-100 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header with title */}
        <div className="text-center py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-blue-900">FUSION</h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Subtitle */}
        <div className="text-center py-3 px-6">
          <h3 className="text-lg text-blue-800">
            Simple & clean digit card game US
            <br />
            no excessive card preview
          </h3>
        </div>

        {/* Card Selection Area */}
        <div className="grid grid-cols-4 gap-4 p-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              onClick={() => toggleCardSelection(product.id)}
              className={`relative cursor-pointer transition-all duration-300 transform ${
                isCardSelected(product.id)
                  ? "scale-105 ring-4 ring-blue-400"
                  : "hover:scale-105"
              }`}
            >
              <div className="bg-gradient-to-b from-blue-100 to-gray-100 rounded-xl overflow-hidden border-2 border-gray-200">
                {/* Card Number and Type */}
                <div className="flex justify-between items-center p-2 bg-gradient-to-r from-blue-200 to-blue-300 text-white">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-white text-blue-500 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="text-xs font-bold">
                    {index % 2 === 0 ? "NORMAL CARD" : "SPECIAL CARD"}
                  </div>
                </div>

                {/* Card Image */}
                <div className="p-4 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center h-32">
                  {getCardTypeIcon(index)}
                </div>

                {/* Card Name */}
                <div className="p-2 text-center bg-gray-50">
                  <p className="text-sm font-medium text-gray-700">
                    {product.name.split(" ")[0]}
                  </p>
                  <p className="text-xs text-gray-500">•</p>
                </div>

                {/* Card Button */}
                <div className="p-1">
                  <button className="w-full py-1 bg-blue-400 hover:bg-blue-500 text-white rounded-md text-sm">
                    {isCardSelected(product.id) ? "Selected" : "Select"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Cards Indicators */}
        <div className="px-6 pb-4">
          <p className="text-blue-800 font-medium mb-2">
            Resulting special product
          </p>
          <div className="flex space-x-4 mb-6">
            {[0, 1, 2, 3].map((index) => {
              const selectedProduct = products.find(
                (p) => p.id === selectedCards[index]
              );
              return (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedProduct
                      ? "bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg"
                      : "bg-gray-200"
                  }`}
                >
                  {selectedProduct && getCardTypeIcon(index)}
                </div>
              );
            })}
          </div>

          {/* Confirm Button */}
          <div className="flex justify-center">
            <button
              className={`py-3 px-16 rounded-full text-white text-lg font-bold shadow-lg ${
                selectedCards.length === 4
                  ? "bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={selectedCards.length !== 4}
            >
              CONFIRM
            </button>
          </div>
        </div>

        {/* Result Preview */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-between">
            <div className="w-1/2 pr-4">
              {/* Left side is empty in the image */}
            </div>
            <div className="w-1/2 pl-4 flex flex-col items-center">
              {selectedCards.length === 4 ? (
                <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-pink-200 to-pink-400 flex items-center justify-center mb-4">
                  <Diamond className="w-12 h-12 text-white fill-pink-100" />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-lg bg-gray-200 mb-4"></div>
              )}
              <button
                className={`py-2 px-8 rounded-md text-white ${
                  selectedCards.length === 4
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={selectedCards.length !== 4}
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FusionModal;
