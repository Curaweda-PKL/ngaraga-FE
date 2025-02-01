import { useEffect, useState } from "react";
import { FaBars, FaTimes, FaUserFriends } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); 


  // mock
  const isAuthenticated = true;
  const [userAvatarUrl, setUserAvatarUrl] = useState("https://www.gravatar.com/avatar/abc123"); 

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/account/profile",
          { withCredentials: true }
        );
        // Extract image URL if available
        const userImage = response.data.image;
        setUsername(response.data.fullName); // Update username with fetched fullName
        if (userImage) {
          setUserAvatarUrl(userImage); // Set the image URL if it exists
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []);
  
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigateToPage = (page: string) => {
    navigate(`/${page}`);
    toggleSidebar();
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // Add logout logic here
    navigateToPage("login");
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="navbar relative text-black">
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
            <div className="relative flex items-center space-x-2">
              <span className="hidden sm:block text-sm font-medium ml-2">
                {username || "Loading..."}
              </span>
              <button
                className="avatar btn btn-ghost"
                onClick={toggleDropdown}
              >
                <div className="w-8 h-8 rounded-full">
                  <img src={userAvatarUrl ? `http://localhost:3000/${userAvatarUrl}` : "https://www.gravatar.com/avatar/abc123"}
                  alt="User Avatar" />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt w-40 bg-white rounded-lg shadow-lg border z-50"
                  style={{ top: "100%" }} // Optional: Can also use mt-12 for spacing
                >
                  <ul className="py-1">
                    <li>
                      <a
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => navigateToPage("account")}
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sliding Sidebar for Mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-full bg-white transform transition-transform duration-500 ease-in-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:hidden text-black overflow-x-hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <button onClick={toggleSidebar} className="btn btn-ghost text-black">
            <FaTimes size={20} />
          </button>

          {/* Logo */}
          <a href="/" className="flex items-center text-xl text-black ml-4">
            <img
              src="/src/assets/img/LOGO.png"
              alt="Ngaraga Logo"
              className="w-8 h-8 mr-2"
            />
            NGARAGA
          </a>

          <div className="flex items-center space-x-4 ml-auto">
            {!isAuthenticated ? (
              <>
                <a
                  className="btn bg-white border-call-to-action rounded-lg text-orange-300 sm:flex lg:flex items-center gap-2 hover:bg-call-to-actions-800 hover:text-white transition"
                  onClick={() => navigateToPage("login")}
                >
                  Sign In
                </a>
                <a
                  className="btn bg-call-to-action border-transparent rounded-lg text-white hidden lg:flex items-center gap-2 hover:bg-call-to-actions-800 transition"
                  onClick={() => navigateToPage("signup")}
                >
                  <FaUserFriends size={18} />
                  Sign Up
                </a>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <a
                  className="cursor-pointer"
                  onClick={() => navigateToPage("cart")}
                >
                  <CiShoppingCart size={31} />
                </a>
                <button
                  className="avatar btn btn-ghost"
                  onClick={() => navigateToPage("user")}
                >
                  <div className="w-8 h-8 rounded-full">
                    <img src={userAvatarUrl} alt="User Avatar" />
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        <ul className="menu p-4 space-y-4 text-black">
          <li>
            <a
              className="flex items-center"
              onClick={() => navigateToPage("marketplace")}
            >
              Marketplace
            </a>
          </li>
          <li>
            <a
              className="flex items-center"
              onClick={() => navigateToPage("rankings")}
            >
              Rankings
            </a>
          </li>
          <li>
            <a
              className="flex items-center"
              onClick={() => navigateToPage("events")}
            >
              Events
            </a>
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
