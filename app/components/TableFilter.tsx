import { getStatusIcon } from "@/app/utils/Functions";
import { ChevronDown } from "lucide-react";

const TableFilter = ({
  onClick,
  showFilterDropdown,
  status = false,
  filter,
  filterName,
  dropDownOnClick,
  filterOptions,
  Icon,
}: {
  onClick: () => void;
  dropDownOnClick: (option: string) => void;
  showFilterDropdown: boolean;
  status?: boolean;
  filter: string;
  filterName: string;
  filterOptions: string[];
  Icon: React.ElementType;
}) => {
  return (
    <div className="relative text-[#004F71]">
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-3 h-12  bg-white rounded-lg shadow"
      >
        <div className="p-1.5 bg-[#FFCC00]/90 rounded-sm shadow-sm">
          {Icon && <Icon className="text-[#004F71] w-3.5 h-3.5" />}
        </div>

        <span className="text-sm">
          {filterName}: <span className="font-medium">{filter}</span>
        </span>
        <ChevronDown className="h-4 w-4 " />
      </button>

      {showFilterDropdown && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => dropDownOnClick(option)}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2"
            >
              {status ? option !== "All" && getStatusIcon(option) : null}
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableFilter;

export const Pagination = ({ filteredData }: { filteredData: any[] }) => (
  <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-700">
        1-{filteredData.length} of {filteredData.length}
      </span>
      <div className="flex gap-2">
        <button className="p-1 hover:text-[#004F71] text-[#FFCC00] ">
          <ChevronDown className="h-4 w-4 rotate-90" />
        </button>
        <button className="p-1 hover:text-[#004F71] text-[#FFCC00]">
          <ChevronDown className="h-4 w-4 -rotate-90" />
        </button>
      </div>
    </div>
  </div>
);
