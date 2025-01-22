import React from "react";
import Header from "./components/detailEvent/detailHeader";
import MainContent from "./components/detailEvent/detailMain";

const EventDetail: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff] text-[#212529]">
      <Header />
      <MainContent />
    </div>
  );
};

export default EventDetail;
