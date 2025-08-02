import DashboardBtn from "@/app/components/Button";
import { formatCurrency } from "@/app/utils/Functions";
import { Download, FileText } from "lucide-react";

const InvestorHeader = ({
  exportToCSV,
  ntbData,
}: {
  exportToCSV: () => void;
  ntbData: any;
}) => {
  return (
    <div className="flex md:items-center justify-between w-full py-4 px-6 bg-white rounded-2xl shadow max-md:flex-col gap-y-4">
      {/* Left side - Title and Date */}
      <div>
        <h1 className="text-2xl font-bold text-[#004F71]">
          <span className="text-[#FFCC00] text-shadow-2xs">MoMoPSB</span> NTB
          Investors - {ntbData.code}
        </h1>
        <p className="text-sm text-gray-600 font-medium">
          {ntbData.rate} p.a. • {ntbData.tenor} • Total Offer:{" "}
          {ntbData.offerSize}
        </p>
      </div>

      <div className="flex space-x-3">
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
  );
};

export default InvestorHeader;
