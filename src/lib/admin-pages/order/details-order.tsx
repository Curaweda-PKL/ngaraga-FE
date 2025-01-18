import { useState } from "react";
import { EditShippingModal } from "./components/editShippingModal";
import LeftSectionOrderSummary from "./components/leftsection-ordersummary";
import OrderStages from "./components/order-stages";
import RightSectionOrderSummary from "./components/rightSection-orderSummary";

interface ShippingInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  country: string;
  state: string;
  city: string;
}

export const DetailsOrder: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "Animakid",
    email: "animakid@gmail.com",
    phoneNumber: "854 5565 6745",
    countryCode: "+62",
    country: "Indonesia",
    state: "",
    city: "",
  });

  const handleUpdateShipping = (newInfo: ShippingInfo) => {
    setShippingInfo(newInfo);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Order Stages */}
      <OrderStages />

      {/* Shipment Section */}

      <div className="grid grid-cols-2 gap-6">
        {/* Left Section - Order Summary */}
        <LeftSectionOrderSummary />

        {/* Right Section */}
        <RightSectionOrderSummary />
      </div>

      {/* Change Shipping Modal */}
      {isEditModalOpen && (
        <EditShippingModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateShipping}
          shippingInfo={shippingInfo}
        />
      )}

      {/* Edit Shipping Modal */}
    </div>
  );
};
