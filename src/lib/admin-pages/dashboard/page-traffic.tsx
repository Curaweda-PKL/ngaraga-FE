import {useState} from "react";
import {BsCalendar} from "react-icons/bs"; // Import React Icon
import {GrView} from "react-icons/gr";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const topPages = [
  {id: 1, name: "ngaraga.co.id", visitors: 13005},
  {id: 2, name: "name-page", visitors: 12004},
  {id: 3, name: "name-page", visitors: 10899},
  {id: 4, name: "name-page", visitors: 8674},
  {id: 5, name: "name-page", visitors: 500},
];

const visitorsByCity = [
  {id: 1, city: "Jakarta", visitors: 13005},
  {id: 2, city: "Malang", visitors: 12004},
  {id: 3, city: "Bandung", visitors: 10899},
  {id: 4, city: "Makassar", visitors: 8674},
  {id: 5, city: "Palembang", visitors: 500},
];

export default function PageTraffic() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [filter, setFilter] = useState("7D"); // Default filter is 7 Days

  const handleDateChange = (date: Date | null, dateType: "start" | "end") => {
    if (dateType === "start") {
      setStartDate(date || undefined);
    } else {
      setEndDate(date || undefined);
    }
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
    const today = new Date();
    if (filter === "7D") {
      setStartDate(new Date(today.setDate(today.getDate() - 7)));
      setEndDate(new Date());
    } else if (filter === "30D") {
      setStartDate(new Date(today.setDate(today.getDate() - 30)));
      setEndDate(new Date());
    } else if (filter === "1Y") {
      setStartDate(new Date(today.setFullYear(today.getFullYear() - 1)));
      setEndDate(new Date());
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8 mt-6">
      {/* Page Traffic */}
      <div className="bg-white rounded-lg p-6 shadow-lg border">
        <h2 className="text-xl font-semibold mb-6">Page Traffic</h2>
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => handleFilterChange("7D")}
            className={`px-4 py-2 rounded-md ${
              filter === "7D" ? "bg-yellow-500 text-white" : "bg-gray-200"
            }`}
          >
            7D
          </button>
          <button
            onClick={() => handleFilterChange("30D")}
            className={`px-4 py-2 rounded-md ${
              filter === "30D" ? "bg-yellow-500 text-white" : "bg-gray-200"
            }`}
          >
            30D
          </button>
          <button
            onClick={() => handleFilterChange("1Y")}
            className={`px-4 py-2 rounded-md ${
              filter === "1Y" ? "bg-yellow-500 text-white" : "bg-gray-200"
            }`}
          >
            1Y
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <BsCalendar
              className="text-gray-500"
              size={20}
            />
            <DatePicker
              selected={startDate}
              onChange={(date) => handleDateChange(date, "start")}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="From"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-28 p-2.5"
            />
            <span className="text-gray-500">-</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => handleDateChange(date, "end")}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="To"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-28 p-2.5"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th>#</th>
              <th>Page Name</th>
              <th>Total Visitors</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {topPages.map((page) => (
              <tr
                key={page.id}
                className="border-b"
              >
                <td>{page.id}</td>
                <td>{page.name}</td>
                <td>{page.visitors}</td>
                <td>
                  <button className="text-blue-500 hover:underline">
                    <GrView />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visitors by City */}
      <div className="bg-white rounded-lg p-6 shadow-lg border">
        <h2 className="text-xl font-semibold mb-6">Visitors by City</h2>
        <div className="flex items-center gap-4 mb-6">
          {/* Reuse buttons and datepicker */}
          <button
            onClick={() => handleFilterChange("7D")}
            className={`px-4 py-2 rounded-md ${
              filter === "7D" ? "bg-yellow-500 text-white" : "bg-gray-200"
            }`}
          >
            7D
          </button>
          <button
            onClick={() => handleFilterChange("30D")}
            className={`px-4 py-2 rounded-md ${
              filter === "30D" ? "bg-yellow-500 text-white" : "bg-gray-200"
            }`}
          >
            30D
          </button>
          <button
            onClick={() => handleFilterChange("1Y")}
            className={`px-4 py-2 rounded-md ${
              filter === "1Y" ? "bg-yellow-500 text-white" : "bg-gray-200"
            }`}
          >
            1Y
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <BsCalendar
              className="text-gray-500"
              size={20}
            />
            <DatePicker
              selected={startDate}
              onChange={(date) => handleDateChange(date, "start")}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="From"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-28 p-2.5"
            />
            <span className="text-gray-500">-</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => handleDateChange(date, "end")}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="To"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-28 p-2.5"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th>#</th>
              <th>City</th>
              <th>Total Visitors</th>
            </tr>
          </thead>
          <tbody>
            {visitorsByCity.map((city) => (
              <tr
                key={city.id}
                className="border-b"
              >
                <td>{city.id}</td>
                <td>{city.city}</td>
                <td>{city.visitors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
