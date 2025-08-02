import React, { useState } from "react";
import {
  Download,
  FileText,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import DashboardBtn from "@/app/components/Button";
import StatsCard from "@/app/components/StatCards";
import {
  makePreLiqColumns,
  PreLiquidationRequest,
} from "@/app/utils/TableData";
import DynamicTable from "@/app/components/DynamicTable";
import { formatCurrency } from "@/app/utils/Functions";
import { getRequests } from "@/app/utils/dummy-data";

const PreLiquidationRequests = ({ ntbDet }: any) => {
  const [requests, setRequests] = useState<PreLiquidationRequest[]>(
    getRequests(ntbDet)
  );
  const [sortField, setSortField] = useState<string>("requestedOn");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Filter and sort requests
  const filteredRequests = requests;

  // Calculate summary statistics
  const pendingRequests = requests.filter((req) => req.status === "Pending");
  const approvedRequests = requests.filter((req) => req.status === "Approved");
  const totalPendingAmount = pendingRequests.reduce(
    (sum, req) => sum + req.amount,
    0
  );
  const totalApprovedAmount = approvedRequests.reduce(
    (sum, req) => sum + req.amount,
    0
  );
  const totalYieldLoss = approvedRequests.reduce(
    (sum, req) => sum + (req.penaltyAmount || 0),
    0
  );

  const handleApprove = (requestId: string) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "Approved" as const,
              approvedBy: "Current User",
              approvedOn: new Date().toISOString().split("T")[0],
            }
          : req
      )
    );
  };

  const handleReject = (requestId: string, reason?: string) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "Rejected" as const,
              rejectionReason: reason || "Request rejected by treasury team",
            }
          : req
      )
    );
  };

  const exportToCSV = () => {
    const headers = [
      "Investor Name",
      "Amount (NGN)",
      "Requested On",
      "Days Invested",
      "Estimated Return (NGN)",
      "Status",
      "NTB Code",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredRequests.map((req) =>
        [
          `"${req.name}"`,
          req.amount,
          req.requestedOn,
          req.daysInvested,
          req.estimatedReturn,
          req.status,
          req.ntbCode,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pre_liquidation_requests.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="my-16">
      {/* Header */}
      <div className="bg-white rounded-2xl py-4 px-6 shadow">
        <div className="flex md:items-center justify-between max-md:flex-col gap-y-4">
          <div>
            <h1 className="text-2xl font-bold text-[#004F71]">
              Pre-liquidation Requests
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage early exit requests from investors across all NTBs
            </p>
          </div>
          <div className="flex space-x-3 flex-wrap">
            <DashboardBtn
              onClick={exportToCSV}
              cta="Export CSV"
              className="!w-[150px] !font-bold"
              icon={<Download size={16} className="mr-2" />}
              variant="yellow"
            />
            <DashboardBtn
              cta=" Export PDF"
              className="!w-[150px] !font-bold"
              icon={<FileText size={16} className="mr-2" />}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        <StatsCard
          title={"Pending Requests"}
          value={`${pendingRequests.length}`}
          icon={Clock}
          smallText={formatCurrency(totalPendingAmount)}
        />
        <StatsCard
          title={"Approved This Month"}
          value={`${approvedRequests.length}`}
          icon={CheckCircle}
          smallText={formatCurrency(totalApprovedAmount)}
        />
        <StatsCard
          title={"Total Yield Loss"}
          value={formatCurrency(totalYieldLoss)}
          icon={TrendingDown}
          smallText="From approved exits"
        />
      </div>

      <DynamicTable
        columns={makePreLiqColumns({ handleApprove, handleReject })}
        data={filteredRequests}
      />
    </div>
  );
};

export default PreLiquidationRequests;
