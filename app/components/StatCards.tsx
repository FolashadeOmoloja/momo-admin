import { TrendingDown, TrendingUp } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string | null;
  changeType?: string | null;
  icon: React.ComponentType<{ className?: string }>;
  smallText?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  change = null,
  changeType = null,
  smallText = "",
}) => {
  return (
    <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ">
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFCC00]/5 to-[#005377]/5 rounded-2xl opacity-100" />

      <div className="relative z-10 flex items-center gap-3">
        {/* Icon */}
        <div
          className={`inline-flex items-center justify-center w-12 h-12 bg-[#FFCC00] rounded-xl group-hover:scale-110 transition-transform duration-200`}
        >
          <Icon className="w-6 h-6 text-[#004F71]" />
        </div>

        <div>
          {/* Title */}
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>

          {/* Value */}
          <p
            className={`text-2xl font-bold text-[#004F71] group-hover:text-[#005377] transition-colors duration-200`}
          >
            {value}
          </p>
          {smallText && (
            <p className="text-xs text-gray-500 mt-1">{smallText}</p>
          )}
        </div>
        {change && (
          <div
            className={`absolute top-0 right-0 flex items-center text-sm ${
              changeType === "positive" ? "text-green-600" : "text-red-600"
            }`}
          >
            {changeType === "positive" ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            {change}
          </div>
        )}
      </div>

      {/* Subtle border accent */}
      <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-[#FFCC00] to-[#005377] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default StatsCard;
