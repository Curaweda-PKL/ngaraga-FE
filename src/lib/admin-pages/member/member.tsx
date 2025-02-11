import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { FaPlus, FaEyeSlash, FaSearch, FaTrash } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { PaginationMember } from "./components/paginationMember";
import { LensIcon } from "./components/svgsIconMember/lensIcon";
import { EyeIcon } from "./components/svgsIconMember/eyeIcon";
import { TrashIcon } from "./components/svgsIconMember/trashIcon";
import { CheckboxIcons } from "./components/svgsIconMember/checkboxIcons";

interface Member {
  id: string;
  name: string;
  username: string;
  email: string;
  registerDate: string;
  purchase: string;
  totalOrders: string;
  card: string;
  specialCard: string;
  checked: boolean;
  image?: string;
}

// (Optional) Start with an empty array – the data will be fetched
const initialMembers: Member[] = [];

export const Member = () => {
  const [memberData, setMemberData] = useState<Member[]>(initialMembers);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch accounts with role "USER" when the component mounts
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/accounts/role/USER");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        if (!json.success) {
          throw new Error("API returned an error");
        }
        const accounts = json.data;
        // Map the API response to your Member type.
        // For fields that your table expects but which aren’t in the API,
        // we assign "N/A" as a placeholder.
        const members: Member[] = accounts.map((account: any) => ({
          id: account.id,
          name: account.name || "N/A",
          username: account.fullName || "N/A",
          email: account.email || "N/A",
          registerDate: account.createdAt || "N/A",
          purchase: "N/A",
          totalOrders: "N/A",
          card: "N/A",
          specialCard: "N/A",
          checked: false,
          image: account.image ? account.image : "/api/placeholder/40/40",
        }));
        setMemberData(members);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch members");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Filter members based on search text and the date range.
  const filteredMembers = memberData.filter((member) => {
    const queryMatch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());

    // When a start or end date is set, check that the registerDate is valid and in range.
    let dateMatch = true;
    if (startDate || endDate) {
      const parsedDate = new Date(member.registerDate);
      const validDate = !isNaN(parsedDate.getTime());
      if (!validDate) {
        dateMatch = false;
      } else {
        if (startDate && parsedDate < startDate) dateMatch = false;
        if (endDate && parsedDate > endDate) dateMatch = false;
      }
    }
    return queryMatch && dateMatch;
  });

  const handleCheckboxChange = (id: string) => {
    setMemberData((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, checked: !member.checked } : member
      )
    );
  };

  const handleSelectAll = () => {
    const allChecked = filteredMembers.every((member) => member.checked);
    const filteredIds = new Set(filteredMembers.map((m) => m.id));

    setMemberData((prev) =>
      prev.map((member) =>
        filteredIds.has(member.id)
          ? { ...member, checked: !allChecked }
          : member
      )
    );
  };

  const handleDelete = () => {
    setMemberData((prev) => prev.filter((member) => !member.checked));
  };

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

      {/* Show loading and error messages if needed */}
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}

      <div className="flex justify-evenly items-center mb-6">
        <div className="flex items-center">
          <button className="bg-call-to-actions-900 hover:bg-call-to-actions-800 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaPlus className="w-4 h-4" />
            <span>
              <a href="/admin/add-member">Add Member</a>
            </span>
          </button>

          <button className="border ml-2 border-call-to-actions-900 hover:bg-call-to-actions-200 text-call-to-actions-900 px-4 py-2 rounded-lg flex items-center gap-2">
            <FaEyeSlash />
            <span>Hide</span>
          </button>

          <button
            onClick={handleDelete}
            className="border border-danger-colors-700 text-danger-colors-700 rounded-lg flex items-center ml-2 px-4 py-2 hover:bg-danger-colors-200 gap-2"
          >
            <FaTrash className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>

        <div className="flex gap-4 flex-grow justify-end">
          <div className="flex-grow max-w-md relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10 p-2.5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
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

      <div className="bg-white rounded-lg border border-neutral-colors-500 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-neutral-colors-700 font-[200]">
              <th className="p-2 w-12 text-center">
                <div onClick={handleSelectAll} className="cursor-pointer">
                  <CheckboxIcons
                    className="mx-auto"
                    checked={
                      filteredMembers.length > 0 &&
                      filteredMembers.every((member) => member.checked)
                    }
                  />
                </div>
              </th>
              <th className="p-4 text-left w-[15%] min-w-[160px]">Name</th>
              <th className="p-4 text-left w-[20%] min-w-[200px]">Email</th>
              <th className="p-4 text-left w-[15%] hidden md:table-cell">
                Register Date
              </th>
              <th className="p-4 text-left w-[8%]">Purchase</th>
              <th className="p-4 text-left w-[12%]">Total Orders</th>
              <th className="p-4 text-left w-[8%] hidden sm:table-cell">
                Card
              </th>
              <th className="p-4 text-left w-[12%] hidden sm:table-cell">
                Special Card
              </th>
              <th className="p-4 text-left w-[10%] min-w-[120px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-4 text-center">
                  No members found
                </td>
              </tr>
            ) : (
              filteredMembers.map((member) => (
                <tr key={member.id} className="border-t">
                  <td className="p-4 text-center">
                    <div
                      onClick={() => handleCheckboxChange(member.id)}
                      className="cursor-pointer"
                    >
                      <CheckboxIcons
                        className="mx-auto"
                        checked={member.checked}
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3 truncate">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={member.image ? member.image : "/api/placeholder/40/40"}
                          alt="User avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="truncate">
                        <div className="font-[500] text-neutral-colors-600 truncate">
                          {member.name || "N/A"}
                        </div>
                        <div className="text-sm text-neutral-colors-600 truncate">
                          {member.username || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 truncate text-sm">
                    {member.email || "N/A"}
                  </td>
                  <td className="p-4 hidden md:table-cell text-sm">
                    {member.registerDate !== "N/A" &&
                    !isNaN(new Date(member.registerDate).getTime())
                      ? new Date(member.registerDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-4">{member.purchase || "N/A"}</td>
                  <td className="p-4 hidden sm:table-cell whitespace-nowrap min-w-[120px] overflow-hidden">
                    {member.totalOrders || "N/A"}
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    {member.card || "N/A"}
                  </td>
                  <td className="p-4 hidden sm:table-cell whitespace-nowrap min-w-[120px] overflow-hidden">
                    {member.specialCard || "N/A"}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded-full">
                        <a href="/admin/detail-member">
                          <LensIcon />
                        </a>
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 text-neutral-colors-700 rounded-full">
                        <EyeIcon />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-full text-red-500">
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div>
        <PaginationMember />
      </div>
    </div>
  );
};
