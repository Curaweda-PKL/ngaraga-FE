import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom"; // Import useLocation
import axios from "axios";
import Header from "./detailHeader";
import MainContent from "./detailMain";
import { SERVER_URL } from "@/middleware/utils"; // Import centralized server URL

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
}

export const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation(); // Untuk membaca query parameter
  const [eventData, setEventData] = useState<EventDetailData | null>(null);
  

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/events/${id}`);
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

  // 🚀 Tampilkan alert jika registrasi berhasil
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("status") === "success") {
      alert("✅ Anda berhasil registrasi!");
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff] text-[#212529]">
      <Header eventData={eventData} />
      <MainContent eventData={eventData} />
    </div>
  );
};
