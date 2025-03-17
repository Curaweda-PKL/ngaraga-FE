import { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { SERVER_URL } from "@/middleware/utils";

export const RegisteredUsers = () => {
  // --- State for Registrations List ---
  const [registrations, setRegistrations] = useState<
    {
      id: string;
      userName: string;
      registeredAt: string;
      eventName: string;
    }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Helper function to parse and format the registeredAt date string.
  // Assumes the input format is "dd/mm/yyyy, HH.mm.ss"
  const parseRegisteredAt = (dateString: string): string => {
    const parts = dateString.split(",");
    if (parts.length < 2) return dateString;
    const datePart = parts[0].trim();
    const timePart = parts[1].trim().replace(/\./g, ":");
    // Assuming datePart is in dd/mm/yyyy format
    const [day, month, year] = datePart.split("/");
    // Construct an ISO formatted string "yyyy-mm-ddTHH:MM:SS"
    const isoString = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${timePart}`;
    const parsedDate = new Date(isoString);
    return parsedDate.toLocaleString();
  };

  // --- Fetch Registrations (for the logged-in user) ---
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/event/account`, { withCredentials: true })
      .then((response) => {
        // Map the fetched data to the expected fields
        const mappedData = response.data.map((reg: any) => ({
          id: reg.id,
          userName: reg.userName,
          registeredAt: parseRegisteredAt(reg.registeredAt),
          eventName: reg.eventName,
        }));
        setRegistrations(mappedData);
      })
      .catch((error) => {
        console.error("Error fetching registrations:", error);
      });
  }, []);

  // --- Filtering & Pagination ---
  const filteredRegistrations = registrations.filter((reg) =>
    reg.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
  const currentRegistrations = filteredRegistrations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let page = 1; page <= totalPages; page++) {
      buttons.push(
        <button
          key={page}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? "bg-yellow-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>Registrations</span>
        <span className="mx-2">/</span>
        <span>My Registrations</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6">My Registrations</h1>

      {/* Search Input */}
      <div className="flex justify-end items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by user name"
            className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left font-medium">User Name</th>
              <th className="p-4 text-left font-medium">Registered At</th>
              <th className="p-4 text-left font-medium">Event Registered</th>
            </tr>
          </thead>
          <tbody>
            {currentRegistrations.map((reg) => (
              <tr key={reg.id} className="border-b">
                <td className="p-4">{reg.userName}</td>
                <td className="p-4">{reg.registeredAt}</td>
                <td className="p-4">{reg.eventName}</td>
              </tr>
            ))}
            {currentRegistrations.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No registrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-1">
        {renderPaginationButtons()}
        {totalPages > 0 && (
          <>
            <button
              className="px-3 py-1 rounded text-gray-600 hover:bg-gray-100"
              onClick={() =>
                currentPage > 1 && setCurrentPage((prev) => prev - 1)
              }
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              className="px-3 py-1 rounded text-gray-600 hover:bg-gray-100"
              onClick={() =>
                currentPage < totalPages && setCurrentPage((prev) => prev + 1)
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};
