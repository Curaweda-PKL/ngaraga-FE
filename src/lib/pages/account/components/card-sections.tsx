"use client";

import { useState, useRef } from "react";

type Card = {
  id: number;
  title: string;
  creator: string;
  image: string;
  price?: string;
  index?: string;
  total?: string;
  achieved?: boolean;
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
    id: 1,
    title: "Distant Galaxy",
    creator: "MoonDancer",
    image: "/src/assets/img/Distant-Galaxy.png",
    index: "04",
    total: "04",
    achieved: true,
  },
  {
    id: 2,
    title: "Life On Edena",
    creator: "NebulaKid",
    image: "/src/assets/img/Life-On-Edena.png",
    index: "02",
    total: "02",
  },
  {
    id: 3,
    title: "AstroFiction",
    creator: "Spaceone",
    image: "/src/assets/img/AstroFiction.png",
    index: "06",
    total: "05",
  },
  {
    id: 4,
    title: "Life On Edena",
    creator: "NebulaKid",
    image: "/src/assets/img/Life-On-Edena.png",
    index: "05",
    total: "05",
  },
  {
    id: 5,
    title: "Distant Galaxy",
    creator: "MoonDancer",
    image: "/src/assets/img/Distant-Galaxy.png",
    index: "00",
    total: "03",
  },
  {
    id: 6,
    title: "AstroFiction",
    creator: "Spaceone",
    image: "/src/assets/img/AstroFiction.png",
    index: "00",
    total: "01",
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
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-4 py-2 text-call-to-action border border-call-to-action rounded-lg hover:bg-yellow-50 text-sm">
              Change Payment
            </button>
            <a href="/payments" className="w-full sm:w-auto">
              <button className="w-full px-4 py-2 text-white bg-call-to-action rounded-lg hover:bg-yellow-700 text-sm">
                Payment
              </button>
            </a>
          </div>
        );
      case "Delivered":
        return (
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-4 py-2 text-call-to-action border border-call-to-action rounded-lg hover:bg-yellow-50 text-sm">
              Delivered
            </button>
            <a href="/view-detail" className="w-full sm:w-auto">
              <button className="w-full px-4 py-2 text-white bg-call-to-action rounded-lg hover:bg-yellow-700 text-sm">
                View Details
              </button>
            </a>
          </div>
        );
      default:
        return (
          <button className="w-full sm:w-auto px-4 py-2 text-white bg-call-to-action rounded-lg hover:bg-yellow-700 text-sm">
            View Details
          </button>
        );
    }
  };

  return (
    <div className="w-full mb-10 px-4 sm:px-6 ">
      {/* Tabs */}
      <div
        className="flex items-center justify-start space-x-4 sm:space-x-8 border-b border-gray-700 pb-4 mb-8 overflow-x-auto"
        ref={tabsRef}
      >
        {/* Tab Buttons dengan underline statis */}
        <div className="relative">
          <button
            className={`tab-cards text-sm sm:text-lg font-semibold whitespace-nowrap ${
              activeTab === "cards" ? "text-[#2B2B2B]" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("cards")}
          >
            Card ({cardData.length})
          </button>
          {activeTab === "cards" && (
            <div className="absolute bottom-[-16px] left-0 right-0 h-[2px] bg-[#2B2B2B]" />
          )}
        </div>

        <div className="relative">
          <button
            className={`tab-specialCards text-sm sm:text-lg font-semibold whitespace-nowrap ${
              activeTab === "specialCards" ? "text-[#2B2B2B]" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("specialCards")}
          >
            Special Card ({specialCardData.length})
          </button>
          {activeTab === "specialCards" && (
            <div className="absolute bottom-[-16px] left-0 right-0 h-[2px] bg-[#2B2B2B]" />
          )}
        </div>

        <div className="relative">
          <button
            className={`tab-purchases text-sm sm:text-lg font-semibold whitespace-nowrap ${
              activeTab === "purchases" ? "text-[#2B2B2B]" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("purchases")}
          >
            Purchase ({purchaseData.length})
          </button>
          {activeTab === "purchases" && (
            <div className="absolute bottom-[-16px] left-0 right-0 h-[2px] bg-[#2B2B2B]" />
          )}
        </div>
      </div>

      {/* Filter Buttons */}
      {activeTab === "purchases" && (
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-6">
          {["All", "Payment", "Packaging", "Shipping", "Delivered"].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as any)}
                className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium ${
                  activeFilter === filter
                    ? "bg-call-to-action-100 text-call-to-action border-2 border-call-to-action"
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
            ? "flex flex-col gap-4"
            : "grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }
      >
        {currentData.map((item) => {
          if ("image" in item && "title" in item && "creator" in item) {
            if (activeTab === "specialCards") {
              // Render Special Card with new design
              return (
                <a href="/special-card-detail" key={item.id} className="block">
                  <div className="w-full flex flex-col rounded-lg overflow-hidden transition-transform hover:scale-[1.02]">
                    <figure className="w-full h-[240px] rounded-t-lg overflow-hidden relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </figure>
                    <div className="bg-gray-100 p-4 rounded-b-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.creator}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          {item.index} / {item.total}
                        </div>
                        {item.achieved ? (
                          <div className="bg-call-to-action-600 text-call-to-action border border-call-to-action px-3 py-1 rounded-full text-xs font-medium flex items-center">
                            <span className="mr-1">✓</span> Achieved
                          </div>
                        ) : (
                          <button className="bg-call-to-action hover:bg-yellow-600 text-white px-4 py-1 rounded-full text-xs font-medium">
                            Klaim
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              );
            } else {
              // Render normal Card
              return (
                <a href="/special-card-detail" key={item.id}>
                  <div className="w-full h-[400px] flex flex-col items-start gap-4 bg-[#F2F2F2] rounded-2xl shadow-xl transition-transform hover:scale-[1.02]">
                    <figure className="w-full h-[260px] rounded-t-2xl overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </figure>
                    <div className="p-4 sm:p-6 flex flex-col items-start gap-2 w-full flex-grow">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#171717]">
                        {item.title}
                      </h3>
                      <span className="text-sm sm:text-base text-[#404040]">
                        {item.creator}
                      </span>
                      {activeTab === "cards" && item.price && (
                        <span className="text-sm sm:text-base text-[#404040]">
                          {item.price}
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              );
            }
          } else if ("orderId" in item && "status" in item) {
            // Render Purchase
            return (
              <div
                key={item.orderId}
                className="w-full bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-medium mb-2 sm:mb-0 ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">
                    Order ID: {item.orderId}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <figure className="w-full sm:w-[120px] h-[120px] rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </figure>

                  <div className="flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                      {item.productName}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-2">
                      {item.creator}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm sm:text-base text-gray-600">
                        Qty: {item.quantity}
                      </span>
                      <span className="text-gray-400">|</span>
                      <span className="text-sm sm:text-base text-gray-600">
                        {item.price}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div className="mb-4 sm:mb-0">
                        <p className="text-xs sm:text-sm text-gray-500">
                          {item.otherProducts} other products
                        </p>
                        <p className="text-base sm:text-lg font-semibold text-gray-900">
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