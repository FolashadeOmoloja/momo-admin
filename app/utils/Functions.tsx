import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

export const getStatusIcon = (status: any) => {
  switch (status) {
    case "Active":
    case "Completed":
    case "Approved":
      return <CheckCircle className="h-4 w-4 text-green-700" />;
    case "Expired":
    case "Failed":
    case "Rejected":
      return <XCircle className="h-4 w-4 text-red-600" />;
    case "Matured":
      return <Clock className="h-4 w-4 text-[#004F71]" />;
    case "Upcoming":
    case "Pre-liquidated":
    case "Pending":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

export const getStatusBadge = (status: any) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
  switch (status) {
    case "Active":
    case "Approved":
      return `${baseClasses} bg-green-100 text-green-700`;
    case "Expired":
    case "Rejected":
      return `${baseClasses} bg-red-100 text-red-700`;
    case "Upcoming":
    case "Pre-liquidated":
    case "Pending":
      return `${baseClasses} bg-yellow-100 text-yellow-700`;
    case "Matured":
      return `${baseClasses} bg-teal-100 text-[#004F71]`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-700`;
  }
};

export const getAvailabilityBar = (percent: any, status: any) => {
  if (status === "Expired") {
    return (
      <div className="w-full bg-red-100 rounded-full h-2">
        <div
          className="bg-red-500 h-2 rounded-full"
          style={{ width: "100%" }}
        ></div>
      </div>
    );
  }
  if (status === "Booked") {
    return (
      <div className="w-full bg-blue-100 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: "100%" }}
        ></div>
      </div>
    );
  }
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${
          percent > 50
            ? "bg-green-700"
            : percent > 20
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

export const formatCurrency = (amount: any) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const getWalletStatusBadge = (
  status: "Completed" | "Processing" | "Failed" | "Pending" | string
) => {
  const statusStyles: Record<
    "Completed" | "Processing" | "Failed" | "Pending",
    string
  > = {
    Completed: "bg-green-100 text-green-700",
    Processing: "bg-yellow-100 text-yellow-600",
    Failed: "bg-red-100 text-red-600",
    Pending: "bg-blue-100 text-blue-700",
  };

  return (
    statusStyles[status as keyof typeof statusStyles] ||
    "bg-gray-100 text-gray-600"
  );
};

export const handleAmountChange = (e: any, setAmount: any) => {
  const value = e.target.value.replace(/[^0-9]/g, "");
  setAmount(value);
};

export const handleAccountSelect = (account: any, setSelectedAccount: any) => {
  setSelectedAccount(account);
};

export const handleOtpChange = (
  index: number,
  value: string,
  otp: any,
  setOtp: any
) => {
  if (value.length <= 1) {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  }
};
