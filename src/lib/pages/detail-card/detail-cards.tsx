import React from "react";
import { DetailCards } from "./components/detail-cards";
import { MoreCardSection } from "./components/more-card-section";

const CardDetail: React.FC = () => {
  return (
    <div>
      <DetailCards/>
      <MoreCardSection/>
    </div>
  );
};  

export default CardDetail;
