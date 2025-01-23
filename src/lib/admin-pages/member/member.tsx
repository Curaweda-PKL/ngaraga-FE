import { useState } from "react";
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
}

const initialMembers: Member[] = [
  {
    id: "1",
    name: "Ethan White",
    username: "UserZeta",
    email: "ethan.white@samplemail.com",
    registerDate: "2025-01-20T09:30",
    purchase: "25",
    totalOrders: "Rp 3.500.000",
    card: "25",
    specialCard: "15",
    checked: false,
  },
  {
    id: "2",
    name: "Emma Johnson",
    username: "UserAlpha",
    email: "emma.johnson@samplemail.com",
    registerDate: "2025-01-21T10:15",
    purchase: "30",
    totalOrders: "Rp 4.200.000",
    card: "20",
    specialCard: "10",
    checked: false,
  },
];

export const Member = () => {
  const [memberData, setMemberData] = useState<Member[]>(initialMembers);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = memberData.filter((member) => {
    const queryMatch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());

    const registerDate = new Date(member.registerDate);
    const dateMatch =
      (!startDate || registerDate >= startDate) &&
      (!endDate || registerDate <= endDate);

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
            {filteredMembers.map((member) => (
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
                        src="/api/placeholder/40/40"
                        alt="User avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="truncate">
                      <div className="font-[500] text-neutral-colors-600 truncate">
                        {member.name}
                      </div>
                      <div className="text-sm text-neutral-colors-600 truncate">
                        {member.username}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 truncate text-sm">{member.email}</td>
                <td className="p-4 hidden md:table-cell text-sm">
                  {new Date(member.registerDate).toLocaleDateString()}
                </td>
                <td className="p-4">{member.purchase}</td>
                <td className="p-4 hidden sm:table-cell whitespace-nowrap min-w-[120px] overflow-hidden">{member.totalOrders}</td>
                <td className="p-4 hidden sm:table-cell">{member.card}</td>
                <td className="p-4 hidden sm:table-cell whitespace-nowrap min-w-[120px] overflow-hidden">
                  {member.specialCard}
                </td>
                <td className="p-4">
                <div className="flex gap-1 ">
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
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <PaginationMember />
      </div>
    </div>
  );
};
