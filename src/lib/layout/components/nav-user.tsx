import type React from 'react';
import { useState } from 'react';
import { FaBars, FaStore, FaTimes, FaUserFriends } from 'react-icons/fa';

export const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="navbar text-white relative">
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
          <a className="btn btn-ghost text-xl flex lg:ml-3">
            <FaStore size={24} color="#A259FF" />
            Ngaraga
          </a>
        </div>

        {/* Navbar end */}
        <div className="navbar-end flex items-center">
          {/* Menu for larger screens */}
          <ul className="hidden lg:flex menu menu-horizontal px-1 mr-4 gap-4">
            <li>
              <a>Marketplace</a>
            </li>
            <li>
              <a>Rankings</a>
            </li>
          </ul>

          {/* Sign-up button for desktop */}
          <a className="btn bg-call-to-action border-transparent rounded-lg text-white ml-4 items-center gap-2 sm:mr-0 md:mr-0 lg:mr-10 hidden lg:flex">
            <FaUserFriends />
            Sign up
          </a>
        </div>
      </div>

      {/* Sliding Sidebar for Mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-base-100 transform transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center text-xl">
            <FaStore size={24} color="#A259FF" className="mr-2" />
            Ngaraga
          </div>
          <button onClick={toggleSidebar} className="btn btn-ghost">
            <FaTimes size={20} />
          </button>
        </div>

        <ul className="menu p-4 space-y-2">
          <li>
            <a className="flex items-center" onClick={toggleSidebar}>
              Marketplace
            </a>
          </li>
          <li>
            <a className="flex items-center" onClick={toggleSidebar}>
              Rankings
            </a>
          </li>
          <li>
            <a className="flex items-center gap-2" onClick={toggleSidebar}>
              <FaUserFriends />
              Sign up
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
