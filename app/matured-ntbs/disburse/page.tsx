"use client";
import DashboardBtn from "@/app/components/Button";
import DashboardContainer from "@/app/components/DashboardContainer";
import TableFilter from "@/app/components/TableFilter";
import { Download, Filter, Search } from "lucide-react";
import React, { useState, useEffect } from "react";

interface Investor {
  id: number;
  name: string;
  email: string;
  investmentAmount: number;
  returnAmount: number;
  disbursementAmount: number;
  bankName: string;
  accountNumber: string;
  status: "pending" | "disbursed";
}

interface NTBInfo {
  id: string;
  name: string;
  totalAmount: number;
  totalInvestors: number;
}

const DisbursementPage = () => {
  const [investors, setInvestors] = useState<Investor[]>([
    {
      id: 1,
      name: "John Adebayo",
      email: "john.adebayo@email.com",
      investmentAmount: 500000,
      returnAmount: 75000,
      disbursementAmount: 575000,
      bankName: "GTBank",
      accountNumber: "0123456789",
      status: "pending",
    },
    {
      id: 2,
      name: "Sarah Okafor",
      email: "sarah.okafor@email.com",
      investmentAmount: 300000,
      returnAmount: 45000,
      disbursementAmount: 345000,
      bankName: "Access Bank",
      accountNumber: "0987654321",
      status: "disbursed",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      investmentAmount: 750000,
      returnAmount: 112500,
      disbursementAmount: 862500,
      bankName: "First Bank",
      accountNumber: "0456789123",
      status: "pending",
    },
    {
      id: 4,
      name: "Fatima Ibrahim",
      email: "fatima.ibrahim@email.com",
      investmentAmount: 200000,
      returnAmount: 30000,
      disbursementAmount: 230000,
      bankName: "UBA",
      accountNumber: "0789123456",
      status: "disbursed",
    },
    {
      id: 5,
      name: "David Okoro",
      email: "david.okoro@email.com",
      investmentAmount: 400000,
      returnAmount: 60000,
      disbursementAmount: 460000,
      bankName: "Zenith Bank",
      accountNumber: "0321654987",
      status: "pending",
    },
  ]);

  const [selectedInvestors, setSelectedInvestors] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [modalConfig, setModalConfig] = useState<{
    message: string;
    action: () => void;
  } | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const ntbInfo: NTBInfo = {
    id: "NTB-2024-001",
    name: "Q4 Investment Returns",
    totalAmount: 2450000,
    totalInvestors: 12,
  };

  const pendingInvestors = investors.filter((inv) => inv.status === "pending");
  const disbursedInvestors = investors.filter(
    (inv) => inv.status === "disbursed"
  );
  const filteredInvestors = investors.filter(
    (investor) =>
      investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSelectAll = (checked: boolean): void => {
    if (checked) {
      const pendingIds = pendingInvestors.map((inv) => inv.id);
      setSelectedInvestors(pendingIds);
    } else {
      setSelectedInvestors([]);
    }
  };

  const handleSelectInvestor = (investorId: number, checked: boolean): void => {
    if (checked) {
      setSelectedInvestors((prev) => [...prev, investorId]);
    } else {
      setSelectedInvestors((prev) => prev.filter((id) => id !== investorId));
    }
  };

  const showConfirmModal = (message: string, action: () => void): void => {
    setModalConfig({ message, action });
    setShowModal(true);
  };

  const closeModal = (): void => {
    setShowModal(false);
    setModalConfig(null);
  };

  const showSuccessMessage = (): void => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const disburseSingle = (investorId: number): void => {
    showConfirmModal("Mark this investor as disbursed?", () => {
      setInvestors((prev) =>
        prev.map((inv) =>
          inv.id === investorId ? { ...inv, status: "disbursed" as const } : inv
        )
      );
      setSelectedInvestors((prev) => prev.filter((id) => id !== investorId));
      showSuccessMessage();
    });
  };

  const disburseSelected = (): void => {
    if (selectedInvestors.length === 0) {
      alert("Please select at least one investor to disburse.");
      return;
    }

    showConfirmModal(
      `Disburse funds to ${selectedInvestors.length} selected investors?`,
      () => {
        setInvestors((prev) =>
          prev.map((inv) =>
            selectedInvestors.includes(inv.id)
              ? { ...inv, status: "disbursed" as const }
              : inv
          )
        );
        setSelectedInvestors([]);
        showSuccessMessage();
      }
    );
  };

  const autoDisburseAll = (): void => {
    const pendingCount = pendingInvestors.length;
    showConfirmModal(
      `This will disburse funds to ${pendingCount} pending investors. Continue?`,
      () => {
        setInvestors((prev) =>
          prev.map((inv) =>
            inv.status === "pending"
              ? { ...inv, status: "disbursed" as const }
              : inv
          )
        );
        setSelectedInvestors([]);
        showSuccessMessage();
      }
    );
  };

  const exportProof = (): void => {
    const data = {
      ntb: ntbInfo.id,
      exportDate: new Date().toISOString(),
      investors: investors,
    };
    console.log("Exporting audit proof:", data);
    alert("Audit proof exported successfully! Check your downloads folder.");
  };

  const exportSelected = (): void => {
    if (selectedInvestors.length === 0) {
      alert("Please select investors to export.");
      return;
    }
    alert(`Exported data for ${selectedInvestors.length} selected investors.`);
  };

  const statusOptions = ["All", "Disbursed", "Pending"];

  return (
    <DashboardContainer activeItem="matured-ntbs">
      <div className="min-h-screen">
        <div className="flex items-center justify-between w-full py-4 px-6 bg-white rounded-2xl shadow">
          <div>
            <h1 className="text-2xl font-bold text-[#004F71]">
              <span className="text-[#FFCC00] text-shadow-2xs">MoMoPSB</span>{" "}
              Disbursement Management
            </h1>
            <p className="text-sm text-gray-600 font-medium">
              NGTB302012026 - Q4 Investment Returns
            </p>
          </div>
        </div>
        <div className="my-8">
          <div className=" mb-6">
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
            <div className="flex gap-4 flex-wrap">
              <DashboardBtn
                cta="Auto Disburse All Pending"
                variant="yellow"
                onClick={autoDisburseAll}
                className="max-w-[300px] !font-bold !text-base"
              />
              <DashboardBtn
                cta="Disburse Selected"
                onClick={disburseSelected}
                className="max-w-[200px] !font-bold !text-base"
              />
              <DashboardBtn
                cta="Export Audit Proof"
                onClick={exportProof}
                className="max-w-[200px] !font-bold !text-base !bg-transparent"
                variant="outline"
              />
            </div>
          </div>

          {showSuccess && (
            <div className="bg-[#d4edda] text-[#155724] p-4 rounded-lg mb-6">
              Disbursements completed successfully!
            </div>
          )}
        </div>
        <main className="mt-8">
          {/* Controls Section */}

          {/* Disbursement Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-screen">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#005377] text-white">
                  <tr>
                    <th className="p-4 text-left">
                      <input
                        type="checkbox"
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        checked={
                          selectedInvestors.length ===
                            pendingInvestors.length &&
                          pendingInvestors.length > 0
                        }
                        className="w-5 h-5 accent-[#FFCC00]"
                      />
                    </th>
                    <th className="p-4 text-left font-semibold">
                      Investor Name
                    </th>
                    <th className="p-4 text-left font-semibold">
                      Investment Amount
                    </th>
                    <th className="p-4 text-left font-semibold">
                      Return Amount
                    </th>
                    <th className="p-4 text-left font-semibold">
                      Disbursement Amount
                    </th>
                    <th className="p-4 text-left font-semibold">
                      Account Details
                    </th>
                    <th className="p-4 text-left font-semibold">Status</th>
                    <th className="p-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvestors.map((investor) => (
                    <tr
                      key={investor.id}
                      className="border-b border-[#F2F2F2] hover:bg-[#FFCC00]/5 transition-colors"
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedInvestors.includes(investor.id)}
                          onChange={(e) =>
                            handleSelectInvestor(investor.id, e.target.checked)
                          }
                          disabled={investor.status === "disbursed"}
                          className="w-5 h-5 accent-[#FFCC00] disabled:opacity-50"
                        />
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="font-bold text-[#333333]">
                            {investor.name}
                          </div>
                          <div className="text-sm text-[#666666]">
                            {investor.email}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-[#005377]">
                        {formatCurrency(investor.investmentAmount)}
                      </td>
                      <td className="p-4 font-bold text-[#005377]">
                        {formatCurrency(investor.returnAmount)}
                      </td>
                      <td className="p-4 font-bold text-[#005377]">
                        {formatCurrency(investor.disbursementAmount)}
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{investor.bankName}</div>
                          <div className="text-sm text-[#666666]">
                            {investor.accountNumber}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            investor.status === "pending"
                              ? "bg-[#fff3cd] text-[#856404]"
                              : "bg-[#d4edda] text-[#155724]"
                          }`}
                        >
                          {investor.status === "pending"
                            ? "Pending"
                            : "Disbursed"}
                        </span>
                      </td>
                      <td className="p-4">
                        {investor.status === "pending" ? (
                          <button
                            onClick={() => disburseSingle(investor.id)}
                            className="bg-[#28a745] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#218838] transition-colors"
                          >
                            Mark as Disbursed
                          </button>
                        ) : (
                          <span className="text-[#28a745] text-sm font-semibold">
                            Complete
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Bar */}
            <div className="bg-[#005377] text-white p-6 flex justify-between items-center flex-wrap gap-y-4">
              <div className="flex gap-8 flex-wrap gap-y-4">
                <div className="text-center">
                  <div className="text-[#FFCC00] text-2xl font-bold">
                    {formatCurrency(
                      pendingInvestors.reduce(
                        (sum, inv) => sum + inv.disbursementAmount,
                        0
                      )
                    )}
                  </div>
                  <div className="text-sm opacity-90">Pending Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-[#FFCC00] text-2xl font-bold">
                    {formatCurrency(
                      disbursedInvestors.reduce(
                        (sum, inv) => sum + inv.disbursementAmount,
                        0
                      )
                    )}
                  </div>
                  <div className="text-sm opacity-90">Disbursed Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-[#FFCC00] text-2xl font-bold">
                    {(
                      (pendingInvestors.length / investors.length) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                  <div className="text-sm opacity-90">Remaining</div>
                </div>
              </div>
              <button
                onClick={exportSelected}
                className="bg-[#6c757d] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#545b62] transition-colors"
              >
                Export Selected
              </button>
            </div>
          </div>
        </main>

        {/* Confirmation Modal */}
        {showModal && modalConfig && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
              <h3 className="text-[#004F71] text-xl font-bold mb-4">
                Confirm Disbursement
              </h3>
              <p className="text-[#333333] mb-6">{modalConfig.message}</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={closeModal}
                  className="bg-[#005377] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#004F71] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    modalConfig.action();
                    closeModal();
                  }}
                  className="bg-[#FFCC00] text-[#004F71] px-6 py-2 rounded-lg font-semibold hover:bg-[#E6B800] transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardContainer>
  );
};

export default DisbursementPage;
