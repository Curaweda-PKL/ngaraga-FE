import React from "react";
import { MarketHeader } from "./components/market-header";
import { MarketplaceCardSection } from "./components/marketplace-card-section";

const Marketplace: React.FC = () => {
  return (
    <div>
      <MarketHeader />
      <MarketplaceCardSection/>
    </div>
  );
};
export default Marketplace;
