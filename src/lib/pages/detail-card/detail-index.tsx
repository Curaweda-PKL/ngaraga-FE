import React from "react";
import {ProfilePage} from "./components/profile-page";
import {CardSection} from "./components/card-section";

const Artists: React.FC = () => {
  return (
    <div>
      <ProfilePage />
      <CardSection />
    </div>
  );
};

export default Artists;
