import React from "react";
import {DetailCards} from "./components/detail-cards";
import {CardCollection} from "./components/more-card";

const CardDetail: React.FC = () => {
  return (
    <div>
      <DetailCards />
      <CardCollection />
    </div>
  );
};

export default CardDetail;
