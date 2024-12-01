import React from "react";
import { ProfilePage } from "./components/profile-page";
import { CardContentSection } from "./components/card-sections";

const Artists: React.FC = () => {
  return (
    <div>
      <ProfilePage />
      <CardContentSection />
    </div>
  );
};

export default Artists