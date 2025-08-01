import { AlertTriangle, XCircle, Bell } from "lucide-react";
import { recentNotifications } from "../utils/dummy-data";

const RecentNotifications = () => {
  return (
    <div className="bg-white rounded-xl shadow mt-6 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-[#004F71]">
          Important Updates
        </h3>
        <div className="p-2 bg-[#FFCC00]/90 rounded-lg shadow-sm">
          <Bell className="text-lg text-[#004F71]" />
        </div>
      </div>

      <div className="space-y-4">
        {recentNotifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50"
          >
            <div
              className={`p-1 rounded-full ${
                notification.type === "warning"
                  ? "bg-orange-100"
                  : notification.type === "alert"
                  ? "bg-red-100"
                  : "bg-blue-100"
              }`}
            >
              {notification.type === "warning" ? (
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              ) : notification.type === "alert" ? (
                <XCircle className="h-4 w-4 text-red-600" />
              ) : (
                <Bell className="h-4 w-4 text-blue-600" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNotifications;
