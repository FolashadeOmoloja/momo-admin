import DashboardBtn from "@/app/components/Button";
import { Download } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { FiPlus, FiUpload } from "react-icons/fi";
import { HiChevronDown } from "react-icons/hi";

const MaturedNTBHeader = () => {
  const [currentDate, setCurrentDate] = useState("");

  const downloadTemplate = () => {
    // In real implementation, generate and download template
    const csvContent = `NTB Code,Annual Rate (%),Tenor (Days),Min Investment,Settlement Date,Maturity Date,Total Units,Offer Size,Investors Deadline
NGTB05FEB2026,15.5,360,5000000,2025-02-05,2026-02-05,1000,50000000000,2025-01-30
NGTB15MAR2026,16.0,180,10000000,2025-03-15,2025-09-11,500,25000000000,2025-03-10`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "NTB_Upload_Template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Update current date dynamically
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = now.toLocaleDateString("en-US", options);
      setCurrentDate(`Date: ${formattedDate}`);
    };

    updateDate();
    // Update every minute to keep it current
    const interval = setInterval(updateDate, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex lg:items-center justify-between w-full py-4 px-0 max-lg:flex-col gap-y-4">
      {/* Left side - Title and Date */}
      <div>
        <h1 className="text-2xl font-bold text-[#004F71]">
          <span className="text-[#FFCC00] text-shadow-2xs">MoMoPSB</span>{" "}
          MaturedNTB Listings
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          View all NTBs that have reached maturity and proceed with
          disbursement.
        </p>
        <p className="text-gray-500 text-sm">{currentDate}</p>
      </div>

      <DashboardBtn
        onClick={downloadTemplate}
        cta="Export CSV"
        className="!w-[150px] !font-bold"
        icon={<Download size={16} className="mr-2" />}
      />
    </div>
  );
};

export default MaturedNTBHeader;
