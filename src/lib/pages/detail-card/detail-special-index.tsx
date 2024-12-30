import React from "react";
import { ProfilePage } from "@/lib/pages/artists/components/profile-page";
import {CardCollection} from "./components/more-card";
import { DetailBio } from "./components/detail-bio";

const DetailSpecial: React.FC = () => {
  return (
    <div>
      <ProfilePage />
      <CardCollection />
      <DetailBio/>
    </div>
  );
};  

export default DetailSpecial;
