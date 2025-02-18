import React from "react";
import {ArtistsPage}  from "./components/other-profile-page";
import { CardContentSection } from "./components/card-sections";

const Artists: React.FC = () => {
  return (
    <div>
      <ArtistsPage />
      <CardContentSection />
    </div>
  );
};

export default Artists