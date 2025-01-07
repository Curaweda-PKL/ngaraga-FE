import {useState, useEffect} from "react";

const SidebarComponent = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMarketplaceOpen, setMarketplaceOpen] = useState(false);
  const [isPagesOpen, setPagesOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      if (window.innerWidth >= 640) {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!isSidebarOpen);
    }
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Burger Menu */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          type="button"
          className="fixed top-4 left-4 z-50 p-2 text-white bg-gray-700 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="logo-sidebar"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
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
      )}

      {/* Backdrop */}
      {isMobile && isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-screen transition-transform duration-300 
          ${isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"}
          bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
      >
        <div className="h-full overflow-y-auto bg-white dark:bg-gray-800">
          {/* Logo section */}
          <div className="flex items-center justify-start px-4 py-3 border-gray-200 dark:border-gray-700">
            <img
              src="/src/assets/img/LOGO.png"
              alt="NGARAGA Logo"
              className="h-8 mr-3"
            />
            <span className="text-xl font-semibold dark:text-white">
              NGARAGA
            </span>
          </div>

          {/* Navigation Items */}
          <div className="py-4 px-3">
            <ul className="space-y-2">
              <li>
                <a
                  href="/admin/dashboard"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin/order"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span>Orders</span>
                </a>
              </li>

              {/* Marketplace Dropdown */}
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  onClick={() => setMarketplaceOpen(!isMarketplaceOpen)}
                >
                  <span className="flex-1 text-left">Marketplace</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isMarketplaceOpen ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>
                {isMarketplaceOpen && (
                  <ul className="py-2 space-y-2">
                    <li>
                      <a
                        href="/admin/card"
                        className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Card
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/special"
                        className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Special Card
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/master"
                        className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Master
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/series"
                        className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Series
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/categories"
                        className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Categories
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/tag"
                        className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Tag
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              {/* Pages Dropdown */}
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  onClick={() => setPagesOpen(!isPagesOpen)}
                >
                  <span className="flex-1 text-left">Pages</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isPagesOpen ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>
                {isPagesOpen && (
                  <ul className="py-2 space-y-2">
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Sign In
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Sign Up
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Marketplace
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Rankings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Events
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              {/* Regular Items */}
              <li>
                <a
                  href="/admin/event"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span>Events</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin/coupon"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span>Coupon</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin/creator"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span>Creator</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin/member"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span>Member</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin/subscription"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span>Subscription</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin/shipping"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span>Shipping</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin/payment"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span>Payment</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span>Admin</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SidebarComponent;
