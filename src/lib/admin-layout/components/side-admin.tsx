import React, {useState} from "react";
import {Sidebar} from "flowbite-react";
// You can import any icons you need here
// import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";

const SidebarComponent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle Sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close the sidebar if the backdrop is clicked
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      {/* Burger Icon for Mobile & Tablet */}
      <button
        onClick={toggleSidebar}
        type="button"
        className="sm:hidden p-2 text-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="logo-sidebar"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {/* Backdrop for mobile & tablet when sidebar is open */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-black opacity-50 sm:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
      >
        <Sidebar.Items>
          {/* Sidebar Logo */}
          <Sidebar.Logo
            href="#"
            img="/favicon.svg"
            imgAlt="logo"
          >
            Flowbite
          </Sidebar.Logo>

          <Sidebar.ItemGroup>
            <Sidebar.Item href="/admin/dashboard">Dashboard</Sidebar.Item>
            <Sidebar.Item href="/admin/order">Orders</Sidebar.Item>
            <Sidebar.Collapse label="Marketplace">
              <Sidebar.Item href="#">Card</Sidebar.Item>
              <Sidebar.Item href="#">Special Card</Sidebar.Item>
              <Sidebar.Item href="#">Categories</Sidebar.Item>
              <Sidebar.Item href="#">Tag</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse label="Pages">
              <Sidebar.Item href="#">Sign In</Sidebar.Item>
              <Sidebar.Item href="#">Sign Up Card</Sidebar.Item>
              <Sidebar.Item href="#">Home</Sidebar.Item>
              <Sidebar.Item href="#">Marketplace</Sidebar.Item>
              <Sidebar.Item href="#">Rankings</Sidebar.Item>
              <Sidebar.Item href="#">Events</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse label="Event">
              <Sidebar.Item href="#">Card</Sidebar.Item>
              <Sidebar.Item href="#">Special Card</Sidebar.Item>
              <Sidebar.Item href="#">Categories</Sidebar.Item>
              <Sidebar.Item href="#">Tag</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item href="#">Discount</Sidebar.Item>
            <Sidebar.Item href="#">Creator</Sidebar.Item>
            <Sidebar.Item href="#">Customer</Sidebar.Item>
            <Sidebar.Item href="#">Admin</Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
