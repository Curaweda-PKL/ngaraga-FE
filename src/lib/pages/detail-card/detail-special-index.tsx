import React from "react";
import {OtherProfilePage} from "../artists/components/other-profile-page";
import {DetailBio} from "./components/detail-bio";
import {MoreCardSection} from "./components/more-card";

const DetailSpecial: React.FC = () => {
  return (
    <div>
      <OtherProfilePage />
      <DetailBio />
      <MoreCardSection />
    </div>
  );
};

export default DetailSpecial;
