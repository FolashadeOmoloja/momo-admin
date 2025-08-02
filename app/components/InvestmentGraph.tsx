import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  CartesianGrid,
  Line,
} from "recharts";
import { TrendingUp, BarChart3 } from "lucide-react";
import type { TooltipProps } from "recharts";

const InvestmentGraph = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1m");
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Sample data for the line chart - 6 dates from July 15th with 5-day intervals and realistic market fluctuations
  const investmentVolumeData = [
    { date: "Jul 15", volume: 2.1, redemptions: 0.3 },
    { date: "Jul 20", volume: 2.8, redemptions: 0.4 },
    { date: "Jul 25", volume: 3.2, redemptions: 0.2 },
    { date: "Jul 30", volume: 4.1, redemptions: 0.5 },
    { date: "Aug 4", volume: 4.8, redemptions: 0.3 },
    { date: "Aug 9", volume: 5.2, redemptions: 0.6 },
  ];

  const periods = [
    { label: "1w", value: "1w" },
    { label: "1m", value: "1m", active: true },
    { label: "6m", value: "6m" },
    { label: "1y", value: "1y" },
    { label: "All", value: "all" },
  ];

  const CustomTooltip = ({
    active,
    payload,
  }: TooltipProps<number, string> | any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#005377] text-white px-3 py-2 rounded-lg shadow-lg text-sm">
          <div className="font-medium">{data.date}</div>
          <div className="font-bold">₦{data.volume.toLocaleString()}M</div>
          {data.redemptions && (
            <div className="text-sm opacity-80">
              Redemptions: ₦{data.redemptions}M
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white rounded-2xl py-4 px-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 max-sm:flex-col gap-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[#004F71] mb-1">
            Investment Volume Over Time
          </h3>
          <p className="text-[#333333] text-sm">
            Track investment trends and patterns
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Chart type toggles */}
          <div className="flex bg-[#F2F2F2] rounded-lg p-1">
            <button className="p-2 rounded-md bg-white shadow-sm">
              <TrendingUp className="w-4 h-4 text-[#333333]" />
            </button>
            <button className="p-2 rounded-md">
              <BarChart3 className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Time period buttons */}
          <div className="flex bg-[#F2F2F2] rounded-lg p-1 ml-4">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                  selectedPeriod === period.value
                    ? "bg-white text-[#003057] shadow-sm"
                    : "text-gray-500 hover:text-[#333333]"
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={investmentVolumeData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#999999" }}
              tickMargin={20}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#999999" }}
              tickMargin={20}
              label={{
                value: "₦ (Millions)",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <Tooltip
              content={CustomTooltip}
              cursor={{
                stroke: "#005377",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />

            {/* Main investment volume line */}
            <Line
              type="monotone"
              dataKey="volume"
              stroke="#005377"
              strokeWidth={3}
              dot={{ fill: "#005377", strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
                fill: "#FFCC00",
                stroke: "#003057",
                strokeWidth: 2,
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Redemptions line (optional - you can remove if not needed) */}
            <Line
              type="monotone"
              dataKey="redemptions"
              stroke="#F59E0B"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "#F59E0B", strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, fill: "#F59E0B" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-2 space-x-6">
        <div className="flex items-center">
          <div className="w-4 h-0.5 bg-[#005377] mr-2"></div>
          <span className="text-sm text-gray-700">Investment Volume</span>
        </div>
        <div className="flex items-center">
          <div
            className="w-4 h-0.5 bg-[#F59E0B] mr-2"
            style={{
              borderTop: "2px dashed #F59E0B",
              height: "1px",
              borderBottom: "none",
            }}
          ></div>
          <span className="text-sm text-gray-700">Redemptions</span>
        </div>
      </div>
    </div>
  );
};

export default InvestmentGraph;
