import {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const [startDate, setStartDate] = useState<Date | undefined>(undefined);
const [endDate, setEndDate] = useState<Date | undefined>(undefined);

const handleDateChange = (date: Date | null, dateType: "start" | "end") => {
  if (dateType === "start") {
    setStartDate(date || undefined);
  } else {
    setEndDate(date || undefined);
  }
};

export default function Datepicker() {
  return (
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
  );
}
