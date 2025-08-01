"use client";
import React, { useState } from "react";
import DashboardContainer from "./components/DashboardContainer";
import {
  AlertTriangle,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  LineChart,
  ListCheckIcon,
  PieChart,
  Upload,
  X,
  XCircle,
} from "lucide-react";
import StatsCard from "./components/StatCards";
import UserHeader from "./components/UserHeader";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Pie,
  Cell,
} from "recharts";
import InvestmentGraph from "./components/InvestmentGraph";
import NTBStatusDistribution from "./components/NTBStatusDistribution";
import DynamicTable from "./components/DynamicTable";
import { lowUptakeColumns, maturityColumns } from "./utils/TableData";
import { lowUptakeNTBs, upcomingMaturities } from "./utils/dummy-data";
import RecentNotifications from "./components/RecentNotifications";

export default function Dashboard() {
  const [closeAlert, setCloseAlert] = useState(false);
  const statsData = [
    {
      title: "Total NTBs Uploaded",
      value: "47",
      icon: Upload,
      change: null,
      changeType: null,
    },
    {
      title: "Total Investment Volume",
      value: "₦125,000,000",
      icon: DollarSign,
      change: "+8.5%",
      changeType: "positive",
    },
    {
      title: "Active NTBs",
      value: "32",
      icon: ListCheckIcon,
      change: null,
      changeType: null,
    },
  ];
  return (
    <DashboardContainer activeItem="dashboard">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-semibold text-[#004F71]">
          Welcome, Admin
        </h1>
        <UserHeader />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            changeType={stat.changeType}
          />
        ))}
      </div>
      {!closeAlert && <Alert handleClose={() => setCloseAlert(true)} />}
      <div className="flex my-6 gap-6">
        <InvestmentGraph />
        <NTBStatusDistribution />
      </div>
      <div className="flex gap-5">
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#004F71]">
              Upcoming Maturities
            </h3>
            <div className="p-2 bg-[#FFCC00]/90 rounded-lg shadow-sm">
              <Calendar className="text-lg text-[#004F71]" />
            </div>
          </div>
          <DynamicTable columns={maturityColumns} data={upcomingMaturities} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#004F71]">
              Low Uptake NTBs
            </h3>
            <div className="p-2 bg-[#FFCC00]/90 rounded-lg shadow-sm">
              <AlertTriangle className="text-lg text-[#004F71]" />
            </div>
          </div>
          <DynamicTable columns={lowUptakeColumns} data={lowUptakeNTBs} />
        </div>
      </div>
      <RecentNotifications />
    </DashboardContainer>
  );
}

const Alert = ({ handleClose }: { handleClose: () => void }) => (
  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-l relative">
    <div className="flex items-center">
      <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3" />
      <div>
        <h3 className="text-yellow-800 font-medium">Attention Required</h3>
        <p className="text-yellow-700 text-sm mt-1">
          3 NTBs have low uptake rates. Settlement deadline for NGTB05AUG2025 in
          2 days.
        </p>
      </div>
    </div>
    <button
      className="absolute top-4 right-4 text-yellow-500/80 transition-colors p-1 rounded-full bg-yellow-300/20"
      onClick={handleClose}
    >
      <X size={20} />
    </button>
  </div>
);
