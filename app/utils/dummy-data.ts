import { Investor, PreLiquidationRequest } from "./TableData";

export const upcomingMaturities = [
  {
    ntb: "NGTB05AUG2025",
    amount: "₦2,500,000",
    date: "Aug 12, 2025",
    status: "Pending",
  },
  {
    ntb: "NGTB06AUG2025",
    amount: "₦1,800,000",
    date: "Aug 15, 2025",
    status: "Active",
  },
  {
    ntb: "NGTB07AUG2025",
    amount: "₦3,200,000",
    date: "Aug 18, 2025",
    status: "Active",
  },
  {
    ntb: "NGTB08AUG2025",
    amount: "₦900,000",
    date: "Aug 22, 2025",
    status: "Active",
  },
];

export const lowUptakeNTBs = [
  {
    ntb: "NGTB06FEB2026",
    filled: "12%",
    target: "₦10,000,000",
    current: "₦1,200,000",
    rate: "15.5%",
  },
  {
    ntb: "NGTB07FEB2026",
    filled: "34%",
    target: "₦8,000,000",
    current: "₦2,720,000",
    rate: "14.8%",
  },
  {
    ntb: "NGTB08FEB2026",
    filled: "28%",
    target: "₦12,000,000",
    current: "₦3,360,000",
    rate: "16.2%",
  },
  {
    ntb: "NGTB08FEB2026",
    filled: "28%",
    target: "₦12,000,000",
    current: "₦3,360,000",
    rate: "16.2%",
  },
];

export const recentNotifications = [
  {
    id: 1,
    type: "warning",
    message: "NGTB06FEB2026 has low uptake (12% filled)",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "info",
    message: "₦2.5M NTB maturity tomorrow",
    time: "4 hours ago",
  },
  {
    id: 3,
    type: "alert",
    message: "Settlement deadline in 2 days for NGTB05AUG2025",
    time: "1 day ago",
  },
];

export const NTBData = [
  {
    id: "NGTB05FEB2026",
    description: "Federal Government of Nigeria",
    code: "NGTB05022026",
    tenor: "197 days",
    settlement: "27 Jul 2025",
    maturity: "09 Feb 2026",
    rate: "12%",
    risk: "Low",
    offerSize: "₦21.43M",
    minInvestment: "500000",
    available: "5 days left",
    availablePercent: 15,
    status: "Active",
    deadline: "Jul 26, 2025",
    totalInvestment: "₦7,000,000",
    totalInvestors: "10",
    PreLiquidations: "₦100,000",
    preLiqReq: "1",
  },
  {
    id: "NGTB05JUL2026",
    description: "Federal Government of Nigeria",
    code: "NGTB07032026",
    tenor: "360 days",
    settlement: "2 Aug 2025",
    maturity: "27 July 2026",
    rate: "15%",
    risk: "Low",
    offerSize: "₦21.43M",
    minInvestment: "500000",
    available: "10 days left",
    availablePercent: 15,
    status: "Active",
    deadline: "Jul 29, 2025",
    totalInvestment: "₦15,000,000",
    totalInvestors: "10",
    PreLiquidations: "₦500,000",
    preLiqReq: "2",
  },
  {
    id: "NGTB20NOV2025",
    description: "Federal Government of Nigeria",
    code: "NGTB20702025",
    tenor: "125 days",
    settlement: "18 Aug 2025",
    maturity: "20 Nov 2025",
    rate: "15.5%",
    risk: "Low",
    offerSize: "₦100.00M",
    minInvestment: "500000",
    available: "Expired",
    availablePercent: 0,
    status: "Upcoming",
    deadline: "Jul 16, 2025",
    totalInvestment: "₦12,000,000",
    totalInvestors: "10",
    PreLiquidations: "₦0",
    preLiqReq: "0",
  },
  {
    id: "NGTB06NOV2025",
    description: "Federal Government of Nigeria",
    code: "NGTB06201202",
    tenor: "111 days",
    settlement: "18 Aug 2025",
    maturity: "06 Nov 2025",
    rate: "15.5%",
    risk: "Low",
    offerSize: "₦100.00M",
    minInvestment: "500000",
    available: "Expired",
    availablePercent: 0,
    status: "Expired",
    deadline: "Jul 16, 2025",
    totalInvestment: "₦20,000,000",
    totalInvestors: "10",
    PreLiquidations: "₦0",
    preLiqReq: "0",
  },
  {
    id: "NGTB15DEC2025",
    description: "Federal Government of Nigeria",
    code: "NGTB152012025",
    tenor: "91 days",
    settlement: "15 Aug 2025",
    maturity: "15 Dec 2025",
    rate: "16.3%",
    risk: "Low",
    offerSize: "₦50.00M",
    minInvestment: "100000",
    available: "12 days left",
    availablePercent: 65,
    status: "Active",
    deadline: "Aug 9, 2025",
    totalInvestment: "₦8,000,000",
    totalInvestors: "10",
    PreLiquidations: "₦0",
    preLiqReq: "0",
  },
  {
    id: "NGTB30JAN2026",
    description: "Federal Government of Nigeria",
    code: "NGTB302012026",
    tenor: "182 days",
    settlement: "31 Jul 2025",
    maturity: "26 Jan 2026",
    rate: "12.1%",
    risk: "Low",
    offerSize: "₦75.00M",
    minInvestment: "100000",
    available: "Matured",
    availablePercent: 100,
    status: "Matured",
    deadline: "Jul 25, 2025",
    totalInvestment: "₦23,000,000",
    totalInvestors: "10",
    PreLiquidations: "₦300,000",
    preLiqReq: "1",
  },
];

export const getInvestors = (ntbDet: any) => {
  const expectedReturn = (p: number) => {
    const rate = parseFloat(ntbDet.rate) / 100;
    const tenor = parseInt(ntbDet.tenor) / 365;
    return Math.round(p * rate * tenor);
  };

  const Investors: Investor[] = [
    {
      id: "1",
      name: "Kola Anifowose",
      amountInvested: 500000,
      settlementDate: "2025-02-05",
      expectedReturn: expectedReturn(500000),
      status: "Active",
      investmentDate: "2025-01-15",
    },
    {
      id: "2",
      name: "Fatima Yusuf",
      amountInvested: 350000,
      settlementDate: "2025-02-05",
      expectedReturn: expectedReturn(350000),
      status: "Active",
      investmentDate: "2025-01-18",
    },
    {
      id: "3",
      name: "Tunde Adebayo",
      amountInvested: 200000,
      settlementDate: "2025-02-05",
      expectedReturn: expectedReturn(200000),
      status: "Pre-liquidated",
      investmentDate: "2025-01-20",
    },
    {
      id: "4",
      name: "Chinedu Obi",
      amountInvested: 1500000,
      settlementDate: "2025-02-05",
      expectedReturn: expectedReturn(1500000),
      status: "Active",
      investmentDate: "2025-01-22",
    },
    {
      id: "5",
      name: "Ifeoluwa Ajayi",
      amountInvested: 1000000,
      settlementDate: "2024-08-05",
      expectedReturn: expectedReturn(1000000),
      status: "Active",
      investmentDate: "2024-07-15",
    },
    {
      id: "6",
      name: "Grace Umeh",
      amountInvested: 250000,
      settlementDate: "2025-02-05",
      expectedReturn: expectedReturn(250000),
      status: "Active",
      investmentDate: "2025-01-25",
    },
  ];

  return Investors;
};

export const getRequests = (ntbDet: any) => {
  const expectedReturn = (p: number, t: number) => {
    const rate = parseFloat(ntbDet.rate) / 100;
    return Math.round(p * rate * (t / 365));
  };

  const originalReturn = (p: number) => {
    const rate = parseFloat(ntbDet.rate) / 100;
    const tenor = parseInt(ntbDet.tenor) / 365;
    return Math.round(p * rate * tenor);
  };
  const requests: PreLiquidationRequest[] = [
    {
      id: "1",
      name: "Kola Anifowose",
      amount: 500000,
      requestedOn: "2025-08-28",
      daysInvested: 120,
      estimatedReturn: expectedReturn(500000, 120),
      status: "Pending",
      ntbCode: "NGTB05FEB2026",
      originalInvestment: 500000,
      penaltyAmount: originalReturn(500000) - expectedReturn(500000, 120),
      investmentDate: "25-01-20",
    },
    {
      id: "2",
      name: "Tunde Adebayo",
      amount: 200000,
      requestedOn: "2025-08-25",
      daysInvested: 95,
      estimatedReturn: expectedReturn(200000, 95),
      status: "Approved",
      ntbCode: "NGTB05FEB2026",
      originalInvestment: 200000,
      penaltyAmount: originalReturn(200000) - expectedReturn(200000, 95),
      investmentDate: "2025-01-20",
    },
    {
      id: "3",
      name: "Grace Umeh",
      amount: 250000,
      requestedOn: "2025-08-20",
      daysInvested: 85,
      estimatedReturn: expectedReturn(250000, 85),
      status: "Rejected",
      ntbCode: "NGTB05FEB2026",
      originalInvestment: 250000,
      rejectionReason: "Insufficient liquidity for early exit",
      penaltyAmount: originalReturn(250000) - expectedReturn(250000, 85),
      investmentDate: "2025-01-25",
    },
  ];

  return requests;
};
