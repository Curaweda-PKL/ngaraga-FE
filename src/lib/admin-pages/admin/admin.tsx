import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Edit3, Eye, EyeOff, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Modal from "./components/modalSpD"; // Retain Modal for deletion
import { SERVER_URL } from "@/middleware/utils"; // Import your centralized server URL

export const Admin = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  // States for deletion modal (remain unchanged)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"delete">("delete");
  const [modalUser, setModalUser] = useState<any>(null);
  const navigate = useNavigate();

  // Fetch users
  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/accounts/role/ADMIN`
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

  const handleEditUser = (user: any) => {
    navigate(`/admin/edit-profile/${user.id}`);
  };

  // Filter users based on search query before pagination
  const filteredUsers = users.filter((user) =>
    user.fullName?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.phoneNumber && user.phoneNumber.includes(searchQuery))
  );

  const handleSelectUser = (email: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, email]);
    } else {
      setSelectedUsers((prev) => prev.filter((e) => e !== email));
    }
  };

  // Directly toggle suspend/unsuspend without using modal or alert
  const handleToggleSuspend = async (user: any) => {
    setLoading(true);
    try {
      const endpoint = user.isSuspended
        ? `${SERVER_URL}/api/account/unsuspend/${user.id}`
        : `${SERVER_URL}/api/account/suspend/${user.id}`;
      await axios.put(endpoint);
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === user.id ? { ...u, isSuspended: !u.isSuspended } : u
        )
      );
      setSuccessMessage(
        `User ${user.fullName} has been ${
          user.isSuspended ? "unsuspended" : "suspended"
        }.`
      );
      setError("");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setError(`Failed to update suspension status for ${user.fullName}.`);
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Handle single user deletion via modal (remains unchanged)
  const handleDeleteUser = (user: any) => {
    setModalAction("delete");
    setModalUser(user);
    setIsModalOpen(true);
  };

  const handleModalConfirm = async () => {
    if (modalAction === "delete") {
      try {
        await axios.delete(`${SERVER_URL}/api/account/delete/${modalUser.id}`);
        setUsers((prevUsers) =>
          prevUsers.filter((u: any) => u.id !== modalUser.id)
        );
        setSuccessMessage(`Deleted user ${modalUser.fullName}.`);
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (err) {
        console.error(err);
        setError(
          `Failed to delete user ${modalUser.fullName}. Please try again.`
        );
        setTimeout(() => setError(""), 3000);
      }
    }
    setIsModalOpen(false);
  };

  // Handle deletion of all selected users
  const handleDeleteAll = async () => {
    if (selectedUsers.length === 0) {
      setError("No users selected for deletion.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (
      window.confirm(
        "Are you sure you want to delete all selected users? This action cannot be undone."
      )
    ) {
      try {
        const usersToDelete = users.filter((user: any) =>
          selectedUsers.includes(user.email)
        );
        const deletePromises = usersToDelete.map((user: any) =>
          axios.delete(`${SERVER_URL}/api/account/delete/${user.id}`)
        );
        await Promise.all(deletePromises);
        setUsers((prevUsers) =>
          prevUsers.filter((user: any) => !selectedUsers.includes(user.email))
        );
        setSelectedUsers([]);
        setSuccessMessage("Selected users have been deleted.");
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (err) {
        console.error(err);
        setError("Failed to delete selected users. Please try again.");
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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
        <div className="flex items-center gap-4">
          <button
            className="bg-call-to-actions-900 hover:bg-call-to-actions-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={() => navigate("/admin/add-admin")}
          >
            <Plus className="w-4 h-4" />
            <span>Add Admin</span>
          </button>
          {selectedUsers.length > 0 && (
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              onClick={handleDeleteAll}
            >
              Delete All
            </button>
          )}
        </div>
        {/* Search Input */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search and hit enter"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
      {/* Message Display */}
      {loading && (
        <p className="text-center text-gray-500">Loading...</p>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 border border-red-400 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-100 text-green-700 border border-green-400 p-3 rounded-md mb-4">
          {successMessage}
        </div>
      )}
      {/* Table */}
      {!loading && !error && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 text-center w-12">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={
                      selectedUsers.length === filteredUsers.length &&
                      filteredUsers.length > 0
                    }
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
              {paginatedUsers.map((user: any, index: number) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="p-4 text-center w-12">
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
                              ? `${SERVER_URL}/${user.image}`
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
                  <td className="p-4">
                    {user.countryCode ? `${user.countryCode} ` : ""}
                    {user.phoneNumber || "N/A"}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg text-yellow-500"
                        onClick={() => handleToggleSuspend(user)}
                      >
                        {user.isSuspended ? (
                          <EyeOff className="w-4 h-4 text-red-500" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg text-red-500"
                        onClick={() => handleDeleteUser(user)}
                      >
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
        <button
          className="px-3 py-1 rounded text-gray-600"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-call-to-action text-white" : "text-gray-600"
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 rounded text-gray-600"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      {/* Modal Component for deletion */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
        action={modalAction}
        userName={modalUser?.fullName || ""}
      />
    </div>
  );
};
