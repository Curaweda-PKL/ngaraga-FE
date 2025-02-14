import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./components/detailEvent/detailHeader";
import MainContent from "./components/detailEvent/detailMain";
import { SERVER_URL } from "@/middleware/utils"; // Import centralized server URL

// (Optional) Define an interface for your event data.
interface EventDetailData {
  id: string;
  eventName: string;
  eventTime: string;
  eventDate: string;
  eventImage: string;
  eventDescription: string;
  onlineZoomLink: string;
  offlineLocation: string | null;
  eventSpecialGuestName: string;
  eventSpecialGuestOccupation: string;
  eventSpecialGuestImage: string;
  eventType: string;
  // …other properties as needed
}

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [eventData, setEventData] = useState<EventDetailData | null>(null);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/events/${id}`
        );
        if (response.data) {
          setEventData(response.data);
        }
      } catch (error) {
        console.error("Error fetching event detail:", error);
      }
    };

    if (id) {
      fetchEventDetail();
    }
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff] text-[#212529]">
      <Header eventData={eventData} />
      <MainContent eventData={eventData} />
    </div>
  );
};

export default EventDetail;
