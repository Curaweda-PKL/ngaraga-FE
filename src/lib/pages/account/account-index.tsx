import React from "react";
import {ProfilePage} from "./components/profile-page";
import {CardSection} from "./components/card-sections";

const Account: React.FC = () => {
  return (
    <div>
      <ProfilePage />
      <CardSection />
    </div>
  );
};

export default Account;
