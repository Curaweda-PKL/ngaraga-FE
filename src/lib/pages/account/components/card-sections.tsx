import {useState, useRef, useEffect} from "react";
import {FaCrown} from "react-icons/fa";

type Card = {
  id: number;
  title: string;
  creator: string;
  image: string;
  price?: string;
};

type Purchase = {
  orderId: string;
  productName: string;
  quantity: number;
  price: string;
  status: "Payment" | "Shipping" | "Packaging" | "Delivered";
  thumbnail?: string;
};

const cardData: Card[] = [
  {
    id: 1,
    title: "Distant Galaxy",
    creator: "Animakid",
    image: "/src/assets/img/Distant-Galaxy.png",
    price: "Rp. 200.000",
  },
  {
    id: 2,
    title: "Solar Symphony",
    creator: "NebulaKid",
    image: "/src/assets/img/Solar-Symphony.png",
    price: "Rp. 250.000",
  },
];

const specialCardData: Card[] = [
  {
    id: 3,
    title: "Cosmic Symphony",
    creator: "NebulaKid",
    image: "/src/assets/img/Cosmic-Symphony.png",
  },
];

const purchaseData: Purchase[] = [
  {
    orderId: "ORD123456789",
    productName: "Dancing Robot 0512",
    quantity: 1,
    price: "Rp 200.000",
    status: "Payment",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    orderId: "ORD987654321",
    productName: "Orbitian Spacesuit",
    quantity: 2,
    price: "Rp 300.000",
    status: "Shipping",
    thumbnail: "https://via.placeholder.com/150",
  },
];

export const CardSection = () => {
  const [activeTab, setActiveTab] = useState<
    "cards" | "specialCards" | "purchases"
  >("cards");
  const [underlineStyle, setUnderlineStyle] = useState({width: 0, left: 0});
  const tabsRef = useRef<HTMLDivElement>(null);

  const currentData =
    activeTab === "cards"
      ? cardData
      : activeTab === "specialCards"
      ? specialCardData
      : purchaseData;

  useEffect(() => {
    const activeButton = tabsRef.current?.querySelector(
      activeTab === "cards"
        ? ".tab-cards"
        : activeTab === "specialCards"
        ? ".tab-specialCards"
        : ".tab-purchases"
    ) as HTMLButtonElement;

    if (activeButton) {
      setUnderlineStyle({
        width: activeButton.offsetWidth,
        left: activeButton.offsetLeft - 35,
      });
    }
  }, [activeTab]);

  return (
    <div className="w-full mb-10">
      {/* Tabs */}
      <div
        className="relative flex items-center justify-start pl-16 space-x-8 border-b border-gray-700 pb-4 mb-8"
        ref={tabsRef}
      >
        <button
          className={`tab-cards text-lg font-semibold ${
            activeTab === "cards" ? "text-[#2B2B2B]" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("cards")}
        >
          Card{" "}
          <span
            className={`text-lg px-3 py-1 rounded-full ${
              activeTab === "cards"
                ? "bg-[--old-primary] text-white"
                : "bg-gray-400 text-gray-800"
            }`}
          >
            ({cardData.length})
          </span>
        </button>

        <button
          className={`tab-specialCards text-lg font-semibold ${
            activeTab === "specialCards" ? "text-[#2B2B2B]" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("specialCards")}
        >
          Special Card{" "}
          <span
            className={`text-lg px-3 py-1 rounded-full ${
              activeTab === "specialCards"
                ? "bg-[--old-primary] text-white"
                : "bg-gray-400 text-gray-800"
            }`}
          >
            ({specialCardData.length})
          </span>
        </button>

        <button
          className={`tab-purchases text-lg font-semibold ${
            activeTab === "purchases" ? "text-[#2B2B2B]" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("purchases")}
        >
          Purchase{" "}
          <span
            className={`text-lg px-3 py-1 rounded-full ${
              activeTab === "purchases"
                ? "bg-[--old-primary] text-white"
                : "bg-gray-400 text-gray-800"
            }`}
          >
            ({purchaseData.length})
          </span>
        </button>

        {/* Dynamic Underline */}
        <div
          className="absolute bottom-0 h-[2px] bg-[#2B2B2B] transition-all duration-300"
          style={{width: underlineStyle.width, left: underlineStyle.left}}
        />
      </div>

      {/* Data Grid */}
      <div className="grid gap-6 px-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {currentData.map((item) => {
          if ("image" in item && "title" in item && "creator" in item) {
            // Render for Card
            return (
              <div
                key={item.id}
                className="w-full h-[400px] flex flex-col items-start gap-4 bg-[#F2F2F2] rounded-2xl shadow-xl transition-transform hover:scale-[1.02]"
              >
                <figure className="w-full h-[260px] rounded-t-2xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="p-6 flex flex-col items-start gap-2 w-full flex-grow">
                  <h3 className="text-2xl font-bold text-[#171717]">
                    {item.title}
                  </h3>
                  <span className="text-base text-[#404040]">
                    {item.creator}
                  </span>
                  {activeTab === "cards" && (
                    <span className="text-base text-[#404040]">
                      {item.price}
                    </span>
                  )}
                </div>
              </div>
            );
          } else if ("orderId" in item && "status" in item) {
            // Render for Purchase
            return (
              <div
                key={item.orderId}
                className="w-full flex items-start gap-6 bg-white p-6 rounded-lg shadow-md"
              >
                <figure className="w-[100px] h-[100px] rounded-lg overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={`Order ${item.orderId}`}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.productName}
                  </h3>
                  <p className="text-gray-500 text-sm mb-1">
                    Qty: {item.quantity} | {item.price}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Order ID: {item.orderId}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      item.status === "Delivered"
                        ? "text-green-500"
                        : item.status === "Shipping"
                        ? "text-blue-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {item.status}
                  </p>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};
