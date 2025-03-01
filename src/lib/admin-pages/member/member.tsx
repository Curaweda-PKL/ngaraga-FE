import {useEffect, useState} from "react";
import {FaPlus, FaEyeSlash, FaSearch, FaTrash, FaUser} from "react-icons/fa";
import {PaginationMember} from "./components/paginationMember";
import {EyeIcon} from "./components/svgsIconMember/eyeIcon";
import {TrashIcon} from "./components/svgsIconMember/trashIcon";
import {CheckboxIcons} from "./components/svgsIconMember/checkboxIcons";
import {SERVER_URL} from "@/middleware/utils";
// Removed: import DatePicker from "react-datepicker";
// Removed: import "react-datepicker/dist/react-datepicker.css";

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
  isSuspended: boolean;
  image?: string;
}

const initialMembers: Member[] = [];

export const Member = () => {
  const [memberData, setMemberData] = useState<Member[]>(initialMembers);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch accounts with role "USER" when the component mounts
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${SERVER_URL}/api/accounts/role/USER`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        if (!json.success) {
          throw new Error("API returned an error");
        }
        const accounts = json.data;
        const members: Member[] = accounts.map((account: any) => ({
          id: account.id,
          name: account.name || "0",
          username: account.fullName || "0",
          email: account.email || "0",
          registerDate: account.createdAt || "0",
          purchase: "0",
          totalOrders: "0",
          card: "0",
          specialCard: "0",
          checked: false,
          isSuspended: account.isSuspended || false,
          image: account.image
            ? account.image
            : `${SERVER_URL}/api/placeholder/40/40`,
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
        member.id === id ? {...member, checked: !member.checked} : member
      )
    );
  };

  const handleSelectAll = () => {
    const allChecked = filteredMembers.every((member) => member.checked);
    const filteredIds = new Set(filteredMembers.map((m) => m.id));

    setMemberData((prev) =>
      prev.map((member) =>
        filteredIds.has(member.id) ? {...member, checked: !allChecked} : member
      )
    );
  };

  const handleDelete = async (userId?: string) => {
    const selectedUsers = userId
      ? [{id: userId}]
      : memberData.filter((user) => user.checked);

    if (selectedUsers.length === 0) return;

    // Remove confirmation prompt and delete directly
    setLoading(true);
    try {
      for (const user of selectedUsers) {
        const response = await fetch(
          `${SERVER_URL}/api/accounts/delete/${user.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to delete user: ${user.id}`);
        }
      }

      setMemberData((prev) =>
        prev.filter((user) => !selectedUsers.some((u) => u.id === user.id))
      );

      setSuccessMessage("User successfully deleted!");
      setError(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to delete users");
    } finally {
      setLoading(false);
    }
  };

  // Suspend action now occurs directly without confirmation
  const handleSuspend = async (userId: string) => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${SERVER_URL}/api/account/suspend/${userId}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to suspend user");
      }

      setMemberData((prev) =>
        prev.map((user) =>
          user.id === userId ? {...user, isSuspended: true} : user
        )
      );
      setSuccessMessage("User successfully suspended!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to suspend user");
    } finally {
      setLoading(false);
    }
  };

  // Unsuspend action now occurs directly without confirmation
  const handleUnsuspend = async (userId: string) => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${SERVER_URL}/api/account/unsuspend/${userId}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to unsuspend user");
      }

      setMemberData((prev) =>
        prev.map((user) =>
          user.id === userId ? {...user, isSuspended: false} : user
        )
      );
      setSuccessMessage("User successfully unsuspended!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to unsuspend user");
    } finally {
      setLoading(false);
    }
  };

  // Bulk suspend/unsuspend without alerts; sets an error message if no user is selected
  const handleBulkSuspendUnsuspend = async () => {
    const selectedUsers = memberData.filter((user) => user.checked);

    if (selectedUsers.length === 0) {
      setError("Please select at least one user to suspend/unsuspend");
      setTimeout(() => setError(null), 3000);
      return;
    }

    const isSuspending = selectedUsers.some((user) => !user.isSuspended);
    const action = isSuspending ? "suspend" : "unsuspend";

    setLoading(true);
    try {
      await Promise.all(
        selectedUsers.map((user) =>
          fetch(`${SERVER_URL}/api/account/${action}/${user.id}`, {
            method: "PUT",
          })
        )
      );

      setMemberData((prev) =>
        prev.map((user) =>
          selectedUsers.some((u) => u.id === user.id)
            ? {...user, isSuspended: isSuspending}
            : user
        )
      );

      setSuccessMessage(
        `${selectedUsers.length} user(s) successfully ${action}ed!`
      );
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || `Failed to ${action} users`);
    } finally {
      setLoading(false);
    }
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

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}
      {successMessage && (
        <div className="bg-green-100 text-green-700 border border-green-400 p-3 rounded-md mb-4">
          {successMessage}
        </div>
      )}

      <div className="flex justify-evenly items-center mb-6">
        <div className="flex items-center">
          <button className="bg-call-to-actions-900 hover:bg-call-to-actions-800 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaPlus className="w-4 h-4" />
            <span>
              <a href="/admin/add-member">Add Member</a>
            </span>
          </button>
          {filteredMembers.length > 0 &&
            filteredMembers.every((member) => member.checked) && (
              <>
                <button
                  onClick={handleBulkSuspendUnsuspend}
                  className="border ml-2 border-call-to-actions-900 hover:bg-call-to-actions-200 text-call-to-actions-900 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FaEyeSlash />
                  <span>Hide</span>
                </button>
                <button
                  onClick={() => handleDelete()}
                  className="border border-danger-colors-700 text-danger-colors-700 rounded-lg flex items-center ml-2 px-4 py-2 hover:bg-danger-colors-200 gap-2"
                >
                  <FaTrash className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </>
            )}
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
            {/* Native HTML Date Picker for Start Date */}
            <input
              type="date"
              value={startDate ? startDate.toISOString().slice(0, 10) : ""}
              onChange={(e) => {
                const date = e.target.value ? new Date(e.target.value) : null;
                handleDateChange(date, "start");
              }}
              max={endDate ? endDate.toISOString().slice(0, 10) : undefined}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5"
            />
            <span className="text-gray-500">-</span>
            {/* Native HTML Date Picker for End Date */}
            <input
              type="date"
              value={endDate ? endDate.toISOString().slice(0, 10) : ""}
              onChange={(e) => {
                const date = e.target.value ? new Date(e.target.value) : null;
                handleDateChange(date, "end");
              }}
              min={startDate ? startDate.toISOString().slice(0, 10) : undefined}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-neutral-colors-700 font-[200]">
              <th className="p-2 w-12 text-center">
                <div
                  onClick={handleSelectAll}
                  className="cursor-pointer"
                >
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
                <td
                  colSpan={9}
                  className="p-4 text-center"
                >
                  No members found
                </td>
              </tr>
            ) : (
              filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-t"
                >
                  <td className="p-4 align-middle text-center">
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
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={
                            member.image
                              ? member.image
                              : `${SERVER_URL}/api/placeholder/40/40`
                          }
                          alt="User avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-[500] text-neutral-colors-600">
                          {member.name || "0"}
                        </div>
                        <div className="text-sm text-neutral-colors-600">
                          {member.username || "0"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle">{member.email || "0"}</td>
                  <td className="p-4 align-middle hidden md:table-cell">
                    {member.registerDate !== "0" &&
                    !isNaN(new Date(member.registerDate).getTime())
                      ? new Date(member.registerDate).toLocaleDateString()
                      : "0"}
                  </td>
                  <td className="p-4 align-middle">{member.purchase || "0"}</td>
                  <td className="p-4 align-middle">
                    {member.totalOrders || "0"}
                  </td>
                  <td className="p-4 align-middle hidden sm:table-cell">
                    {member.card || "0"}
                  </td>
                  <td className="p-4 align-middle hidden sm:table-cell">
                    {member.specialCard || "0"}
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded-full">
                        <a href="/admin/detail-member">
                          <FaUser />
                        </a>
                      </button>
                      <button
                        onClick={() =>
                          member.isSuspended
                            ? handleUnsuspend(member.id)
                            : handleSuspend(member.id)
                        }
                        className={`p-1.5 rounded-full ${
                          member.isSuspended
                            ? "text-green-500 hover:bg-green-100"
                            : "text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        {member.isSuspended ? <FaEyeSlash /> : <EyeIcon />}
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="p-1.5 hover:bg-gray-100 rounded-full text-red-500"
                      >
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
