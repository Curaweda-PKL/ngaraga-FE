import { useState, useEffect } from "react";
import { FaTrash, FaSearch, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SERVER_URL } from "@/middleware/utils"; // Import your centralized server URL

interface Subscription {
  id: string;
  email: string;
  registerDate: string; 
}

export const Subscription = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSubscriptionIds, setSelectedSubscriptionIds] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/subscriptions/all`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        const subscriptionsData = responseData.data.subscriptions.map((sub: any) => ({
          id: sub.id,
          email: sub.email,
          registerDate: sub.createdAt,
        }));
        setSubscriptions(subscriptionsData);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
        setSubscriptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSubscriptionIds(subscriptions.map((sub) => sub.id));
    } else {
      setSelectedSubscriptionIds([]);
    }
  };

  const handleSelectSubscription = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedSubscriptionIds((prev) => [...prev, id]);
    } else {
      setSelectedSubscriptionIds((prev) => prev.filter((i) => i !== id));
    }
  };

  // Single deletion: call the DELETE endpoint using the subscription id.
  const handleSingleDelete = async (id: string) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/subscriptions/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Delete failed");
      }
      // Update local state after deletion.
      setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
      // Also remove from selected list if present.
      setSelectedSubscriptionIds((prev) => prev.filter((i) => i !== id));
    } catch (error) {
      console.error("Error deleting subscription:", error);
    }
  };

  // Bulk deletion: iterate over selected IDs and delete them one by one.
  const handleDelete = async () => {
    try {
      for (const id of selectedSubscriptionIds) {
        const response = await fetch(`${SERVER_URL}/api/subscriptions/delete/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`Delete failed for id: ${id}`);
        }
      }
      // Remove all deleted subscriptions from state.
      setSubscriptions((prev) =>
        prev.filter((sub) => !selectedSubscriptionIds.includes(sub.id))
      );
      setSelectedSubscriptionIds([]);
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting subscriptions:", error);
    }
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
    const matchesSearch = sub.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDateRange =
      (!startDate || registerDate >= startDate) && (!endDate || registerDate <= endDate);
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
            selectedSubscriptionIds.length > 0
              ? "bg-red-50 text-red-500 border border-red-200"
              : "hidden"
          }`}
          onClick={() => setShowModal(true)}
        >
          <FaTrash />
          <span>Delete</span>
          {selectedSubscriptionIds.length > 0 && (
            <span className="ml-1">({selectedSubscriptionIds.length})</span>
          )}
        </button>

        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="flex-grow max-w-md relative">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search and hit enter"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 FaCalendarAlt z-10" />
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => handleDateChange(date, "start")}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="From"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 pl-10"
              />
            </div>
            <span className="text-gray-500">-</span>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 FaCalendarAlt z-10" />
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => handleDateChange(date, "end")}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="To"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-8 text-gray-500">Loading subscriptions...</div>
      ) : error ? (
        <div className="text-center p-8 text-red-500">Error: {error}</div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={
                      filteredSubscriptions.length > 0 &&
                      selectedSubscriptionIds.length === filteredSubscriptions.length
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    disabled={filteredSubscriptions.length === 0}
                  />
                </th>
                <th className="p-4 text-left font-medium">Email</th>
                <th className="p-4 text-left font-medium">Register Date</th>
                <th className="p-4 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map((subscription) => (
                <tr key={subscription.id} className="border-b last:border-b-0">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedSubscriptionIds.includes(subscription.id)}
                      onChange={(e) =>
                        handleSelectSubscription(subscription.id, e.target.checked)
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
                      onClick={() => handleSingleDelete(subscription.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSubscriptions.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No subscriptions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete the selected subscriptions?
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
