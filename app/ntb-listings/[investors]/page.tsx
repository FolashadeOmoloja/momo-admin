"use client";
import React, { use, useState } from "react";
import {
  Search,
  Filter,
  Users,
  DollarSign,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { formatCurrency } from "@/app/utils/Functions";
import DashboardContainer from "@/app/components/DashboardContainer";
import InvestorHeader from "./components/InvestorsHeader";
import StatsCard from "@/app/components/StatCards";
import TableFilter, { Pagination } from "@/app/components/TableFilter";
import { Investor, makeInvestorColumns, NTBRow } from "@/app/utils/TableData";
import DynamicTable from "@/app/components/DynamicTable";
import { getInvestors } from "@/app/utils/dummy-data";
import PreLiquidationRequests from "./components/Preliquidation";
import { NTBData } from "@/app/utils/dummy-data";

const InvestorsPage = ({
  params,
}: {
  params: Promise<{ investors: string }>;
}) => {
  const { investors: invest } = use(params);
  const investorIndex = parseInt(invest);

  const ntbDet = NTBData[investorIndex];
  console.log(ntbDet);
  const [investors] = useState<Investor[]>(getInvestors(ntbDet));
  const [ntbData] = useState<NTBRow>(ntbDet);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortField, setSortField] = useState<string>("amountInvested");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // Filter and sort investors
  const filteredInvestors = investors
    .filter((investor) => {
      const matchesSearch = investor.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || investor.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortField as keyof Investor];
      const bValue = b[sortField as keyof Investor];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

  // Calculate summary statistics
  const activeInvestors = investors.filter((inv) => inv.status === "Active");
  const totalInvested = activeInvestors.reduce(
    (sum, inv) => sum + inv.amountInvested,
    0
  );
  const totalReturnsProjected = activeInvestors.reduce(
    (sum, inv) => sum + inv.expectedReturn,
    0
  );
  const maturedInvestors = investors.filter((inv) => inv.status === "Matured");
  const totalPaid = maturedInvestors.reduce(
    (sum, inv) => sum + inv.amountInvested + inv.expectedReturn,
    0
  );

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Investor Name",
      "Amount Invested (NGN)",
      "Settlement Date",
      "Expected Return (NGN)",
      "Status",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredInvestors.map((inv) =>
        [
          `"${inv.name}"`,
          inv.amountInvested,
          inv.settlementDate,
          inv.expectedReturn,
          inv.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${ntbData.code}_investors.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const statusOptions = ["All", "Active", "Pre-liquidated", "Matured"];

  return (
    <DashboardContainer activeItem="ntbs">
      <div className="min-h-screen">
        <InvestorHeader ntbData={ntbData} exportToCSV={exportToCSV} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          <StatsCard
            title={"Total Invested"}
            value={formatCurrency(totalInvested)}
            icon={DollarSign}
            smallText="Active investments only"
          />
          <StatsCard
            title={"Total Investors"}
            value={`${investors.length}`}
            icon={Users}
            smallText={`${activeInvestors.length} active`}
          />

          <StatsCard
            title={"Projected Returns"}
            value={formatCurrency(totalReturnsProjected)}
            icon={TrendingUp}
            smallText="For active investments"
          />
          <StatsCard
            title={"Total Paid Out"}
            value={formatCurrency(totalPaid)}
            icon={CheckCircle}
            smallText="Matured Investments"
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-y-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#004F71] h-4 w-4" />
            <input
              type="text"
              placeholder="Search Investors.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="placeholder:text-gray-400 placeholder:text-sm w-full pl-10 pr-4 py-3 bg-white rounded-lg focus:ring-2 focus:ring-[#004F71] focus:border-transparent outline-none shadow"
            />
          </div>

          <TableFilter
            onClick={() => {
              setShowStatusDropdown(!showStatusDropdown);
            }}
            dropDownOnClick={(option) => {
              setStatusFilter(option);
              setShowStatusDropdown(false);
            }}
            showFilterDropdown={showStatusDropdown}
            filter={statusFilter}
            filterOptions={statusOptions}
            filterName="Status"
            Icon={Filter}
          />
        </div>
        <DynamicTable<Investor>
          columns={makeInvestorColumns({ handleSort })}
          data={filteredInvestors}
        />
        <Pagination filteredData={filteredInvestors} />
      </div>

      <PreLiquidationRequests ntbDet={ntbDet} />
    </DashboardContainer>
  );
};

export default InvestorsPage;
