import LeftSectionOrderSummary from "./components/leftsection-ordersummary";
import OrderStages from "./components/order-stages";
import RightSectionOrderSummary from "./components/rightSection-orderSummary";

export const DetailsOrder: React.FC = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Order Stages */}
      <OrderStages />

      <div className="grid grid-cols-2 gap-6">
        {/* Left Section - Order Summary */}
        <LeftSectionOrderSummary />

        {/* Right Section */}
        <RightSectionOrderSummary />
      </div>
    </div>
  );
};
