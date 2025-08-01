"use client";
import React, { useState } from "react";
import {
  X,
  Plus,
  DollarSign,
  Shield,
  CheckCircle,
  Calendar,
  Percent,
  Users,
  Clock,
  AlertCircle,
} from "lucide-react";
import DashboardBtn from "@/app/components/Button";
import ModalContainer from "@/app/components/ModalContainer";
import { formatCurrency } from "@/app/utils/Functions";

export default function CreateNTBModal({
  onClose,
  backdrop = "bg-black/60 backdrop-blur-sm",
}: {
  onClose: () => void;
  backdrop?: string;
}) {
  const [formData, setFormData] = useState({
    title: "",
    rate: "",
    tenor: "",
    minInvestment: "",
    startDate: "",
    maturityDate: "",
    totalUnits: "",
    offerSize: "",
    investorsDeadline: "",
  });
  const [autoGenerateStatus, setAutoGenerateStatus] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
      setSuccess(true);
    }, 1500);
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const calculateMaturityDate = (startDate: string, tenor: string) => {
    if (!startDate || !tenor) return "";
    const start = new Date(startDate);
    const maturity = new Date(start);
    maturity.setDate(start.getDate() + parseInt(tenor));
    return maturity.toISOString().split("T")[0];
  };

  const handleStartDateChange = (value: string) => {
    handleInputChange("startDate", value);
    if (formData.tenor) {
      const maturityDate = calculateMaturityDate(value, formData.tenor);
      handleInputChange("maturityDate", maturityDate);
    }
  };

  const handleTenorChange = (value: string) => {
    handleInputChange("tenor", value);
    if (formData.startDate) {
      const maturityDate = calculateMaturityDate(formData.startDate, value);
      handleInputChange("maturityDate", maturityDate);
    }
  };

  return (
    <ModalContainer
      handleClose={onClose}
      Icon={<Plus className="text-[#004F71]" size={24} />}
      heading={"Add New NTB"}
      text="Create a new treasury bill offering"
      momo
      backdrop={backdrop}
      scroll
      className="!max-w-3xl"
    >
      <div>
        {!success ? (
          <>
            {/* Form */}
            <div className="space-y-4">
              {/* Title/NTB Code */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-[#004F71]">
                  <span>NTB Code</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="form-input text-sm"
                  placeholder="e.g. NGTB05FEB2026"
                />
              </div>

              {/* Rate and Tenor Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-[#004F71]">
                    <Percent size={16} />
                    <span>Annual Rate (%)</span>
                  </label>
                  <input
                    type="number"
                    value={formData.rate}
                    onChange={(e) => handleInputChange("rate", e.target.value)}
                    className="form-input text-sm"
                    placeholder="15"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-[#004F71]">
                    <Clock size={16} />
                    <span>Tenor (Days)</span>
                  </label>
                  <input
                    type="number"
                    value={formData.tenor}
                    onChange={(e) => handleTenorChange(e.target.value)}
                    className="form-input text-sm"
                    placeholder="360"
                  />
                </div>
              </div>

              {/* Minimum Investment */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-[#004F71]">
                  <DollarSign size={16} />
                  <span>Minimum Investment</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    ₦
                  </span>
                  <input
                    type="number"
                    value={formData.minInvestment}
                    onChange={(e) =>
                      handleInputChange("minInvestment", e.target.value)
                    }
                    className="form-input !pl-8 text-sm"
                    placeholder="5000000"
                  />
                </div>
              </div>

              {/* Date Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-[#004F71]">
                    <Calendar size={16} />
                    <span>Settlement Date</span>
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    className="form-input text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-[#004F71]">
                    <Calendar size={16} />
                    <span>Maturity Date</span>
                  </label>
                  <input
                    type="date"
                    value={formData.maturityDate}
                    onChange={(e) =>
                      handleInputChange("maturityDate", e.target.value)
                    }
                    className="form-input text-sm"
                    readOnly
                  />
                </div>
              </div>

              {/* Offer Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-[#004F71]">
                    <Users size={16} />
                    <span>Total Units</span>
                  </label>
                  <input
                    type="number"
                    value={formData.totalUnits}
                    onChange={(e) =>
                      handleInputChange("totalUnits", e.target.value)
                    }
                    className="form-input text-sm"
                    placeholder="1000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-[#004F71]">
                    <DollarSign size={16} />
                    <span>Offer Size</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      ₦
                    </span>
                    <input
                      type="number"
                      value={formData.offerSize}
                      onChange={(e) =>
                        handleInputChange("offerSize", e.target.value)
                      }
                      className="form-input !pl-8 text-sm"
                      placeholder="50000000000"
                    />
                  </div>
                </div>
              </div>

              {/* Investors Deadline */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-[#004F71]">
                  <Calendar size={16} />
                  <span>Investors Deadline</span>
                </label>
                <input
                  type="date"
                  value={formData.investorsDeadline}
                  onChange={(e) =>
                    handleInputChange("investorsDeadline", e.target.value)
                  }
                  className="form-input text-sm"
                />
              </div>

              {/* Auto Generate Status Toggle */}
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-[#004F71] text-sm">
                      Auto-Generate Status
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Automatically set status based on dates
                      (Active/Upcoming/Expired)
                    </p>
                  </div>
                  <button
                    onClick={() => setAutoGenerateStatus(!autoGenerateStatus)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoGenerateStatus ? "bg-teal-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        autoGenerateStatus ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Preview Summary */}
              {formData.title && formData.rate && formData.tenor && (
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-xl p-4">
                  <h4 className="font-semibold text-[#004F71] text-sm mb-2">
                    Preview Summary
                  </h4>
                  <div className="text-xs text-teal-700 space-y-1">
                    <p>
                      <strong>Code:</strong> {formData.title}
                    </p>
                    <p>
                      <strong>Returns:</strong> {formData.rate}% p.a. over{" "}
                      {formData.tenor} days
                    </p>
                    {formData.minInvestment && (
                      <p>
                        <strong>Min Investment:</strong>{" "}
                        {formatCurrency(parseInt(formData.minInvestment))}
                      </p>
                    )}
                    {formData.offerSize && (
                      <p>
                        <strong>Total Offer:</strong>{" "}
                        {formatCurrency(parseInt(formData.offerSize))}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Status Notice */}
              <p className="text-xs text-gray-500">
                <AlertCircle className="h-4 w-4 text-gray-600 inline-block mr-1" />
                Status will be{" "}
                {autoGenerateStatus
                  ? "automatically determined"
                  : "set manually"}{" "}
                based on settlement and deadline dates
              </p>

              {/* Create Button */}
              <DashboardBtn
                cta={confirming ? "Creating NTB..." : "Create NTB"}
                loading={confirming}
                disabled={confirming || !isFormValid()}
                onClick={handleConfirm}
                className="mb-2"
              />

              {/* Security Notice */}
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <Shield size={14} className="text-[#004F71]" />
                <span>Secured by MoMoPSB's treasury system</span>
              </div>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-4">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-teal-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-teal-700 mb-2">
                NTB Created Successfully!
              </h3>
              <p className="text-gray-600">
                Your new treasury bill offering has been created
              </p>
            </div>

            {/* Creation Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left text-sm">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">NTB Code:</span>
                  <span className="font-semibold">{formData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Rate:</span>
                  <span className="font-semibold">{formData.rate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tenor:</span>
                  <span className="font-semibold">{formData.tenor} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Min Investment:</span>
                  <span className="font-semibold">
                    {formatCurrency(parseInt(formData.minInvestment))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Offer Size:</span>
                  <span className="font-semibold">
                    {formatCurrency(parseInt(formData.offerSize))}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-bold text-base text-teal-700">
                    {autoGenerateStatus ? "Auto-Generated" : "Manual"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <DashboardBtn
                cta="Create Another NTB"
                variant="outline"
                onClick={() => {
                  setSuccess(false);
                  setFormData({
                    title: "",
                    rate: "",
                    tenor: "",
                    minInvestment: "",
                    startDate: "",
                    maturityDate: "",
                    totalUnits: "",
                    offerSize: "",
                    investorsDeadline: "",
                  });
                }}
              />
              <DashboardBtn cta="Go to NTB Management" onClick={onClose} />
            </div>
          </div>
        )}
      </div>
    </ModalContainer>
  );
}
