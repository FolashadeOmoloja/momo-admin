"use client";
import React, { useState } from "react";
import {
  Calendar,
  Upload,
  Bell,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  Search,
} from "lucide-react";
import DashboardContainer from "../components/DashboardContainer";

interface Settlement {
  id: string;
  ntbId: string;
  ntbName: string;
  settlementDate: string;
  amount: number;
  status: "pending" | "completed";
  proofUploaded: boolean;
  investorCount: number;
}

interface MaturityItem {
  id: string;
  ntbId: string;
  ntbName: string;
  maturityDate: string;
  principalAmount: number;
  totalAmount: number;
  investorCount: number;
  daysToMaturity: number;
  status: "active" | "matured" | "paid";
  autoRollover: boolean;
}

const SettlementMaturityTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"settlements" | "maturity">(
    "settlements"
  );
  const [settlementFilter, setSettlementFilter] = useState<
    "all" | "pending" | "completed"
  >("all");
  const [maturityFilter, setMaturityFilter] = useState<
    "all" | "upcoming" | "overdue"
  >("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const [settlements] = useState<Settlement[]>([
    {
      id: "SET-001",
      ntbId: "NTB-2024-001",
      ntbName: "Q4 Investment Returns",
      settlementDate: "2025-01-15",
      amount: 2450000,
      status: "pending",
      proofUploaded: false,
      investorCount: 12,
    },
    {
      id: "SET-002",
      ntbId: "NTB-2024-002",
      ntbName: "Tech Sector Growth Fund",
      settlementDate: "2025-01-10",
      amount: 1800000,
      status: "completed",
      proofUploaded: true,
      investorCount: 8,
    },
    {
      id: "SET-003",
      ntbId: "NTB-2024-003",
      ntbName: "Real Estate Investment",
      settlementDate: "2025-01-20",
      amount: 3200000,
      status: "pending",
      proofUploaded: false,
      investorCount: 15,
    },
  ]);

  const [maturityItems] = useState<MaturityItem[]>([
    {
      id: "MAT-001",
      ntbId: "NTB-2023-015",
      ntbName: "Infrastructure Bond Series A",
      maturityDate: "2025-02-15",
      principalAmount: 5000000,
      totalAmount: 5750000,
      investorCount: 25,
      daysToMaturity: 15,
      status: "active",
      autoRollover: true,
    },
    {
      id: "MAT-002",
      ntbId: "NTB-2023-018",
      ntbName: "Agricultural Development Fund",
      maturityDate: "2025-02-28",
      principalAmount: 3500000,
      totalAmount: 4025000,
      investorCount: 18,
      daysToMaturity: 28,
      status: "active",
      autoRollover: false,
    },
    {
      id: "MAT-003",
      ntbId: "NTB-2023-012",
      ntbName: "Energy Sector Investment",
      maturityDate: "2025-01-05",
      principalAmount: 2800000,
      totalAmount: 3220000,
      investorCount: 14,
      daysToMaturity: -27,
      status: "active",
      autoRollover: false,
    },
  ]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const markAsSettled = (settlementId: string): void => {
    alert(`Settlement ${settlementId} marked as completed!`);
  };

  const markAsMatured = (maturityId: string): void => {
    alert(`NTB ${maturityId} marked as fully matured and paid!`);
  };

  const uploadProof = (settlementId: string): void => {
    alert(`Upload settlement proof for ${settlementId}`);
  };

  const sendReminder = (maturityId: string): void => {
    alert(`Reminder sent for NTB ${maturityId}`);
  };

  const filteredSettlements = settlements.filter((settlement) => {
    const matchesFilter =
      settlementFilter === "all" || settlement.status === settlementFilter;
    const matchesSearch =
      settlement.ntbName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      settlement.ntbId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredMaturity = maturityItems.filter((item) => {
    const matchesFilter =
      maturityFilter === "all" ||
      (maturityFilter === "upcoming" && item.daysToMaturity > 0) ||
      (maturityFilter === "overdue" && item.daysToMaturity < 0);
    const matchesSearch =
      item.ntbName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ntbId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sidebarItems = [
    {
      id: "settlements",
      label: "Settlement Tracker",
      icon: TrendingUp,
      active: activeTab === "settlements",
    },
    {
      id: "maturity",
      label: "Maturity Tracker",
      icon: Clock,
      active: activeTab === "maturity",
    },
  ];

  return (
    <DashboardContainer activeItem="tracker">
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#004f71] to-[#005a82] rounded-2xl  px-5 py-4 text-white">
          <div className="flex items-center gap-4">
            <div className="bg-[#ffcc00] p-2 rounded-xl">
              <Calendar className="w-5 h-5 text-[#004f71]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Settlement & Maturity Tracker
              </h1>
              <p className="text-blue-100 text-sm">
                Monitor settlement schedules and track NTB maturities
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-6 mx-6 mt-6">
          {/* Sidebar */}
          <div className="w-76 bg-white rounded-2xl p-3 h-fit">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() =>
                    setActiveTab(item.id as "settlements" | "maturity")
                  }
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all ${
                    item.active
                      ? "bg-[#ffcc00] text-[#004f71] font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "settlements" && (
              <div className="bg-white rounded-2xl overflow-hidden">
                <div className="bg-[#004f71] text-white p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-3">
                      <TrendingUp className="w-5 h-5" />
                      Settlement Tracker
                    </h2>
                  </div>

                  {/* Filters */}
                  <div className="flex gap-4 items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSettlementFilter("all")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          settlementFilter === "all"
                            ? "bg-[#ffcc00] text-[#004f71]"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setSettlementFilter("pending")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          settlementFilter === "pending"
                            ? "bg-[#ffcc00] text-[#004f71]"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => setSettlementFilter("completed")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          settlementFilter === "completed"
                            ? "bg-[#ffcc00] text-[#004f71]"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        Completed
                      </button>
                    </div>
                    <div className="flex-1 max-w-md">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                        <input
                          type="text"
                          placeholder="Search NTBs..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Settlement Cards */}
                <div className="p-6 space-y-4">
                  {filteredSettlements.map((settlement) => (
                    <div
                      key={settlement.id}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#004f71]">
                            {settlement.ntbName}
                          </h3>
                          <p className="text-gray-600">{settlement.ntbId}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-[#004f71]">
                            {formatCurrency(settlement.amount)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {settlement.investorCount} investors
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                          <label className="text-sm text-gray-600">
                            Settlement Date
                          </label>
                          <div className="font-semibold text-sm">
                            {formatDate(settlement.settlementDate)}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">
                            Status
                          </label>
                          <div className="flex items-center gap-2">
                            {settlement.status === "completed" ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-orange-500" />
                            )}
                            <span
                              className={`font-semibold capitalize text-sm ${
                                settlement.status === "completed"
                                  ? "text-green-600"
                                  : "text-orange-600"
                              }`}
                            >
                              {settlement.status}
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">
                            Proof Status
                          </label>
                          <div
                            className={`font-semibold text-sm ${
                              settlement.proofUploaded
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {settlement.proofUploaded
                              ? "Uploaded"
                              : "Not Uploaded"}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {settlement.status === "pending" && (
                          <button
                            onClick={() => markAsSettled(settlement.id)}
                            className="bg-[#ffcc00] text-[#004f71] px-4 py-2 text-sm rounded-lg font-semibold hover:bg-[#e6b800] transition-colors"
                          >
                            Mark Settled
                          </button>
                        )}
                        <button
                          onClick={() => uploadProof(settlement.id)}
                          className="bg-[#004f71] text-white px-4 py-2 rounded-lg  text-sm font-semibold hover:bg-[#003a5a] transition-colors flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          Upload Proof
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "maturity" && (
              <div className="bg-white rounded-2xl overflow-hidden">
                <div className="bg-[#004f71] text-white p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-3">
                      <Clock className="w-6 h-6" />
                      Maturity Tracker
                    </h2>
                  </div>

                  {/* Filters */}
                  <div className="flex gap-4 items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setMaturityFilter("all")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          maturityFilter === "all"
                            ? "bg-[#ffcc00] text-[#004f71]"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setMaturityFilter("upcoming")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          maturityFilter === "upcoming"
                            ? "bg-[#ffcc00] text-[#004f71]"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        Upcoming
                      </button>
                      <button
                        onClick={() => setMaturityFilter("overdue")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          maturityFilter === "overdue"
                            ? "bg-[#ffcc00] text-[#004f71]"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      ></button>
                    </div>
                    <div className="flex-1 max-w-md">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                        <input
                          type="text"
                          placeholder="Search NTBs..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Maturity Cards */}
                <div className="p-6 space-y-4">
                  {filteredMaturity.map((item) => (
                    <div
                      key={item.id}
                      className={`border rounded-xl p-6 hover:shadow-lg transition-shadow ${
                        item.daysToMaturity < 0
                          ? "border-red-200 bg-red-50"
                          : item.daysToMaturity <= 7
                          ? "border-orange-200 bg-orange-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#004f71]">
                            {item.ntbName}
                          </h3>
                          <p className="text-gray-600">{item.ntbId}</p>
                          {item.autoRollover && (
                            <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mt-1">
                              <CheckCircle className="w-3 h-3" />
                              Auto-Rollover Enabled
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-[#004f71]">
                            {formatCurrency(item.totalAmount)}
                          </div>
                          <div className="text-sm text-gray-600">
                            Principal: {formatCurrency(item.principalAmount)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {item.investorCount} investors
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                          <label className="text-sm text-gray-600">
                            Maturity Date
                          </label>
                          <div className="font-semibold text-sm">
                            {formatDate(item.maturityDate)}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">
                            Days to Maturity
                          </label>
                          <div
                            className={`font-bold text-sm ${
                              item.daysToMaturity < 0
                                ? "text-red-600"
                                : item.daysToMaturity <= 7
                                ? "text-orange-600"
                                : "text-green-600"
                            }`}
                          >
                            {item.daysToMaturity < 0
                              ? `${Math.abs(item.daysToMaturity)} days overdue`
                              : item.daysToMaturity === 0
                              ? "Due today"
                              : `${item.daysToMaturity} days`}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">
                            Status
                          </label>
                          <div
                            className={`font-semibold capitalize text-sm ${
                              item.status === "paid"
                                ? "text-green-600"
                                : item.status === "matured"
                                ? "text-blue-600"
                                : "text-gray-600"
                            }`}
                          >
                            {item.status}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => sendReminder(item.id)}
                          className="bg-[#004f71] text-sm text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#003a5a] transition-colors flex items-center gap-2"
                        >
                          <Bell className="w-4 h-4" />
                          Send Reminder
                        </button>
                        {item.status === "active" && (
                          <button
                            onClick={() => markAsMatured(item.id)}
                            className="bg-[#ffcc00] text-sm  text-[#004f71] px-4 py-2 rounded-lg font-semibold hover:bg-[#e6b800] transition-colors"
                          >
                            Mark as Paid
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default SettlementMaturityTracker;
