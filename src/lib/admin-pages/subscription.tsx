import {useState} from "react";
import {FaTrash} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Subscription = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const initialSubscriptions = [
    {email: "budi.santoso@example.com", registerDate: "2025-01-20T09:30:00"},
    {email: "siti.nurhaliza@example.com", registerDate: "2025-02-22T14:00:00"},
    {email: "contact@samplemail.com", registerDate: "2025-03-05T11:45:00"},
    {email: "rina.wulandari@example.com", registerDate: "2025-04-10T16:00:00"},
    {email: "doni.setiawan@example.com", registerDate: "2025-05-15T08:15:00"},
    {email: "nina.anggraini@example.com", registerDate: "2025-06-30T10:30:00"},
    {email: "rudi.hartono@example.com", registerDate: "2025-07-25T12:00:00"},
    {email: "lina.sari@example.com", registerDate: "2025-08-10T15:00:00"},
    {email: "joko.widodo@example.com", registerDate: "2025-09-20T09:00:00"},
    {email: "maya.sari@example.com", registerDate: "2025-10-15T14:45:00"},
  ];

  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmails(subscriptions.map((sub) => sub.email));
    } else {
      setSelectedEmails([]);
    }
  };

  const handleSelectEmail = (email: string, checked: boolean) => {
    if (checked) {
      setSelectedEmails((prev) => [...prev, email]);
    } else {
      setSelectedEmails((prev) => prev.filter((e) => e !== email));
    }
  };

  const handleDelete = () => {
    setSubscriptions((prev) =>
      prev.filter((sub) => !selectedEmails.includes(sub.email))
    );
    setSelectedEmails([]);
    setShowModal(false);
  };

  const handleSingleDelete = (email: string) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.email !== email));
  };

  const handleDateChange = (date: Date | null, dateType: "start" | "end") => {
    if (dateType === "start") {
      setStartDate(date || undefined);
    } else {
      setEndDate(date || undefined);
    }
  };

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const registerDate = new Date(sub.registerDate);
    const matchesSearch = sub.email
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDateRange =
      (!startDate || registerDate >= startDate) &&
      (!endDate || registerDate <= endDate);
    return matchesSearch && matchesDateRange;
  });

  return (
    <div className="p-2">
      <div className="text-sm breadcrumbs mb-4">
        <ul className="text-gray-500">
          <li>Subscription</li>
          <li>Subscription List</li>
        </ul>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Subscription</h1>

      <div className="flex justify-between items-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            selectedEmails.length > 0
              ? "bg-red-50 text-red-500 border border-red-200"
              : "hidden"
          }`}
          onClick={() => setShowModal(true)}
        >
          <FaTrash />
          <span>Delete</span>
          {selectedEmails.length > 0 && (
            <span className="ml-1">({selectedEmails.length})</span>
          )}
        </button>

        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

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

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={
                    selectedEmails.length === filteredSubscriptions.length
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="p-4 text-left font-medium">Email</th>
              <th className="p-4 text-left font-medium">Register Date</th>
              <th className="p-4 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscriptions.map((subscription, index) => (
              <tr
                key={index}
                className="border-b last:border-b-0"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedEmails.includes(subscription.email)}
                    onChange={(e) =>
                      handleSelectEmail(subscription.email, e.target.checked)
                    }
                  />
                </td>
                <td className="p-4">{subscription.email}</td>
                <td className="p-4">
                  {new Date(subscription.registerDate).toLocaleString()}
                </td>
                <td className="p-4">
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleSingleDelete(subscription.email)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete the selected emails?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
