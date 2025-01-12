import {useState} from "react";
import {Plus, Search, MessageSquare, Edit, Eye, Trash2} from "lucide-react";

export const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const events = [
    {
      id: "1",
      name: "Starship Odyssey",
      schedule: "10:00 - 20:00, 20 Mar 2026",
      type: "Virtual Gathering at Cosmic Hub",
      image: "/api/placeholder/48/48",
    },
    {
      id: "2",
      name: "Astro Pilot",
      schedule: "10:00 - 20:00, 20 Mar 2026",
      type: "Webinar Session",
      image: "/api/placeholder/48/48",
    },
    {
      id: "3",
      name: "Starlight Voyager",
      schedule: "10:00 - 20:00, 20 Mar 2026",
      type: "Virtual Gathering at Starbase Alpha",
      image: "/api/placeholder/48/48",
    },
    {
      id: "4",
      name: "Galactic Captain",
      schedule: "10:00 - 20:00, 20 Mar 2026",
      type: "Online Conference",
      image: "/api/placeholder/48/48",
    },
    {
      id: "5",
      name: "Asteroid Hunter",
      schedule: "10:00 - 20:00, 20 Mar 2026",
      type: "Virtual Gathering at Comet Station",
      image: "/api/placeholder/48/48",
    },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEvents(events.map((event) => event.id));
    } else {
      setSelectedEvents([]);
    }
  };

  const handleSelectEvent = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedEvents((prev) => [...prev, id]);
    } else {
      setSelectedEvents((prev) => prev.filter((eventId) => eventId !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>Events</span>
        <span className="mx-2">/</span>
        <span>Event List</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Event List</h1>

      <div className="flex justify-between items-center mb-6">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>
            {" "}
            <a href="/admin/add-event">Add Events</a>
          </span>
        </button>

        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedEvents.length === events.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="p-4 text-left font-medium">Events Name</th>
              <th className="p-4 text-left font-medium">Schedule</th>
              <th className="p-4 text-left font-medium">Events Type</th>
              <th className="p-4 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="border-b"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedEvents.includes(event.id)}
                    onChange={(e) =>
                      handleSelectEvent(event.id, e.target.checked)
                    }
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="font-medium">{event.name}</span>
                  </div>
                </td>
                <td className="p-4">{event.schedule}</td>
                <td className="p-4">{event.type}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <a href="/admin/add-event">
                        <Edit className="w-4 h-4" />
                      </a>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 gap-1">
        <button className="px-3 py-1 rounded bg-yellow-500 text-white">
          1
        </button>
        <button className="px-3 py-1 rounded text-gray-600">2</button>
        <button className="px-3 py-1 rounded text-gray-600">3</button>
        <button className="px-3 py-1 rounded text-gray-600">...</button>
        <button className="px-3 py-1 rounded text-gray-600">10</button>
      </div>
    </div>
  );
};
