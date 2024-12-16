import React from "react";
import {ProfilePage} from "./components/detail-card";
import {MoreCards} from "./components/more-card";

const Artists: React.FC = () => {
  return (
    <div>
      <ProfilePage />
      <MoreCards />
    </div>
  );
};

export default Artists;
