import React, { memo } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaUserFriends } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  navigateToPage: (page: string) => void;
  isAuthenticated: boolean;
  avatarUrl: string;
}

const Sidebar: React.FC<SidebarProps> = memo(
  ({ isSidebarOpen, toggleSidebar, navigateToPage, isAuthenticated, avatarUrl }) => {
    return (
      <div
        className={`fixed inset-y-0 left-0 z-50 w-full bg-white transform transition-transform duration-500 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden text-black overflow-x-hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <button onClick={toggleSidebar} className="btn btn-ghost text-black">
            <FaTimes size={20} />
          </button>
          {/* Logo */}
          <Link to="/" className="flex items-center text-xl text-black ml-4">
            <img
              src="/src/assets/img/LOGO.png"
              loading="lazy"
              alt="Ngaraga Logo"
              className="w-8 h-8 mr-2"
            />
            NGARAGA
          </Link>
          <div className="flex items-center space-x-6 ml-auto">
            {!isAuthenticated ? (
              <>
                <button
                  className="btn bg-white border-call-to-action rounded-lg text-orange-300 sm:flex lg:flex items-center gap-2 hover:bg-call-to-actions-800 hover:text-white transition"
                  onClick={() => navigateToPage("login")}
                >
                  Sign In
                </button>
                <button
                  className="btn bg-call-to-action border-transparent rounded-lg text-white hidden lg:flex items-center gap-2 hover:bg-call-to-actions-800 transition"
                  onClick={() => navigateToPage("signup")}
                >
                  <FaUserFriends size={18} />
                  Sign Up
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  className="cursor-pointer"
                  onClick={() => navigateToPage("cart")}
                >
                  <CiShoppingCart size={31} />
                </button>
                <button
                  className="avatar btn btn-ghost"
                  onClick={() => navigateToPage("user")}
                >
                  <div className="w-8 h-8 rounded-full">
                    <img
                      src={avatarUrl}
                      loading="lazy"
                      alt="User Avatar"
                    />
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
        <ul className="menu p-4 space-y-4 text-black">
          <li>
            <button
              className="flex items-center"
              onClick={() => navigateToPage("marketplace")}
            >
              Marketplace
            </button>
          </li>
          <li>
            <button
              className="flex items-center"
              onClick={() => navigateToPage("rankings")}
            >
              Rankings
            </button>
          </li>
          <li>
            <button
              className="flex items-center"
              onClick={() => navigateToPage("events")}
            >
              Events
            </button>
          </li>
        </ul>
      </div>
    );
  }
);

export default Sidebar;
