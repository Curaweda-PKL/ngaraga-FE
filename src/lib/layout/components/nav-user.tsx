import React, { useEffect, useState } from "react";
import { FaBars, FaTimes, FaUserFriends } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  name: string;
  avatarUrl: string;
}

export const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigateToPage = (page: string) => {
    navigate(`/${page}`);
    toggleSidebar();
  };

  // Fetch the user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/account/profile", {
          credentials: "include", // To include cookies in the request
        });

        if (response.ok) {
          const data: UserProfile = await response.json();
          setUserProfile(data);
        } else {
          console.error("Failed to fetch user profile");
          setUserProfile({ name: "JohnDoe", avatarUrl: "" });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUserProfile({ name: "JohnDoe", avatarUrl: "" });
      }
    };

    fetchUserProfile();
  }, []);

  const isAuthenticated = Boolean(userProfile);

  return (
    <>
      {/* Main Navbar */}
      <div className="navbar relative text-black">
        {/* Navbar start */}
        <div className="navbar-start flex items-center space-x-4">
          {/* Hamburger menu for small screens */}
          <div className="dropdown lg:hidden sm:mr-2 md:mr-3">
            <div
              role="button"
              className="btn btn-ghost"
              onClick={toggleSidebar}
            >
              <FaBars size={20} />
            </div>
          </div>

          {/* Logo button */}
          <a
            href="/"
            className="btn btn-ghost text-xl flex items-center text-black"
          >
            <img
              src="/src/assets/img/LOGO.png"
              alt="Ngaraga Logo"
              className="w-8 h-8 mr-2 -ml-8 lg:ml-0"
            />
            NGARAGA
          </a>
        </div>

        {/* Navbar center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-4 gap-8 text-black">
            <li>
              <a onClick={() => navigateToPage("marketplace")}>Marketplace</a>
            </li>
            <li>
              <a onClick={() => navigateToPage("rankings")}>Rankings</a>
            </li>
            <li>
              <a onClick={() => navigateToPage("events")}>Events</a>
            </li>
          </ul>
        </div>

        {/* Navbar end */}
        <div className="navbar-end flex items-center space-x-4 mr-5">
          {/* Cart Icon */}
          <a
            className="cursor-pointer flex items-center"
            onClick={() => navigateToPage("cart")}
          >
            <CiShoppingCart size={31} className="lg:mr-3 ShoppingCartIcon" />
          </a>

          {/* Conditional rendering for Sign In / Sign Up buttons or Avatar */}
          {!isAuthenticated ? (
            <>
              {/* Sign-in Button */}
              <a
                className="btn bg-white border-call-to-action rounded-lg text-orange-300 sm:flex lg:flex items-center gap-2 lg:mr-2 ml-2 hover:bg-call-to-actions-800 hover:text-white transition"
                onClick={() => navigateToPage("login")}
              >
                Sign In
              </a>

              {/* Sign-up Button */}
              <a
                className="btn bg-call-to-action border-transparent rounded-lg text-white hidden lg:flex items-center gap-2 hover:bg-call-to-actions-800 transition"
                onClick={() => navigateToPage("signup")}
              >
                <FaUserFriends size={18} />
                Sign Up
              </a>
            </>
          ) : (
            // Logged in
            <div className="flex items-center space-x-2">
              <span className="hidden sm:block text-sm font-medium ml-2">
                {userProfile?.name || "JohnDoe"}
              </span>
              <button
                className="avatar btn btn-ghost"
                onClick={() => navigateToPage("user")}
              >
                <div className="w-8 h-8 rounded-full">
                  <img
                    src={userProfile?.avatarUrl || "/default-avatar.png"}
                    alt="User Avatar"
                  />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sliding Sidebar for Mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-full bg-base-100 transform transition-transform duration-500 ease-in-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:hidden text-black overflow-x-hidden`}
      >
        {/* Sidebar content */}
        <ul className="menu p-4 space-y-4 text-black">
          <li>
            <a onClick={() => navigateToPage("marketplace")}>Marketplace</a>
          </li>
          <li>
            <a onClick={() => navigateToPage("rankings")}>Rankings</a>
          </li>
          <li>
            <a onClick={() => navigateToPage("events")}>Events</a>
          </li>
        </ul>
      </div>

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};
