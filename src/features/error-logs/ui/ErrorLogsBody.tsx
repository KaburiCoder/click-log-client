import { useMutation } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { fetchErrorLogs } from "../api/fetch-error-logs";
import { useErrorLogsColumns } from "../hooks/use-error-logs-columns";
import { ErrorLog } from "../models/types";
import { ErrorLogDetailModal } from "./ErrorLogDetailModal";
import { ErrorLogsFilter } from "./ErrorLogsFilter";
import { ErrorLogsPagination } from "./ErrorLogsPagination";
import { ErrorLogsTable } from "./ErrorLogsTable";

export const ErrorLogsBody = () => {
  const [selectedLog, setSelectedLog] = useState<ErrorLog | null>(null);
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const { columns } = useErrorLogsColumns();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().setHours(0, 0, 0)),
    to: new Date(new Date().setHours(23, 59, 59)),
  });

  const { data, mutate } = useMutation({
    mutationFn: () =>
      fetchErrorLogs({
        startDate: dateRange.from?.toISOString() || "",
        endDate: dateRange.to?.toISOString() || "",
      }),
  });

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: searchText,
      pagination: {
        pageSize,
        pageIndex,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({ pageIndex, pageSize });
        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
      }
    },
    onGlobalFilterChange: setSearchText,
  });

  return (
    <div className="space-y-4">
      <ErrorLogsFilter
        searchText={searchText}
        onSearchChange={setSearchText}
        onDateChange={setDateRange}
        onSearch={() => {
          mutate();
        }}
      />
      <ErrorLogsTable table={table} onRowClick={setSelectedLog} />

      {selectedLog && (
        <ErrorLogDetailModal
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      )}

      <ErrorLogsPagination
        table={table}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />
    </div>
  );
};
