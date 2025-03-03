import React from "react";
import {OtherProfilePage}  from "./components/other-profile-page";
import { CardContentSection } from "./components/card-sections";

const Artists: React.FC = () => {
  return (
    <div>
      <OtherProfilePage />
      <CardContentSection />
    </div>
  );
};

export default Artists