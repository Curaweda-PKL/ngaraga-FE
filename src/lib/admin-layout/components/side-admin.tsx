import {useState, useEffect} from "react";
import {Menu, X, ChevronDown, ChevronUp} from "lucide-react";
import {RiCoupon3Fill, RiPencilRuler2Fill} from "react-icons/ri";
import {
  FaHome,
  FaUsers,
  FaStar,
  FaTags,
  FaBox,
  FaShoppingCart,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaUserShield,
  FaSignInAlt,
  FaSignOutAlt,
  FaCalendarAlt,
  FaShippingFast,
} from "react-icons/fa";

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
        className={`fixed top-0 left-0 z-50 h-screen ${sidebarWidth} ${
          screenSize === "mobile" && !isSidebarOpen
            ? "-translate-x-full"
            : "translate-x-0"
        } transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-500`}
      >
        <div className="h-full flex flex-col overflow-y-auto bg-[#FAFAFA] border-[#EBEBEB]">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 dark:border-gray-600">
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
                  <FaHome />
                  Dashboard
                </a>
              </li>

              {/* Orders */}
              <li>
                <a
                  href="/admin/order"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaClipboardList />
                  Orders
                </a>
              </li>

              {/* Marketplace Dropdown */}
              <li>
                <button
                  onClick={() => setMarketplaceOpen(!isMarketplaceOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="flex items-center gap-3">
                    <FaShoppingCart />
                    Marketplace
                  </span>
                  {isMarketplaceOpen ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                {isMarketplaceOpen && (
                  <ul className="mt-1 ml-4 space-y-1">
                    {[
                      {name: "Card", icon: <FaBox />},
                      {name: "Special Card", icon: <FaStar />},
                      {name: "Master", icon: <FaTags />},
                      {name: "Series", icon: <FaTags />},
                      {name: "Categories", icon: <FaTags />},
                      {name: "Tag", icon: <FaTags />},
                    ].map(({name, icon}) => (
                      <li key={name}>
                        <a
                          href={`/admin/${name
                            .toLowerCase()
                            .replace(" ", "-")}`}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {icon}
                          {name}
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
                  <span className="flex items-center gap-3">
                    <FaSignInAlt />
                    Pages
                  </span>
                  {isPagesOpen ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                {isPagesOpen && (
                  <ul className="mt-1 ml-4 space-y-1">
                    {[
                      {name: "SignIn", icon: <FaSignInAlt />},
                      {name: "SignUp", icon: <FaSignOutAlt />},
                      {name: "Home", icon: <FaHome />},
                      {name: "Marketplace", icon: <FaShoppingCart />},
                      {name: "Rankings", icon: <FaStar />},
                      {name: "Events", icon: <FaCalendarAlt />},
                    ].map(({name, icon}) => (
                      <li key={name}>
                        <a
                          href={`/admin/${name
                            .toLowerCase()
                            .replace(" ", "-")}`}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {icon}
                          {name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Regular Items */}
              {[
                {name: "Event", icon: <FaCalendarAlt />},
                {name: "Coupon", icon: <RiCoupon3Fill />},
                {name: "Creator", icon: <RiPencilRuler2Fill />},
                {name: "Member", icon: <FaUsers />},
                {name: "Subscription", icon: <FaBox />},
                {name: "Shipping", icon: <FaShippingFast />},
                {name: "Payment", icon: <FaMoneyCheckAlt />},
                {name: "Admin", icon: <FaUserShield />},
              ].map(({name, icon}) => (
                <li key={name}>
                  <a
                    href={`/admin/${name.toLowerCase()}`}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {icon}
                    {name}
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
