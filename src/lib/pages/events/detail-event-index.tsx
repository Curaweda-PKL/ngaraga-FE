import React from "react";
import {EventDetail} from "./components/detailEvent/detail-events";
import {MoreEvents} from "./components/detailEvent/more-events";

const DetailEvents: React.FC = () => {
  return (
    <div>
      <EventDetail />
      <MoreEvents />
    </div>
  );
};

export default DetailEvents;
