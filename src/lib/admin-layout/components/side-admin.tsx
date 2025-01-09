import {useState, useEffect} from "react";
import {Menu, X, ChevronDown, ChevronUp} from "lucide-react";

const SidebarComponent = () => {
  const [screenSize, setScreenSize] = useState("desktop");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMarketplaceOpen, setMarketplaceOpen] = useState(false);
  const [isPagesOpen, setPagesOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("mobile");
        setSidebarOpen(false);
      } else if (width < 1024) {
        setScreenSize("tablet");
        setSidebarOpen(true);
      } else {
        setScreenSize("desktop");
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (screenSize === "mobile") {
      setSidebarOpen(false);
    }
  };

  const sidebarWidth = {
    mobile: "w-full max-w-[280px]",
    tablet: "w-72",
    desktop: "w-64",
  }[screenSize];

  return (
    <div className="relative">
      {/* Toggle Button */}
      {screenSize === "mobile" && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Backdrop */}
      {screenSize === "mobile" && isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen
          ${sidebarWidth}
          ${
            screenSize === "mobile" && !isSidebarOpen
              ? "-translate-x-full"
              : "translate-x-0"
          }
          transition-all duration-300 ease-in-out
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        `}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <img
              src="/src/assets/img/LOGO.png"
              alt="Logo"
              className="h-8 w-8"
            />
            <span className="text-xl font-semibold dark:text-white">
              NGARAGA
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {/* Dashboard */}
              <li>
                <a
                  href="/admin/dashboard"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Dashboard
                </a>
              </li>

              {/* Orders */}
              <li>
                <a
                  href="/admin/order"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Orders
                </a>
              </li>

              {/* Marketplace Dropdown */}
              <li>
                <button
                  onClick={() => setMarketplaceOpen(!isMarketplaceOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span>Marketplace</span>
                  {isMarketplaceOpen ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                {isMarketplaceOpen && (
                  <ul className="mt-1 ml-4 space-y-1">
                    {[
                      "Card",
                      "Special",
                      "Master",
                      "Series",
                      "Categories",
                      "Tag",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href={`/admin/${item
                            .toLowerCase()
                            .replace(" ", "-")}`}
                          className="flex items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Pages Dropdown */}
              <li>
                <button
                  onClick={() => setPagesOpen(!isPagesOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span>Pages</span>
                  {isPagesOpen ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                {isPagesOpen && (
                  <ul className="mt-1 ml-4 space-y-1">
                    {[
                      "SignIn",
                      "SignUp",
                      "Home",
                      "Marketplace",
                      "Rankings",
                      "Events",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href={`/admin/${item
                            .toLowerCase()
                            .replace(" ", "-")}`}
                          className="flex items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Regular Items */}
              {[
                "Event",
                "Coupon",
                "Creator",
                "Member",
                "Subscription",
                "Shipping",
                "Payment",
                "Admin",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`/admin/${item.toLowerCase()}`}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default SidebarComponent;
