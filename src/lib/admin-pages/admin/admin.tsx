import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Edit3, Eye, Trash2, Plus } from "lucide-react";

export const Admin = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/accounts/role/ADMIN"
        );
        setUsers(response.data.data || []);
        setError("");
      } catch (err) {
        setError("Failed to fetch admin accounts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map((user: any) => user.email));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (email: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, email]);
    } else {
      setSelectedUsers((prev) => prev.filter((e) => e !== email));
    }
  };

  return (
    <div className="p-4">
      {/* Breadcrumb navigation */}
      <div className="text-sm breadcrumbs mb-4">
        <ul className="text-gray-500">
          <li>Admin</li>
          <li>Admin List</li>
        </ul>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Admin</h1>

      {/* Action bar */}
      <div className="flex justify-between items-center mb-6">
        {/* Add button */}
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>
            {" "}
            <a href="/admin/add-admin">Add Admin</a>
          </span>
        </button>

        {/* Search input */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {/* Loading and Error States */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        /* Users table */
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedUsers.length === users.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th className="p-4 text-left font-medium">Full Name</th>
                <th className="p-4 text-left font-medium">Email</th>
                <th className="p-4 text-left font-medium">Phone Number</th>
                <th className="p-4 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any, index: number) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedUsers.includes(user.email)}
                      onChange={(e) =>
                        handleSelectUser(user.email, e.target.checked)
                      }
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden">
                        <img
                          src={
                            user?.image
                              ? `http://localhost:3000/${user.image}`
                              : "/api/placeholder/40/40"
                          }
                          alt={`${user.fullName}'s avatar`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium">{user.fullName}</span>
                    </div>
                  </td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.phoneNumber || "N/A"}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                        <Search className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-1">
        <button className="px-3 py-1 rounded bg-yellow-500 text-white">
          1
        </button>
        <button className="px-3 py-1 rounded text-gray-600">2</button>
        <button className="px-3 py-1 rounded text-gray-600">3</button>
        <button className="px-3 py-1 rounded text-gray-600">...</button>
        <button className="px-3 py-1 rounded text-gray-600">10</button>
      </div>
    </div>
  );
};
