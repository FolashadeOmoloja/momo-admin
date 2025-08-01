import { ResponsiveContainer, Pie, Cell, Tooltip, PieChart } from "recharts";

const ntbStatusData = [
  { name: "Active", value: 65, color: "#004F71" }, // Deep Teal (darker than background)
  { name: "Matured", value: 25, color: "#FFCC00" }, // Soft Ice Blue for contrast
  { name: "Pre-liquidated", value: 10, color: "#fb2c36" }, // Warm Amber/Yellow-Orange
];

const NTBStatusDistribution = () => {
  return (
    <div className="bg-[#78ACBA]/20 rounded-xl p-6 shadow-sm   basis-[50%] flex-1">
      <h3 className="text-lg font-bold mb-10 text-[#004F71]">
        NTB Status Distribution
      </h3>
      <div className="flex flex-col justify-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={ntbStatusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
            >
              {ntbStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          {ntbStatusData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
        <p className="text-[#004F71] mt-6 text-sm font-semibold">
          Total NTBs uploaded: <span className="font-bold">47</span>
        </p>
      </div>
    </div>
  );
};

export default NTBStatusDistribution;
