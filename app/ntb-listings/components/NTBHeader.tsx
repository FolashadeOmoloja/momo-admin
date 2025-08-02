import React, { useState, useEffect, useRef } from "react";
import { FiPlus, FiUpload } from "react-icons/fi";
import { HiChevronDown } from "react-icons/hi";

const NTBHeader = ({
  openAddModal,
  setOpenAddModal,
  openBulkModal,
  setOpenBulkModal,
}: any) => {
  const [currentDate, setCurrentDate] = useState("");

  const [isOpen, setIsOpen] = useState(false);

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
    <div className="flex md:items-center justify-between w-full py-4 px-0 max-md:flex-col gap-y-4">
      {/* Left side - Title and Date */}
      <div>
        <h1 className="text-2xl font-bold text-[#004F71]">
          <span className="text-[#FFCC00] text-shadow-2xs">MoMoPSB</span> NTB
          Listings
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          View, Add and Manage all NTB listings
        </p>
        <p className="text-gray-500 text-sm">{currentDate}</p>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-[#004F71] hover:bg-[#003B54] max-w-[166px] text-white px-4 py-2 rounded-lg font-semibolds  flex items-center gap-2 shadow-sm"
        >
          Add New NTBs <HiChevronDown className="w-4 h-4" />
        </button>

        {isOpen && (
          <div className="absolute md:right-0 top-10 z-10 mt-2 w-60 bg-white rounded-lg shadow-lg border border-gray-200">
            <button
              onClick={() => {
                setIsOpen(false);
                setOpenAddModal(true);
                // Trigger create NTB modal logic
              }}
              className="dropdownBtn"
            >
              <div className="p-1 bg-[#FFCC00]/90 rounded-sm shadow-sm">
                <FiPlus className="text-sm text-[#004F71]" />
              </div>
              Create New NTB
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setOpenBulkModal(true);
                // Trigger bulk upload logic
              }}
              className="dropdownBtn"
            >
              <div className="p-1 bg-[#FFCC00]/90 rounded-sm shadow-sm">
                <FiUpload className="text-sm text-[#004F71]" />
              </div>
              Bulk Upload (CSV/Excel)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NTBHeader;
