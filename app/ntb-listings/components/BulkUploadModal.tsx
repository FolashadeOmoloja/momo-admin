"use client";
import React, { useState, useRef } from "react";
import {
  X,
  Upload,
  FileText,
  Download,
  CheckCircle,
  AlertCircle,
  FileSpreadsheet,
  Eye,
  Trash2,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import DashboardBtn from "@/app/components/Button";
import ModalContainer from "@/app/components/ModalContainer";

interface NTBRecord {
  title: string;
  rate: string;
  tenor: string;
  minInvestment: string;
  startDate: string;
  maturityDate: string;
  totalUnits: string;
  offerSize: string;
  investorsDeadline: string;
  status?: "Valid" | "Error";
  errors?: string[];
}

export default function BulkUploadNTBModal({
  onClose,
  backdrop = "bg-black/60 backdrop-blur-sm",
}: {
  onClose: () => void;
  backdrop?: string;
}) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [records, setRecords] = useState<NTBRecord[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validRecords, setValidRecords] = useState(0);
  const [errorRecords, setErrorRecords] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample data for template/preview
  const sampleRecords: NTBRecord[] = [
    {
      title: "NGTB05FEB2026",
      rate: "15.5",
      tenor: "360",
      minInvestment: "5000000",
      startDate: "2025-02-05",
      maturityDate: "2026-02-05",
      totalUnits: "1000",
      offerSize: "50000000000",
      investorsDeadline: "2025-01-30",
      status: "Valid",
    },
    {
      title: "NGTB15MAR2026",
      rate: "16.0",
      tenor: "180",
      minInvestment: "10000000",
      startDate: "2025-03-15",
      maturityDate: "2025-09-11",
      totalUnits: "500",
      offerSize: "25000000000",
      investorsDeadline: "2025-03-10",
      status: "Valid",
    },
    {
      title: "INVALID_CODE",
      rate: "abc", // Error: Invalid rate
      tenor: "90",
      minInvestment: "1000000",
      startDate: "2025-04-01",
      maturityDate: "2025-06-30",
      totalUnits: "200",
      offerSize: "5000000000",
      investorsDeadline: "2025-03-25",
      status: "Error",
      errors: ["Invalid rate format", "NTB code format incorrect"],
    },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (
      !allowedTypes.includes(file.type) &&
      !file.name.match(/\.(csv|xlsx|xls)$/i)
    ) {
      alert("Please upload a CSV or Excel file");
      return;
    }

    setUploadedFile(file);
    processFile(file);
  };

  const processFile = (file: File) => {
    setProcessing(true);

    // Simulate file processing
    setTimeout(() => {
      // In real implementation, you'd parse the CSV/Excel here
      const processedRecords = sampleRecords;
      setRecords(processedRecords);

      const valid = processedRecords.filter((r) => r.status === "Valid").length;
      const errors = processedRecords.filter(
        (r) => r.status === "Error"
      ).length;

      setValidRecords(valid);
      setErrorRecords(errors);
      setProcessing(false);
      setShowPreview(true);
    }, 2000);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

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

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setSuccess(true);
    }, 2000);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setRecords([]);
    setShowPreview(false);
    setValidRecords(0);
    setErrorRecords(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ModalContainer
      handleClose={onClose}
      Icon={<Upload className="text-[#004F71]" size={24} />}
      heading={"Bulk Upload NTBs"}
      text="Upload multiple treasury bills via CSV or Excel"
      momo
      backdrop={backdrop}
      scroll
      className="!max-w-2xl"
    >
      <div>
        {!success ? (
          <>
            {!showPreview ? (
              /* Upload Section */
              <div className="space-y-6">
                {/* Template Download */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-semibold text-yellow-800 text-sm mb-1">
                        Download Template First
                      </h4>
                      <p className="text-xs text-yellow-700">
                        Use our template to ensure your data is formatted
                        correctly
                      </p>
                    </div>
                    <DashboardBtn
                      cta="Download Template"
                      variant="outline"
                      onClick={downloadTemplate}
                      icon={<Download size={16} />}
                      className="text-yellow-700 border-yellow-300 hover:bg-yellow-100 text-xs px-3"
                    />
                  </div>
                </div>

                {/* Upload Area */}
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    dragActive
                      ? "border-teal-400 bg-teal-50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileInputChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                      <FileSpreadsheet className="text-teal-600" size={32} />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Drop your file here or click to browse
                      </h3>
                      <p className="text-sm text-gray-500">
                        Supports CSV and Excel files (.csv, .xlsx, .xls)
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Maximum file size: 10MB
                      </p>
                    </div>

                    <DashboardBtn
                      cta="Choose File"
                      variant="outline"
                      icon={<Upload size={16} />}
                      className="!text-sm"
                    />
                  </div>
                </div>

                {/* File Processing */}
                {uploadedFile && (
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="text-green-600" size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">
                            {uploadedFile.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {(uploadedFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>

                      {processing ? (
                        <div className="flex items-center space-x-2 text-yellow-600">
                          <RefreshCw className="animate-spin" size={16} />
                          <span className="text-sm">Processing...</span>
                        </div>
                      ) : (
                        <button
                          onClick={resetUpload}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    {processing && (
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-600 h-2 rounded-full animate-pulse"
                            style={{ width: "60%" }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Validating records and checking for errors...
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Required Fields Info */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 text-sm mb-3">
                    Required Columns
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div>• NTB Code</div>
                    <div>• Annual Rate (%)</div>
                    <div>• Tenor (Days)</div>
                    <div>• Min Investment</div>
                    <div>• Settlement Date</div>
                    <div>• Maturity Date</div>
                    <div>• Total Units</div>
                    <div>• Offer Size</div>
                    <div>• Investors Deadline</div>
                  </div>
                </div>
              </div>
            ) : (
              /* Preview Section */
              <div className="space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-700">
                      {records.length}
                    </div>
                    <div className="text-sm text-yellow-600">Total Records</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-700">
                      {validRecords}
                    </div>
                    <div className="text-sm text-green-600">Valid Records</div>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-red-700">
                      {errorRecords}
                    </div>
                    <div className="text-sm text-red-600">Errors Found</div>
                  </div>
                </div>

                {/* Error Summary */}
                {errorRecords > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="text-red-600" size={16} />
                      <h4 className="font-semibold text-red-800 text-sm">
                        Validation Errors Found
                      </h4>
                    </div>
                    <p className="text-xs text-red-700">
                      {errorRecords} record(s) have errors that need to be fixed
                      before upload. Please review and correct your file, then
                      re-upload.
                    </p>
                  </div>
                )}

                {/* Preview Table */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-800 text-sm">
                      Data Preview
                    </h4>
                    <p className="text-xs text-gray-600">
                      Showing first few records
                    </p>
                  </div>

                  <div className="overflow-x-auto max-h-64">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">
                            Status
                          </th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">
                            NTB Code
                          </th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">
                            Rate
                          </th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">
                            Tenor
                          </th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">
                            Min Investment
                          </th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">
                            Offer Size
                          </th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">
                            Errors
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.slice(0, 10).map((record, index) => (
                          <tr
                            key={index}
                            className={`border-b border-gray-100 ${
                              record.status === "Error"
                                ? "bg-red-50"
                                : "bg-white"
                            }`}
                          >
                            <td className="px-3 py-2">
                              <div className="flex items-center space-x-1">
                                {record.status === "Valid" ? (
                                  <CheckCircle
                                    className="text-green-600"
                                    size={12}
                                  />
                                ) : (
                                  <AlertCircle
                                    className="text-red-600"
                                    size={12}
                                  />
                                )}
                                <span
                                  className={`text-xs font-medium ${
                                    record.status === "Valid"
                                      ? "text-green-700"
                                      : "text-red-700"
                                  }`}
                                >
                                  {record.status}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-2 font-medium">
                              {record.title}
                            </td>
                            <td className="px-3 py-2">{record.rate}%</td>
                            <td className="px-3 py-2">{record.tenor}d</td>
                            <td className="px-3 py-2">
                              ₦{parseInt(record.minInvestment).toLocaleString()}
                            </td>
                            <td className="px-3 py-2">
                              ₦{parseInt(record.offerSize).toLocaleString()}
                            </td>
                            <td className="px-3 py-2">
                              {record.errors && record.errors.length > 0 && (
                                <div className="text-red-600">
                                  {record.errors.slice(0, 2).join(", ")}
                                  {record.errors.length > 2 && "..."}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <DashboardBtn
                    cta={
                      uploading
                        ? "Creating NTBs..."
                        : `Create ${validRecords} NTBs`
                    }
                    loading={uploading}
                    disabled={
                      uploading || errorRecords > 0 || validRecords === 0
                    }
                    onClick={handleUpload}
                    className="flex-1"
                  />
                  <DashboardBtn
                    cta="Upload Different File"
                    variant="outline"
                    onClick={resetUpload}
                    disabled={uploading}
                    className="flex-1"
                  />
                </div>

                {/* Validation Info */}
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    <AlertCircle className="h-3 w-3 text-gray-400 inline-block mr-1" />
                    Only valid records will be created. Fix errors and re-upload
                    to process all records.
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Success State */
          <div className="text-center py-6">
            <div className="mb-6">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-green-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">
                Bulk Upload Successful!
              </h3>
              <p className="text-gray-600">
                {validRecords} treasury bills have been created successfully
              </p>
            </div>

            {/* Success Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">File Processed:</span>
                    <span className="font-semibold">{uploadedFile?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Records:</span>
                    <span className="font-semibold">{records.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Successfully Created:</span>
                    <span className="font-semibold text-green-600">
                      {validRecords}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Upload Time:</span>
                    <span className="font-semibold">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Errors Skipped:</span>
                    <span className="font-semibold text-red-600">
                      {errorRecords}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-semibold text-green-600">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <DashboardBtn
                cta="Upload More NTBs"
                variant="outline"
                onClick={() => {
                  setSuccess(false);
                  resetUpload();
                }}
                icon={<Upload size={16} />}
              />
              <DashboardBtn cta="Go to NTB Management" onClick={onClose} />
            </div>
          </div>
        )}
      </div>
    </ModalContainer>
  );
}
