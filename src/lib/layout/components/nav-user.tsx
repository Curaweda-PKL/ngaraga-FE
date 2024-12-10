import {useState} from "react";
import {FaBars, FaTimes, FaUserFriends} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

export const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigateToPage = (page: string) => {
    navigate(`/${page}`);
    toggleSidebar();
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="navbar text-[#262626] relative">
        {/* Navbar start */}
        <div className="navbar-start flex items-center mt-3">
          {/* Hamburger menu for small screens */}
          <div className="dropdown lg:hidden sm:mr-1 md:mr-3">
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
            className="btn btn-ghost text-xl flex lg:ml-3"
            onClick={() => navigate("/")}
          >
            <img
              src="/src/assets/img/LOGO.png"
              alt="Ngaraga Logo"
              className="w-8 h-8 mr-2"
            />
            NGARAGA
          </a>
        </div>

        {/* Navbar end */}
        <div className="navbar-end flex items-center">
          {/* Menu for larger screens */}
          <ul className="hidden lg:flex menu menu-horizontal px-1 mr-4 gap-4">
            <li>
              <a onClick={() => navigateToPage("marketplace")}>Marketplace</a>
            </li>
            <li>
              <a onClick={() => navigateToPage("rankings")}>Rankings</a>
            </li>
          </ul>

          {/* Sign-up button for desktop */}
          <a
            className="btn bg-call-to-action border-transparent rounded-lg text-white ml-4 items-center gap-2 sm:mr-0 md:mr-0 lg:mr-10 hidden lg:flex"
            onClick={() => navigateToPage("register")}
          >
            <FaUserFriends />
            Sign In
          </a>
          <a
            className="btn bg-call-to-action border-transparent rounded-lg text-white items-center gap-2 sm:mr-0 md:mr-0 lg:mr-10 hidden lg:flex"
            onClick={() => navigateToPage("login")}
          >
            <FaUserFriends />
            Sign Up
          </a>
        </div>
      </div>

      {/* Sliding Sidebar for Mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-base-100 transform transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center text-xl">
            <img
              src="/src/assets/img/LOGO.png"
              alt="Ngaraga Logo"
              className="w-8 h-8 mr-2"
            />
            Ngaraga
          </div>
          <button
            onClick={toggleSidebar}
            className="btn btn-ghost"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <ul className="menu p-4 space-y-2">
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
              className="flex items-center gap-2"
              onClick={() => navigateToPage("register")}
            >
              <FaUserFriends />
              Sign In
            </a>
            <a
              className="flex items-center gap-2"
              onClick={() => navigateToPage("register")}
            >
              <FaUserFriends />
              Sign Up
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
