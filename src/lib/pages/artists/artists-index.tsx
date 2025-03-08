import React from "react";
import {OtherProfilePage}  from "./components/other-profile-page";
import { CardSections } from "./components/card-section/card-sections";

const Artists: React.FC = () => {
  return (
    // dont change component name if do PR
    <div>
      <OtherProfilePage />
      <CardSections />
    </div>
  );
};

export default Artists