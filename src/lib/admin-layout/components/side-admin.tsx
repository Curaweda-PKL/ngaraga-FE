// SidebarComponent.jsx or SidebarComponent.tsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { RiCoupon3Fill, RiPencilRuler2Fill } from "react-icons/ri";
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
import { usePermissions } from "@/lib/context/permission-context";

type MenuKey = "marketplace" | "pages";

const SidebarComponent = () => {
  const { permissions } = usePermissions();
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState<Record<MenuKey, boolean>>({
    marketplace: false,
    pages: false,
  });

  const CMS_PERMISSION_MAP = {
    dashboard: "CMS_DASHBOARD",
    orders: "CMS_ORDERS",
    marketplace: "CMS_MARKETPLACE",
    card: "CMS_CARD",
    specialCard: "CMS_SPECIALCARDS",
    master: "CMS_MASTER",
    categories: "CMS_CATEGORIES",
    series: "CMS_SERIES",
    tags: "CMS_TAGS",
    pages: "CMS_PAGES",
    signin: "CMS_SIGNIN",
    signup: "CMS_SIGNUP",
    home: "CMS_HOME",
    marketplacePages: "CMS_MARKETPLACE_PAGES",
    rankings: "CMS_RANKINGS",
    pagesEvent: "CMS_PAGES_EVENTS",
    events: "CMS_EVENTS",
    coupon: "CMS_COUPON",
    creator: "CMS_CREATOR",
    member: "CMS_MEMBER",
    subscribe: "CMS_SUBSCRIBE",
    admin: "CMS_ADMIN",
    shipping: "CMS_SHIPPING",
    payment: "CMS_PAYMENT",
  };

  const hasPermission = (key: string) => permissions.includes(key);

  const toggleMenu = (menu: MenuKey) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  // Utility to check if a route is active
  const isActiveRoute = (path: string) => location.pathname === path;

  // Helper component for navigation items with tooltip added
  const NavItem = ({
    to,
    icon,
    label,
  }: {
    to: string;
    icon: JSX.Element;
    label: string;
  }) => (
    <li>
      <div
        onClick={() => navigate(to)}
        className={`nav-link ${isActiveRoute(to) ? "active" : ""}`}
        title={label} // Tooltip added here
      >
        {icon}
        <span className="text-gray-800">{label}</span>
      </div>
    </li>
  );

  return (
    <div className="relative">
      <aside className="fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-500">
        <div className="h-full flex flex-col overflow-y-auto bg-[#FAFAFA] border-[#EBEBEB] scrollCMSside">
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
              {hasPermission(CMS_PERMISSION_MAP.dashboard) && (
                <NavItem
                  to="/admin/dashboard"
                  icon={<FaHome />}
                  label="Dashboard"
                />
              )}

              {/* Orders */}
              {hasPermission(CMS_PERMISSION_MAP.orders) && (
                <NavItem
                  to="/admin/order"
                  icon={<FaClipboardList />}
                  label="Orders"
                />
              )}

              {/* Marketplace Dropdown */}
              {hasPermission(CMS_PERMISSION_MAP.marketplace) && (
                <li>
                  <button
                    onClick={() => toggleMenu("marketplace")}
                    className="flex items-center justify-between w-full px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Marketplace" // Tooltip added here
                  >
                    <span className="flex items-center gap-3 ">
                      <FaShoppingCart className="FaShoppingCartCMS" />
                      Marketplace
                    </span>
                    {openMenus.marketplace ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                  {openMenus.marketplace && (
                    <ul className="mt-1 ml-4 space-y-1">
                      {[
                        {
                          name: "Card",
                          permission: CMS_PERMISSION_MAP.card,
                          icon: <FaBox />,
                        },
                        {
                          name: "Special Card",
                          permission: CMS_PERMISSION_MAP.specialCard,
                          icon: <FaStar />,
                        },
                        {
                          name: "Master",
                          permission: CMS_PERMISSION_MAP.master,
                          icon: <FaTags />,
                        },
                        {
                          name: "Categories",
                          permission: CMS_PERMISSION_MAP.categories,
                          icon: <FaTags />,
                        },
                        {
                          name: "Series",
                          permission: CMS_PERMISSION_MAP.series,
                          icon: <FaTags />,
                        },
                        {
                          name: "Tag",
                          permission: CMS_PERMISSION_MAP.tags,
                          icon: <FaTags />,
                        },
                      ].map(
                        ({ name, permission, icon }) =>
                          hasPermission(permission) && (
                            <NavItem
                              key={name}
                              to={`/admin/${name.toLowerCase().replace(" ", "-")}`}
                              icon={icon}
                              label={name}
                            />
                          )
                      )}
                    </ul>
                  )}
                </li>
              )}

              {/* Pages Dropdown */}
              {hasPermission(CMS_PERMISSION_MAP.pages) && (
                <li>
                  <button
                    onClick={() => toggleMenu("pages")}
                    className="flex items-center justify-between w-full px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Pages" // Tooltip added here
                  >
                    <span className="flex items-center gap-3 text-gray-800">
                      <FaSignInAlt />
                      Pages
                    </span>
                    {openMenus.pages ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                  {openMenus.pages && (
                    <ul className="mt-1 ml-4 space-y-1">
                      {[
                        {
                          name: "Sign-In",
                          permission: CMS_PERMISSION_MAP.signin,
                          icon: <FaSignInAlt />,
                        },
                        {
                          name: "Sign-Up",
                          permission: CMS_PERMISSION_MAP.signup,
                          icon: <FaSignOutAlt />,
                        },
                        {
                          name: "Home",
                          permission: CMS_PERMISSION_MAP.home,
                          icon: <FaHome />,
                        },
                        {
                          name: "Marketplace",
                          permission: CMS_PERMISSION_MAP.marketplacePages,
                          icon: <FaShoppingCart />,
                        },
                        {
                          name: "Rankings",
                          permission: CMS_PERMISSION_MAP.rankings,
                          icon: <FaStar />,
                        },
                        {
                          name: "Events",
                          permission: CMS_PERMISSION_MAP.pagesEvent,
                          icon: <FaCalendarAlt />,
                        },
                      ].map(
                        ({ name, permission, icon }) =>
                          hasPermission(permission) && (
                            <NavItem
                              key={name}
                              to={`/admin/${name.toLowerCase().replace(" ", "-")}`}
                              icon={icon}
                              label={name}
                            />
                          )
                      )}
                    </ul>
                  )}
                </li>
              )}

              {/* Regular Items */}
              {[
                {
                  name: "Event",
                  permission: CMS_PERMISSION_MAP.events,
                  icon: <FaCalendarAlt />,
                },
                {
                  name: "Coupon",
                  permission: CMS_PERMISSION_MAP.coupon,
                  icon: <RiCoupon3Fill />,
                },
                {
                  name: "Creator",
                  permission: CMS_PERMISSION_MAP.creator,
                  icon: <RiPencilRuler2Fill />,
                },
                {
                  name: "Member",
                  permission: CMS_PERMISSION_MAP.member,
                  icon: <FaUsers />,
                },
                {
                  name: "Subscription",
                  permission: CMS_PERMISSION_MAP.subscribe,
                  icon: <FaBox />,
                },
                {
                  name: "Shipping",
                  permission: CMS_PERMISSION_MAP.shipping,
                  icon: <FaShippingFast />,
                },
                {
                  name: "Payment",
                  permission: CMS_PERMISSION_MAP.payment,
                  icon: <FaMoneyCheckAlt />,
                },
                {
                  name: "Admin",
                  permission: CMS_PERMISSION_MAP.admin,
                  icon: <FaUserShield />,
                },
              ].map(
                ({ name, permission, icon }) =>
                  hasPermission(permission) && (
                    <NavItem
                      key={name}
                      to={`/admin/${name.toLowerCase()}`}
                      icon={icon}
                      label={name}
                    />
                  )
              )}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default SidebarComponent;
