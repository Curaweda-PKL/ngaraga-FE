import React from "react";
import { FaBars, FaUserFriends, FaStore } from "react-icons/fa";

// zeke here, sal benerin tampilannya ya. si icon hamburger nya sama text ngaragana deketin di mobile dah gitu benerin iconna biar sama di ui
export const Navbar: React.FC = () => {
  return (
    <div className="navbar text-white ">
      {/* Navbar start */}
      <div className="navbar-start flex items-center mt-3">
        {/* Hamburger menu for small screens */}
        <div className="dropdown lg:hidden sm:mr-1 md:mr-3">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <FaBars size={20} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
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

        {/* Sign-up button */}
        <a className="btn bg-call-to-action border-transparent rounded-lg text-white ml-4 flex items-center gap-2 sm:mr-0 md:mr-0 lg:mr-10">
          <FaUserFriends />
          Sign up
        </a>
      </div>
    </div>
  );
};
