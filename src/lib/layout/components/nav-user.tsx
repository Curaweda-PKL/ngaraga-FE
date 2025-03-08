import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  memo,
  Suspense,
  lazy,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { usePermissions } from "../../context/permission-context";
import { SERVER_URL } from "@/middleware/utils";

// Lazy-load icons from react-icons
const LazyFaBars = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaBars }))
);
const LazyFaTimes = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaTimes }))
);
const LazyFaUserFriends = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaUserFriends }))
);
const LazyFaDiscord = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaDiscord }))
);
const LazyFaYoutube = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaYoutube }))
);
const LazyFaTwitter = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaTwitter }))
);
const LazyFaInstagram = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaInstagram }))
);
const LazyCiShoppingCart = lazy(() =>
  import("react-icons/ci").then((module) => ({ default: module.CiShoppingCart }))
);

// Lazy-load the mobile sidebar (extracted as a separate component)
const Sidebar = lazy(() => import("./sidebar"));

const DEFAULT_AVATAR =
  "https://comickaze.in/wp-content/uploads/woocommerce-placeholder-600x600.png";

export const Navbar: React.FC = memo(() => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userAvatarUrl, setUserAvatarUrl] = useState("");

  // Permissions from context
  const { role, loading } = usePermissions();
  const isAuthenticated = !loading && Boolean(role);

  // Memoize computed avatar URL
  const avatarUrl = useMemo(
    () =>
      userAvatarUrl ? `${SERVER_URL}/${userAvatarUrl}` : DEFAULT_AVATAR,
    [userAvatarUrl]
  );

  // Ref for dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Memoize social links with lazy-loaded icons
  const socialLinks = useMemo(
    () => [
      {
        icon: (
          <Suspense fallback={null}>
            <LazyFaDiscord className="h-5 w-5" />
          </Suspense>
        ),
        href: "#",
      },
      {
        icon: (
          <Suspense fallback={null}>
            <LazyFaYoutube className="h-5 w-5" />
          </Suspense>
        ),
        href: "#",
      },
      {
        icon: (
          <Suspense fallback={null}>
            <LazyFaTwitter className="h-5 w-5" />
          </Suspense>
        ),
        href: "#",
      },
      {
        icon: (
          <Suspense fallback={null}>
            <LazyFaInstagram className="h-5 w-5" />
          </Suspense>
        ),
        href: "#",
      },
    ],
    []
  );

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch user data if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `${SERVER_URL}/api/account/profile`,
            { withCredentials: true }
          );
          setUsername(response.data.fullName || response.data.name);
          const userImage = response.data.image;
          if (userImage) {
            let normalizedPath = userImage.replace(/\\/g, "/").replace(/^src\//, "");
            normalizedPath = normalizedPath.replace(
              "uploadsprofile",
              "uploads/profile"
            );
            setUserAvatarUrl(normalizedPath);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [isAuthenticated]);

  // Memoized event handlers
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const navigateToPage = useCallback(
    (page: string) => {
      navigate(`/${page}`);
      setIsSidebarOpen(false);
    },
    [navigate]
  );

  const handleLogout = useCallback(async () => {
    try {
      await axios.post(`${SERVER_URL}/api/logout`, {}, { withCredentials: true });
      navigateToPage("login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [navigateToPage]);

  return (
    <>
      {/* Main Navbar */}
      <div className="navbar relative text-black">
        <div className="navbar-start flex items-center space-x-4">
          {/* Hamburger menu for small screens */}
          <div className="dropdown lg:hidden sm:mr-2 md:mr-3">
            <div role="button" className="btn btn-ghost" onClick={toggleSidebar}>
              <Suspense fallback={<span>...</span>}>
                <LazyFaBars size={20} />
              </Suspense>
            </div>
          </div>

          {/* Logo button */}
          <Link
            to="/"
            className="btn btn-ghost text-xl flex items-center text-black hover:bg-transparent"
          >
            <img
              src="/src/assets/img/LOGO.png"
              loading="lazy"
              alt="Ngaraga Logo"
              className="w-8 h-8 mr-2 -ml-4 lg:ml-2"
            />
            NGARAGA
          </Link>
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
            <Suspense fallback={<span>Cart</span>}>
              <LazyCiShoppingCart size={31} className="ShoppingCartIcon" />
            </Suspense>
          </a>

          {/* Conditional rendering for authentication */}
          {!isAuthenticated ? (
            <>
              {/* Sign In */}
              <a
                className="btn bg-white border-call-to-action rounded-lg text-orange-300 sm:flex lg:flex items-center gap-2 lg:mr-2 ml-2 hover:bg-call-to-actions-800 hover:text-white transition"
                onClick={() => navigateToPage("login")}
              >
                <Suspense fallback={<span>Icon</span>}>
                  <LazyFaUserFriends size={18} />
                </Suspense>
                Sign In
              </a>
              {/* Sign Up */}
              <a
                className="btn bg-call-to-action border-transparent rounded-lg text-white hidden lg:flex items-center gap-2 hover:bg-call-to-actions-800 transition"
                onClick={() => navigateToPage("signup")}
              >
                <Suspense fallback={<span>Icon</span>}>
                  <LazyFaUserFriends size={18} />
                </Suspense>
                Sign Up
              </a>
            </>
          ) : (
            // Logged in view with dropdown
            <div className="relative flex items-center space-x-2" ref={dropdownRef}>
              <span className="hidden sm:block text-sm font-medium ml-2">
                {username || "Loading..."}
              </span>
              <button className="avatar btn btn-ghost" onClick={toggleDropdown}>
                <div className="w-8 h-8 rounded-full">
                  <img
                    src={avatarUrl}
                    loading="lazy"
                    alt="User Avatar"
                  />
                </div>
              </button>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt w-40 bg-white rounded-lg shadow-lg border z-50"
                  style={{ top: "100%" }}
                >
                  <ul className="py-1">
                    <li>
                      <a
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => navigateToPage("account")}
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sliding Sidebar for Mobile */}
      <Suspense fallback={<div>Loading Sidebar...</div>}>
        {isSidebarOpen && (
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            navigateToPage={navigateToPage}
            isAuthenticated={isAuthenticated}
            avatarUrl={avatarUrl}
          />
        )}
      </Suspense>
      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
});
