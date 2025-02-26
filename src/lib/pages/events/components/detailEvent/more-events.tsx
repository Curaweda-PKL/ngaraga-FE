import React from "react";
import {Clock, Calendar, MapPin, Video} from "lucide-react";

interface EventCard {
  id: number;
  title: string;
  time: string;
  date: string;
  location: string;
  image: string;
  type: "ONLINE" | "OFFLINE";
}

export const eventData: EventCard[] = [
  {
    id: 1,
    title: "A Special Evening Celebration",
    time: "08:00 - 20:00",
    date: "07 Dec 2024",
    location: "Jakarta",
    image: "/src/assets/img/dall-e.png",
    type: "OFFLINE",
  },
  {
    id: 2,
    title: "A Special Evening Celebration",
    time: "08:00 - 20:00",
    date: "07 Dec 2024",
    location: "Zoom Meeting",
    image: "/src/assets/img/dall-e.png",
    type: "ONLINE",
  },
  {
    id: 3,
    title: "A Special Evening Celebration",
    time: "08:00 - 20:00",
    date: "07 Dec 2024",
    location: "Jakarta",
    image: "/src/assets/img/dall-e.png",
    type: "OFFLINE",
  },
];

export const MoreEvents: React.FC = () => {
  return (
    <div className="w-full px-4 md:px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">More Event</h2>
        <button className="px-4 py-2 bg-call-to-actions-900 text-white rounded-lg flex items-center gap-2 text-sm">
          More Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventData.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4 bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-3">{event.title}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  {event.type === "ONLINE" ? (
                    <>
                      <Video className="w-4 h-4" />
                      <span>Zoom Meeting</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};