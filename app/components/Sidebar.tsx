import { useState } from "react";
import {
  Home,
  List,
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  Coins,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface SidebarProps {
  activeItem: string;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeItem,
  isCollapsed,
  setIsCollapsed,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: "/",
    },
    {
      id: "ntbs",
      label: "NTB Listings",
      icon: List,
      href: "/ntb-listings",
    },
    {
      id: "matured-ntbs",
      label: "Matured NTBs",
      icon: Coins,
      href: "/matured-ntbs",
    },
    {
      id: "tracker",
      label: "Tracker",
      icon: ArrowLeftRight,
      href: "/tracker",
    },
  ];

  return (
    <aside
      className={`h-screen bg-gradient-to-b from-[#003057] to-[#005377] text-white py-10 px-4 hidden md:block fixed transition-all duration-300 ease-in-out shadow-xl ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className={`transition-opacity duration-300 `}>
          <h2
            className={`${
              isCollapsed
                ? "opacity-0 transition-all duration-300"
                : "opacity-100 text-2xl font-bold text-[#FFCC00] transition-all duration-500"
            } `}
          >
            MoMoPSB <span className="text-white">Admin</span>
          </h2>
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute right-0 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 ml-auto"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              className={`group relative flex items-center px-4 py-3 rounded-xl transition-all duration-200 ease-in-out ${
                isActive
                  ? "bg-[#FFCC00] text-[#003057] shadow-lg"
                  : "hover:bg-white/10 hover:translate-x-1"
              }`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Icon */}
              <div
                className={`flex-shrink-0 transition-transform duration-200 ${
                  isHovered && !isActive ? "scale-110" : ""
                }`}
              >
                <Icon
                  className={`w-6 h-6 ${
                    isActive ? "text-[#003057]" : "text-white"
                  }`}
                />
              </div>

              {/* Label */}
              <span
                className={`ml-4 font-medium ${
                  isCollapsed
                    ? "opacity-0 translate-x-4 transition-all duration-300 "
                    : "opacity-100 translate-x-0 transition-all duration-500 "
                } ${isActive ? "text-[#003057]" : "text-white"}`}
              >
                {item.label}
              </span>

              {/* Tooltip for collapsed state */}
              {isCollapsed && isHovered && (
                <div className="absolute left-16 bg-[#333333] text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-50 transition-all duration-200">
                  {item.label}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-[#333333] rotate-45" />
                </div>
              )}

              {/* Hover effect background */}
              {isHovered && !isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFCC00]/10 to-transparent rounded-xl transition-opacity duration-200" />
              )}
            </a>
          );
        })}
      </nav>

      {/* Bottom section */}
      {!isCollapsed && (
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#FFCC00] rounded-full flex items-center justify-center">
                <span className="text-[#003057] font-bold text-sm">AL</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  Abolade Lawal
                </p>
                <p className="text-xs text-white/70 truncate">
                  aboladelawale@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
