import {useState, useRef, useEffect} from "react";

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
  creator?: string;
  otherProducts?: number;
  totalPrice?: string;
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
    creator: "Orbitian",
    quantity: 1,
    price: "Rp 200.000",
    status: "Payment",
    thumbnail: "https://via.placeholder.com/150",
    otherProducts: 4,
    totalPrice: "Rp 460.650",
  },
  {
    orderId: "ORD987654321",
    productName: "Dancing Robot 0512",
    creator: "Orbitian",
    quantity: 1,
    price: "Rp 200.000",
    status: "Shipping",
    thumbnail: "https://via.placeholder.com/150",
    otherProducts: 4,
    totalPrice: "Rp 460.650",
  },
  {
    orderId: "ORD112233445",
    productName: "Space Explorer",
    creator: "StarMaker",
    quantity: 2,
    price: "Rp 400.000",
    status: "Packaging",
    thumbnail: "https://via.placeholder.com/150",
    otherProducts: 2,
    totalPrice: "Rp 500.000",
  },
  {
    orderId: "ORD998877665",
    productName: "Astro Helmet",
    creator: "GalaxyDesigns",
    quantity: 1,
    price: "Rp 150.000",
    status: "Delivered",
    thumbnail: "https://via.placeholder.com/150",
    otherProducts: 1,
    totalPrice: "Rp 200.000",
  },
];

export const CardSection = () => {
  const [activeTab, setActiveTab] = useState<
    "cards" | "specialCards" | "purchases"
  >("cards");
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Payment" | "Packaging" | "Shipping" | "Delivered"
  >("All");
  const [underlineStyle, setUnderlineStyle] = useState({width: 0, left: 0});
  const tabsRef = useRef<HTMLDivElement>(null);

  const filteredPurchaseData =
    activeFilter === "All"
      ? purchaseData
      : purchaseData.filter((purchase) => purchase.status === activeFilter);

  const currentData =
    activeTab === "cards"
      ? cardData
      : activeTab === "specialCards"
      ? specialCardData
      : filteredPurchaseData;

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Payment":
        return "bg-red-100 text-red-600";
      case "Shipping":
        return "bg-blue-100 text-blue-600";
      case "Packaging":
        return "bg-orange-100 text-orange-600";
      case "Delivered":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getActionButtons = (status: string) => {
    switch (status) {
      case "Payment":
        return (
          <div className="flex gap-3">
            <button className="px-4 py-2 text-yellow-600 border border-yellow-600 rounded-lg hover:bg-yellow-50">
              Change Payment
            </button>
            <a href="/payment">
              <button className="px-4 py-2 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700">
                Payment
              </button>
            </a>
          </div>
        );
      case "Delivered":
        return (
          <div className="flex gap-3">
            <button className="px-4 py-2 text-yellow-600 border border-yellow-600 rounded-lg hover:bg-yellow-50">
              Delivered
            </button>
            <a href="/view-detail">
              <button className="px-4 py-2 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700">
                View Details
              </button>
            </a>
          </div>
        );
      default:
        return (
          <button className="px-4 py-2 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700">
            View Details
          </button>
        );
    }
  };

  return (
    <div className="w-full mb-10">
      {/* Tabs */}
      <div
        className="relative flex items-center justify-start pl-16 space-x-8 border-b border-gray-700 pb-4 mb-8"
        ref={tabsRef}
      >
        {/* Tab Buttons */}
        <button
          className={`tab-cards text-lg font-semibold ${
            activeTab === "cards" ? "text-[#2B2B2B]" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("cards")}
        >
          Card ({cardData.length})
        </button>

        <button
          className={`tab-specialCards text-lg font-semibold ${
            activeTab === "specialCards" ? "text-[#2B2B2B]" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("specialCards")}
        >
          Special Card ({specialCardData.length})
        </button>

        <button
          className={`tab-purchases text-lg font-semibold ${
            activeTab === "purchases" ? "text-[#2B2B2B]" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("purchases")}
        >
          Purchase ({purchaseData.length})
        </button>

        {/* Dynamic Underline */}
        <div
          className="absolute bottom-0 h-[2px] bg-[#2B2B2B] transition-all duration-300"
          style={{width: underlineStyle.width, left: underlineStyle.left}}
        />
      </div>

      {/* Filter Buttons */}
      {activeTab === "purchases" && (
        <div className="flex gap-4 mb-6 px-6">
          {["All", "Payment", "Packaging", "Shipping", "Delivered"].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeFilter === filter
                    ? "bg-yellow-100 text-yellow-600 border-2 border-yellow-600"
                    : "bg-gray-50 text-gray-600 border border-gray-200"
                }`}
              >
                {filter}
              </button>
            )
          )}
        </div>
      )}

      {/* Data Grid */}
      <div
        className={
          activeTab === "purchases"
            ? "flex flex-col gap-4 px-6"
            : "grid gap-6 px-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
        }
      >
        {currentData.map((item) => {
          if ("image" in item && "title" in item && "creator" in item) {
            // Render Card/Special Card (unchanged)
            return (
              <a href="/special-card-detail">
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
              </a>
            );
          } else if ("orderId" in item && "status" in item) {
            // Render Purchase (new design)
            return (
              <div
                key={item.orderId}
                className="w-full bg-white rounded-lg p-6 shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                  <span className="text-gray-500">
                    Order ID: {item.orderId}
                  </span>
                </div>

                <div className="flex gap-6">
                  <figure className="w-[120px] h-[120px] rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </figure>

                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {item.productName}
                    </h3>
                    <p className="text-gray-600 mb-2">{item.creator}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-gray-600">
                        Qty: {item.quantity}
                      </span>
                      <span className="text-gray-400">|</span>
                      <span className="text-gray-600">{item.price}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-500 text-sm">
                          {item.otherProducts} other products
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          Purchase Total {item.totalPrice}
                        </p>
                      </div>
                      {getActionButtons(item.status)}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
