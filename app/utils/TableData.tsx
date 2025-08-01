import { ArrowUpDown } from "lucide-react";
import DashboardBtn from "../components/Button";
import {
  getAvailabilityBar,
  getStatusIcon,
  getStatusBadge,
  formatCurrency,
} from "./Functions";
import { useRouter } from "next/navigation";

type Maturity = {
  ntb: string;
  amount: string;
  date: string;
  status: "Active" | "Pending" | string;
};

interface MaturityCol {
  header: string;
  accessor: "ntb" | "amount" | "date" | "status";
  cell?: (value: any, row: Maturity) => React.ReactNode;
}

export interface Investor {
  id: string;
  name: string;
  amountInvested: number;
  settlementDate: string;
  expectedReturn: number;
  status: "Active" | "Pre-liquidated" | "Matured";
  investmentDate: string;
}

export interface PreLiquidationRequest {
  id: string;
  name: string;
  amount: number;
  requestedOn: string;
  daysInvested: number;
  estimatedReturn: number;
  status: "Pending" | "Approved" | "Rejected";
  ntbCode: string;
  originalInvestment: number;
  penaltyAmount?: number;
  approvedBy?: string;
  approvedOn?: string;
  rejectionReason?: string;
  investmentDate: string;
}

export const maturityColumns: MaturityCol[] = [
  {
    header: "NTB",
    accessor: "ntb",
    cell: (value) => (
      <span className="text-sm font-medium text-gray-900">{value}</span>
    ),
  },
  {
    header: "Amount",
    accessor: "amount",
    cell: (value) => <span className="text-sm text-gray-700">{value}</span>,
  },
  {
    header: "Date",
    accessor: "date",
    cell: (value) => <span className="text-sm text-gray-700">{value}</span>,
  },
  {
    header: "Status",
    accessor: "status",
    cell: (value: string) => (
      <span
        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          value === "Active"
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {value}
      </span>
    ),
  },
];

type LowUptake = {
  ntb: string;
  filled: string; // e.g. "25%"
  current: string;
  rate: string;
};
interface LowUptakeCol {
  header: string;
  accessor: "ntb" | "filled" | "current" | "rate";
  cell?: (value: any, row: LowUptake) => React.ReactNode;
}
export const lowUptakeColumns: LowUptakeCol[] = [
  {
    header: "NTB",
    accessor: "ntb",
    cell: (value) => (
      <span className="text-sm font-medium text-gray-900">{value}</span>
    ),
  },
  {
    header: "Filled",
    accessor: "filled",
    cell: (value, row) => (
      <div className="flex items-center">
        <span className="text-sm text-gray-700 mr-2">{value}</span>
        <div className="w-16 bg-gray-200 rounded-full h-2">
          <div
            className="bg-yellow-500 h-2 rounded-full"
            style={{ width: value }}
          ></div>
        </div>
      </div>
    ),
  },
  {
    header: "Current",
    accessor: "current",
    cell: (value) => <span className="text-sm text-gray-700">{value}</span>,
  },
  {
    header: "Rate",
    accessor: "rate",
    cell: (value) => (
      <span className="text-sm font-medium text-green-600">{value}</span>
    ),
  },
];

export interface NTBRow {
  id: string;
  description: string;
  code: string;
  tenor: string;
  settlement: string;
  maturity: string;
  rate: string;
  risk: string;
  offerSize: string;
  minInvestment: string;
  available: string;
  availablePercent: number;
  status: string;
  deadline: string;
  totalInvestment: string;
  totalInvestors: string;
  PreLiquidations: string;
  preLiqReq: string;
}

interface NTBCol {
  header: string;
  accessor:
    | "tenor"
    | "rate"
    | "description"
    | "totalInvestment"
    | "available"
    | "status"
    | "totalInvestors";
  cell?: (value: any, row: NTBRow, index: number) => React.ReactNode;
}

export const NTBColumn = ({
  onOpenModal,
}: {
  onOpenModal: (row: any) => void;
}): NTBCol[] => [
  {
    header: "Tenor",
    accessor: "tenor",
    cell: (_: any, row: NTBRow) => (
      <div>
        <div className="text-sm font-medium text-gray-900">{row.tenor}</div>
        <div className="text-sm text-gray-500">
          Settlement: {row.settlement}
        </div>
        <div className="text-sm text-gray-500">Maturity: {row.maturity}</div>
        <div className="text-sm text-red-500 ">Deadline: {row.deadline}</div>
        <div className="text-sm text-gray-600 mb-1">{row.available}</div>
      </div>
    ),
  },
  {
    header: "Description",
    accessor: "description",
    cell: (_: any, row: NTBRow) => (
      <div className="space-y-1">
        <div className="text-sm font-semibold text-[#004F71]">{row.id}</div>
        <div className="text-sm text-gray-500">{row.description}</div>
        <div className="text-sm text-gray-400">{row.code}</div>
        <div className="w-24">
          <div className="text-sm text-gray-500 mb-1">
            {row.availablePercent}% available
          </div>
          {getAvailabilityBar(row.availablePercent, row.status)}
        </div>
        <div className="text-sm text-gray-500">Min: ₦{row.minInvestment}</div>
        <div className="text-sm font-semibold text-[#004F71]">
          Rate: {row.rate}
        </div>
      </div>
    ),
  },

  {
    header: "Status",
    accessor: "status",
    cell: (value: string, row: NTBRow) => (
      <div className="flex items-center gap-2">
        {getStatusIcon(row.status)}
        <span className={getStatusBadge(row.status)}>{value}</span>
      </div>
    ),
  },

  {
    header: "Total Investment",
    accessor: "totalInvestment",
    cell: (value: string, row: NTBRow) => (
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-[#004F71]">{value}</span>
        <span className="text-sm font-semibold text-gray-500">
          Investors: {row.totalInvestors}
        </span>
        <span className="text-sm font-semibold text-gray-500">
          Pre-liquidations: {row.PreLiquidations}
        </span>
        <span className="text-sm font-semibold text-yellow-600">
          Pre-liquidations Requests: {row.preLiqReq}
        </span>
      </div>
    ),
  },
  {
    header: "Action",
    accessor: "totalInvestors",
    cell: (_: any, row: NTBRow, index: number) => {
      const router = useRouter();
      return (
        <DashboardBtn
          cta="Investors"
          onClick={() => router.push(`/ntb-listings/${index}`)}
          variant="yellow"
          className="font-semibold"
        />
      );
    },
  },
  {
    header: "Update NTB",
    accessor: "status",
    cell: (_: any, row: NTBRow) => (
      <DashboardBtn
        cta="Update"
        disabled={row.status == "Expired"}
        onClick={() => onOpenModal(row)}
      />
    ),
  },
];
export const MaturedNTBColumn: NTBCol[] = [
  {
    header: "Tenor",
    accessor: "tenor",
    cell: (_: any, row: NTBRow) => (
      <div>
        <div className="text-sm font-medium text-gray-900">{row.tenor}</div>
        <div className="text-sm text-gray-500">
          Settlement: {row.settlement}
        </div>
        <div className="text-sm text-gray-500">Maturity: {row.maturity}</div>
      </div>
    ),
  },
  {
    header: "Description",
    accessor: "description",
    cell: (_: any, row: NTBRow) => (
      <div className="space-y-1">
        <div className="text-sm font-semibold text-[#004F71]">{row.id}</div>
        <div className="text-sm text-gray-500">{row.description}</div>
        <div className="text-sm text-gray-400">{row.code}</div>
        <div className="w-24"></div>
        <div className="text-sm text-gray-500">Min: ₦{row.minInvestment}</div>
        <div className="text-sm font-semibold text-[#004F71]">
          Rate: {row.rate}
        </div>
        <span className="text-teal-700 font-medium text-sm">
          Ready for Disbursement
        </span>
      </div>
    ),
  },

  {
    header: "Total Disbursement",
    accessor: "status",
    cell: (value: string, row: NTBRow) => (
      <div className="font-semibold text-[#004F71]">₦20,000,000</div>
    ),
  },

  {
    header: "Total Investment",
    accessor: "totalInvestment",
    cell: (value: string, row: NTBRow) => (
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-[#004F71]">{value}</span>
        <span className="text-sm font-semibold text-gray-500">
          Investors: {row.totalInvestors}
        </span>
        <span className="text-sm font-semibold text-gray-500">
          Pre-liquidations: {row.PreLiquidations}
        </span>
      </div>
    ),
  },
  {
    header: "Action",
    accessor: "totalInvestors",
    cell: (_: any, row: NTBRow, index: number) => {
      const router = useRouter();
      return (
        <DashboardBtn
          cta="Disburse"
          onClick={() => router.push(`/matured-ntbs/disburse`)}
          className="font-semibold"
        />
      );
    },
  },
];

interface InvestorCol {
  header: any;
  accessor:
    | "name"
    | "amountInvested"
    | "settlementDate"
    | "expectedReturn"
    | "status";
  cell?: (value: any, row: Investor) => React.ReactNode;
}

export function makeInvestorColumns({
  handleSort,
}: {
  handleSort: (value: string) => void;
}): InvestorCol[] {
  return [
    {
      header: (
        <button
          onClick={() => handleSort("name")}
          className="flex items-center space-x-2"
        >
          <span>INVESTOR NAME</span>
          <ArrowUpDown size={14} />
        </button>
      ),
      accessor: "name",
      cell: (_: any, row: Investor) => {
        const initials = row.name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .substring(0, 2);
        return (
          <div className="flex items-center px-6 py-3 ">
            <div className="flex-shrink-0 h-10 w-10">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                style={{ backgroundColor: "#004F71" }}
              >
                {initials}
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {row.name}
              </div>
              <div className="text-sm text-gray-500">
                Invested: {new Date(row.investmentDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      header: (
        <button
          onClick={() => handleSort("amountInvested")}
          className="flex items-center space-x-2"
        >
          <span>AMOUNT INVESTED</span>
          <ArrowUpDown size={14} />
        </button>
      ),
      accessor: "amountInvested",
      cell: (value: number) => (
        <div className="text-sm font-semibold text-gray-900">
          {formatCurrency(value)}
        </div>
      ),
    },
    {
      header: (
        <button
          onClick={() => handleSort("settlementDate")}
          className="flex items-center space-x-2"
        >
          <span>SETTLEMENT DATE</span>
          <ArrowUpDown size={14} />
        </button>
      ),
      accessor: "settlementDate",
      cell: (value: string) => (
        <div className="text-sm text-gray-900">
          {new Date(value).toLocaleDateString()}
        </div>
      ),
    },
    {
      header: (
        <button
          onClick={() => handleSort("expectedReturn")}
          className="flex items-center space-x-2"
        >
          <span>EXPECTED RETURN</span>
          <ArrowUpDown size={14} />
        </button>
      ),
      accessor: "expectedReturn",
      cell: (value: number) => (
        <div className="text-sm font-semibold text-green-600">
          {formatCurrency(value)}
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      cell: (value: string, row: Investor) => (
        <div className="flex items-center gap-2">
          {getStatusIcon(row.status)}
          <span className={getStatusBadge(row.status)}>{value}</span>
        </div>
      ),
    },
  ];
}
interface PreLiqCol {
  header: any;
  accessor:
    | "name"
    | "amount"
    | "requestedOn"
    | "daysInvested"
    | "estimatedReturn"
    | "status";
  cell?: (value: any, row: PreLiquidationRequest) => React.ReactNode;
}
export function makePreLiqColumns({
  handleApprove,
  handleReject,
}: any): PreLiqCol[] {
  return [
    {
      header: "Investors Name",
      accessor: "name",
      cell: (_: any, row: PreLiquidationRequest) => {
        const initials = row.name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .substring(0, 2);
        return (
          <div className="flex items-center px-6 py-3 ">
            <div className="flex-shrink-0 h-10 w-10">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                style={{ backgroundColor: "#004F71" }}
              >
                {initials}
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">{row.name}</p>
              <p className="text-sm text-gray-500">
                Invested On: {new Date(row.investmentDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Requested On: {new Date(row.requestedOn).toLocaleDateString()}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      header: "Amount",
      accessor: "amount",
      cell: (value: number, row: PreLiquidationRequest) => (
        <div className="text-sm font-semibold text-gray-900">
          {formatCurrency(value)}
          {row.penaltyAmount && (
            <div className="text-xs text-red-600">
              Penalty: {formatCurrency(row.penaltyAmount)}
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Estimated Return",
      accessor: "estimatedReturn",
      cell: (value: number, row: PreLiquidationRequest) => (
        <div>
          <p className="text-sm font-semibold text-green-600">
            {formatCurrency(value)}
          </p>
          <p className="text-sm font-medium text-gray-900">
            Days Invested: {row.daysInvested} days
          </p>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      cell: (value: string, row: PreLiquidationRequest) => (
        <div className="flex items-center gap-2">
          {getStatusIcon(row.status)}
          <span className={getStatusBadge(row.status)}>{value}</span>
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: "status",
      cell: (_: any, row) => (
        <div className="flex items-center space-x-2">
          <DashboardBtn
            cta="Approve"
            onClick={() => handleApprove(row.id)}
            disabled={row.status !== "Pending"}
          />
          <DashboardBtn
            cta="Reject"
            onClick={() => handleReject(row.id)}
            disabled={row.status !== "Pending"}
            className="!bg-red-700 hover:bg-red-800 transition-colors disabled:!bg-gray-400 disabled:text-gray-700"
          />
        </div>
      ),
    },
  ];
}
