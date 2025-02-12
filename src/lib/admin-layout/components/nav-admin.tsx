import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "@/middleware/utils"; // Use your server URL helper

interface Notification {
  id: string;
  type: "pending" | "success" | "delivered" | "event";
  title: string;
  message: string;
  time: string;
}

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  // Use SERVER_URL for the placeholder image as well
  const [profileImage, setProfileImage] = useState<string>(`${SERVER_URL}/api/placeholder/32/32`);
  const navigate = useNavigate();

  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      type: "pending",
      title: "Pending Payment",
      message:
        "The order with number ORD456789123 under the name of customer Alex, amounting to Rp 200,000, is currently marked as Pending Payment. This order is for the purchase of the Dancing Robot 0512.",
      time: "5h ago",
    },
    {
      id: "2",
      type: "success",
      title: "Payment Success",
      message:
        "The order with number ORD456789123 under the name of customer Alex, amounting to Rp 200,000, has been successfully paid. This order is for the purchase of the Dancing Robot 0512.",
      time: "5h ago",
    },
    {
      id: "3",
      type: "delivered",
      title: "Delivered",
      message:
        "The order with number ORD456789123 under the name of customer Alex, amounting to Rp 200,000, has been successfully delivered. This order was for the purchase of the Dancing Robot 0512.",
      time: "5h ago",
    },
    {
      id: "4",
      type: "event",
      title: "Event",
      message:
        "Registration with the number ID123456789 under the name Andromeda Voyager for the event A Special Evening Celebration has been successfully completed.",
      time: "5h ago",
    },
  ]);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch the admin profile on mount to retrieve the profile image
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/account/admin/profile`, {
          credentials: "include",
        });
        if (response.ok) {
          const result = await response.json();
          // Adjust the property access based on your response structure
          const userData = result.data.data;
          if (userData?.image) {
            // Construct the URL to the image using SERVER_URL
            const imageUrl = `${SERVER_URL}/uploads/profile/${userData.image.split("\\").pop()}`;
            setProfileImage(imageUrl);
          }
        } else {
          console.error("Failed to fetch profile image");
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfileImage();

    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/login/admin");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    const iconClasses = {
      pending: "bg-red-100 text-red-500",
      success: "bg-blue-100 text-blue-500",
      delivered: "bg-green-100 text-green-500",
      event: "bg-yellow-100 text-yellow-500",
    }[type] || "bg-gray-100 text-gray-500";

    return (
      <div className={`p-2 rounded-lg ${iconClasses}`}>
        <div className="w-6 h-6" />
      </div>
    );
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Logo - Only visible on tablet and desktop */}
          <div className="hidden md:flex items-center">
            <img
              src="/src/assets/img/dogpng.png"
              alt="Logo"
              className="h-8 w-8 mr-3"
            />
            <span className="text-xl font-semibold dark:text-white">
              NGARAGA
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Button */}
            <div className="relative" ref={notificationRef}>
              <button
                type="button"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg dark:text-gray-400 dark:hover:text-white"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="w-6 h-6" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
              </button>

              {/* Notification Panel */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Notifications
                    </h3>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="cursor-pointer flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded={isProfileOpen}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={profileImage}
                  alt="User profile"
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                  <div className="py-2">
                    <a
                      href="/admin/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Profile
                    </a>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        handleLogout();
                      }}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
