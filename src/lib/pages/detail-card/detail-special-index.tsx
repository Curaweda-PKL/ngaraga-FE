import React from "react";
import {ProfilePage} from "@/lib/pages/artists/components/profile-page";
import {MoreCardSection} from "./components/more-card";
import {DetailBio} from "./components/detail-bio";

const DetailSpecial: React.FC = () => {
  return (
    <div>
      <ProfilePage />
      <MoreCardSection />
      <DetailBio />
    </div>
  );
};

export default DetailSpecial;
