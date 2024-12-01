import React from "react";
import { MarketHeader } from "./components/market-header";
import { CardContentSection } from "../artists/components/card-sections";

const Marketplace: React.FC = () => {
  return (
    <div>
      <MarketHeader />
      <CardContentSection/>
    </div>
  );
};
export default Marketplace;
