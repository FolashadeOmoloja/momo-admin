import { useState, useRef, useEffect } from "react";
import {
  Bell,
  MessageSquare,
  ChevronDown,
  Settings,
  LogOut,
} from "lucide-react";

const UserHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const handleLogout = () => {
    setShowProfileMenu(false);
    // Add logout logic here
    console.log("Logout user");
  };
  const handleSettings = () => {
    setShowProfileMenu(false);
    // Add settings logic here
    console.log("Navigate to settings");
  };
  // Mock user data
  const user = {
    name: "Abolade Lawal",
    email: "aboladelawale@gmail.com",
    initials: "AL",
  };

  // Mock maturity alerts
  const maturityAlerts = [
    {
      id: 1,
      bondName: "Growth Bond Series A",
      maturityDate: "Jul 18, 2025",
      amount: "₦500,000",
      daysLeft: 15,
    },
    {
      id: 2,
      bondName: "Stability Bond Series C",
      maturityDate: "Aug 25, 2025",
      amount: "₦750,000",
      daysLeft: 53,
    },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        messageRef.current &&
        !messageRef.current.contains(event.target as Node)
      ) {
        setShowMessages(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDaysLeft = (days: number) => {
    if (days <= 7) return `${days} days left`;
    if (days <= 30) return `${days} days left`;
    return `${Math.round(days / 30)} month${
      Math.round(days / 30) > 1 ? "s" : ""
    } left`;
  };

  const getDaysLeftColor = (days: number) => {
    if (days <= 7) return "text-red-600 bg-red-50";
    if (days <= 30) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <div className="">
      <div className="flex items-center justify-end gap-4">
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowMessages(false);
            }}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell className="h-5 w-5" />
            {maturityAlerts.filter((alert) => alert.daysLeft <= 30).length >
              0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {maturityAlerts.filter((alert) => alert.daysLeft <= 30).length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Maturity Alerts</h3>
                <p className="text-sm text-gray-600">
                  Your NTB maturity notifications
                </p>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {maturityAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 border-b border-gray-100 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {alert.bondName}
                      </h4>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getDaysLeftColor(
                          alert.daysLeft
                        )}`}
                      >
                        {formatDaysLeft(alert.daysLeft)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Maturity Date:{" "}
                      <span className="font-medium">{alert.maturityDate}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Amount:{" "}
                      <span className="font-medium text-[#003057]">
                        {alert.amount}
                      </span>
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-gray-200">
                <button className="w-full text-sm text-[#003057] hover:text-[#001a4d] font-medium">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div
          className="relative flex items-center gap-3 pl-4  cursor-pointer"
          onClick={() => {
            setShowProfileMenu(!showProfileMenu);
            setShowNotifications(false);
            setShowMessages(false);
          }}
        >
          {/* User Avatar Circle */}
          <div className="w-10 h-10 bg-[#003057] text-white rounded-full flex items-center justify-center font-semibold">
            {user.initials}
          </div>
          <p className="font-semibold text-lg text-[#004F71]">Admin</p>

          {/* Dropdown Arrow */}
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <ChevronDown className="h-4 w-4" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 top-14 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="py-1">
                <button
                  onClick={handleSettings}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>

                <hr className="border-gray-100" />

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
