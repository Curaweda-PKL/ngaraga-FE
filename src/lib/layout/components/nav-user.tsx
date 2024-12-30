import { useState } from "react";
import { FaBars, FaTimes, FaUserFriends,  } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";

import { useNavigate } from "react-router-dom";

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
            className="btn btn-ghost text-xl flex items-center text-black"
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
            <CiShoppingCart  size={31} className="lg:mr-3" />
          </a>

          {/* Sign-in and Sign-up buttons */}
          <a
            className="btn bg-white border-call-to-action rounded-lg text-orange-300 hidden lg:flex items-center gap-2 hover:bg-call-to-actions-800 hover:text-white transition"
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
        </div>
      </div>

      {/* Sliding Sidebar for Mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-base-100 transform transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:hidden text-black`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center text-xl text-black">
            <img
              src="/src/assets/img/LOGO.png"
              alt="Ngaraga Logo"
              className="w-4 h-4 mr-2"
            />
            NGARAGA
          </div>
          <button onClick={toggleSidebar} className="btn btn-ghost text-black">
            <FaTimes size={20} />
          </button>
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
