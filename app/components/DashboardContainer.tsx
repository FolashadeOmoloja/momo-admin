import { useState } from "react";
import Sidebar from "./Sidebar";

const DashboardContainer = ({
  activeItem,
  children,
}: {
  activeItem: string;
  children: React.ReactNode;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="flex">
      <Sidebar
        activeItem={activeItem}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div
        className={`flex-1 ml-0 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-72"
        } min-h-screen bg-[#F2F2F2]  p-10 px-7 max-md:px-6 max-sm:px-4 transition-all duration-300`}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardContainer;
