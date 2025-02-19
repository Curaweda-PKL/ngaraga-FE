import React from "react";
import {ProfilePage} from "../artists/components/other-profile-page";
import {DetailBio} from "./components/detail-bio";
import {MoreCardSection} from "./components/more-card";

const DetailSpecial: React.FC = () => {
  return (
    <div>
      <ProfilePage />
      <DetailBio />
      <MoreCardSection />
    </div>
  );
};

export default DetailSpecial;
