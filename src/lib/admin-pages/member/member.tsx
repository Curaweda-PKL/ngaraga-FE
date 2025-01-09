import {useState} from "react";
import DatePicker from "react-datepicker";
import {FaPlus} from "react-icons/fa6";
import "react-datepicker/dist/react-datepicker.css";

const members = [
  {
    name: "Ethan White",
    username: "UserZeta",
    email: "ethan.white@samplemail.com",
    registerDate: "2025-01-20T09:30",
    purchase: "25",
    totalOrders: "Rp 3.500.000",
    card: "25",
    specialCard: "15",
  },
  {
    name: "Mia Green",
    username: "UserEpsilon",
    email: "mia.green@samplemail.com",
    registerDate: "2025-02-22T14:00",
    purchase: "30",
    totalOrders: "Rp 4.000.000",
    card: "30",
    specialCard: "20",
  },
];

export const Member = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filtered Members
  const filteredMembers = members.filter((member) => {
    const queryMatch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());

    const registerDate = new Date(member.registerDate);
    const dateMatch =
      (!startDate || registerDate >= startDate) &&
      (!endDate || registerDate <= endDate);

    return queryMatch && dateMatch;
  });

  const handleDateChange = (date: Date | null, dateType: "start" | "end") => {
    if (dateType === "start") {
      setStartDate(date || undefined);
    } else {
      setEndDate(date || undefined);
    }
  };

  return (
    <div className="p-4">
      <div className="text-sm breadcrumbs mb-4">
        <ul className="text-gray-500">
          <li>Member</li>
          <li>Member List</li>
        </ul>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Member</h1>

      <div className="flex justify-between items-center mb-6">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <FaPlus className="w-4 h-4" />
          <span>Add Member</span>
        </button>

        <div className="flex items-center gap-4 ml-auto">
          {/* Search Bar */}
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Date Pickers */}
          <div className="flex items-center gap-2">
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => handleDateChange(date, "start")}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="From"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5"
            />
            <span className="text-gray-500">-</span>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => handleDateChange(date, "end")}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="To"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">
                <input
                  type="checkbox"
                  className="rounded"
                />
              </th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Register Date</th>
              <th className="p-4 text-left">Purchase</th>
              <th className="p-4 text-left">Total Orders</th>
              <th className="p-4 text-left">Card</th>
              <th className="p-4 text-left">Special Card</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, index) => (
              <tr
                key={index}
                className="border-t"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src="/api/placeholder/40/40"
                        alt="User avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500">
                        {member.username}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">{member.email}</td>
                <td className="p-4">
                  {new Date(member.registerDate).toLocaleString()}
                </td>
                <td className="p-4">{member.purchase}</td>
                <td className="p-4">{member.totalOrders}</td>
                <td className="p-4">{member.card}</td>
                <td className="p-4">{member.specialCard}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <a href="/admin/detail-member">🔍</a>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      👁️
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full text-red-500">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-1">
          {[1, 2, 3, "...", 10].map((page, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${
                page === 1 ? "bg-yellow-500 text-white" : "text-gray-600"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
