import React from "react";

type Column<T> = {
  header: string;
  accessor: keyof T;
  cell?: (value: any, row: T, index: number) => React.ReactNode;
};

type DynamicTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

function DynamicTable<T extends object>({
  columns,
  data,
}: DynamicTableProps<T>) {
  return (
    <div className="w-full  max-w-screen ">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#004F71]  py-3">
            <tr className="">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="py-3 px-4 text-left text-xs  text-white uppercase tracking-wider font-semibold"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                {columns.map((col, j) => (
                  <td key={j} className="py-2 px-4 whitespace-nowrap">
                    {typeof col.cell === "function"
                      ? col.cell(row[col.accessor], row, i)
                      : (row[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DynamicTable;
