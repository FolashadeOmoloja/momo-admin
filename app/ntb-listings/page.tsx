"use client";
import React from "react";
import DashboardContainer from "../components/DashboardContainer";
import DynamicTable from "../components/DynamicTable";
import { useState, useMemo } from "react";
import { Search, Calendar, Filter, List } from "lucide-react";
import { NTBColumn } from "../utils/TableData";
import { NTBData } from "@/app/utils/dummy-data";
import TableFilter, { Pagination } from "../components/TableFilter";
import NTBHeader from "./components/NTBHeader";
import CreateNTBModal from "./components/AddNTBModal";
import UpdateNTBModal from "./components/UpdateNTBModal";
import BulkUploadNTBModal from "./components/BulkUploadModal";

const NTBListingsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tenorFilter, setTenorFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showTenorDropdown, setShowTenorDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openBulkModal, setOpenBulkModal] = useState(false);

  const handleOpenModal = (row: any) => {
    setModalOpen(true);
  };

  const columns = NTBColumn({ onOpenModal: handleOpenModal });

  const filteredData = useMemo(() => {
    return NTBData.filter((item) => {
      if (searchTerm.toLowerCase() === "all") {
        return NTBData;
      }
      const matchesSearch =
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tenor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [NTBData, searchTerm, statusFilter]);

  const tenorOptions = ["All", "91 days", "197 days", "111 days", "360 days"];
  const statusOptions = ["All", "Active", "Upcoming", "Matured", "Expired"];

  return (
    <DashboardContainer activeItem="ntbs">
      <div className="  min-h-screen">
        <NTBHeader
          openAddModal={openAddModal}
          setOpenAddModal={setOpenAddModal}
          openBulkModal={openBulkModal}
          setOpenBulkModal={setOpenBulkModal}
        />
        {/* Search and Filters */}
        <div className="mt-9 mb-6">
          <div className="flex flex-col gap-y-4 lg:flex-row  justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#004F71] h-4 w-4" />
              <input
                type="text"
                placeholder="Search Investments.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="placeholder:text-gray-400 placeholder:text-sm w-full pl-10 pr-4 py-3 bg-white rounded-lg focus:ring-2 focus:ring-[#004F71] focus:border-transparent outline-none shadow"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <TableFilter
                onClick={() => {
                  setShowTenorDropdown(!showTenorDropdown);
                  setShowStatusDropdown(false);
                }}
                dropDownOnClick={(option) => {
                  setTenorFilter(option);
                  setSearchTerm(option);
                  setShowTenorDropdown(false);
                }}
                showFilterDropdown={showTenorDropdown}
                filter={tenorFilter}
                filterOptions={tenorOptions}
                filterName={"Tenor"}
                Icon={Calendar}
              />
              {/* Status Filter */}
              <TableFilter
                onClick={() => {
                  setShowStatusDropdown(!showStatusDropdown);
                  setShowTenorDropdown(false);
                }}
                dropDownOnClick={(option) => {
                  setStatusFilter(option);
                  setSearchTerm(option);
                  setShowStatusDropdown(false);
                }}
                showFilterDropdown={showStatusDropdown}
                filter={statusFilter}
                filterOptions={statusOptions}
                filterName="Status"
                Icon={Filter}
                status
              />
            </div>
          </div>
        </div>

        <DynamicTable columns={columns} data={filteredData} />
        {openAddModal && (
          <CreateNTBModal onClose={() => setOpenAddModal(false)} />
        )}
        {modalOpen && <UpdateNTBModal onClose={() => setModalOpen(false)} />}
        {openBulkModal && (
          <BulkUploadNTBModal onClose={() => setOpenBulkModal(false)} />
        )}

        {/* Pagination */}
        <Pagination filteredData={filteredData} />
      </div>
    </DashboardContainer>
  );
};

export default NTBListingsPage;
