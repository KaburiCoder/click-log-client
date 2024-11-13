import { cn } from "@/shared/utils";
import { ErrorLog } from "../models/types";
import { flexRender, Table } from "@tanstack/react-table";

interface ErrorLogsTableProps {
  table: Table<ErrorLog>;
  onRowClick: (log: ErrorLog) => void;
}

export const ErrorLogsTable = ({ table, onRowClick }: ErrorLogsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-fixed divide-y divide-gray-200">
        <thead className="bg-slate-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-sm font-medium uppercase text-gray-500"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              onClick={() => onRowClick(row.original)}
              className={cn(
                "cursor-pointer hover:bg-gray-100",
                index % 2 === 0 ? "bg-white" : "bg-slate-100",
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="text-sm whitespace-nowrap border-b border-gray-200 px-2 py-2"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
