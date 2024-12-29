import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface OrderFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
}

export const OrderFilters = ({
  searchQuery,
  setSearchQuery,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: OrderFiltersProps) => {
  const handleDateChange = (date: Date | null, dateType: "start" | "end") => {
    if (dateType === "start") {
      setStartDate(date || undefined);
    } else {
      setEndDate(date || undefined);
    }
  };

  return (
    <div className="flex items-center mb-6">
      <div className="flex-grow">
        <input
          type="text"
          placeholder="Search orders..."
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 ml-4">
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
  );
};
