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
  );
}

export default DynamicTable;

//    <table className="w-full">
//       <thead className="bg-gray-50">
//         <tr>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
//         </tr>
//       </thead>
//       <tbody className="bg-white divide-y divide-gray-200">
//         {transactions.map((transaction) => {
//           const Icon = transaction.icon;
//           return (
//             <tr key={transaction.id} className="hover:bg-gray-50">
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center space-x-3">
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${transaction.color} bg-opacity-10`}>
//                     <Icon className={`w-4 h-4 ${transaction.color}`} />
//                   </div>
//                   <span className="text-sm font-medium text-gray-900">{transaction.type}</span>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span className={`text-sm font-medium ${transaction.amount > 0 ? 'text-green-700' : 'text-red-600'}`}>
//                   {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
//                 </span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 {getStatusBadge(transaction.status)}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="text-sm text-gray-900">{transaction.date}</div>
//                 <div className="text-sm text-gray-500">{transaction.time}</div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span className="text-sm text-gray-600 font-mono">{transaction.reference}</span>
//               </td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
