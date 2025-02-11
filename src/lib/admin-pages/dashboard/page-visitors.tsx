import {useState} from "react";
import {BsCalendar} from "react-icons/bs";
import {GrView} from "react-icons/gr";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const topPages = [
  {id: 1, name: "ngaraga.co.id", visitors: 13005},
  {id: 2, name: "name-page", visitors: 12004},
  {id: 3, name: "name-page", visitors: 10899},
  {id: 4, name: "name-page", visitors: 8674},
  {id: 5, name: "name-page", visitors: 500},
  {id: 6, name: "name-page", visitors: 400},
  {id: 7, name: "name-page", visitors: 233},
  {id: 8, name: "name-page", visitors: 199},
  {id: 9, name: "name-page", visitors: 189},
  {id: 10, name: "name-page", visitors: 180},
];

const visitorsByCity = [
  {id: 1, city: "Jakarta", visitors: 13005},
  {id: 2, city: "Malang", visitors: 12004},
  {id: 3, city: "Bandung", visitors: 10899},
  {id: 4, city: "Makassar", visitors: 8674},
  {id: 5, city: "Palembang", visitors: 500},
  {id: 6, city: "Bali", visitors: 400},
  {id: 7, city: "Medan", visitors: 233},
  {id: 8, city: "Yogyakarta", visitors: 199},
  {id: 9, city: "Semarang", visitors: 189},
  {id: 10, city: "Surabaya", visitors: 180},
];

export default function PageTraffic() {
  const [filterTopPages, setFilterTopPages] = useState("7D");
  const [filterVisitorsByCity, setFilterVisitorsByCity] = useState("7D");
  const [dateRangeTopPages, setDateRangeTopPages] = useState([null, null]);
  const [dateRangeVisitorsByCity, setDateRangeVisitorsByCity] = useState([
    null,
    null,
  ]);

  const handleFilterChangeTopPages = (filter) => {
    setFilterTopPages(filter);
  };

  const handleFilterChangeVisitorsByCity = (filter) => {
    setFilterVisitorsByCity(filter);
  };

  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      {[
        {
          title: "Page Traffic",
          data: topPages,
          filter: filterTopPages,
          setFilter: handleFilterChangeTopPages,
          dateRange: dateRangeTopPages,
          setDateRange: setDateRangeTopPages,
        },
        {
          title: "Visitors by City",
          data: visitorsByCity,
          filter: filterVisitorsByCity,
          setFilter: handleFilterChangeVisitorsByCity,
          dateRange: dateRangeVisitorsByCity,
          setDateRange: setDateRangeVisitorsByCity,
        },
      ].map((section, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-6 shadow-md border"
        >
          <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
          <div className="flex gap-2 mb-4">
            {["7D", "30D", "12M"].map((btn) => (
              <button
                key={btn}
                onClick={() => section.setFilter(btn)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  section.filter === btn
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {btn}
              </button>
            ))}
            <div className="flex items-center gap-2 ml-auto">
              <BsCalendar
                className="text-gray-500"
                size={20}
              />
              <DatePicker
                selected={section.dateRange[0]}
                onChange={(date) =>
                  section.setDateRange([date, section.dateRange[1]])
                }
                selectsStart
                startDate={section.dateRange[0]}
                endDate={section.dateRange[1]}
                placeholderText="Start Date"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-28 p-2.5"
              />
              <span className="text-gray-500">-</span>
              <DatePicker
                selected={section.dateRange[1]}
                onChange={(date) =>
                  section.setDateRange([section.dateRange[0], date])
                }
                selectsEnd
                startDate={section.dateRange[0]}
                endDate={section.dateRange[1]}
                placeholderText="End Date"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-28 p-2.5"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500 border">
            <thead className="border-b text-gray-700">
              <tr>
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">
                  {section.title === "Page Traffic" ? "Page Name" : "City"}
                </th>
                <th className="py-2 px-3">Total Visitors</th>
                {section.title === "Page Traffic" && (
                  <th className="py-2 px-3">Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {section.data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b"
                >
                  <td className="py-2 px-3">{item.id}</td>
                  <td className="py-2 px-3">
                    {section.title === "Page Traffic" ? item.name : item.city}
                  </td>
                  <td className="py-2 px-3">
                    {item.visitors.toLocaleString()}
                  </td>
                  {section.title === "Page Traffic" && (
                    <td className="py-2 px-3">
                      <button className="text-blue-500 hover:underline">
                        <GrView />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
